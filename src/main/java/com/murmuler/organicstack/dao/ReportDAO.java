package com.murmuler.organicstack.dao;

public interface ReportDAO {
    int insertReport(int roomId, int reportTypeId, String content);
}
