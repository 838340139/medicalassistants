package com.hnu.blockchainlab.medicalassistants.libbean.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class QueryPresPage {

    private List<Long> idList;

    private String keyword;

    private String IDnumber;

}
