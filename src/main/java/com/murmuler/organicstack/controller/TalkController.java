package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.model.TalkRoom;
import com.murmuler.organicstack.model.TalkRoomRepository;
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

    private final TalkRoomRepository repository;

    @Autowired
    private TalkService talkService;

    @Autowired
    private TalkHelper talkHelper;

    public TalkController(TalkRoomRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ModelAndView showTalkList(HttpServletRequest request) {
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        if (memberVO == null) return null;
        int memberId = memberVO.getMemberId();
        return null;
    }

    @RequestMapping(value = "/{contactMember}", method = RequestMethod.GET)
    public ModelAndView showTalk(@PathVariable(value = "contactMember") int you,
                                 HttpServletRequest request) {
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        if (memberVO == null) {
            return null;
        }

        int me = memberVO.getMemberId();
        List<MessageVO> dialogueList = talkHelper.readMessage(me, you);
        String talkRoomId = null;
        TalkRoom talkRoom = null;

        if (dialogueList.size() == 0) {
            talkRoom = TalkRoom.create();
            talkRoomId = talkRoom.getId();
            repository.addTalkRoom(talkRoom);
            // 생선된 채팅방 아이디를 대화 기록 맨 위에 저장
            talkHelper.writeMessage("", talkRoomId, talkHelper.getFilePath(me, you));
            talkHelper.writeMessage("", talkRoomId, talkHelper.getFilePath(you, me));
        } else {
            talkRoom = TalkRoom.create();
            talkRoomId = dialogueList.get(0).getContent();
            System.out.println("talkRoomId : " + talkRoomId);
            if (repository.getTalkRoom(talkRoomId) == null) {
                dialogueList.remove(0);
                talkRoom.setId(talkRoomId);
                repository.addTalkRoom(talkRoom);
            }
        }

        ModelAndView mav = new ModelAndView();
        mav.addObject("me", me);
        mav.addObject("contactMember", you);
        mav.addObject("talkRoomId", talkRoomId);
        mav.addObject("nickname", talkService.getNickname(you));
        mav.addObject("dialogue", dialogueList);
        mav.setViewName("talk");
        return mav;
    }

    @ResponseBody
    @RequestMapping(value = "/uploadImage", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void uploadImage(@RequestParam List<MultipartFile> uploadFile,
                            @RequestParam(value = "contactMember") int you,
                            HttpServletRequest request,
                            HttpServletResponse response) throws IOException {
        JSONObject data = new JSONObject();
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        if (memberVO == null) {
            data.put("uploadResult", "NO_LOGIN");
        } else {
            int me = memberVO.getMemberId();
            List<MessageVO> messageVOList = new ArrayList<>();
            List<String> fileList = talkHelper.uploadImage(me, you, uploadFile);
            talkHelper.uploadImage(you, me, uploadFile);
            if (fileList != null) {
                File file = talkHelper.getFilePath(me, you);
                if (file != null) {
//                    for (String path : fileList) {
//                        MessageVO messageVO = talkHelper.writeMessage(sender, path, file);
//                        if (messageVO == null) {
//                            data.put("uploadResult", "FAIL");
//                            break;
//                        }
//                        messageVOList.add(messageVO);
//                    }
//                    if (fileList.size() == messageVOList.size()) {
                        data.put("uploadResult", "SUCCESS");
                        data.put("newMessageList", fileList);
//                    }
                } else {
                    data.put("uploadResult", "FAIL");
                }
            } else {
                data.put("uploadResult", "NO_IMAGE");
            }
        }
        response.setCharacterEncoding("utf-8");
        response.getWriter().print(data);
    }

    @RequestMapping(value = "/downloadImage", method = RequestMethod.GET)
    public void downloadImage(@RequestParam String fileName,
                              @RequestParam(value = "contactMember") int you,
                              HttpServletRequest request,
                              HttpServletResponse response) {
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        if (memberVO == null) {
            return;
        } else {
            int me = memberVO.getMemberId();
            boolean result = talkHelper.downloadImage(me, you, fileName, response);
            if (result) {
                logger.info("DOWNLOAD SUCCESS");
            } else {
                logger.info("DOWNLOAD FAIL");
            }
        }
    }

}