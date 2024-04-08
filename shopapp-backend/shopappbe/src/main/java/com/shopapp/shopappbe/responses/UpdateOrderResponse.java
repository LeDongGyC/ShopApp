package com.shopapp.shopappbe.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateOrderResponse {
    @JsonProperty("message")
    private String message;
}
