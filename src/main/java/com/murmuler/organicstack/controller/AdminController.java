package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.service.MemberService;
import com.murmuler.organicstack.vo.MemberVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private Log logger = LogFactory.getLog(MemberController.class);
    @Autowired
    private MemberService service;

    @RequestMapping("")
    public String home(){
        return "admin/home";
    }

    @RequestMapping("/logout")
    public String logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.invalidate();
        return "redirect:/";
    }

    @RequestMapping("/members")
    public ModelAndView showMemberList(){
        logger.info("called members method");
        List<MemberVO> list = service.getAllMembers();

        if( list == null ){
            logger.warn(String.format("list is null."));
        }

        ModelAndView mav = new ModelAndView();
        mav.setViewName("admin/members");
        mav.addObject("members", list);

        return mav;
    }

    @RequestMapping(value = "/deleteAll", method = RequestMethod.POST)
    public String deleteAll(@RequestParam String del_ids){
        logger.info("called delete All method");
        MemberVO delMember = new MemberVO();
        String[] ids = del_ids.split(",");
        delMember.setIds(ids);
        service.removeMultiMember(delMember);
        return "redirect:/admin/members";
    }
}
