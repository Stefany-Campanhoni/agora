package com.stefanycampanhoni.agora.services;

import com.stefanycampanhoni.agora.exceptions.user.UserNotFoundException;
import com.stefanycampanhoni.agora.models.User;
import com.stefanycampanhoni.agora.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User updateUser(Long id, User userDetails) {
        User user = this.getUserById(id);
        BeanUtils.copyProperties(userDetails, user, "id");
        return userRepository.save(user);
    }
}

