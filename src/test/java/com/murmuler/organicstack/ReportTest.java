package com.murmuler.organicstack;

import com.murmuler.organicstack.dao.ReportDAO;
import com.murmuler.organicstack.service.ReportService;
import com.murmuler.organicstack.util.ReportTypeRecord;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "file:web/WEB-INF/dispatcher-servlet.xml",
        "file:web/WEB-INF/mybatis-config.xml"
})
@WebAppConfiguration
public class ReportTest {
    @Autowired
    private ReportDAO dao;
    @Autowired
    private ReportTypeRecord reportTypeRecord;

    @Test
    public void selectReportTypeRecordTest(){
//        System.out.println(reportTypeRecord);
        reportTypeRecord.initReportType();
        int reportTypeId = reportTypeRecord.getId("정보가 다른 매물");
//        System.out.println("reportTypeId : " + reportTypeId);
        assertEquals(2, reportTypeId);
    }

    @Test
    public void insertReportTest(){
        assertTrue(dao.insertReport(58, 2, "08/03 16:33 test") > 0);
    }

}
