package com.mh.authms;

import com.mh.authms.entites.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.jws.soap.SOAPBinding;

@SpringBootApplication
public class AuthMsApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(AuthMsApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

    }
}
