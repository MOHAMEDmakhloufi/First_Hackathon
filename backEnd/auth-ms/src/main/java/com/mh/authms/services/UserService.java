package com.mh.authms.services;

import com.mh.authms.entites.User;

public interface UserService {
    void changeUserByEmail(String email,User user);

}
