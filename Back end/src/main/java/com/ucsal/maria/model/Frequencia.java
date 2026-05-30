package com.ucsal.maria.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate; // Não esqueça deste import para a data!

@Entity
@Getter
@Setter
public class Frequencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;

    // Os atributos que estavam faltando:
    private LocalDate data;
    private Boolean presente;
}