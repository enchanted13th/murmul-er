package com.murmuler.organicstack.mybatis;

import com.murmuler.organicstack.vo.ContractVO;

import java.util.List;
import java.util.Map;

public interface ContractMapper {
    int insertContract(ContractVO contractVO);
    int insertOnContractList(Map<String, Object> map);
}
