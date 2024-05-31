package com.shopapp.shopappbe.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data//toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PhoneNumberDTO {
    @JsonProperty("phone_number")
    private String phoneNumber;
}
