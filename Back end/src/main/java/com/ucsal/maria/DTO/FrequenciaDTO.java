package com.ucsal.maria.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FrequenciaDTO {

    private Long id;

    @NotNull(message = "A data da frequência é obrigatória")
    private LocalDate data;

    @NotNull(message = "O status de presença é obrigatório")
    private Boolean presente;
}