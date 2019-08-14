package com.murmuler.organicstack.util;

import com.murmuler.organicstack.service.TalkService;
import com.murmuler.organicstack.vo.MessageVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class TalkHelper {
    private static final String REPOSITORY_PATH = "C:\\talkList";

    private Log logger = LogFactory.getLog(TalkHelper.class);

    @Autowired
    private TalkService talkService;

    public File createFolderPath(int me, int you) {
        String directoryPath = REPOSITORY_PATH + "\\" + me + "\\" + you;
        File folder = new File(directoryPath);

        if (!folder.exists()) { // 디렉토리가 없는 경우 생성
            if(folder.mkdirs()) {
                logger.info(folder.getPath() + " 폴더 생성");
            }
            else {
                logger.info(folder.getPath() + " 폴더 생성 실패");
                return null;
            }
        }
        logger.info(folder.getPath() + " 폴더 존재");
        return folder;
    }

    public File createFilePath(File folder) {
        String filePath = folder.getPath() + "\\talk.txt";
        File file = new File(filePath);

        if (!file.exists()) { // 파일이 없는 경우 생성
            try {
                if (file.createNewFile()) {
                    logger.info(file.getPath() + " 파일 생성");
                    talkService.addFilePath(file.getPath());
                }
                else {
                    logger.info(file.getPath() + " 파일 생성 실패");
                    return null;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        logger.info(file.getPath() + " 파일 존재");
        return file;
    }

    public List<MessageVO> readMessage(int me, int you) {
        String filePath = REPOSITORY_PATH + "\\" + me + "\\" + you + "\\talk.txt";
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
        return msgList;
    }

    public MessageVO writeMessage(String sender, String message, File file) {
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
        String curDate = dateFormat.format(date);
        String curTime = timeFormat.format(date);
        String messageFormat = "[" + sender + "^" + curDate + "^" + curTime + "] " + message;

        MessageVO messageVO = null;
        BufferedWriter bufferedWriter = null;
        try {
            bufferedWriter = new BufferedWriter(new FileWriter(file, true));
            bufferedWriter.write(messageFormat);
            bufferedWriter.newLine();
            bufferedWriter.flush(); // 남아있는 데이터를 모두 출력시킴
            curTime = curTime.substring(0, curTime.lastIndexOf(':'));
            messageVO = new MessageVO(sender, message, curDate, curTime);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                bufferedWriter.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return messageVO;
    }

    public List<String> uploadImage(File folder, MultipartFile[] images) {
        String filePath = folder.getPath() + "\\talk.txt";
        File file = new File(filePath);

        List<String> fileList = new ArrayList<>();

        for(MultipartFile multipartFile : images){
            String imageName = multipartFile.getOriginalFilename();
            try {
                File saveFile = new File(folder.getPath(), imageName);
                if(saveFile.isFile()) { // 중복된 이름의 파일이 있는 경우
                    String fileName = saveFile.getName();
                    saveFile = new File(folder.getPath(), fileName.substring(0, fileName.lastIndexOf("."))
                }
                multipartFile.transferTo(saveFile);
                fileList.add(saveFile.getPath());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        /*if (!file.exists()) { // 파일이 없는 경우 생성
            try {
                if (file.createNewFile()) {
                    logger.info(file.getPath() + " 파일 생성");
                    File saveFile = new File(folder.getPath(), file);
                    multipartFile.transferTo(saveFile);
                }
                else {
                    logger.info(file.getPath() + " 파일 생성 실패");
                    return null;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        logger.info(file.getPath() + " 파일 존재");
        return file;*/
        return fileList;

    }

}
