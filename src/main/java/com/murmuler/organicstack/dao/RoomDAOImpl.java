package com.murmuler.organicstack.dao;

import com.murmuler.organicstack.mybatis.RoomMapper;
import com.murmuler.organicstack.vo.*;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class RoomDAOImpl implements RoomDAO {
    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<RoomSummaryVO> selectRoomSummaryByLocation(Map<String, Object> map) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        List<RoomSummaryVO> list = mapper.selectRoomSummaryByLocation(map);
        for(int i = 0; i < list.size(); i++){
            int room_id = list.get(i).getRoomId();
            list.get(i).setRoomImg(mapper.selectRoomImgOne(room_id));
        }
        return list;
    }

    @Override
    public RoomDetailVO selectRoomDetailByRoomId(Map<String, Integer> map) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        RoomDetailVO roomDetailVO = mapper.selectRoomDetailByRoomId(map);
        return roomDetailVO;
    }

    @Override
    public List<Integer> selectRoomOptionByRoomId(Map<String, Integer> map) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        return mapper.selectRoomOptionByRoomId(map);
    }

    @Override
    public List<Integer> selectRoomManageByRoomId(Map<String, Integer> map) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        return mapper.selectRoomManageByRoomId(map);
    }

    @Override
    public List<String> selectRoomHashtagByRoomId(Map<String, Integer> map) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        return mapper.selectRoomHashtagByRoomId(map);
    }

    @Override
    public List<String> selectRoomImgUrlByRoomId(Map<String, Integer> map) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        return mapper.selectRoomImgUrlByRoomId(map);
    }

    @Override
    public List<RoomSummaryVO> selectMyRooms(int id) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);

        List<RoomSummaryVO> list = mapper.selectMyRoomById(id);

        for(int i = 0; i < list.size(); i++){
            int room_id = list.get(i).getRoomId();
            list.get(i).setRoomImg(mapper.selectRoomImgOne(room_id));
        }
        return list;
    }

    @Override
    public List<RoomSummaryVO> selectRoomByRoomIds(List<Integer> ids) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        List<RoomSummaryVO> list = mapper.selectRoomByRoomIds(ids);
        for(int i = 0; i < list.size(); i++){
            int room_id = list.get(i).getRoomId();
            list.get(i).setRoomImg(mapper.selectRoomImgOne(room_id));
        }
        return list;
    }

    @Override
    public List<RoomSummaryVO> selectRoomByLikes(Map<String, Integer> map) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        List<RoomSummaryVO> list = mapper.selectRoomByLikes(map);
        for(int i = 0; i < list.size(); i++){
            int room_id = list.get(i).getRoomId();
            list.get(i).setRoomImg(mapper.selectRoomImgOne(room_id));
        }
        return list;
    }

    @Override
    public Map<String, Object> selectRoomInfo(int roomId) {
        if(roomId <= 0)
            return null;

        Map<String, Object> paramMap = new HashMap<String, Object>();
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        int locationId = mapper.selectLocationIdByRoomId(roomId);
        Map<String, Integer> map = new HashMap<>();
        map.put("roomId", roomId);

        paramMap.put("locationVO", mapper.selectRoomLocation(locationId));
        paramMap.put("roomVO", mapper.selectRoomInfo(roomId));
        paramMap.put("saleVO", mapper.selectRoomSaleInfo(roomId));
        paramMap.put("option", mapper.selectRoomOptionByRoomId(map));
        paramMap.put("hashtag", mapper.selectRoomHashtagByRoomId(map));
        paramMap.put("manageCost", mapper.selectRoomManageByRoomId(map));
        paramMap.put("images", mapper.selectRoomImgUrlByRoomId(map));
        return paramMap;
    }

    @Override
    public int selectLocationIdByRoomId(int roomId) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        return mapper.selectLocationIdByRoomId(roomId);
    }

    @Override
    public int insertRoom(LocationVO locationVO, RoomVO roomVO, SaleInfoVO saleInfoVO) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        mapper.insertLocation(locationVO);
        int locationId = mapper.selectOneRecentLocation();
        roomVO.setLocationId(locationId);
        mapper.insertRoom(roomVO);
        int roomId = mapper.selectOneRecentRoom();
        saleInfoVO.setRoomId(roomId);
        mapper.insertSaleInfo(saleInfoVO);
        return roomId;
    }

    @Override
    public int insertRoomManageCost(int roomId, int[] manageIdList) {
        RoomMapper mapper = sqlSession.getMapper((RoomMapper.class));
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("roomId", roomId);
        paramMap.put("manageIdList", manageIdList);
        return mapper.insertRoomManageCost(paramMap);
    }

    @Override
    public int insertRoomOption(int roomId, int[] optionIdList) {
        RoomMapper mapper = sqlSession.getMapper((RoomMapper.class));
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("roomId", roomId);
        paramMap.put("optionIdList", optionIdList);
        return mapper.insertRoomOption(paramMap);
    }

    @Override
    public int insertRoomHashtag(int roomId, String[] hashtagList) {
        RoomMapper mapper = sqlSession.getMapper((RoomMapper.class));
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("roomId", roomId);
        paramMap.put("hashtagList", hashtagList);
        return mapper.insertRoomHashtag(paramMap);
    }

    @Override
    public int insertRoomImage(int roomId, String[] imgUrlList) {
        RoomMapper mapper = sqlSession.getMapper((RoomMapper.class));
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("roomId", roomId);
        paramMap.put("imgUrlList", imgUrlList);
        return mapper.insertRoomImage(paramMap);
    }

    @Override
    public int updateRoom(LocationVO locationVO, RoomVO roomVO, SaleInfoVO saleInfoVO, String isNotChangeAddr, String isNotChangeDtAddr) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        int result = 1;

        if(isNotChangeAddr.equals("false")){
            result &= mapper.updateLocation(locationVO);
        }
        else {
            System.out.println("In DAO locaionVO.getdetailAddr: "+ locationVO.getDetailAddr());
            System.out.println("locationVO: "+ locationVO);
            if(isNotChangeDtAddr.equals("false"))
                result &= mapper.updateDetailLocation(locationVO);
        }
        result &= mapper.updateRoom(roomVO);
        result &= mapper.updateSale(saleInfoVO);
        return result;
    }

    @Override
    public int updateViews(Map<String, Integer> map) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        return mapper.updateViews(map);
    }

    @Override
    public int updatePostType(Map<String, Integer> map) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        return mapper.updatePostType(map);
    }

    @Override
    public int deleteManageCost(int roomId, int[] manageIdList) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        return mapper.deleteManageCost(roomId);
    }

    @Override
    public int deleteOption(int roomId, int[] optionIdList) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        return mapper.deleteOption(roomId);
    }

    @Override
    public int deleteHashtag(int roomId, String[] hashtagList) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        return (mapper.deleteHashtag(roomId) >= 1 ? 1: 0);
    }


    public int deleteRoomImage(int roomId, String[] imgUrlList) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        return (mapper.deleteRoomImg(roomId) >= 1 ? 1: 0);
    }

    @Override
    public int deleteRoom(int roomId) {
        RoomMapper mapper = sqlSession.getMapper(RoomMapper.class);
        int cnt = mapper.deleteRoom(roomId);
        return cnt;
    }

}
