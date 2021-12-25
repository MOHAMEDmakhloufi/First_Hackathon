package com.example.chatms.services;

import java.util.List;

public interface ChatService {
    List<String> getAllMessages(Long idSender, Long idReceiver);
}
