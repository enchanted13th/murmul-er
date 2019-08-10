package com.murmuler.organicstack.service;

import com.murmuler.organicstack.dao.ReportDAO;
import com.murmuler.organicstack.util.ReportTypeRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportDAO reportDAO;
    @Autowired
    private ReportTypeRecord reportTypeRecord;

    public int addReport(int roomId, String reportType, String content){
        int reportTypeId = reportTypeRecord.getId(reportType);
        return reportDAO.insertReport(roomId, reportTypeId, content);
    }
}
