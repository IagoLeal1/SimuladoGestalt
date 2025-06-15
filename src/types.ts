// src/types.ts
export interface Pergunta {
    id: string; // Um identificador único para a pergunta
    texto: string;
    opcoes: string[];
    respostaCorreta: string; // A resposta correta ex: "Brasília" ou "C" se for o índice
  }