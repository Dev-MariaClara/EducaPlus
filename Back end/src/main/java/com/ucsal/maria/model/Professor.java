package com.ucsal.maria.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Professor extends Usuario {

    @Column(nullable = false, unique = true)
    private String registro;
    
    // Um professor pode lecionar em várias turmas, e uma turma tem vários professores
    @ManyToMany(mappedBy = "professores")
    private List<Turma> turmas;
}