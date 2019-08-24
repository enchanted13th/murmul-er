package com.murmuler.organicstack.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class FileHelper {
    private static final String REPOSITORY_PATH = Constants.REPOSITORY_PATH;

    private Log logger = LogFactory.getLog(FileHelper.class);

    public File createFolder(String folderPath) {
        if (folderPath == null) {
            logger.error("실패: 잘못된 경로입니다.");
            return null;
        }
        File folder = new File(REPOSITORY_PATH + folderPath);

        if (!folder.exists()) { // 폴더가 없는 경우 생성
            if (folder.mkdirs()) {
                logger.info(folder.getPath() + " 폴더 생성");
            } else {
                logger.error(folder.getPath() + " 폴더 생성 실패");
                return null;
            }
        } else {
            logger.info(folder.getPath() + " 폴더 존재");
        }
        return folder;
    }

    public File createFile(String filePath) {
        if (filePath == null) {
            logger.error("실패: 잘못된 경로입니다.");
            return null;
        }
        File file = new File(REPOSITORY_PATH + filePath);

        if (!file.exists()) { // 파일이 없는 경우 생성
            try {
                if (file.createNewFile()) {
                    logger.info(file.getPath() + " 파일 생성");
                } else {
                    logger.error(file.getPath() + " 파일 생성 실패");
                    return null;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            logger.info(file.getPath() + " 파일 존재");
        }
        return file;
    }

    public List<File> findFolderList(String folderPath) {
        String searchPath = REPOSITORY_PATH + folderPath;
        List<File> folderList = new ArrayList<>();
        File checkFolder = new File(searchPath);

        if(!checkFolder.isDirectory()) {
            logger.error(checkFolder.getPath() + " 폴더를 찾을 수 없습니다.");
            return null;
        }
        for (File folder : checkFolder.listFiles()) {
            if (folder.isDirectory()) {
                folderList.add(folder);
            }
        }
        return folderList;
    }

    public File findFile(String filePath) {
        String searchPath = REPOSITORY_PATH + filePath;
        File checkFile = new File(searchPath);

        if(!checkFile.isFile()) {
            logger.error(checkFile.getPath() + " 파일을 찾을 수 없습니다.");
            return null;
        }
        return checkFile;
    }

    public List<File> uploadFile(String storagePath, List<MultipartFile> multipartFileList) {
        if (storagePath == null) {
            logger.error("실패: 잘못된 경로입니다.");
            return null;
        }
        if (multipartFileList == null) {
            logger.error("실패: 올바르지 않은 파일입니다.");
            return null;
        }
        List<File> fileList = new ArrayList<>();
        String path = REPOSITORY_PATH + storagePath;
        logger.info("업로드 경로: " + path);

        for (MultipartFile multipartFile : multipartFileList) {
            String fileName = multipartFile.getOriginalFilename();
            if (fileName.contains("/")) {
                fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
            }
            try {
                File saveFile = new File(path, fileName);
                if (saveFile.isFile()) { // 중복된 이름의 파일이 있는 경우
                    int i = 1;
                    String saveName = saveFile.getName();
                    String name = saveName.substring(0, saveName.lastIndexOf("."));
                    String extension = saveName.substring(saveName.lastIndexOf(".") + 1);
                    while (true) {
                        if (saveFile.exists()) {
                            saveFile = new File(path, name + "(" + i + ")." + extension);
                            i++;
                        } else {
                            break;
                        }
                    }
                }
                multipartFile.transferTo(saveFile);
                fileList.add(saveFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return fileList;
    }

    public List<File> uploadFile(String storagePath, List<MultipartFile> multipartFileList, String transKeyword) {
        if (storagePath == null) {
            logger.error("실패: 잘못된 경로입니다.");
            return null;
        }
        if (multipartFileList == null) {
            logger.error("실패: 올바르지 않은 파일입니다.");
            return null;
        }
        if (transKeyword == null) {
            logger.error("실패: 잘못된 변환명입니다.");
            return null;
        }
        List<File> fileList = new ArrayList<>();
        String path = REPOSITORY_PATH + storagePath;
        logger.info("업로드 경로 : " + path);

        int i = 1;
        for (MultipartFile multipartFile : multipartFileList) {
            String fileName = multipartFile.getOriginalFilename();
            if (fileName.contains("/")) {
                fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
            }
            String extension = fileName.substring(fileName.lastIndexOf("."));
            String transFileName = transKeyword + i + extension;
            i++;
            try {
                File saveFile = new File(path, transFileName);
                if (saveFile.isFile()) { // 중복된 이름의 파일이 있는 경우
                    int j = 1;
                    String saveName = saveFile.getName();
                    String name = saveName.substring(0, saveName.lastIndexOf("."));
                    while (true) {
                        if (saveFile.exists()) {
                            saveFile = new File(path, name + "(" + j + ")" + extension);
                            j++;
                        } else {
                            break;
                        }
                    }
                }
                multipartFile.transferTo(saveFile);
                fileList.add(saveFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return fileList;
    }

    public boolean downloadFile(String storagePath, String fileName, HttpServletResponse response) {
        if (storagePath == null) {
            logger.error("실패: 잘못된 경로입니다.");
            return false;
        }
        if (fileName == null) {
            logger.error("실패: 잘못된 파일명입니다.");
            return false;
        }
        String path = REPOSITORY_PATH + storagePath + "/" + fileName;
        logger.info("다운로드 경로 : " + path);

        File file = new File(path);
        if (!file.exists()) {
            logger.error("실패: 존재하지 않는 파일입니다.");
            return false;
        } else {
            FileInputStream inputStream = null;
            OutputStream outputStream = null;
            response.setHeader("Cache-Control", "no-cache");
            response.addHeader("Content-disposition", "attachment;fileName=" + fileName);
            try {
                inputStream = new FileInputStream(file);
                outputStream = response.getOutputStream();
                byte[] buffer = new byte[1024 * 8];
                while (true) {
                    int count = inputStream.read(buffer);
                    if (count == -1)
                        break;
                    outputStream.write(buffer, 0, count);
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    inputStream.close();
                    outputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return true;
        }
    }

}
