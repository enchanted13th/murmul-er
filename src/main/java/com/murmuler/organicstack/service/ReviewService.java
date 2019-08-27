package com.murmuler.organicstack.service;

import com.murmuler.organicstack.vo.ReviewVO;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface ReviewService {
    public ReviewVO getReviewListByReviewId(int reviewId);
    public List<ReviewVO> getReviewList(int pageNum);
    public List<ReviewVO> getStarOrder(int pageNum);
    public List<ReviewVO> getNoiseOrder(int pageNum);
    public List<ReviewVO> getInsectOrder(int pageNum);
    public List<ReviewVO> getAllReviewList();
    public int getReviewButtonCnt();
    public int addLocation(Map<String, String> locationInfo);
    public int addReview(ReviewVO reviewVO);
    public int getReviewTotalCnt();
    public int addImg(int reviewId, String image);

    int removeMultiReivew(Map<String, Object> idMap);

    boolean isThisWhoRegisteredRoom(int memberId);
}
