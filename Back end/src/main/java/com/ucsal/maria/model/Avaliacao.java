package com.ucsal.maria.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String tipo;
    private Double peso;
    private Double nota;

    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;

    // Conforme o diagrama UML
    public void validarNota() {
        if (this.nota < 0.0 || this.nota > 10.0) {
            throw new IllegalArgumentException("A nota deve estar entre 0 e 10.");
        }
    }
}