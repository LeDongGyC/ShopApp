package com.shopapp.shopappbe.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDTO {

    @JsonProperty("userId")
    @Min(value = 1, message = "User's ID must be > 0")
    private Long userId;

    @JsonProperty("fullName")
    private String fullName;

    private String email;

    @JsonProperty("phoneNumber")
    @NotBlank(message = "Phone number is required")
    @Size(min = 5, message = "Phone number must be at least 5 characters")
    private String phoneNumber;

    private String address;

    private String note;

    @JsonProperty("totalMoney")
    @Min(value = 0, message = "Total money must be >= 0")
    private Float totalMoney;

    @JsonProperty("shippingMethod")
    private String shippingMethod;

    @JsonProperty("shippingAddress")
    private String shippingAddress;

    @JsonProperty("shippingDate")
    private LocalDate shippingDate;

    @JsonProperty("paymentMethod")
    private String paymentMethod;

    @JsonProperty("cartItems")
    private List<CartItemDTO> cartItems;
}

