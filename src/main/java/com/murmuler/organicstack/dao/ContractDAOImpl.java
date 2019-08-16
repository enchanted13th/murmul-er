package com.murmuler.organicstack.dao;

import com.murmuler.organicstack.mybatis.ContractMapper;
import com.murmuler.organicstack.vo.ContractVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ContractDAOImpl implements ContractDAO {
    @Autowired
    private SqlSession sqlSession;

    @Override
    public int insertContract(ContractVO contractVO) {
        ContractMapper mapper = sqlSession.getMapper(ContractMapper.class);
        if(mapper.insertContract(contractVO) == 0)
            return 0;
        int id = contractVO.getId();
        List<Integer> memberList = new ArrayList<>();
        memberList.add(contractVO.getSublessorId());
        memberList.add(contractVO.getSublesseeId());
        Map<String, Object> map = new HashMap<>();
        map.put("contractId", id);
        map.put("memberList", memberList);
        return mapper.insertContractList(map);
    }
}
