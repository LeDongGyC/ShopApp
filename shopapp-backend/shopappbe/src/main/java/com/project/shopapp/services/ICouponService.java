package com.project.shopapp.services;


public interface ICouponService {
    double calculateCouponValue(String couponCode, double totalAmount);
}

