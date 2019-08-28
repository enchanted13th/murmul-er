package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.service.CustomerService;
import com.murmuler.organicstack.vo.FaqVO;
import com.murmuler.organicstack.vo.NoticeVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.regex.Pattern;


@Controller
@RequestMapping("/service")
public class CustomerController {
    private Log logger = LogFactory.getLog(RoomController.class);

    @Autowired
    private CustomerService customerService;

//    @RequestMapping(value="/notice", method= RequestMethod.GET)
//    public ModelAndView noticeList(){
//        ModelAndView mav = new ModelAndView();
//        List<NoticeVO> noticeList = customerService.getNoticeList(1);
//        mav.addObject("noticeList", noticeList);
//        mav.setViewName("notice");
//
//        return mav;
//    }

    //    ======================================작업중======================================

    @RequestMapping(value="/notice", method= RequestMethod.GET)
    public ModelAndView noticeList(@RequestParam int page){
        ModelAndView mav = new ModelAndView();
        int total = customerService.getNoticeButtonCnt();
        List<NoticeVO> noticeList = customerService.getNoticeList(page);

        int startpage = 1;
        if(total > 5){
            if(page > 3) startpage = page - 2;
            if(page >= total-2) startpage = total - 4;
        }

//        System.out.println(startpage +", "+ page +", "+total);
        mav.addObject("curpage", page);
        mav.addObject("startpage", startpage);
        mav.addObject("total", total);
        mav.addObject("noticeList", noticeList);
        mav.setViewName("notice");

        return mav;
    }

//    ======================================작업중======================================

    @RequestMapping(value="/notice/{notice_id}", method= RequestMethod.GET)
    public ModelAndView noticeView(@PathVariable("notice_id") String id){
        ModelAndView mav = new ModelAndView();
        NoticeVO noticeVO = customerService.getNoticeDetail(Integer.parseInt(id));
        mav.addObject("noticeVO", noticeVO);
        mav.setViewName("noticeView");

        return mav;
    }

    @RequestMapping(value="/faq", method= RequestMethod.GET)
    public ModelAndView faqList(@RequestParam int page){
        ModelAndView mav = new ModelAndView();
        int total = customerService.getFaqButtonCnt();
        List<FaqVO> faqList = customerService.getFaqList(page);
        int startpage = 1;
        if(total > 5){
            if(page > 3) startpage = page - 2;
            if(page >= total-2) startpage = total - 4;
        }
        mav.addObject("curpage", page);
        mav.addObject("startpage", startpage);
        mav.addObject("total", total);
        mav.addObject("faqList", faqList);
        mav.setViewName("faq");

        return mav;
    }

    @RequestMapping(value="/faq/{faq_id}", method= RequestMethod.GET)
    public ModelAndView faqList(@PathVariable("faq_id") String id){
        ModelAndView mav = new ModelAndView();
        if(id == null){
            List<FaqVO> faqList = customerService.getFaqList(1);
            mav.addObject("faqList", faqList);
            mav.setViewName("faq");
        }else{
            FaqVO faqVO = customerService.getFaqDetail(Integer.parseInt(id));
            mav.addObject("faqVO", faqVO);
            mav.setViewName("faqView");
        }
        return mav;
    }

    @RequestMapping(value = "/support", method = RequestMethod.GET)
    public String inquiry(){
        return "inquiry";
    }

    @RequestMapping("/terms")
    public String terms(){
        return "terms";
    }

    @RequestMapping(value = "/support", method = RequestMethod.POST)
    public void inquiry(@RequestParam("emailId") String emailId,
                        @RequestParam("emailDomain") String emailDomain,
                        @RequestParam("content") String content,
                        @RequestParam("agree") boolean agree,
                        HttpServletResponse response) throws IOException {

        JSONObject jobj = new JSONObject();
        String email = emailId + "@" + emailDomain;
        String emailRegExp = "^[a-z0-9_]{5,20}@[a-z]{2,15}\\.(com|net|co.kr|ac.kr|kr)$";

        if (!agree || content == null || content.trim().equals("")) {
            jobj.put("inquiryResult", "VALIDATE_FAIL");
        }
        else if (Pattern.matches(emailRegExp, email)) {
            int result = customerService.addInquiry(email, content);
            if (result > 0) { // 문의 등록 성공
                jobj.put("inquiryResult", "SUCCESS");
            } else {
                jobj.put("inquiryResult", "INQUIRY_FAIL");
            }
        }
        else {
            jobj.put("inquiryResult", "VALIDATE_FAIL");
        }

        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(jobj);
    }

    @RequestMapping(value = "change-process-status", method = RequestMethod.POST)
    public void changeProcessStatus(@RequestParam int id,
                                    @RequestParam String processStatus,
                                    HttpServletResponse response) throws IOException {
        logger.info("change process status method entered...");
        JSONObject res = new JSONObject();

        if(customerService.changeProcessStatus(id, processStatus) > 0){
            res.put("result", "SUCCESS");
        } else {
            res.put("result", "FAIL");
        }

        response.setContentType("application/json; charset=utf-8;");
        response.getWriter().print(res);
    }

}
