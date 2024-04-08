package com.shopapp.shopappbe.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
    @JsonProperty("productId")
    private Long productId;
    @JsonProperty("quantity")
    private int quantity;
}
