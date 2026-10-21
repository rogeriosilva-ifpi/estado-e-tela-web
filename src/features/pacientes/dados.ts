import type { Paciente } from "./tipos.ts";

// Pacientes fictícios da Ala B. Os dados da
// API chegam no capítulo 14.
export const ALA_B: Paciente[] = [
  { id: "p1", nome: "Maria Souza",
    leito: "101", risco: "alto",
    prioridade: false },
  { id: "p2", nome: "João Lima",
    leito: "102", risco: "baixo",
    prioridade: false },
  { id: "p3", nome: "Ana Clara Reis",
    leito: "103", risco: "alto",
    prioridade: true },
  { id: "p4", nome: "Pedro Alves",
    leito: "104", risco: "médio",
    prioridade: false },
  { id: "p5", nome: "Luzia Freitas",
    leito: "105", risco: "baixo",
    prioridade: false },
  { id: "p6", nome: "Raimundo Nonato",
    leito: "106", risco: "médio",
    prioridade: false },
];
