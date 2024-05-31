package com.shopapp.shopappbe.services;


public interface ICouponService {
    double calculateCouponValue(String couponCode, double totalAmount);
}

