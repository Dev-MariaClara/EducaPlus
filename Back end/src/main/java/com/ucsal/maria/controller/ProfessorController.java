package com.ucsal.maria.controller;

import com.ucsal.maria.DTO.AvaliacaoDTO;
import com.ucsal.maria.DTO.FrequenciaDTO;
import com.ucsal.maria.DTO.ProfessorDTO;
import com.ucsal.maria.service.ProfessorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professores")
public class ProfessorController {

    private final ProfessorService professorService;

    public ProfessorController(ProfessorService professorService) {
        this.professorService = professorService;
    }

    @PostMapping
    public ResponseEntity<ProfessorDTO> cadastrar(@Valid @RequestBody ProfessorDTO professorDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(professorService.salvar(professorDTO));
    }

    @GetMapping
    public ResponseEntity<List<ProfessorDTO>> listarTodos() {
        return ResponseEntity.ok(professorService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessorDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(professorService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfessorDTO> atualizar(@PathVariable Long id, @Valid @RequestBody ProfessorDTO professorDTO) {
        return ResponseEntity.ok(professorService.atualizar(id, professorDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        professorService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // Métodos específicos do Diagrama
    @PostMapping("/{id}/avaliacoes")
    public ResponseEntity<Void> lancarNota(@PathVariable Long id, @Valid @RequestBody AvaliacaoDTO avaliacaoDTO) {
        professorService.lancarNota(id, avaliacaoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/{id}/frequencias")
    public ResponseEntity<Void> registrarFrequencia(@PathVariable Long id, @Valid @RequestBody FrequenciaDTO frequenciaDTO) {
        professorService.registrarFrequencia(id, frequenciaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}