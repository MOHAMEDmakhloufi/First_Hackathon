package com.mh.authms.services;

import com.mh.authms.entites.User;
import com.mh.authms.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Override
    public void changeUserByEmail(String email,User user){
        User user1 = userRepository.findByEmail(email);
        if (user.getUserName() != null)
            user1.setUserName(user.getUserName());
        if (user.getPassword() != null)
            user1.setPassword(user.getPassword());
        if (user.getEmail() != null)
            user1.setEmail(user.getEmail());
        if (user.getFirstName() != null)
            user1.setFirstName(user.getFirstName());
        if (user.getLastName() != null)
            user1.setLastName(user.getLastName());
        if (user.getBirthday() != null)
            user1.setBirthday(user.getBirthday());
        if (user.getPhone() != null)
            user1.setPhone(user.getPhone());
        if (user.getSexe() != null)
            user1.setSexe(user.getSexe());

        userRepository.save(user1);
    }
}
