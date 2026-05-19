package com.loken.service;

import java.util.Base64;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.loken.entity.OrderStatus;
import com.loken.entity.Orders;
import com.loken.entity.PaymentStatus;
import com.loken.exception.ResourceNotFoundException;
import com.loken.repository.ICartRepository;
import com.loken.repository.IOrderRepository;
import com.loken.response.EsewaPaymentResponse;
import com.loken.util.EsewaHmacUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EsewaPaymentService {

	private final IOrderRepository orderRepo;

	private final ICartRepository cartRepo;

	@PreAuthorize("isAuthenticated()")
	public EsewaPaymentResponse initiatePayment(Long orderId) {

		Orders order = orderRepo.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order Not Found!"));

		String transactionUuid = order.getId() + "-" + System.currentTimeMillis();

		order.setTransactionUuid(transactionUuid);

		orderRepo.save(order);

		String totalAmount = String.valueOf(order.getTotalAmount());

		String signedFieldNames = "total_amount,transaction_uuid,product_code";

		String msg = "total_amount=" + totalAmount + ",transaction_uuid=" + transactionUuid + ",product_code=EPAYTEST";

		String signature = EsewaHmacUtil.generateHmac(msg);

		return EsewaPaymentResponse.builder()
				.amount(totalAmount)
				.taxAmount("0")
				.totalAmount(totalAmount)
				.transactionUuid(transactionUuid)
				.productCode("EPAYTEST")
				.productServiceCharge("0")
				.productDeliveryCharge("0")
				.successUrl("http://localhost:5173/payment-success")
				.failureUrl("http://localhost:5173/payment-failure")
				.signedFieldNames(signedFieldNames)
				.signature(signature)
				.paymentUrl("https://rc-epay.esewa.com.np/api/epay/main/v2/form")
				.build();
	}

	@Transactional
	public String verifyPayment(String data) {
		try {

			String decodedData = new String(Base64.getDecoder().decode(data));

			ObjectMapper mapper = new ObjectMapper();

			JsonNode json = mapper.readTree(decodedData);

			String transactionCode = json.get("transaction_code").asText();

			String status = json.get("status").asText();

			String totalAmount = json.get("total_amount").asText();

			String transactionUuid = json.get("transaction_uuid").asText();

			String productCode = json.get("product_code").asText();

			String signedFieldNames = json.get("signed_field_names").asText();

			String signature = json.get("signature").asText();

			Orders order = orderRepo.findByTransactionUuid(transactionUuid)
					.orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));

			String message = "transaction_code=" + transactionCode + ",status=" + status + ",total_amount="
					+ totalAmount + ",transaction_uuid=" + transactionUuid + ",product_code=" + productCode
					+ ",signed_field_names=" + signedFieldNames;

			String generatedSignature = EsewaHmacUtil.generateHmac(message);

			if (!generatedSignature.equals(signature)) {
				order.setPaymentStatus(PaymentStatus.FAILED);
				orderRepo.save(order);
				return "Invalid Signature";
			}

			if (!status.equals("COMPLETE")) {
				order.setPaymentStatus(PaymentStatus.FAILED);
				orderRepo.save(order);
				return "Payment Failed";
			}

			order.setPaymentStatus(PaymentStatus.PAID);

			order.setOrderStatus(OrderStatus.CONFIRMED);

			order.setPaymentReferenceId(transactionCode);

			orderRepo.save(order);

			cartRepo.deleteByUserId(order.getUser().getId());

			return "Payment Success";
			
		} catch (Exception e) {
			e.printStackTrace();
			
			return "Verification Failed";
		}
	}

}
