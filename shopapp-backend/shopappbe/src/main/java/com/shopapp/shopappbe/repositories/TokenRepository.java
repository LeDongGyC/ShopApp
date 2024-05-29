package com.shopapp.shopappbe.repositories;


import com.shopapp.shopappbe.models.Token;
import com.shopapp.shopappbe.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> findByUser(User user);

    Token findByToken(String token);
}
