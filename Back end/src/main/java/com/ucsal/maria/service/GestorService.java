package com.ucsal.maria.service;

import com.ucsal.maria.DTO.GestorDTO;
import com.ucsal.maria.model.Gestor;
import com.ucsal.maria.repository.GestorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GestorService {

    private final GestorRepository gestorRepository;

    public GestorService(GestorRepository gestorRepository) {
        this.gestorRepository = gestorRepository;
    }

    @Transactional
    public GestorDTO salvar(GestorDTO dto) {
        Gestor gestor = new Gestor();
        gestor.setNome(dto.getNome());
        gestor.setEmail(dto.getEmail());

        // Repassando as informações obrigatórias para o banco!
        gestor.setSenha(dto.getSenha());
        gestor.setCargo(dto.getCargo());

        gestor = gestorRepository.save(gestor);

        GestorDTO retorno = new GestorDTO();
        retorno.setId(gestor.getId());
        retorno.setNome(gestor.getNome());
        retorno.setEmail(gestor.getEmail());
        retorno.setCargo(gestor.getCargo());
        return retorno;
    }
}