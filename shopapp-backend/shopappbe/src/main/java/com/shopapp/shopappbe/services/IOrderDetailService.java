package com.shopapp.shopappbe.services;

import com.shopapp.shopappbe.dtos.OrderDetailDTO;
import com.shopapp.shopappbe.exceptions.DataNotFoundException;
import com.shopapp.shopappbe.models.OrderDetail;

import java.util.List;

public interface IOrderDetailService {
    OrderDetail createOrderDetail(OrderDetailDTO newOrderDetail) throws Exception;

    OrderDetail getOrderDetail(Long id) throws DataNotFoundException;

    OrderDetail updateOrderDetail(Long id, OrderDetailDTO newOrderDetailData)
            throws DataNotFoundException;

    void deleteById(Long id);

    List<OrderDetail> findByOrderId(Long orderId);


}

