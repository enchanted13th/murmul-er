package com.murmuler.organicstack.service;

import com.murmuler.organicstack.vo.ReviewVO;

import java.util.List;
import java.util.Map;

public interface ReviewService {
    public List<ReviewVO> getReviewList(int pageNum);
    public int getReviewButtonCnt();
    public int addLocation(Map<String, String> locationInfo);
    public int addReview(ReviewVO reviewVO);
    public int getReviewTotalCnt();
}
