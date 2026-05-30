package com.ucsal.maria.DTO;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvaliacaoDTO {

    private Long id;

    @NotBlank(message = "O tipo de avaliação é obrigatório (ex: Prova, Seminário)")
    private String tipo;

    @NotNull(message = "O peso da avaliação é obrigatório")
    @DecimalMin(value = "0.1", message = "O peso mínimo é 0.1")
    private Double peso;

    @NotNull(message = "A nota é obrigatória")
    @DecimalMin(value = "0.0", message = "A nota mínima é 0.0")
    @DecimalMax(value = "10.0", message = "A nota máxima é 10.0")
    private Double nota;
}