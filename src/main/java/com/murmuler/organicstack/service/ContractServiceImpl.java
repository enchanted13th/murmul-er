package com.murmuler.organicstack.service;

import com.murmuler.organicstack.dao.ContractDAO;
import com.murmuler.organicstack.vo.ContractVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractServiceImpl implements ContractService {

    @Autowired
    private ContractDAO dao;

    @Override
    public int registerContract(ContractVO contract) {
        return dao.insertContract(contract);
    }
}
