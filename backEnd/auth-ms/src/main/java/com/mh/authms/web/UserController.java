package com.mh.authms.web;

import com.mh.authms.entites.User;
import com.mh.authms.model.UserAuth;
import com.mh.authms.repositories.UserRepository;
import com.mh.authms.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @PostMapping("/user")
    public void addUser(@RequestBody User user){
        user.setUserName(user.getFirstName()+ " " + user.getLastName());
        user.setDateCreated(new Date());
        this.userRepository.save(user);
    }

    @PutMapping("/user/{email}")
    public void changeUserEmail(@PathVariable String email, @RequestBody User user){
        this.userService.changeUserByEmail(email,user);
    }

    @DeleteMapping("/user/{email}")
    public void deleteUserByUserName(@PathVariable String email){
        this.userRepository.deleteById(this.userRepository.findByEmail(email).getId());
    }

    @GetMapping("/user")
    public List<User> getAllUsers(){
        List<User> usersList = userRepository.findAll();
        for (User u: usersList){
            u.setEmail("");
            u.setPassword("");
        }
        return usersList;
    }

    @GetMapping("/user/email/{email}")
    public User getUserByEmail(@PathVariable String email){
        User user = this.userRepository.findByEmail(email);
        user.setEmail("");
        user.setPassword("");
        return user;
    }

    @GetMapping("/user/id/{id}")
    public User getUserByid(@PathVariable Long id){
        User user = this.userRepository.findById(id).get();
        user.setEmail("");
        user.setPassword("");
        return user;
    }

    @GetMapping("/user/{email}")
    public UserAuth getUsersByEmail(@PathVariable String email){
        User user1 = this.userRepository.findByEmail(email);
        return new UserAuth(user1.getEmail(),user1.getPassword());
    }

}
