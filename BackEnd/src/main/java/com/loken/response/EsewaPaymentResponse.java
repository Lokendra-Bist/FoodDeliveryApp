package com.loken.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EsewaPaymentResponse {
	
	private String amount;

    private String taxAmount;

    private String totalAmount;

    private String transactionUuid;

    private String productCode;

    private String productServiceCharge;

    private String productDeliveryCharge;

    private String successUrl;

    private String failureUrl;

    private String signedFieldNames;

    private String signature;
    
    private String paymentUrl;

}
