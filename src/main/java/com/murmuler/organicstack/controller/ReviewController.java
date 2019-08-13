package com.murmuler.organicstack.controller;

import com.murmuler.organicstack.service.ReviewService;
import com.murmuler.organicstack.vo.ReviewVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.util.*;

@Controller
@RequestMapping("/review")
public class ReviewController {
    Log logger = LogFactory.getLog(ReviewController.class);
    @Autowired
    private ReviewService reviewService;

    @RequestMapping(value="", method= RequestMethod.GET)
    public ModelAndView reviewList(@RequestParam int page,
                                   @RequestParam String order){
        ModelAndView mav = new ModelAndView();

        List<ReviewVO> reviewList = new ArrayList<>();
        switch (order){
            case "latest":
                reviewList = reviewService.getReviewList(page);
                break;
            case "star":
                reviewList = reviewService.getStarOrder(page);
                break;
            case "noise":
                reviewList = reviewService.getNoiseOrder(page);
                break;
            case "insect":
                reviewList = reviewService.getInsectOrder(page);
                break;
        }

        int total = reviewService.getReviewButtonCnt();
        int reviewCnt = reviewService.getReviewTotalCnt();

        int startpage = 1;
        if(total > 5){
            if(page > 3) startpage = page - 2;
            if(page >= total-2) startpage = total - 4;
        }

        System.out.println("정렬 : " + order);

        mav.addObject("curpage", page);
        mav.addObject("order", order);
        mav.addObject("startpage", startpage);
        mav.addObject("total", total);
        mav.addObject("reviewCnt", reviewCnt);
        mav.addObject("reviewList", reviewList);
        mav.setViewName("review");

        return mav;
    }

    @RequestMapping(value="/write", method= RequestMethod.GET)
    public String reviewWrite(){
        return "reviewWrite";
    }

    @RequestMapping(value = "/write", method = RequestMethod.POST)
    public void reviewWriteSubmit(@RequestParam("title") String title,
                                  @RequestParam("detailAddr") String detailAddr,
                                  @RequestParam("residencePeriod") String residencePeriod,
                                  @RequestParam("periodUnit") String periodUnit,
                                  @RequestParam("score") String score,
                                  @RequestParam("content") String content,
                                  @RequestParam("advantage") String advantage,
                                  @RequestParam("disadvantage") String disadvantage,
                                  @RequestParam("insectLevel") String insectLevel,
                                  @RequestParam("noiseLevel") String noiseLevel,
                                  @RequestParam("hashtagExist") String hashtagExist,
                                  @RequestParam("totAddr") String totAddr,
                                  @RequestParam("hashTag1") String hashTag1,
                                  @RequestParam("hashTag2") String hashTag2,
                                  @RequestParam("hashTag3") String hashTag3,
                                  HttpServletResponse response) throws IOException{
        ArrayList<String> hashTagList = new ArrayList<String>();
        if(!hashTag1.equals("")){
            hashTagList.add(hashTag1);
        }
        if(!hashTag2.equals("")){
            hashTagList.add(hashTag2);
        }
        if(!hashTag3.equals("")){
            hashTagList.add(hashTag3);
        }
        JSONObject json = (JSONObject) JSONValue.parse(totAddr);
        json.put("detailAddr", detailAddr);
        Map<String, String> locationInfo = new HashMap<String, String>();
        locationInfo.put("sido", (String)json.get("sido"));
        locationInfo.put("sigungu", (String)json.get("sigungu"));
        locationInfo.put("bname", (String)json.get("bname"));
        locationInfo.put("bname1", (String)json.get("bname1"));
        locationInfo.put("bname2", (String)json.get("bname2"));

        String jibunAddressEnglish = (String)json.get("jibunAddressEnglish");
        String[] jibunAddress =  jibunAddressEnglish.split(",");
        String jibun = jibunAddress[0];
        json.put("jibun",jibun);
        locationInfo.put("jibun", (String)json.get("jibun"));

        locationInfo.put("roadName", (String)json.get("roadname"));

        String roadAddressEnglish = (String)json.get("roadAddressEnglish");
        String[] roadAddress =  roadAddressEnglish.split(",");
        String roadJibun = roadAddress[0];
        json.put("roadJibun", roadJibun);
        locationInfo.put("roadJibun", (String)json.get("roadJibun"));

        locationInfo.put("detailAddr", (String)json.get("detailAddr"));
        locationInfo.put("latitude", (String)json.get("latitude"));
        locationInfo.put("longitude", (String)json.get("longitude"));

        int locationId = reviewService.addLocation(locationInfo);
        boolean hashTagExist = false;
        if(hashtagExist.equals("Y")){
            hashTagExist = true;
        }

        int res = reviewService.addReview(new ReviewVO(1, Date.valueOf("2019-08-11"), title,content,locationId,Integer.parseInt(residencePeriod),periodUnit,Integer.parseInt(score),advantage,disadvantage,insectLevel.charAt(0),noiseLevel.charAt(0),hashTagExist,"","","","","", hashTagList));
        JSONObject jObj = new JSONObject();
        if (res == 1) { // 문의 등록 성공
            jObj.put("reviewWriteResult", "SUCCESS");
        } else {
            jObj.put("reviewWriteResult", "WRITE_FAIL");
        }
        response.setContentType("text/html; charset=utf-8");
        response.getWriter().print(jObj);
    }
}
