//package com.murmuler.organicstack;
//
//import com.murmuler.organicstack.dao.ContractDAO;
//import com.murmuler.organicstack.vo.ContractVO;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.context.web.WebAppConfiguration;
//
//import java.sql.Date;
//
//import static org.springframework.test.util.AssertionErrors.assertTrue;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(locations = {
//        "file:web/WEB-INF/dispatcher-servlet.xml",
//        "file:web/WEB-INF/mybatis-config.xml"
//})
//@WebAppConfiguration
//public class ContractTest {
//    @Autowired
//    private ContractDAO contractDAO;
//
//    @Test
//    public void insertContractTest() {
//        int res = contractDAO.insertContract(new ContractVO(7, 247, 85, 84, "", new Date(1), "contract/10/format.png", ""));
//
//        assertTrue("실패",res == 1);
//    }
//}
