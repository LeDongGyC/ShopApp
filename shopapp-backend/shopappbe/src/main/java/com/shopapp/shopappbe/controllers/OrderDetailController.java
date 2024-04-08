package com.shopapp.shopappbe.controllers;

import com.shopapp.shopappbe.components.LocalizationUtils;
import com.shopapp.shopappbe.dtos.OrderDetailDTO;
import com.shopapp.shopappbe.exceptions.DataNotFoundException;
import com.shopapp.shopappbe.models.OrderDetail;
import com.shopapp.shopappbe.responses.OrderDetailResponse;
import com.shopapp.shopappbe.responses.UpdateOrderDetailResponse;
import com.shopapp.shopappbe.services.impls.OrderDetailService;
import com.shopapp.shopappbe.utils.MessageKeys;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/order_details")
@RequiredArgsConstructor
public class OrderDetailController {
    private final OrderDetailService orderDetailService;
    private final LocalizationUtils localizationUtils;

    @PostMapping("")
    public ResponseEntity<?> createOrderDetail(
            @Valid @RequestBody OrderDetailDTO orderDetailDTO) {
        try {
            OrderDetail newOrderDetail = orderDetailService.createOrderDetail(orderDetailDTO);
            return ResponseEntity.ok().body(OrderDetailResponse.fromOrderDetail(newOrderDetail));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderDetail(
            @Valid @PathVariable("id") Long id) throws DataNotFoundException {
        OrderDetail orderDetail = orderDetailService.getOrderDetail(id);
        return ResponseEntity.ok().body(OrderDetailResponse.fromOrderDetail(orderDetail));
    }

    //lấy ra danh sách các order_details của 1 order nào đó
    @GetMapping("/order/{orderId}")
    public ResponseEntity<?> getOrderDetails(
            @Valid @PathVariable("orderId") Long orderId
    ) {
        List<OrderDetail> orderDetails = orderDetailService.findByOrderId(orderId);
        List<OrderDetailResponse> orderDetailResponses = orderDetails
                .stream()
                .map(OrderDetailResponse::fromOrderDetail)
                .toList();
        return ResponseEntity.ok(orderDetailResponses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UpdateOrderDetailResponse> updateOrderDetail(
            @Valid @PathVariable("id") Long id,
            @RequestBody OrderDetailDTO orderDetailDTO) {
        UpdateOrderDetailResponse updateOrderDetailResponse = new UpdateOrderDetailResponse();
        try {
            orderDetailService.updateOrderDetail(id, orderDetailDTO);
            updateOrderDetailResponse.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.UPDATE_ORDER_DETAIL_SUCCESSFULLY));
            return ResponseEntity.ok().body(updateOrderDetailResponse);
        } catch (DataNotFoundException e) {
            updateOrderDetailResponse.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.UPDATE_ORDER_DETAIL_FAILED));
            return ResponseEntity.badRequest().body(updateOrderDetailResponse);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrderDetail(
            @Valid @PathVariable("id") Long id) {
        orderDetailService.deleteById(id);
        return ResponseEntity.ok().body(localizationUtils.getLocalizedMessage(MessageKeys.DELETE_ORDER_DETAIL_SUCCESSFULLY));
    }
}

