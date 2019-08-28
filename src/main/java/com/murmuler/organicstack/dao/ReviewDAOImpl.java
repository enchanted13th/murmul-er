package com.murmuler.organicstack.dao;

import com.murmuler.organicstack.mybatis.ReviewMapper;
import com.murmuler.organicstack.mybatis.RoomMapper;
import com.murmuler.organicstack.vo.LocationVO;
import com.murmuler.organicstack.vo.ReviewVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ReviewDAOImpl implements ReviewDAO {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public ReviewVO searchReviewListByReviewId(int reviewId) {
        ReviewMapper mapper = sqlSession.getMapper(ReviewMapper.class);
        ReviewVO reviewVO = mapper.selectReviewListByReviewId(reviewId);
        return reviewVO;
    }

    @Override
    public List<ReviewVO> searchReviewList(int page) {
        ReviewMapper mapper = sqlSession.getMapper(ReviewMapper.class);
        List<ReviewVO> list = mapper.selectReviewList(page);
        return list;
    }

    @Override
    public List<ReviewVO> searchStarOrder(int page) {
        ReviewMapper mapper = sqlSession.getMapper(ReviewMapper.class);
        List<ReviewVO> list = mapper.selectStarOrder(page);
        return list;
    }

    @Override
    public List<ReviewVO> searchNoiseOrder(int page) {
        ReviewMapper mapper = sqlSession.getMapper(ReviewMapper.class);
        List<ReviewVO> list = mapper.selectNoiseOrder(page);
        return list;
    }

    @Override
    public List<ReviewVO> searchInsectOrder(int page) {
        ReviewMapper mapper = sqlSession.getMapper(ReviewMapper.class);
        List<ReviewVO> list = mapper.selectInsectOrder(page);
        return list;
    }

    @Override
    public int searchReviewButtonCnt() {
        ReviewMapper mapper = sqlSession.getMapper(ReviewMapper.class);
        int cnt = mapper.selectReviewButtonCnt();
        return cnt;
    }

    @Override
    public List<ReviewVO> selectAllReviewList() {
        ReviewMapper mapper = sqlSession.getMapper(ReviewMapper.class);
        List<ReviewVO> list = mapper.selectAllReviewList();
        return list;
    }

    @Override
    synchronized public int insertLocation(LocationVO locationVO) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        int result = mapper.insertLocation(locationVO);
        if (result == 0) return 0;
        else return locationVO.getId();
    }

    @Override
    synchronized public int insertReview(ReviewVO reviewVO) {
        ReviewMapper mapper = sqlSession.getMapper(ReviewMapper.class);
        int res = mapper.insertReview(reviewVO);
        if(res > 0){
            //int reviewId = mapper.selectOneRecentReview();
            int reviewId = reviewVO.getId();
            res = reviewId;
//            System.out.println("hash: "+reviewVO.getHashTagList());
            if(reviewVO.getHashTagList() != null) {
                insertReviewHashtag(reviewId, reviewVO.getHashTagList());
            }
        }
        return res;
    }

    @Override
    public int searchReviewTotalCnt() {
        ReviewMapper mapper = sqlSession.getMapper(ReviewMapper.class);
        int cnt = mapper.selectReviewTotalCnt();
        return cnt;
    }

    @Override
    synchronized public void insertReviewHashtag(int reviewId, ArrayList<String> hashtagList) {
        ReviewMapper mapper = sqlSession.getMapper(ReviewMapper.class);
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("reviewId", reviewId);
        paramMap.put("hashtagList", hashtagList);
        mapper.insertReviewHashtag(paramMap);
    }

    @Override
    public List<String> serachHashTag(int reviewId) {
        ReviewMapper mapper = sqlSession.getMapper(ReviewMapper.class);
        List<String> list = mapper.selectHashTag(reviewId);
        return list;
    }

    @Override
    synchronized public int insertReviewImage(int reviewId, String image){
        ReviewMapper mapper = sqlSession.getMapper(ReviewMapper.class);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("reviewId", reviewId);
        paramMap.put("image", image);
        return mapper.insertReviewImage(paramMap);
    }

    @Override
    synchronized public int deleteMultiReview(Map<String, Object> idMap) {
        ReviewMapper mapper = sqlSession.getMapper(ReviewMapper.class);
        return mapper.deleteMultiReview(idMap);
    }

    @Override
    public List<ReviewVO> selectReviewListByMemberId(int memberId) {
        ReviewMapper mapper = sqlSession.getMapper(ReviewMapper.class);
        return mapper.selectReviewListByMemberId(memberId);
    }
}
