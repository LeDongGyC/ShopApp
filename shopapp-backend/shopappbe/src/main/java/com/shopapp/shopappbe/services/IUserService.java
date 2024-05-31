package com.shopapp.shopappbe.services;

import com.shopapp.shopappbe.dtos.UpdateUserDTO;
import com.shopapp.shopappbe.dtos.UserDTO;
import com.shopapp.shopappbe.exceptions.DataNotFoundException;
import com.shopapp.shopappbe.exceptions.InvalidPasswordException;
import com.shopapp.shopappbe.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;

    String login(String phoneNumber, String password, Long roleId) throws Exception;

    User getUserDetailsFromToken(String token) throws Exception;

    User getUserDetailsFromRefreshToken(String token) throws Exception;

    User updateUser(Long userId, UpdateUserDTO updateUserDTO) throws Exception;

    Page<User> findAll(String keyword, Pageable pageable) throws Exception;

    void resetPassword(Long userId, String newPassword)
            throws InvalidPasswordException, DataNotFoundException;

    public void blockOrEnable(Long userId, Boolean active) throws DataNotFoundException;

    int selectRoleIdByPhoneNumber(String phoneNumber);
}

