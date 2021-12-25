package com.example.chatms.services;

import com.example.chatms.entities.Chat;
import com.example.chatms.repositories.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatServiceImpl implements ChatService{

    @Autowired
    ChatRepository chatRepository;

    @Override
    public List<String> getAllMessages(Long idSender, Long idReceiver){
        List<Chat> allChats = this.chatRepository.findByIdSenderAndIdReceiver(idReceiver, idSender);
        List<String> allMessages = new ArrayList<>();
        for (Chat c: allChats){
            allMessages.add(c.getMessege());
            this.chatRepository.delete(c);
        }

        return allMessages;

    }
}
