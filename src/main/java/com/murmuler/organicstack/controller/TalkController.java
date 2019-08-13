package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.service.TalkService;
import com.murmuler.organicstack.vo.MemberVO;
import com.murmuler.organicstack.vo.MessageVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/talk")
public class TalkController {
    private Log logger = LogFactory.getLog(TalkController.class);

    @Autowired
    private TalkService talkService;

    @RequestMapping(value = "/{contactMember}", method = RequestMethod.GET)
    public ModelAndView showTalk(@PathVariable(value = "contactMember") int you,
                                 HttpServletRequest request) {
        HttpSession session = request.getSession();
        MemberVO memberVO = (MemberVO) session.getAttribute("loginMember");
        int me = memberVO.getMemberId();

        String filePath = "C:\\talkList\\" + me + "\\" + you + ".txt";
        Path path = Paths.get(filePath);
        logger.info("경로: " + path);

        List<MessageVO> msgList = new ArrayList<>();

        if (Files.exists(path)) { // 파일이 있는 경우 읽어오기
            try {
                List<String> list = Files.readAllLines(path, StandardCharsets.UTF_8);
                for (String msg : list) {
                    String msgInfo = msg.substring(msg.indexOf('[')+1, msg.indexOf(']'));
                    String content = msg.substring(msg.indexOf(']')+2);
                    String[] temp = msgInfo.split("\\^");
                    String sender = temp[0];
                    String date = temp[1];
                    String time = temp[2].substring(0, temp[2].lastIndexOf(':'));
                    msgList.add(new MessageVO(sender, content, date, time));
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        ModelAndView mav = new ModelAndView();
        mav.addObject("contactMember", you);
        mav.addObject("nickname", talkService.getNickname(you));
        mav.addObject("dialogue", msgList);
        mav.setViewName("talk");
        return mav;
    }

    @RequestMapping(value = "/send", method = RequestMethod.POST)
    public void sendMessage(@RequestParam String message,
                            @RequestParam(value = "contactMember") int you,
                            @RequestParam boolean dateFlag,
                            HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        MemberVO memberVO = (MemberVO) session.getAttribute("loginMember");
        int me = memberVO.getMemberId();

        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");

        String directoryPath = "C:\\talkList\\" + me;
        String filePath = directoryPath + "\\" + you + ".txt";
        File folder = new File(directoryPath);
        File file = new File(filePath);

        if (!folder.exists()) { // 디렉토리가 없는 경우 생성
            folder.mkdir();
            logger.info(folder.getName() + " 폴더 생성");
        } else { // 디렉토리가 있는 경우
            logger.info(folder.getName() + " 폴더 존재");
            if (!file.exists()) { // 파일이 없는 경우 생성
                try {
                    if (file.createNewFile()) {
                        logger.info(file.getName() + " 파일 생성");
                        talkService.addFilePath(file.getPath());
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else { // 파일이 있는 경우
                BufferedWriter bufferedWriter = null;
                try {
                    String messageFormat = "[ME-" + timeFormat.format(date) + "] " + message;
                    bufferedWriter = new BufferedWriter(new FileWriter(file));
                    if(dateFlag) {
                        bufferedWriter.write("#D" + dateFormat.format(date) + "#\n");
                    }
                    bufferedWriter.write(messageFormat);
                    bufferedWriter.newLine();
                    bufferedWriter.flush(); // 남아있는 데이터를 모두 출력시킴
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    if (bufferedWriter != null) {
                        bufferedWriter.close();
                    }
                }
            }
        }
    }

}