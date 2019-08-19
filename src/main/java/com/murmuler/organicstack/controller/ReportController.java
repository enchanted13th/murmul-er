package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.service.ReportService;
import com.murmuler.organicstack.vo.MemberVO;
import com.murmuler.organicstack.vo.RoomSummaryVO;
import com.sun.deploy.net.HttpResponse;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/report")
public class ReportController {
    private Log logger = LogFactory.getLog(ReportController.class);

    @Autowired
    private ReportService reportService;

    /* ----- 신고 등록 ----- */
    @RequestMapping(value = "", method = RequestMethod.POST)
    public void report(@RequestParam String type,
                       @RequestParam String content,
                       @RequestParam int roomId,
                       HttpServletResponse response) throws IOException {

        logger.info("called report method");
        JSONObject res = new JSONObject();
        if(reportService.addReport(roomId, type, content) > 0){
            res.put("addReport", "SUCCESS");
        } else {
            res.put("addReport", "FAIL");
        }

        response.setContentType("text/html; charset=utf-8;");
        response.getWriter().print(res);
    }

    @RequestMapping(value = "change-process-status", method = RequestMethod.POST)
    public void changeProcessStatus(@RequestParam int id,
                                    @RequestParam String processStatus,
                                    HttpServletResponse response) throws IOException {
        logger.info("change process status method entered...");
        JSONObject res = new JSONObject();

        if(reportService.changeProcessStatus(id, processStatus) > 0){
            res.put("result", "SUCCESS");
        } else {
            res.put("result", "FAIL");
        }

        response.setContentType("application/json; charset=utf-8;");
        response.getWriter().print(res);
    }
}