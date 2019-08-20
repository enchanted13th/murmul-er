package com.murmuler.organicstack.mybatis;


import com.murmuler.organicstack.vo.FaqVO;
import com.murmuler.organicstack.vo.InquiryVO;
import com.murmuler.organicstack.vo.InquiryViewVO;
import com.murmuler.organicstack.vo.NoticeVO;

import java.util.List;
import java.util.Map;

public interface CustomerMapper {
    List<NoticeVO> selectNoticeList(int page);
    List<FaqVO> selectFaqList(int page);
    FaqVO selectFaqDetail(int id);
    NoticeVO selectNoticeDetail(int id);
    int insertInquiry(Map<String, Object> map);

    int insertFaq(Map<String, Object> map);
    int insertNotice(Map<String, Object> map);
    int updateFaq(Map<String, Object> map);
    int updateNotice(Map<String, Object> map);
    int updateInquiry(Map<String, Object> map);
    int deleteFaq(int id);
    int deleteNotice(int id);
    int deleteInquiry(int id);
    List<InquiryVO> selectInquiryList(int page);
    InquiryVO searchInquiryDetail(int id);

    int selectFaqButtonCnt();
    int selectNoticeButtonCnt();

    List<NoticeVO> selectAllNoticeList();
    List<FaqVO> selectAllFaqList();
    List<InquiryViewVO> selectAllInquiryList();

    int deleteMultiFaq(Map<String, Object> idMap);
    int deleteMultiNotice(Map<String, Object> idMap);

    int updateProcessStatus(Map<String, Integer> map);
}
