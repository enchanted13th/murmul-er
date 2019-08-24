package com.murmuler.organicstack.util;

import com.murmuler.organicstack.vo.MessageVO;
import org.apache.commons.io.input.ReversedLinesFileReader;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.Buffer;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class TalkHelper {
    private static final String REPOSITORY_PATH = Constants.REPOSITORY_PATH;
    private static final String PATH = Constants.TALK_PATH;
    private Log logger = LogFactory.getLog(TalkHelper.class);

    @Autowired
    private FileHelper fileHelper;

    public File getFilePath(int me, int you) {
        String folderPath = PATH + "/" + me + "/" + you;
        String filePath = folderPath + "/talk.txt";

        File folder = fileHelper.createFolder(folderPath);
        if(folder == null) {
            return null;
        }

        File file = fileHelper.createFile(filePath);
        if(file == null) {
            return null;
        }

        return file;
    }

    public List<MessageVO> readMessage(int me, int you) {
        String filePath = REPOSITORY_PATH + PATH + "/" + me + "/" + you + "/talk.txt";
        Path path = Paths.get(filePath);
        logger.info("경로: " + path);

        List<MessageVO> msgList = new ArrayList<>();

        if (Files.exists(path)) { // 파일이 있는 경우 읽어오기
            try {
                List<String> list = Files.readAllLines(path, StandardCharsets.UTF_8);
                for (String msg : list) {
                    String msgInfo = msg.substring(msg.indexOf('[') + 1, msg.indexOf(']'));
                    String content = msg.substring(msg.indexOf(']') + 2);
                    String[] temp = msgInfo.split("\\^");
                    String sender = temp[0];
                    String date = temp[1];
                    String time = temp[2].substring(0, temp[2].lastIndexOf(':'));
                    msgList.add(new MessageVO("", sender, "", content, "", date, time));
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
            if (message != null && !message.equals("")) {
                bufferedWriter = new BufferedWriter(new FileWriter(file, true));
                bufferedWriter.write(messageFormat);
                bufferedWriter.newLine();
                bufferedWriter.flush(); // 남아있는 데이터를 모두 출력시킴
            }
            curTime = curTime.substring(0, curTime.lastIndexOf(':'));
            messageVO = new MessageVO("", sender, "", message, "", curDate, curTime);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (bufferedWriter != null) {
                try {
                    bufferedWriter.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return messageVO;
    }

    public List<String> uploadImage(int me, int you, List<MultipartFile> uploadImages) {
        String folderPath = PATH + "/" + me + "/" + you;
        File folder = fileHelper.createFolder(folderPath);
        if(folder == null) {
            return null;
        }
        if (uploadImages == null) {
            return null;
        }

        List<File> fileList = fileHelper.uploadFile(folderPath, uploadImages);
        List<String> fileNameList = new ArrayList<>();
        if(fileList == null) {
            return null;
        }
        else {
            for (File file : fileList) {
                fileNameList.add(file.getName());
            }
        }
        return fileNameList;
    }

    public boolean downloadImage(int me, int you, String fileName, HttpServletResponse response) {
        String folderPath = PATH + "/" + me + "/" + you;
        return fileHelper.downloadFile(folderPath, fileName, response);
    }

    public List<Integer> getTalkList(int me) {
        String folderPath = PATH + "/" + me;
        List<File> folderList = fileHelper.findFolderList(folderPath);
        if(folderList == null) {
            return null;
        }
        List<Integer> talkList = new ArrayList<>();
        for(File folder : folderList) {
            talkList.add(Integer.parseInt(folder.getName()));
        }
        return talkList;
    }

    public String getTalkRoomId(int me, int you) {
        String filePath = REPOSITORY_PATH + PATH + "/" + me + "/" + you + "/talk.txt";
        Path path = Paths.get(filePath);
        String talkRoomId = "";
        BufferedReader reader = null;
        if (Files.exists(path)) {
            try {
                reader = Files.newBufferedReader(path);
                String msg = reader.readLine();
                String msgInfo = msg.substring(msg.indexOf('[') + 1, msg.indexOf(']'));
                String content = msg.substring(msg.indexOf(']') + 2);
                String[] temp = msgInfo.split("\\^");
                String sender = temp[0];
                if (sender.equals("ID")) {
                    talkRoomId = content;
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (reader != null) {
                    try {
                        reader.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        else {
            return null;
        }
        return talkRoomId;
    }

    public MessageVO readLastMessage(int me, int you) {
        String filePath = PATH + "/" + me + "/" + you + "/talk.txt";
        MessageVO lastMessage = null;
        File file = fileHelper.findFile(filePath);
        if (file != null) {
            ReversedLinesFileReader reader = null;
            try {
                reader = new ReversedLinesFileReader(file, Charset.forName("utf-8"));
                String msg = reader.readLine();
                String msgInfo = msg.substring(msg.indexOf('[') + 1, msg.indexOf(']'));
                String content = msg.substring(msg.indexOf(']') + 2);
                String[] temp = msgInfo.split("\\^");
                String sender = temp[0];
                if(sender.contains("_FILE")) {
                    content = "사진";
                }
                if(sender.equals("ID")) {
                    return null;
                }
                String date = temp[1];
                String time = temp[2];
                lastMessage = new MessageVO(getTalkRoomId(me, you), sender, "", content, "", date, time);
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return lastMessage;
    }

}