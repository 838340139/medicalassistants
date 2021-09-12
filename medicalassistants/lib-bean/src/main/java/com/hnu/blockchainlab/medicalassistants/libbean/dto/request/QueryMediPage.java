package com.hnu.blockchainlab.medicalassistants.libbean.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class QueryMediPage {

    private List<Long> idList;

    private String keyword;

    private String mIDNumber;

}
