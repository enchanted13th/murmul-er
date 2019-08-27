package com.murmuler.organicstack.service;

import com.murmuler.organicstack.vo.ContractVO;

import java.util.List;

public interface ContractService {

    int registerContract(ContractVO contract);

    List<ContractVO> getMyContracts(int memberId);

    String getContractImageById(int contractId);

    boolean isMyContract(int memberId, int contractId);
}
