package com.murmuler.organicstack.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
    private Log logger = LogFactory.getLog(MainController.class);

    @RequestMapping("/")
    public String home() {
        logger.info("called home method");
        return "index";
    }
}

