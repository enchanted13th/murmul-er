//package com.murmuler.organicstack.controller;
//
//import com.murmuler.organicstack.service.ContractService;
//import org.json.simple.JSONObject;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Controller
//@RequestMapping("/contract")
//public class ContractController {
//    @Autowired
//    private ContractService contractService;
//
//    @RequestMapping(value = "")
//    public String addContract(){
//        return "contractForm";
//}
//
//    @RequestMapping(value = "/show", method= RequestMethod.POST)
//    public void adContract(@RequestParam String contractData,
//                           HttpServletResponse response) throws IOException {
//        System.out.println("contractData: "+ contractData);
//        JSONObject obj = new JSONObject();
//        obj.put("data", "success");
//        response.getWriter().print(obj);
//    }
//}
