package com.murmuler.organicstack.service;

import com.murmuler.organicstack.vo.ReportViewVO;

import java.util.List;
import java.util.Map;

public interface ReportService {
    int addReport(int roomId, String reportType, String content);
    List<ReportViewVO> getAllReports();
    int removeMultiReport(Map<String, Object> idMap);
    int changeProcessStatus(int id, String processStatus);
}
