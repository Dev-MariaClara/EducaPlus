package com.ucsal.maria.service;
import com.ucsal.maria.model.Frequencia;
import com.ucsal.maria.DTO.AvaliacaoDTO;
import com.ucsal.maria.DTO.FrequenciaDTO;
import com.ucsal.maria.DTO.ProfessorDTO;
import com.ucsal.maria.model.Avaliacao;
import com.ucsal.maria.model.Professor;
import com.ucsal.maria.repository.AvaliacaoRepository;
import com.ucsal.maria.repository.FrequenciaRepository;
import com.ucsal.maria.repository.ProfessorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfessorService {

    private final ProfessorRepository professorRepository;
    private final AvaliacaoRepository avaliacaoRepository;
    private final FrequenciaRepository frequenciaRepository;

    public ProfessorService(ProfessorRepository professorRepository, 
                            AvaliacaoRepository avaliacaoRepository, 
                            FrequenciaRepository frequenciaRepository) {
        this.professorRepository = professorRepository;
        this.avaliacaoRepository = avaliacaoRepository;
        this.frequenciaRepository = frequenciaRepository;
    }

    @Transactional
    public ProfessorDTO salvar(ProfessorDTO dto) {
        Professor professor = converterParaEntidade(dto);
        return converterParaDTO(professorRepository.save(professor));
    }

    @Transactional(readOnly = true)
    public List<ProfessorDTO> listarTodos() {
        return professorRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProfessorDTO buscarPorId(Long id) {
        Professor professor = professorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Professor não encontrado."));
        return converterParaDTO(professor);
    }

    @Transactional
    public ProfessorDTO atualizar(Long id, ProfessorDTO dto) {
        Professor professor = professorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Professor não encontrado."));
        
        professor.setNome(dto.getNome());
        professor.setRegistro(dto.getRegistro());
        return converterParaDTO(professorRepository.save(professor));
    }

    @Transactional
    public void deletar(Long id) {
        if (!professorRepository.existsById(id)) {
            throw new EntityNotFoundException("Professor não encontrado.");
        }
        professorRepository.deleteById(id);
    }

    // Regras de negócio específicas do diagrama
    @Transactional
    public void lancarNota(Long professorId, AvaliacaoDTO dto) {
        // Valida se o professor existe
        buscarPorId(professorId);
        
        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setTipo(dto.getTipo());
        avaliacao.setPeso(dto.getPeso());
        avaliacao.setNota(dto.getNota());
        // Aqui buscaríamos o Aluno e a Disciplina pelos IDs fornecidos no DTO para vincular
        
        avaliacao.validarNota(); // Método do seu diagrama para garantir que a nota não passe de 10, por exemplo
        avaliacaoRepository.save(avaliacao);
    }

    @Transactional
    public void registrarFrequencia(Long professorId, FrequenciaDTO dto) {
        buscarPorId(professorId);
        
        Frequencia frequencia = new Frequencia();
        frequencia.setData(dto.getData());
        frequencia.setPresente(dto.getPresente());
        // Vínculo com aluno e turma seria feito aqui
        
        frequenciaRepository.save(frequencia);
    }

    private Professor converterParaEntidade(ProfessorDTO dto) {
        Professor prof = new Professor();
        prof.setNome(dto.getNome());
        prof.setEmail(dto.getEmail());
        prof.setRegistro(dto.getRegistro());

        // A resolução do conflito acontece aqui. Agora a senha é repassada.
        prof.setSenha(dto.getSenha());

        return prof;
    }

    private ProfessorDTO converterParaDTO(Professor prof) {
        ProfessorDTO dto = new ProfessorDTO();
        dto.setId(prof.getId());
        dto.setNome(prof.getNome());
        dto.setEmail(prof.getEmail());
        dto.setRegistro(prof.getRegistro());
        return dto;
    }
}