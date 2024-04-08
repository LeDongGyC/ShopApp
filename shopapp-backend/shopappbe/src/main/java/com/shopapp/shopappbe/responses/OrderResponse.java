package com.shopapp.shopappbe.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.shopapp.shopappbe.models.Order;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {
    @JsonProperty("message")
    private String message;

    @JsonProperty("errors")
    private List<String> errors;

    @JsonProperty("order")
    private Order order;
}


