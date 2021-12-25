package com.example.chatms.web;

import com.example.chatms.entities.Chat;
import com.example.chatms.repositories.ChatRepository;
import com.example.chatms.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class ChatController {

    @Autowired
    ChatRepository chatRepository;

    @Autowired
    ChatService chatService;


    @PostMapping("/chat")
    public void addMessage(@RequestBody Chat chat){
        this.chatRepository.save(chat);
    }

    @GetMapping("/chat/{idSender}/{idReceiver}")
    public List<String> getAllMessages(@PathVariable Long idSender, @PathVariable Long idReceiver){
        return this.chatService.getAllMessages( idSender, idReceiver);
    }
}
