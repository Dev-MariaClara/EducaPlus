package com.ucsal.maria.repository;

import com.ucsal.maria.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    // O Spring Data JPA entende que deve fazer um SELECT * FROM avaliacao WHERE aluno_id = ?
    List<Avaliacao> findByAlunoId(Long alunoId);
}