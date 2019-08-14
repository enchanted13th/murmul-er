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
            data.put("sendResult", "LOGINNO");
            return;
        }
        int me = memberVO.getMemberId();

        File folder = helper.createFolderPath(me, you);
        if(folder != null) {
            File file = helper.createFilePath(folder);
            if(file != null) {
                MessageVO messageVO = helper.writeMessage("ME", message, file);

                if(messageVO == null) {
                    data.put("sendResult", "FAIL");
                }
                else {
                    data.put("sendResult", "SUCCESS");
                    data.put("newMessage", messageVO);
                }
            }
            else {
                data.put("sendResult", "FAIL");
            }
        }
        else {
            data.put("sendResult", "FAIL");
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
            data.put("receiveResult", "LOGINNO");
            return;
        }
        int me = memberVO.getMemberId();

        File folder = helper.createFolderPath(me, you);
        if(folder != null) {
            File file = helper.createFilePath(folder);
            if(file != null) {
                MessageVO messageVO = helper.writeMessage("YOU", message, file);

                if(messageVO == null) {
                    data.put("receiveResult", "FAIL");
                }
                else {
                    data.put("receiveResult", "SUCCESS");
                    data.put("newMessage", messageVO);
                }
            }
            else {
                data.put("receiveResult", "FAIL");
            }
        }
        else {
            data.put("receiveResult", "FAIL");
        }
        response.setCharacterEncoding("utf-8");
        response.getWriter().print(data);
    }

    @ResponseBody
    @RequestMapping(value = "/uploadImage", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void uploadImage(@RequestParam MultipartFile[] uploadFile,
                            @RequestParam(value = "contactMember") int you,
                            HttpServletRequest request,
                            HttpServletResponse response) throws IOException {
        JSONObject data = new JSONObject();
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        if(memberVO == null) {
            data.put("uploadResult", "LOGINNO");
            return;
        }
        int me = memberVO.getMemberId();

        File folder = helper.createFolderPath(me, you);
        if(folder != null) {
            File file = helper.createFilePath(folder);
           /* if(file != null) {
                MessageVO messageVO = helper.writeMessage("YOU", message, file);

                if(messageVO == null) {
                    data.put("receiveResult", "FAIL");
                }
                else {
                    data.put("receiveResult", "SUCCESS");
                    data.put("newMessage", messageVO);
                }
            }
            else {
                data.put("receiveResult", "FAIL");
            }
        }
        else {
            data.put("receiveResult", "FAIL");
        }

        ArrayList<String> imgUrlList = new ArrayList<>();

        for(MultipartFile multipartFile : uploadFile){
            String File = multipartFile.getOriginalFilename();

            imgFile = imgFile.substring(imgFile.lastIndexOf("\\")+1);
            imgUrlList.add(folder.getPath() + "\\" + imgFile);

            try{
                File saveFile = new File(uploadPath, uploadFileName);
                multipartFile.transferTo(saveFile);
            }catch (Exception e){
                data.put("uploadResult", "FAIL");
                e.printStackTrace();
            }*/
        }
        response.setCharacterEncoding("utf-8");
        response.getWriter().print(data);
    }

}