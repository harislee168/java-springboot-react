package com.lovetocode.springbootlibrary.utils;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.Base64;

public class JWTExtraction {

    public static String payLoadJWTExtraction(String token, String extraction) {
        token = token.replace("Bearer ", "");
        String [] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payload = new String (decoder.decode(chunks[1]));

        try {
            Object obj = new JSONParser().parse(payload);
            JSONObject jo = (JSONObject) obj;
            return jo.get(extraction).toString();
        } catch (Exception e) {
            System.out.println("Error parsing JSON: " + e.getMessage());
            return null;
        }
    }
}
