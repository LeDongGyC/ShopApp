package com.shopapp.shopappbe.services;

import com.shopapp.shopappbe.models.User;
import org.springframework.stereotype.Service;

@Service

public interface ITokenService {
    void addToken(User user, String token, boolean isMobileDevice);
}
