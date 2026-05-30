package com.ucsal.maria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

// IMPORTANTE: Adicione o import da sua entidade Frequencia aqui
import com.ucsal.maria.model.Frequencia; // (Ajuste o pacote se sua entidade estiver em outro lugar)

@Repository
// Remova o <Frequencia> daqui 👇
public interface FrequenciaRepository extends JpaRepository<Frequencia, Long> {

    List<Frequencia> findByData(LocalDate data);

}