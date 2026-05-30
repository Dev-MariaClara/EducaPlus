package com.ucsal.maria.repository;

import com.ucsal.maria.model.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long> {
    // Métodos padrão do JpaRepository já atendem ao CRUD da Turma
}