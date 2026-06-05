package com.ucsal.maria.controller;

import com.ucsal.maria.model.*;
import com.ucsal.maria.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciais) {
        String email = credenciais.get("email");
        String senha = credenciais.get("senha");

        // 1. Procura o utilizador na base de dados pelo e-mail
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("erro", "Utilizador não encontrado."));
        }

        Usuario usuario = usuarioOpt.get();

        // 2. Verifica se a palavra-passe coincide com a da base de dados
        if (!usuario.getSenha().equals(senha)) {
            return ResponseEntity.status(401).body(Map.of("erro", "Palavra-passe incorreta."));
        }

        // 3. A MÁGICA DA HERANÇA: Descobre quem é o utilizador!
        String role = "Desconhecido";
        if (usuario instanceof Aluno) {
            role = "Aluno";
        } else if (usuario instanceof Professor) {
            role = "Professor";
        } else if (usuario instanceof Gestor) {
            role = "Gestor";
        } else if (usuario instanceof Responsavel) {
            role = "Responsavel";
        }

        // 4. Empacota a resposta e envia de volta para o frontend em React
        Map<String, Object> response = new HashMap<>();
        response.put("id", usuario.getId());
        response.put("nome", usuario.getNome());
        response.put("email", usuario.getEmail());
        response.put("role", role);

        return ResponseEntity.ok(response);
    }
}