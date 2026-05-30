package com.ucsal.maria.controller;

import com.ucsal.maria.DTO.AlunoDTO;
import com.ucsal.maria.service.AlunoService;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alunos")
public class AlunoController {

    private final AlunoService alunoService;

    // Injeção de dependência via construtor (boa prática)
    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    @PostMapping
    public ResponseEntity<AlunoDTO> cadastrar(@Valid @RequestBody AlunoDTO alunoDTO) {
        AlunoDTO novoAluno = alunoService.salvar(alunoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoAluno);
    }

    @GetMapping
    public ResponseEntity<List<AlunoDTO>> listarTodos() {
        return ResponseEntity.ok(alunoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(alunoService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoDTO> atualizar(@PathVariable Long id, @Valid @RequestBody AlunoDTO alunoDTO) {
        return ResponseEntity.ok(alunoService.atualizar(id, alunoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        alunoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // Métodos específicos do Diagrama
    @GetMapping("/{id}/notas")
    public ResponseEntity<Object> visualizarNotas(@PathVariable Long id) {
        // Retornará a lista de Avaliacao/Notas vinculadas ao aluno
        return ResponseEntity.ok(alunoService.visualizarNotas(id));
    }
}