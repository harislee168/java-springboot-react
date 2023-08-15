package com.lovetocode.springbootlibrary.controller;

import com.lovetocode.springbootlibrary.constant.ConstantVariable;
import com.lovetocode.springbootlibrary.entity.Message;
import com.lovetocode.springbootlibrary.requestmodel.AdminQuestionRequest;
import com.lovetocode.springbootlibrary.service.MessageService;
import com.lovetocode.springbootlibrary.utils.JWTExtraction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(ConstantVariable.BASE_URL)
@RestController
@RequestMapping(value="/api/messages")
public class MessageController {

    MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value="Authorization") String token,
                            @RequestBody Message messageRequest) {
        String userEmail = JWTExtraction.payLoadJWTExtraction(token, "sub");
        messageService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value="Authorization") String token,
                           @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        String adminEmail = JWTExtraction.payLoadJWTExtraction(token, "sub");
        String userType = JWTExtraction.payLoadJWTExtraction(token, "userType");
        if (userType == null || !userType.equalsIgnoreCase("admin")) {
            throw new Exception("Only admin is allowed to respond to a question");
        }
        messageService.putMessage(adminQuestionRequest, adminEmail);
    }
}
