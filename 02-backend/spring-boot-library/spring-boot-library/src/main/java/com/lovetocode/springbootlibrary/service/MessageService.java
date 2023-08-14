package com.lovetocode.springbootlibrary.service;

import com.lovetocode.springbootlibrary.dao.MessageRepository;
import com.lovetocode.springbootlibrary.requestmodel.AdminQuestionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.lovetocode.springbootlibrary.entity.Message;

import java.util.Optional;

@Service
@Transactional
public class MessageService {

    private MessageRepository messageRepository;

    @Autowired
    public MessageService (MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void postMessage(Message messageRequest, String userEmail) {
        Message newMessage = new Message(messageRequest.getTitle(), messageRequest.getQuestion());
        newMessage.setUserEmail(userEmail);
        messageRepository.save(newMessage);
    }

    public void putMessage(AdminQuestionRequest adminQuestionRequest, String adminEmail) throws Exception {
        Optional<Message> message = messageRepository.findById(adminQuestionRequest.getId());
        if (message.isEmpty()) {
            throw new Exception("Message does not exist");
        }
        message.get().setAdminEmail(adminEmail);
        message.get().setResponse(adminQuestionRequest.getResponse());
        message.get().setClosed(true);
        messageRepository.save(message.get());
    }
}
