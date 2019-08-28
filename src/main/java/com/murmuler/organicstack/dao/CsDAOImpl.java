package com.murmuler.organicstack.dao;

import com.murmuler.organicstack.mybatis.CustomerMapper;
import com.murmuler.organicstack.mybatis.ReportMapper;
import com.murmuler.organicstack.mybatis.RoomMapper;
import com.murmuler.organicstack.vo.FaqVO;
import com.murmuler.organicstack.vo.InquiryVO;
import com.murmuler.organicstack.vo.InquiryViewVO;
import com.murmuler.organicstack.vo.NoticeVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class CsDAOImpl implements CsDAO {
    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<NoticeVO> searchNoticeList(int page) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        List<NoticeVO> list = mapper.selectNoticeList(page);
        return list;
    }

    @Override
    public List<FaqVO> searchFaqList(int page) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        List<FaqVO> list = mapper.selectFaqList(page);
        return list;
    }

    @Override
    public FaqVO searchFaqDetail(int id) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        FaqVO faq = mapper.selectFaqDetail(id);
        return faq;
    }

    @Override
    public NoticeVO searchNoticeDetail(int id) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        NoticeVO notice = mapper.selectNoticeDetail(id);
        return notice;
    }

    @Override
    synchronized public int insertInquiry(String email, String content) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        Map<String, Object> map = new HashMap<>();
        map.put("email", email);
        map.put("content", content);
        return mapper.insertInquiry(map);
    }

    @Override
    synchronized public int insertFaq(String title, String content) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        Map<String, Object> map = new HashMap<>();
        map.put("title", title);
        map.put("content", content);
        return mapper.insertFaq(map);
    }

    @Override
    synchronized public int insertNotice(String title, String content) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        Map<String, Object> map = new HashMap<>();
        map.put("title", title);
        map.put("content", content);
        return mapper.insertNotice(map);
    }

    @Override
    synchronized public int updateFaq(int id, String title, String content) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("title", title);
        map.put("content", content);
        int cnt = mapper.updateFaq(map);
        return cnt;
    }

    @Override
    synchronized public int updateNotice(int id, String title, String content) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("title", title);
        map.put("content", content);
        int cnt = mapper.updateNotice(map);
        return cnt;
    }

    @Override
    synchronized public int updateInquiry(int id, int processId) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("processId", processId);
        int cnt = mapper.updateInquiry(map);
        return cnt;
    }

    @Override
    synchronized public int deleteFaq(int id) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        return mapper.deleteFaq(id);
    }

    @Override
    synchronized public int deleteNotice(int id) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        return mapper.deleteNotice(id);
    }

    @Override
    synchronized public int deleteInquiry(int id) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        return mapper.deleteInquiry(id);
    }

    @Override
    public List<InquiryVO> selectInquiryList(int page) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        List<InquiryVO> list = mapper.selectInquiryList(page);
        return list;
    }

    @Override
    public InquiryVO selectInquiryDetail(int id) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        InquiryVO inquiryVO = mapper.searchInquiryDetail(id);
        return inquiryVO;
    }

    @Override
    public int searchFaqButtonCnt() {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        return mapper.selectFaqButtonCnt();
    }

    @Override
    public int searchNoticeButtonCnt() {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        return mapper.selectNoticeButtonCnt();
    }

    @Override
    public List<NoticeVO> searchAllNoticeList(){
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        return mapper.selectAllNoticeList();
    }

    @Override
    public List<FaqVO> searchAllFaqList(){
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        return mapper.selectAllFaqList();
    }

    @Override
    public List<InquiryViewVO> searchAllInquiryList() {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        return mapper.selectAllInquiryList();
    }

    @Override
    synchronized public int deleteMultiFaq(Map<String, Object> idMap) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        return mapper.deleteMultiFaq(idMap);
    }

    @Override
    synchronized public int deleteMultiNotice(Map<String, Object> idMap) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        return mapper.deleteMultiNotice(idMap);
    }

    @Override
    synchronized public int updateProcessStatus(int id, int processId) {
        CustomerMapper mapper = sqlSession.getMapper(CustomerMapper.class);
        Map<String, Integer> map = new HashMap<>();
        map.put("id", id);
        map.put("processId", processId);
        return mapper.updateProcessStatus(map);
    }
}
