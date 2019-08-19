package com.murmuler.organicstack.service;

import com.murmuler.organicstack.dao.ReportDAO;
import com.murmuler.organicstack.util.ProcessStatusRecord;
import com.murmuler.organicstack.util.ReportTypeRecord;
import com.murmuler.organicstack.vo.ProcessStatusVO;
import com.murmuler.organicstack.vo.ReportViewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportDAO dao;
    @Autowired
    private ReportTypeRecord reportTypeRecord;
    @Autowired
    private ProcessStatusRecord processStatusRecord;

    public int addReport(int roomId, String reportType, String content){
        int reportTypeId = reportTypeRecord.getId(reportType);
        return dao.insertReport(roomId, reportTypeId, content);
    }

    @Override
    public List<ReportViewVO> getAllReports() {
        return dao.selectAllReports();
    }

    @Override
    public int removeMultiReport(Map<String, Object> idMap) {
        return dao.deleteMultiReport(idMap);
    }

    @Override
    public int changeProcessStatus(int id, String processStatus) {
        int processId = processStatusRecord.getId(processStatus);
        return dao.updateProcessStatus(id, processId);
    }
}
