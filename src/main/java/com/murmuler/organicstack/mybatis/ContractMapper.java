package com.murmuler.organicstack.mybatis;

import com.murmuler.organicstack.vo.ContractVO;

import java.util.List;
import java.util.Map;

public interface ContractMapper {
    int insertContract(ContractVO contractVO);
    int insertContractList(Map<String, Object> map);
    List<ContractVO> selectMyContracts(int memberId);
    String selectAddressByRoomId(int roomId);
    String selectRentTypeByRoomId(int roomId);
    String selectContractImageById(int contractId);
}
