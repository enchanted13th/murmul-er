package com.murmuler.organicstack.controller;


import com.murmuler.organicstack.service.MemberService;
import com.murmuler.organicstack.vo.MemberVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;


@Controller
@RequestMapping("/member")
public class MemberController {
    private Log logger = LogFactory.getLog(MemberController.class);

    @Autowired
    private MemberService service;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public void login(@RequestParam String id,
                      @RequestParam String pwd,
                      HttpServletRequest request,
                      HttpServletResponse response) throws IOException{
        logger.info("login method entered...");
        MemberVO member = service.login(id, pwd);
        JSONObject res = new JSONObject();

        if(member == null){
            res.put("loginResult", "WRONG_ID");
        }
        else if(member.getMemberId() == -1){
            res.put("loginResult", "WRONG_PWD");
        }
        else if(member.getMemberId() == 0){
            HttpSession session = request.getSession();
            session.setAttribute("admin", true);
            res.put("loginResult", "ADMIN_LOGIN");
        }
        else {
            HttpSession session = request.getSession();
            session.setAttribute("loginMember", member);
            res.put("loginResult", "SUCCESS");
            res.put("id", member.getMemberId());
            res.put("nick", member.getNickname());
        }
        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(res);
    }

    @RequestMapping("/logout")
    public String logout(HttpServletRequest request){
        logger.info("logout method entered...");
        request.getSession().invalidate();
        return "index";
    }

    @RequestMapping(value = "/join", method = RequestMethod.POST)
    public void join(@RequestParam String id,
                     @RequestParam String pwd,
                     @RequestParam String realname,
                     @RequestParam String nickname,
                     @RequestParam String email,
                     @RequestParam String phone,
                     HttpServletResponse response) throws IOException {
        logger.info("Joinfo > id : "+id+", pwd : "+pwd+", name : "+realname+", nick : "+nickname+
                ",\n\t email : "+email+", phone : "+phone);

        String gender = (int)(Math.random() * 2) == 0 ? "M" : "F";
        MemberVO member = new MemberVO(0, id, realname, gender, new Date(), phone, pwd, email, nickname);

        JSONObject res = new JSONObject();

        if(service.isDuplicatedId(id)) {
            res.put("joinResult", "ALREADY_EXIST");
        } else {
            int result = service.join(member);

            if(result > 0){
                res.put("joinResult", "SUCCESS");
            } else {
                res.put("joinResult", "JOIN_FAIL");
            }
        }

        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(res);
    }

    @RequestMapping(value = "/duplicateId", method = RequestMethod.POST)
    public void duplicateId(@RequestParam String id,
                            HttpServletResponse response) throws IOException{
        logger.info("duplicate id method entered...");
        boolean result = service.isDuplicatedId(id);
        JSONObject res = new JSONObject();
        res.put("isDuplicatedId", result);
        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(res);
    }

    @RequestMapping(value = "/change-pwd", method = RequestMethod.POST)
    public void changePwd(@RequestParam String curpwd,
                          @RequestParam String newpwd,
                          HttpServletRequest request,
                          HttpServletResponse response) throws IOException {
        logger.info("change password method entered...");
        HttpSession session = request.getSession();
        JSONObject res = new JSONObject();
        MemberVO member = (MemberVO)session.getAttribute("loginMember");
        if (member == null) {
            res.put("pwdResult", "CHANGE_FAIL");
//            System.out.println("member null..");
        } else {
            String pwd = member.getPwd();
            if (!pwd.equals(curpwd)) {
                res.put("pwdResult", "WRONG_CURPWD");
            } else {
                boolean result = service.changePassword(member.getMemberId(), newpwd);
                if (result) {
                    res.put("pwdResult", "SUCCESS");
                    member.setPwd(newpwd);
                    session.setAttribute("loginMember", member);
                } else {
                    res.put("pwdResult", "CHANGE_FAIL");
//                    System.out.println("update fail...");
                }
            }
        }
//        System.out.println(res.get("pwdResult"));
        response.setContentType("application/json; charset=utf-8");
        response.getWriter().print(res);
    }
}
