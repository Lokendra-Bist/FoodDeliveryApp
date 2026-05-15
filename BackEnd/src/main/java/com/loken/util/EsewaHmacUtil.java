package com.loken.util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EsewaHmacUtil {

	private static String SECRET_KEY;

    @Value("${esewa.secret.key}")
    public void setSecretKey(String secretKey) {
        EsewaHmacUtil.SECRET_KEY = secretKey;
    }

	public static String generateHmac(String msg) {
		try {
			Mac sha256Hmac = Mac.getInstance("HmacSHA256");
			SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA256");
			sha256Hmac.init(secretKey);
			String hash = Base64.encodeBase64String(sha256Hmac.doFinal(msg.getBytes()));
			return hash;
		} catch (Exception e) {
			throw new RuntimeException("Error Generating HMAC");
		}
	}

}
