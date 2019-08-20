package com.murmuler.organicstack.service;

import com.murmuler.organicstack.vo.FaqVO;
import com.murmuler.organicstack.vo.InquiryViewVO;
import com.murmuler.organicstack.vo.NoticeVO;

        import java.util.List;
import java.util.Map;

public interface CustomerService {
    public List<FaqVO> getFaqList(int pageNum);
    public List<NoticeVO> getNoticeList(int pageNum);
    public NoticeVO getNoticeDetail(int id);
    public FaqVO getFaqDetail(int id);
    public int addInquiry(String email, String content);

    public int getFaqButtonCnt();
    public int getNoticeButtonCnt();

    int removeMultiFaq(Map<String, Object> idMap);
    int removeMultiNotice(Map<String, Object> idMap);

    List<FaqVO> getAllFaqList();
    List<NoticeVO> getAllNoticeList();
    List<InquiryViewVO> getAllInquiryList();

    int updateFaq(int id, String title, String content);
    int updateNotice(int id, String title, String content);

    int addNotice(String title, String content);
    int addFaq(String title, String content);

    int changeProcessStatus(int id, String processStatus);
}
