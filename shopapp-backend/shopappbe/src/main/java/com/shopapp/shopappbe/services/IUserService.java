package com.shopapp.shopappbe.services;

import com.shopapp.shopappbe.dtos.UserDTO;
import com.shopapp.shopappbe.models.User;

public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;
    String login(String phoneNumber, String password, Long roleId) throws Exception;
}

