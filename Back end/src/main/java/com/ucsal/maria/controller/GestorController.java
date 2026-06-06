package com.ucsal.maria.controller;

import com.ucsal.maria.DTO.GestorDTO;
import com.ucsal.maria.service.GestorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gestores")
public class GestorController {

    private final GestorService gestorService;

    public GestorController(GestorService gestorService) {
        this.gestorService = gestorService;
    }

    @PostMapping
    public ResponseEntity<GestorDTO> cadastrar(@RequestBody GestorDTO dto) {
        GestorDTO novoGestor = gestorService.salvar(dto);
        return ResponseEntity.ok(novoGestor);
    }
}