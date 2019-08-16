package com.murmuler.organicstack.mybatis;

import com.murmuler.organicstack.vo.ContractVO;

import java.util.Map;

public interface ContractMapper {
    int insertContract(ContractVO contractVO);
    int insertContractList(Map<String, Object> map);
}
