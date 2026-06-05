package com.ucsal.maria.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlunoDTO {

    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    private String nome;

    @NotBlank(message = "O e-mail é obrigatório")
    @Email(message = "Formato de e-mail inválido")
    private String email;

    @NotBlank(message = "A matrícula é obrigatória")
    private String matricula;
    // Adicione o campo da senha para o backend conseguir receber a informação
    @NotBlank(message = "A senha é obrigatória")
    private String senha;
    
    // A senha não trafega no DTO de leitura, ela seria tratada em um DTO específico de Criação/Registro.
}