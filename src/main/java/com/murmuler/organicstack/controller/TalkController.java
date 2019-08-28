package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.model.TalkRoom;
import com.murmuler.organicstack.model.TalkRoomRepository;
import com.murmuler.organicstack.service.TalkService;
import com.murmuler.organicstack.util.SortTalkList;
import com.murmuler.organicstack.util.TalkHelper;
import com.murmuler.organicstack.vo.MemberVO;
import com.murmuler.organicstack.vo.MessageVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONArray;
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

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ModelAndView showTalkList(HttpServletRequest request,
                                     HttpServletResponse response) {
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        ModelAndView mav = new ModelAndView();
        if (memberVO == null) {
            mav.setViewName("error");
            return mav;
        }
        int me = memberVO.getMemberId();
//        String nickname = memberVO.getNickname();
        boolean isExist = false;

        List<JSONObject> talkInfoList = new ArrayList<>();
        List<Integer> talkList = talkHelper.getTalkList(me);
//        if(talkList == null) {
//            isExist = false;
//        }
//        else {
        if (talkList != null) {
            for(int contactMember : talkList) {
                MessageVO messageVO = talkHelper.readLastMessage(me, contactMember);
                if(messageVO != null) {
                    JSONObject talkInfo = new JSONObject();
                    talkInfo.put("contactMember", contactMember);
                    talkInfo.put("nickname", talkService.getNickname(contactMember));
                    talkInfo.put("lastMessage", messageVO);
                    talkInfo.put("talkRoomId", messageVO.getTalkRoomId());
                    talkInfoList.add(talkInfo);
                    isExist = true;
                }
            }
            Collections.sort(talkInfoList, new SortTalkList());
            Collections.reverse(talkInfoList);
        }

        response.setContentType("application/json; charset=utf-8");
        mav.addObject("talkInfoList", talkInfoList);
        mav.addObject("isExist", isExist);
        mav.addObject("me", me);
        mav.setViewName("talkList");
        return mav;
    }

    @RequestMapping(value = "/{contactMember}", method = RequestMethod.GET)
    public ModelAndView showTalk(@PathVariable(value = "contactMember") int you,
                                 HttpServletRequest request) {
        MemberVO memberVO = (MemberVO) request.getSession().getAttribute("loginMember");
        ModelAndView mav = new ModelAndView();

        if (memberVO == null) {
            mav.setViewName("error");
        }
        else if (memberVO.getMemberId() == you) {
            mav.setViewName("error");
        }
        else {
            int me = memberVO.getMemberId();
            List<MessageVO> dialogueList = talkHelper.readMessage(me, you);
            String talkRoomId;
            TalkRoom talkRoom;

            if (dialogueList.size() == 0) {
                talkRoom = TalkRoom.create();
                talkRoomId = talkRoom.getId();
                repository.addTalkRoom(talkRoom);
                talkHelper.writeMessage("ID", talkRoomId, talkHelper.getFilePath(me, you));
                talkHelper.writeMessage("ID", talkRoomId, talkHelper.getFilePath(you, me));
            } else {
                talkRoomId = dialogueList.get(0).getContent();
                talkRoom = repository.getTalkRoom(talkRoomId);
//            System.out.println(talkRoom);
                if (talkRoom == null) {
                    talkRoom = TalkRoom.create();
                    talkRoom.setId(talkRoomId);
                    repository.addTalkRoom(talkRoom);
                } else {
                    talkRoom.setId(talkRoomId);
                }
                dialogueList.remove(0);
            }
            mav.addObject("contactMember", you);
            mav.addObject("talkRoomId", talkRoomId);
            mav.addObject("nickname", talkService.getNickname(you));
            mav.addObject("dialogue", dialogueList);
            mav.setViewName("talk");
        }

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
            List<String> fileList = talkHelper.uploadImage(me, you, uploadFile);
            talkHelper.uploadImage(you, me, uploadFile);
            if (fileList != null) {
                File file = talkHelper.getFilePath(me, you);
                if (file != null) {
                    data.put("uploadResult", "SUCCESS");
                    data.put("newMessageList", fileList);
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