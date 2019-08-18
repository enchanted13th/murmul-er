package com.murmuler.organicstack.mybatis;

import com.murmuler.organicstack.vo.*;

import java.util.List;

public interface UtilMapper {
    List<RoomTypeVO> selectRoomType();
    List<HeatingTypeVO> selectHeatingType();
    List<ManageCostVO> selectManageCost();
    List<OptionVO> selectRoomOption();
    List<PostStatusVO> selectPostStatusType();
    List<ProcessStatusVO> selectProcessStatusType();
    List<RentTypeVO> selectRentType();
    List<ReportTypeVO> selectReportType();
}
