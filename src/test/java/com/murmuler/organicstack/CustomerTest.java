package com.murmuler.organicstack;

import com.murmuler.organicstack.dao.CsDAO;
import com.murmuler.organicstack.vo.FaqVO;
import com.murmuler.organicstack.vo.InquiryVO;
import com.murmuler.organicstack.vo.NoticeVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;

import static junit.framework.TestCase.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "file:web/WEB-INF/dispatcher-servlet.xml",
        "file:web/WEB-INF/mybatis-config.xml"
})
@WebAppConfiguration
public class CustomerTest {
    @Autowired
    private CsDAO dao;

    @Test
    public void searchNoticeListTest(){
//        자바단에서 page 계산해서 넘겨주기!! -> (page-1)*listSize 이 값이 0이라서 0으로 테스트함
        List<NoticeVO> list = dao.searchNoticeList(0);
//        for(NoticeVO noticeVO : list){
//            System.out.println(noticeVO.getId());
//            System.out.println(noticeVO.getTitle());
//            System.out.println(noticeVO.getContent());
//            System.out.println(noticeVO.getWriteDate());
//            System.out.println("=======================================================");
//        }
        assertNotNull(list);
    }

    @Test
    public void searchFaqListTest(){
//        자바단에서 page 계산해서 넘겨주기!! -> (page-1)*listSize 이 값이 0이라서 0으로 테스트함
        List<FaqVO> list = dao.searchFaqList(0);
//        for(FaqVO faqVO : list){
//            System.out.println(faqVO.getId());
//            System.out.println(faqVO.getTitle());
//            System.out.println(faqVO.getContent());
//            System.out.println("=======================================================");
//        }
        assertNotNull(list);
    }

    @Test
    public void searchFaqDetailTest(){
        FaqVO faq = dao.searchFaqDetail(2);
        if(faq != null){
            System.out.println(faq.getTitle());
            System.out.println(faq.getContent());
        }
        assertNotNull(faq);
    }

    @Test
    public void searchNoticeDetailTest(){
        NoticeVO notice = dao.searchNoticeDetail(2);
        if(notice != null){
            System.out.println(notice.getTitle());
            System.out.println(notice.getContent());
            System.out.println(notice.getWriteDate());
        }
        assertNotNull(notice);
    }

    @Test
    public void insertInquiryTest(){
        assertTrue(dao.insertInquiry("test0806@naver.com", "테스트test") > 0);
    }

    @Test
    public void insertFaqTest(){
        assertTrue(dao.insertFaq("test","test") > 0);
    }

    @Test
    public void insertNoticeTest(){
        assertTrue(dao.insertNotice("test","test") > 0);
    }

    @Test
    public void updateFaqTest(){
        assertTrue(dao.updateFaq(18,"update", "update") > 0);
    }

    @Test
    public void updateNoticeTest(){
        assertTrue(dao.updateNotice(7,"update", "update") > 0);
    }

    @Test
    public void updateInquiryTest(){
        assertTrue(dao.updateInquiry(31,2) > 0);
    }

    @Test
    public void deleteFaqTest(){
        assertTrue(dao.deleteFaq(19) >= 1);
    }

    @Test
    public void deleteNoticeTest(){
        assertTrue(dao.deleteNotice(8) >= 1);
    }

    @Test
    public void deleteInquiryTest(){
        assertTrue(dao.deleteInquiry(31) >= 1);
    }

    @Test
    public void selectInquiryListTest(){
//        자바단에서 page 계산해서 넘겨주기!! -> (page-1)*listSize 이 값이 0이라서 0으로 테스트함
        List<InquiryVO> list = dao.selectInquiryList(0);
        for(InquiryVO inquiryVO : list){
            System.out.println(inquiryVO.getId());
            System.out.println(inquiryVO.getEmail());
            System.out.println(inquiryVO.getContent());
            System.out.println(inquiryVO.getWriteDate());
            System.out.println(inquiryVO.getProcessId());
            System.out.println("=======================================================");
        }
        assertNotNull(list);
    }

    @Test
    public void selectInquiryDetailTest(){
        InquiryVO inquiry = dao.selectInquiryDetail(3);
        if(inquiry != null){
            System.out.println(inquiry.getId());
            System.out.println(inquiry.getEmail());
            System.out.println(inquiry.getContent());
            System.out.println(inquiry.getWriteDate());
            System.out.println(inquiry.getProcessId());
        }
        assertNotNull(inquiry);
    }

    @Test
    public void selectFaqButtonCntTest(){
        int cnt = dao.searchFaqButtonCnt();
        assertEquals(2, cnt);
    }
}

