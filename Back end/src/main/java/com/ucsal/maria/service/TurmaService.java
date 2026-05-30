package com.ucsal.maria.service;

import com.ucsal.maria.DTO.TurmaDTO;
import com.ucsal.maria.model.Aluno;
import com.ucsal.maria.model.Turma;
import com.ucsal.maria.repository.AlunoRepository;
import com.ucsal.maria.repository.TurmaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TurmaService {

    private final TurmaRepository turmaRepository;
    private final AlunoRepository alunoRepository;

    public TurmaService(TurmaRepository turmaRepository, AlunoRepository alunoRepository) {
        this.turmaRepository = turmaRepository;
        this.alunoRepository = alunoRepository;
    }

    @Transactional
    public TurmaDTO salvar(TurmaDTO dto) {
        Turma turma = new Turma();
        turma.setNome(dto.getNome());
        return converterParaDTO(turmaRepository.save(turma));
    }

    @Transactional(readOnly = true)
    public List<TurmaDTO> listarTodas() {
        return turmaRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TurmaDTO buscarPorId(Long id) {
        Turma turma = turmaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Turma não encontrada."));
        return converterParaDTO(turma);
    }

    // Método principal de relacionamento do diagrama
    @Transactional
    public void adicionarAluno(Long turmaId, Long alunoId) {
        Turma turma = turmaRepository.findById(turmaId)
                .orElseThrow(() -> new EntityNotFoundException("Turma não encontrada."));
                
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado."));

        // Regra de negócio: evitar que o aluno seja adicionado em duplicidade na mesma turma
        if (turma.getAlunos().contains(aluno)) {
            throw new IllegalArgumentException("O aluno já está matriculado nesta turma.");
        }

        turma.adicionarAluno(aluno); // Chama o método interno da classe Turma
        turmaRepository.save(turma);
    }

    private TurmaDTO converterParaDTO(Turma turma) {
        TurmaDTO dto = new TurmaDTO();
        dto.setId(turma.getId());
        dto.setNome(turma.getNome());
        return dto;
    }
}