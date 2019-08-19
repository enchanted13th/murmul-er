package com.murmuler.organicstack.mybatis;

import com.murmuler.organicstack.vo.ReportViewVO;

import java.util.List;
import java.util.Map;

public interface ReportMapper {
    List<ReportViewVO> selectAllReports();
    int insertReport(Map<String, Object> map);
    int deleteMultiReport(Map<String, Object> idMap);
    int updateProcessStatus(Map<String, Integer> map);
}
