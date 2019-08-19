package com.murmuler.organicstack.dao;

import com.murmuler.organicstack.vo.ReportViewVO;

import java.util.List;
import java.util.Map;

public interface ReportDAO {
    int insertReport(int roomId, int reportTypeId, String content);
    List<ReportViewVO> selectAllReports();
    int deleteMultiReport(Map<String, Object> idMap);
    int updateProcessStatus(int id, int processId);
}
