package com.shopapp.shopappbe.services;

import com.shopapp.shopappbe.models.Token;
import com.shopapp.shopappbe.models.User;
import org.springframework.stereotype.Service;

@Service

public interface ITokenService {
    Token addToken(User user, String token, boolean isMobileDevice);

    Token refreshToken(String refreshToken, User user) throws Exception;
}
