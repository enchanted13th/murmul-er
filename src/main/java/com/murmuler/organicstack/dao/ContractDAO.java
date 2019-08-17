package com.murmuler.organicstack.dao;

import com.murmuler.organicstack.vo.ContractVO;

import java.util.List;

public interface ContractDAO {
    int insertContract(ContractVO contract);

    List<ContractVO> selectMyContracts(int memberId);

    String selectContractImageById(int contractId);
}
