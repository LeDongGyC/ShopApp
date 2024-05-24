package com.shopapp.shopappbe.services;

import com.shopapp.shopappbe.dtos.OrderDTO;
import com.shopapp.shopappbe.exceptions.DataNotFoundException;
import com.shopapp.shopappbe.models.Order;
import com.shopapp.shopappbe.responses.OrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderService {
    Order createOrder(OrderDTO orderDTO) throws Exception;

    Order getOrder(Long id);

    Order updateOrder(Long id, OrderDTO orderDTO) throws DataNotFoundException;

    void deleteOrder(Long id);

    List<Order> findByUserId(Long userId);
    Page<Order> getOrdersByKeyword(String keyword, Pageable pageable);
}
