package com.murmuler.organicstack.service;

import com.murmuler.organicstack.dao.ReviewDAO;
import com.murmuler.organicstack.vo.LocationVO;
import com.murmuler.organicstack.vo.ReviewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewDAO reviewDAO;

    @Override
    public List<ReviewVO> getReviewList(int pageNum) {
        int page = (pageNum-1)*3;
        List<ReviewVO> reviewVOList = reviewDAO.searchReviewList(page);
        List<String> hashTagList = new ArrayList<String>();
        for(ReviewVO rv : reviewVOList){
            hashTagList = reviewDAO.serachHashTag(rv.getId());
            rv.setHashTagList(new ArrayList<String>(hashTagList));
        }
        return reviewVOList;
    }

    @Override
    public List<ReviewVO> getStarOrder(int pageNum) {
        int page = (pageNum-1)*3;
        List<ReviewVO> reviewVOList = reviewDAO.searchStarOrder(page);
        List<String> hashTagList = new ArrayList<String>();
        for(ReviewVO rv : reviewVOList){
            hashTagList = reviewDAO.serachHashTag(rv.getId());
            rv.setHashTagList(new ArrayList<String>(hashTagList));
        }
        return reviewVOList;
    }

    @Override
    public List<ReviewVO> getNoiseOrder(int pageNum) {
        int page = (pageNum-1)*3;
        List<ReviewVO> reviewVOList = reviewDAO.searchNoiseOrder(page);
        List<String> hashTagList = new ArrayList<String>();
        for(ReviewVO rv : reviewVOList){
            hashTagList = reviewDAO.serachHashTag(rv.getId());
            rv.setHashTagList(new ArrayList<String>(hashTagList));
        }
        return reviewVOList;
    }

    @Override
    public List<ReviewVO> getInsectOrder(int pageNum) {
        int page = (pageNum-1)*3;
        List<ReviewVO> reviewVOList = reviewDAO.searchInsectOrder(page);
        List<String> hashTagList = new ArrayList<String>();
        for(ReviewVO rv : reviewVOList){
            hashTagList = reviewDAO.serachHashTag(rv.getId());
            rv.setHashTagList(new ArrayList<String>(hashTagList));
        }
        return reviewVOList;
    }

    @Override
    public int getReviewButtonCnt() {
        return reviewDAO.searchReviewButtonCnt();
    }

    @Override
    public int addLocation(Map<String, String> locationInfo) {
        LocationVO locationVO = new LocationVO();
        locationVO.setSido(locationInfo.get("sido"));
        locationVO.setSigungu(locationInfo.get("sigungu"));
        locationVO.setBname(locationInfo.get("bname"));
        locationVO.setBname1(locationInfo.get("bname1"));
        locationVO.setBname2(locationInfo.get("bname2"));
        locationVO.setJibun(locationInfo.get("jibun"));
        locationVO.setRoadName(locationInfo.get("roadName"));
        locationVO.setRoadJibun(locationInfo.get("roadJibun"));
        locationVO.setDetailAddr(locationInfo.get("detailAddr"));
        locationVO.setLatitude(new BigDecimal(locationInfo.get("latitude")));
        locationVO.setLongitude(new BigDecimal(locationInfo.get("longitude")));
        return reviewDAO.insertLocation(locationVO);
    }

    @Override
    public int addReview(ReviewVO reviewVO) {
        return reviewDAO.insertReview(reviewVO);
    }

    @Override
    public int getReviewTotalCnt() {
        return reviewDAO.searchReviewTotalCnt();
    }
}
