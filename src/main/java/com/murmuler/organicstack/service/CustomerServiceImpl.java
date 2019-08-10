package com.murmuler.organicstack.service;

import com.murmuler.organicstack.dao.CsDAO;
import com.murmuler.organicstack.vo.FaqVO;
import com.murmuler.organicstack.vo.NoticeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CsDAO csDAO;

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
}
