package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.service.TalkService;
import com.murmuler.organicstack.util.TalkHelper;
import com.murmuler.organicstack.vo.MemberVO;
import com.murmuler.organicstack.vo.MessageVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;

@Controller
@RequestMapping("/talk")
public class TalkController {
    private Log logger = LogFactory.getLog(TalkController.class);

    @Autowired
    private TalkService talkService;

    @Autowired
    private TalkHelper helper;

    @RequestMapping(value = "/{contactMember}", method = RequestMethod.GET)
    public ModelAndView showTalk(@PathVariable(value = "contactMember") int you,
                                 HttpServletRequest request) {
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        if(memberVO == null) {
            return null;
        }
        int me = memberVO.getMemberId();

        List<MessageVO> dialogueList = helper.readMessage(me, you);

        ModelAndView mav = new ModelAndView();
        mav.addObject("contactMember", you);
        mav.addObject("nickname", talkService.getNickname(you));
        mav.addObject("dialogue", dialogueList);
        mav.setViewName("talk");
        return mav;
    }

    @RequestMapping(value = "/send", method = RequestMethod.POST)
    public void sendMessage(@RequestParam String message,
                            @RequestParam(value = "contactMember") int you,
                            HttpServletRequest request,
                            HttpServletResponse response) throws IOException {
        JSONObject data = new JSONObject();
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        if(memberVO == null) {
            data.put("sendResult", "NO_LOGIN");
        }
        else {
            int me = memberVO.getMemberId();

            File folder = helper.getFolderPath(me, you);
            if (folder != null) {
                File file = helper.getFilePath(folder);
                if (file != null) {
                    MessageVO messageVO = helper.writeMessage("ME", message, file);

                    if (messageVO == null) {
                        data.put("sendResult", "FAIL");
                    } else {
                        data.put("sendResult", "SUCCESS");
                        data.put("newMessage", messageVO);
                    }
                } else {
                    data.put("sendResult", "FAIL");
                }
            } else {
                data.put("sendResult", "FAIL");
            }
        }
        response.setCharacterEncoding("utf-8");
        response.getWriter().print(data);
    }

    @RequestMapping(value = "/receive", method = RequestMethod.POST)
    public void receiveMessage(@RequestParam String message,
                            @RequestParam(value = "contactMember") int you,
                            HttpServletRequest request,
                            HttpServletResponse response) throws IOException {
        JSONObject data = new JSONObject();
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        if(memberVO == null) {
            data.put("receiveResult", "NO_LOGIN");
        }
        else {
            int me = memberVO.getMemberId();

            File folder = helper.getFolderPath(me, you);
            if (folder != null) {
                File file = helper.getFilePath(folder);
                if (file != null) {
                    MessageVO messageVO = helper.writeMessage("YOU", message, file);

                    if (messageVO == null) {
                        data.put("receiveResult", "FAIL");
                    } else {
                        data.put("receiveResult", "SUCCESS");
                        data.put("newMessage", messageVO);
                    }
                } else {
                    data.put("receiveResult", "FAIL");
                }
            } else {
                data.put("receiveResult", "FAIL");
            }
        }
        response.setCharacterEncoding("utf-8");
        response.getWriter().print(data);
    }

    @ResponseBody
    @RequestMapping(value = "/uploadImage", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void uploadImage(@RequestParam List<MultipartFile> uploadFile,
                            @RequestParam(value = "contactMember") int you,
                            HttpServletRequest request,
                            HttpServletResponse response) throws IOException {
        JSONObject data = new JSONObject();
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        if(memberVO == null) {
            data.put("uploadResult", "NO_LOGIN");
        }
        else {
            int me = memberVO.getMemberId();
            List<MessageVO> messageVOList = new ArrayList<>();
            File folder = helper.getFolderPath(me, you);
            if (folder != null) {
                List<String> fileList = helper.uploadImage(folder, uploadFile);
                if (fileList != null) {
                    File file = helper.getFilePath(folder);
                    if (file != null) {
                        for (String path : fileList) {
                            MessageVO messageVO = helper.writeMessage("ME_FILE", path, file);
                            if (messageVO == null) {
                                data.put("uploadResult", "FAIL");
                                break;
                            }
                            messageVOList.add(messageVO);
                        }
                        if (fileList.size() == messageVOList.size()) {
                            data.put("uploadResult", "SUCCESS");
                            data.put("newMessageList", messageVOList);
                        }
                    } else {
                        data.put("uploadResult", "FAIL");
                    }
                } else {
                    data.put("uploadResult", "NO_IMAGE");
                }
            } else {
                data.put("uploadResult", "FAIL");
            }
        }
        response.setCharacterEncoding("utf-8");
        response.getWriter().print(data);
    }

}