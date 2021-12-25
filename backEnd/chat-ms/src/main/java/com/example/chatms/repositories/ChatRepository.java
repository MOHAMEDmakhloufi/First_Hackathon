package com.example.chatms.repositories;

import com.example.chatms.entities.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByIdSenderAndIdReceiver(Long idSender, Long idReceiver);
}
