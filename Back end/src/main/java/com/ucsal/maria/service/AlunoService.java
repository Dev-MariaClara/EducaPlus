package com.ucsal.maria.service;

import com.ucsal.maria.DTO.AlunoDTO;
import com.ucsal.maria.DTO.AvaliacaoDTO;
import com.ucsal.maria.model.Aluno;
import com.ucsal.maria.model.Avaliacao;
import com.ucsal.maria.repository.AlunoRepository;
import com.ucsal.maria.repository.AvaliacaoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final AvaliacaoRepository avaliacaoRepository;

    public AlunoService(AlunoRepository alunoRepository, AvaliacaoRepository avaliacaoRepository) {
        this.alunoRepository = alunoRepository;
        this.avaliacaoRepository = avaliacaoRepository;
    }

    @Transactional
    public AlunoDTO salvar(AlunoDTO dto) {
        // Verifica se o email já existe para evitar duplicidade
        if (alunoRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("E-mail já cadastrado no sistema.");
        }

        Aluno aluno = converterParaEntidade(dto);
        aluno = alunoRepository.save(aluno);
        return converterParaDTO(aluno);
    }

    @Transactional(readOnly = true)
    public List<AlunoDTO> listarTodos() {
        return alunoRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AlunoDTO buscarPorId(Long id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado com o ID: " + id));
        return converterParaDTO(aluno);
    }

    @Transactional
    public AlunoDTO atualizar(Long id, AlunoDTO dto) {
        Aluno alunoExistente = alunoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado."));

        alunoExistente.setNome(dto.getNome());
        alunoExistente.setMatricula(dto.getMatricula());
        // A senha só deve ser atualizada se for passada e deve ser criptografada (ex: BCrypt)

        return converterParaDTO(alunoRepository.save(alunoExistente));
    }

    @Transactional
    public void deletar(Long id) {
        if (!alunoRepository.existsById(id)) {
            throw new EntityNotFoundException("Aluno não encontrado.");
        }
        alunoRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<AvaliacaoDTO> visualizarNotas(Long alunoId) {
        // Verifica se o aluno existe antes de buscar as notas
        buscarPorId(alunoId);
        return avaliacaoRepository.findByAlunoId(alunoId).stream()
                .map(this::converterAvaliacaoParaDTO)
                .collect(Collectors.toList());
    }

    // Métodos utilitários de conversão
    private Aluno converterParaEntidade(AlunoDTO dto) {
        Aluno aluno = new Aluno();
        aluno.setNome(dto.getNome());
        aluno.setEmail(dto.getEmail());
        aluno.setMatricula(dto.getMatricula());

        // AQUI ESTÁ A ALTERAÇÃO: Pegando a senha do DTO e colocando na Entidade!
        aluno.setSenha(dto.getSenha());

        return aluno;
    }

    private AlunoDTO converterParaDTO(Aluno aluno) {
        AlunoDTO dto = new AlunoDTO();
        dto.setId(aluno.getId());
        dto.setNome(aluno.getNome());
        dto.setEmail(aluno.getEmail());
        dto.setMatricula(aluno.getMatricula());
        return dto;
    }

    // Método utilitário para converter Avaliacao em AvaliacaoDTO
    private AvaliacaoDTO converterAvaliacaoParaDTO(Avaliacao avaliacao) {
        AvaliacaoDTO dto = new AvaliacaoDTO();
        dto.setId(avaliacao.getId());
        dto.setNota(avaliacao.getNota());
        return dto;
    }
}