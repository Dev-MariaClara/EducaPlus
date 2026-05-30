-- Criação do banco de dados principal
CREATE DATABASE educaplus;

-- Conecte-se ao banco educaplus antes de rodar os comandos abaixo
-- Se estiver no psql, use: \c educaplus;

-- 1. Tabela Base (Pai)
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- 2. Entidades Independentes
CREATE TABLE turma (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- 3. Tabelas Filhas (Herança de Usuario)
-- O ID aqui não é SERIAL, ele referencia diretamente o ID gerado na tabela usuario
CREATE TABLE aluno (
    id INT PRIMARY KEY REFERENCES usuario(id) ON DELETE CASCADE,
    matricula VARCHAR(50) UNIQUE NOT NULL,
    turma_id INT REFERENCES turma(id) ON DELETE SET NULL
);

CREATE TABLE professor (
    id INT PRIMARY KEY REFERENCES usuario(id) ON DELETE CASCADE,
    registro VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE gestor (
    id INT PRIMARY KEY REFERENCES usuario(id) ON DELETE CASCADE,
    cargo VARCHAR(100) NOT NULL
);

CREATE TABLE responsavel (
    id INT PRIMARY KEY REFERENCES usuario(id) ON DELETE CASCADE,
    parentesco VARCHAR(50) NOT NULL
);

-- 4. Tabela de Relacionamento N:N (Muitos para Muitos)
CREATE TABLE turma_professor (
    turma_id INT REFERENCES turma(id) ON DELETE CASCADE,
    professor_id INT REFERENCES professor(id) ON DELETE CASCADE,
    PRIMARY KEY (turma_id, professor_id)
);

-- 5. Tabelas de Processos Educacionais
CREATE TABLE avaliacao (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    peso DOUBLE PRECISION NOT NULL,
    nota DOUBLE PRECISION NOT NULL,
    aluno_id INT REFERENCES aluno(id) ON DELETE CASCADE
);

CREATE TABLE frequencia (
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    presente BOOLEAN NOT NULL,
    aluno_id INT REFERENCES aluno(id) ON DELETE CASCADE
);