package com.ucsal.maria.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TurmaDTO {

    private Long id;

    @NotBlank(message = "O nome da turma é obrigatório (ex: 3º Ano A)")
    private String nome;
}