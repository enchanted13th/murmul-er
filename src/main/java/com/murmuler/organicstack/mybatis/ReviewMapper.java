package com.murmuler.organicstack.mybatis;


import com.murmuler.organicstack.vo.LocationVO;
import com.murmuler.organicstack.vo.ReviewVO;

import java.util.List;
import java.util.Map;

public interface ReviewMapper {
    List<ReviewVO> selectReviewList(int page);
    int selectReviewButtonCnt();
    int insertLocation(LocationVO locationVO);
    int selectOneRecentLocation();
    int insertReview(ReviewVO reviewVO);
    int selectReviewTotalCnt();

    int selectOneRecentReview();
    int insertReviewHashtag(Map<String, Object> map);
    List<String> selectHashTag(int reviewId);
}
