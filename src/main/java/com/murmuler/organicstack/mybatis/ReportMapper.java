package com.murmuler.organicstack.mybatis;

import java.util.List;
import java.util.Map;

public interface ReportMapper {
    List<Map<String, Object>> selectReportType();
    int insertReport(Map<String, Object> map);
}
