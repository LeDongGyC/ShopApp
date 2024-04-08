package com.shopapp.shopappbe.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateOrderDetailResponse {
    @JsonProperty("message")
    private String message;
}
