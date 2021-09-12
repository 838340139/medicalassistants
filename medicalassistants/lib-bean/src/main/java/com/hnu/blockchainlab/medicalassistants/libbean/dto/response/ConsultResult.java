package com.hnu.blockchainlab.medicalassistants.libbean.dto.response;

import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Answer;
import com.hnu.blockchainlab.medicalassistants.libbean.entity.sys.Question;
import lombok.Data;

import java.util.List;

@Data
public class ConsultResult {

    private Question question;

    private List<Answer> answers;
}
