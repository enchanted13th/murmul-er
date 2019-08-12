package com.murmuler.organicstack.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/talk")
public class TalkController {
    private Log logger = LogFactory.getLog(TalkController.class);

    /*@Autowired
    private TalkService talkService;*/

    @RequestMapping(value = "", method = RequestMethod.GET)
    public String showTalk() {
        return "talk";
    }

}
