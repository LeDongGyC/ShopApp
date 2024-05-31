package com.shopapp.shopappbe.services;

import com.shopapp.shopappbe.dtos.CommentDTO;
import com.shopapp.shopappbe.exceptions.DataNotFoundException;
import com.shopapp.shopappbe.models.Comment;
import com.shopapp.shopappbe.responses.CommentResponse;

import java.util.List;

public interface ICommentService {
    Comment insertComment(CommentDTO comment);

    void deleteComment(Long commentId);

    void updateComment(Long id, CommentDTO commentDTO) throws DataNotFoundException;

    List<Comment> findAll();

    List<CommentResponse> getCommentsByUserAndProduct(Long userId, Long productId);

    List<CommentResponse> getCommentsByProduct(Long productId);
}
