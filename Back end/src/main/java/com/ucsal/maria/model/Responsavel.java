
package com.ucsal.maria.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Responsavel extends Usuario {

    @Column(nullable = false)
    private String parentesco;
}