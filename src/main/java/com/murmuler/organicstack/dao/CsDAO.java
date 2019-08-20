package com.murmuler.organicstack.dao;

import com.murmuler.organicstack.vo.FaqVO;
import com.murmuler.organicstack.vo.InquiryVO;
import com.murmuler.organicstack.vo.InquiryViewVO;
import com.murmuler.organicstack.vo.NoticeVO;

import java.util.List;
import java.util.Map;

public interface CsDAO {
    List<NoticeVO> searchNoticeList(int page);
    List<FaqVO> searchFaqList(int page);
    FaqVO searchFaqDetail(int id);
    NoticeVO searchNoticeDetail(int id);
    int insertInquiry(String email, String content);

    int insertFaq(String title, String content);
    int insertNotice(String title, String content);
    int updateFaq(int id, String title, String content);
    int updateNotice(int id, String title, String content);
    int updateInquiry(int id, int processId);
    int deleteFaq(int id);
    int deleteNotice(int id);
    int deleteInquiry(int id);
    List<InquiryVO> selectInquiryList(int page);
    InquiryVO selectInquiryDetail(int id);

    int searchFaqButtonCnt();
    int searchNoticeButtonCnt();

    List<NoticeVO> searchAllNoticeList();
    List<FaqVO> searchAllFaqList();
    List<InquiryViewVO> searchAllInquiryList();

    int deleteMultiFaq(Map<String, Object> idMap);
    int deleteMultiNotice(Map<String, Object> idMap);

    int updateProcessStatus(int id, int processId);
}
