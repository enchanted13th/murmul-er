package com.murmuler.organicstack.mybatis;


import com.murmuler.organicstack.vo.LocationVO;
import com.murmuler.organicstack.vo.ReviewVO;

import java.util.List;
import java.util.Map;

public interface ReviewMapper {
    ReviewVO selectReviewListByReviewId(int reviewId);
    List<ReviewVO> selectReviewList(int page);
    List<ReviewVO> selectStarOrder(int page);
    List<ReviewVO> selectNoiseOrder(int page);
    List<ReviewVO> selectInsectOrder(int page);
    List<ReviewVO> selectAllReviewList();
    int selectReviewButtonCnt();
    int insertLocation(LocationVO locationVO);
    int selectOneRecentLocation();
    int insertReview(ReviewVO reviewVO);
    int selectReviewTotalCnt();
    int selectOneRecentReview();
    int insertReviewImage(Map<String, Object> map);
    int insertReviewHashtag(Map<String, Object> map);
    List<String> selectHashTag(int reviewId);

    int deleteMultiReview(Map<String, Object> idMap);

    List<ReviewVO> selectReviewListByMemberId(int memberId);
}
