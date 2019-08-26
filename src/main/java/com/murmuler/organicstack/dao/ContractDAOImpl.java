package com.murmuler.organicstack.dao;

import com.murmuler.organicstack.mybatis.ContractMapper;
import com.murmuler.organicstack.mybatis.RoomMapper;
import com.murmuler.organicstack.vo.ContractVO;
import com.murmuler.organicstack.vo.LocationVO;
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
    synchronized public int insertContract(ContractVO contractVO) {
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

    @Override
    public List<ContractVO> selectMyContracts(int memberId) {
        ContractMapper mapper = sqlSession.getMapper(ContractMapper.class);
        List<ContractVO> myContracts = mapper.selectMyContracts(memberId);
        if(myContracts == null)
            return null;
        for(int i = 0; i < myContracts.size(); i++) {
            int roomId = myContracts.get(i).getRoomId();
            String address = mapper.selectAddressByRoomId(roomId);
            String rentType = mapper.selectRentTypeByRoomId(roomId);
            myContracts.get(i).setAddress(address);
            myContracts.get(i).setRentType(rentType);
        }
        return myContracts;
    }

    @Override
    public String selectContractImageById(int contractId) {
        ContractMapper mapper = sqlSession.getMapper(ContractMapper.class);
        return mapper.selectContractImageById(contractId);
    }
}
