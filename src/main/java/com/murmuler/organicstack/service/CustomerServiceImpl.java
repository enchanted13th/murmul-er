package com.murmuler.organicstack.service;

import com.murmuler.organicstack.dao.CsDAO;
import com.murmuler.organicstack.util.ProcessStatusRecord;
import com.murmuler.organicstack.vo.FaqVO;
import com.murmuler.organicstack.vo.InquiryViewVO;
import com.murmuler.organicstack.vo.NoticeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CsDAO csDAO;
    @Autowired
    private ProcessStatusRecord processStatusRecord;

    @Override
    public List<FaqVO> getFaqList(int pageNum) {
        int page = (pageNum-1)*5;
        return csDAO.searchFaqList(page);
    }

    @Override
    public List<NoticeVO> getNoticeList(int pageNum) {
        int page = (pageNum-1)*5;
        return csDAO.searchNoticeList(page);
    }

    @Override
    public NoticeVO getNoticeDetail(int id) {
        NoticeVO notice = csDAO.searchNoticeDetail(id);
        String content = notice.getContent().replaceAll("\n", "<br>");
        notice.setContent(content);
        return notice;
    }

    @Override
    public FaqVO getFaqDetail(int id) {
        return csDAO.searchFaqDetail(id);
    }

    @Override
    public int addInquiry(String email, String content) {
        return csDAO.insertInquiry(email, content);
    }

    @Override
    public int getFaqButtonCnt() {
        return csDAO.searchFaqButtonCnt();
    }

    @Override
    public int getNoticeButtonCnt() {
        return csDAO.searchNoticeButtonCnt();
    }

    @Override
    public int removeMultiFaq(Map<String, Object> idMap) {  return csDAO.deleteMultiFaq(idMap);  }

    @Override
    public int removeMultiNotice(Map<String, Object> idMap) {  return csDAO.deleteMultiNotice(idMap);  }

    @Override
    public List<FaqVO> getAllFaqList() { return csDAO.searchAllFaqList(); }

    @Override
    public List<NoticeVO> getAllNoticeList() { return csDAO.searchAllNoticeList(); }

    @Override
    public List<InquiryViewVO> getAllInquiryList() {
        return csDAO.searchAllInquiryList();
    }

    @Override
    public int updateFaq(int id, String title, String content) { return csDAO.updateFaq(id, title, content); }

    @Override
    public int updateNotice(int id, String title, String content) { return csDAO.updateNotice(id, title, content); }

    @Override
    public int addNotice(String title, String content) { return csDAO.insertNotice(title, content); }

    @Override
    public int addFaq(String title, String content) { return csDAO.insertFaq(title, content); }

    @Override
    public int changeProcessStatus(int id, String processStatus) {
        int processId = processStatusRecord.getId(processStatus);
        return csDAO.updateProcessStatus(id, processId);
    }
}
