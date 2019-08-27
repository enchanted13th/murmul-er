package com.murmuler.organicstack.service;

import com.murmuler.organicstack.dao.ContractDAO;
import com.murmuler.organicstack.vo.ContractVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractServiceImpl implements ContractService {

    @Autowired
    private ContractDAO dao;

    @Override
    public int registerContract(ContractVO contract) {
        return dao.insertContract(contract);
    }

    @Override
    public List<ContractVO> getMyContracts(int memberId) {
        return dao.selectMyContracts(memberId);
    }

    @Override
    public String getContractImageById(int contractId) {
        return dao.selectContractImageById(contractId);
    }

    @Override
    public boolean isMyContract(int memberId, int contractId) {
        List<ContractVO> list = dao.selectMyContracts(memberId);
        for(ContractVO contract : list) {
            if(contract.getId() == contractId)
                return true;
        }
        return false;
    }
}
