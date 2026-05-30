package com.ucsal.maria.model;
import com.ucsal.maria.DTO.FrequenciaDTO;
import com.ucsal.maria.repository.FrequenciaRepository;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;
@Entity

@Data

@EqualsAndHashCode(callSuper = true)
public class Aluno extends Usuario {
    @Column(nullable = false, unique = true)
    private String matricula;
    @ManyToOne
    @JoinColumn(name = "turma_id")
    private Turma turma;
    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL)
    private List<Avaliacao> notas;
    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL)
    private List<Frequencia> frequencias;

}