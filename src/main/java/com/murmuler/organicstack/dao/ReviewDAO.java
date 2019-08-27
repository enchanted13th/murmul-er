package com.murmuler.organicstack.dao;

import com.murmuler.organicstack.vo.LocationVO;
import com.murmuler.organicstack.vo.ReviewVO;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface ReviewDAO {
    ReviewVO searchReviewListByReviewId(int reviewId);
    List<ReviewVO> searchReviewList(int page);
    List<ReviewVO> searchStarOrder(int page);
    List<ReviewVO> searchNoiseOrder(int page);
    List<ReviewVO> searchInsectOrder(int page);
    List<ReviewVO> selectAllReviewList();
    int searchReviewButtonCnt();
    int insertLocation(LocationVO locationVO);
    int insertReview(ReviewVO reviewVO);
    int searchReviewTotalCnt();
    void insertReviewHashtag(int roomId, ArrayList<String> hashtagList);
    List<String> serachHashTag(int reviewId);
    int insertReviewImage(int roomId, String image);

    int deleteMultiReview(Map<String, Object> idMap);

    List<ReviewVO> selectReviewListByMemberId(int memberId);
}
