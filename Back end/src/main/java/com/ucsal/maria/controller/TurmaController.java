package com.ucsal.maria.controller;

import com.ucsal.maria.DTO.TurmaDTO;
import com.ucsal.maria.service.TurmaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/turmas")
public class TurmaController {

    private final TurmaService turmaService;

    public TurmaController(TurmaService turmaService) {
        this.turmaService = turmaService;
    }

    @PostMapping
    public ResponseEntity<TurmaDTO> criar(@Valid @RequestBody TurmaDTO turmaDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(turmaService.salvar(turmaDTO));
    }

    @GetMapping
    public ResponseEntity<List<TurmaDTO>> listar() {
        return ResponseEntity.ok(turmaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TurmaDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(turmaService.buscarPorId(id));
    }

    // Adiciona um aluno específico à lista de alunos da turma
    @PostMapping("/{turmaId}/alunos/{alunoId}")
    public ResponseEntity<Void> adicionarAluno(@PathVariable Long turmaId, @PathVariable Long alunoId) {
        turmaService.adicionarAluno(turmaId, alunoId);
        return ResponseEntity.ok().build();
    }
}