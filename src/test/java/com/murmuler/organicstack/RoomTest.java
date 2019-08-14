package com.murmuler.organicstack;

import com.murmuler.organicstack.dao.RoomDAO;
import com.murmuler.organicstack.service.RoomService;
import com.murmuler.organicstack.vo.RoomSummaryVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static junit.framework.TestCase.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "file:web/WEB-INF/dispatcher-servlet.xml",
        "file:web/WEB-INF/mybatis-config.xml"
})
@WebAppConfiguration
public class RoomTest {
    @Autowired
    private RoomDAO dao;
    @Autowired
    private RoomService roomService;

    @Test
    public void testGetMyRooms(){
        List<RoomSummaryVO> list = dao.selectMyRooms(16);
        for(RoomSummaryVO room : list){
            System.out.println(room);
        }
        assertNotNull(list);
    }

    @Test
    public void testGetMyRoomsFail(){
        List<RoomSummaryVO> list = dao.selectMyRooms(12);
//        System.out.println(list);
        assertEquals(0, list.size());
    }

    @Test
    public void testRemoveRoom(){
        assertTrue(dao.deleteRoom(51) > 0);
    }

    @Test
    public void registerRoomTest() {
        Map<String, String> roomInfo = new HashMap<>();
        roomInfo.put("sido", "서울시");
        roomInfo.put("sigungu", "관악구");
        roomInfo.put("bname", "봉천동");
        roomInfo.put("bname1", "bname1");
        roomInfo.put("bname2", "bname2");
        roomInfo.put("jibun", "jibun");
        roomInfo.put("roadName", "roadName");
        roomInfo.put("roadJibun", "roadJibun");
        roomInfo.put("detailAddr", "detailAddr");
        roomInfo.put("latitude", "1.0");
        roomInfo.put("longitude", "1.0");
        roomInfo.put("area", "1.0");
        roomInfo.put("floor", "1");
        roomInfo.put("heatType", "1");
        roomInfo.put("roomType", "OR");
        roomInfo.put("manageCost", "0");
        roomInfo.put("title", "title");
        roomInfo.put("rentType", "1");
        roomInfo.put("periodNum", "1");
        roomInfo.put("periodUnit", "Y");
        roomInfo.put("postType", "1");
        roomInfo.put("deposit", "1");
        roomInfo.put("monthlyCost", "1");
        roomInfo.put("hashtagExist", "Y");
        roomInfo.put("writeDate", "2019-00-00");
        roomInfo.put("views", "0");
        roomInfo.put("detailExplain", "detailExplain");
        roomInfo.put("memberId", "1");
        roomInfo.put("manageIdList", "가스비,수도세,전기세");
        roomInfo.put("optionList", "냉장고,에어컨,가스레인지");
        roomInfo.put("hashTagList", "1,2");
        roomInfo.put("imgUrlList", "1,2");
        assertTrue(roomService.addRoom(roomInfo) >= 1);
    }

    @Test
    public void addRoomManageCostTest() {
        assertTrue(dao.insertRoomManageCost(87, new int[] {1, 2, 3}) >= 1);
    }

    @Test
    public void addRoomOptionTest() {
        assertTrue(dao.insertRoomOption(58, new int[] {1, 2, 3}) >= 1);
    }

    @Test
    public void addRoomHashtagTest() {
        assertTrue(dao.insertRoomHashtag(58, new String[] {"서울대입구역", "원룸"}) >= 1);
    }

//    @Test
//    public void addRoomImageTest() {
//        assertTrue(dao.insertRoomImage(58, new String[] {"url1", "url2"}) >= 1);
//    }

    @Test
    public void removeRoomManageCostTest(){
        assertTrue(dao.deleteManageCost(58, new int[] {1, 2, 3}) >= 1);
    }

    @Test
    public void removeRoomOptionTest() {
        assertTrue(dao.deleteOption(58, new int[] {1, 2, 3} ) >= 1);
    }

    @Test
    public void removeRoomHashtageTest() {
        assertTrue(dao.deleteHashtag(58, new String[] {"서울대입구역", "원룸"}) >= 1);
    }

    @Test
    public void removeRoomImageTest() {
        assertTrue(dao.deleteRoomImage(58, new String[] {"url1", "url2"}) >= 1 );
    }


    @Test
    public void updateRoomTest() {
        Map<String, String> roomInfo = new HashMap<>();
        roomInfo.put("locationId", "104");
        roomInfo.put("roomId","101");
        roomInfo.put("sido", "대전광역시");
        roomInfo.put("sigungu", "남동구");
        roomInfo.put("bname", "학익동");
        roomInfo.put("bname1", "bname1");
        roomInfo.put("bname2", "bname2");
        roomInfo.put("jibun", "jibun");
        roomInfo.put("roadName", "roadName");
        roomInfo.put("roadJibun", "roadJibun");
        roomInfo.put("detailAddr", "detailAddr");
        roomInfo.put("latitude", "1.0");
        roomInfo.put("longitude", "1.0");
        roomInfo.put("area", "1.0");
        roomInfo.put("floor", "1");
        roomInfo.put("heatType", "1");
        roomInfo.put("roomType", "OR");
        roomInfo.put("manageCost", "0");
        roomInfo.put("title", "title");
        roomInfo.put("rentType", "1");
        roomInfo.put("periodNum", "1");
        roomInfo.put("periodUnit", "Y");
        roomInfo.put("postType", "1");
        roomInfo.put("deposit", "1");
        roomInfo.put("monthlyCost", "1");
        roomInfo.put("hashtagExist", "Y");
        roomInfo.put("writeDate", "2019-00-00");
        roomInfo.put("views", "0");
        roomInfo.put("detailExplain", "detailExplain");
        roomInfo.put("memberId", "1");
        roomInfo.put("manageIdList", "가스비,수도세");
        roomInfo.put("optionList", "냉장고,에어컨");
        roomInfo.put("hashTagList", "1, 2");
        roomInfo.put("imgUrlList", "1, 2");
        roomService.modifyRoom(roomInfo);
    }

    @Test
    public void selectRoomByLocationTest() {
        Map<String, Object> mapParam = new HashMap<>();
        mapParam.put("page", 1);
        mapParam.put("latitude", new BigDecimal(37.48481100000000));
        mapParam.put("longitude", new BigDecimal(126.92691109999998));
        System.out.println(roomService.getRoomsByLocation(mapParam));
    }

    @Test
    public void selectRoomDetailTest() {
        Map<String, Integer> paramMap = new HashMap<>();
        paramMap.put("roomId", 3);
        System.out.println(roomService.getRoomDetailByRoomId(paramMap));
    }

    @Test
    public void deleteRoomTest() {
        int roomId = 103;
        int result = dao.deleteRoom(roomId);
        assertTrue(result > 0);
    }

}
