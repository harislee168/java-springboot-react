package com.lovetocode.springbootlibrary.controller;

import com.lovetocode.springbootlibrary.requestmodel.PaymentInfoRequest;
import com.lovetocode.springbootlibrary.service.PaymentService;
import com.lovetocode.springbootlibrary.utils.JWTExtraction;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="api/payment")
public class PaymentController {

    private PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/secure/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest)
            throws StripeException {
        PaymentIntent paymentIntent =  paymentService.createPaymentIntent(paymentInfoRequest);
        String paymentStr = paymentIntent.toJson();
        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

    @PutMapping("/secure/payment-complete")
    public ResponseEntity<String> stripePaymentComplete(@RequestHeader(value="Authorization") String token)
        throws Exception {
        String userEmail = JWTExtraction.payLoadJWTExtraction(token, "sub");
        if(userEmail == null) {
            throw new Exception("User email is missing");
        }
        return paymentService.stripePaymentComplete(userEmail);
    }
}
