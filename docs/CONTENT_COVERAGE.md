# Matriz de cobertura (base: Anexo II oficial, cargo B02)

Cobertura atual: **7 de 68 tópicos** com material (3 capítulos, 6 lições, 60 questões autorais). Não declarar cobertura integral enquanto houver lacunas.
Os IDs de tópico estão em `src/content/contests/tce-go-2026/contest.ts`; a tela **Progresso → Edital e cobertura** calcula esta matriz automaticamente.

| Disciplina (questões) | Tópicos | Com material | Material |
|---|---|---|---|
| Língua Portuguesa (10) | 4 | 0 | — |
| Matemática e Raciocínio Lógico (10) | 3 | 0 | — |
| Legislação Institucional (5) | 8 | 0 | — |
| Engenharia de Software (4) | 5 | 0 | — |
| Desenvolvimento de Sistemas (5) | 5 | 0 | — |
| Eng. Software Assistida por IA e Sistemas Agentivos (4) | 5 | 5 | Livro dos Autômatos: cap. 1 (`ti.ia-eng.llm`, `ti.ia-eng.contexto`) e cap. 2 (`ti.ia-eng.agentes`, `ti.ia-eng.mcp`, `ti.ia-eng.qualidade`); lições lic.ia.01.a/b, lic.ia.02.a/b; questões q.ia.01.001–020, q.ia.02.001–020 |
| DevOps, Plataforma e Entrega (4) | 5 | 0 | — |
| Banco de Dados (4) | 5 | 0 (o cap. 1 de IA cobre bancos vetoriais/pgvector, parte de `ti.dados.nosql`) | — |
| IA, Ciência de Dados e Automação (5) | 4 | 1 | `ti.ia.generativa` (prompts, contexto, RAG) no cap. 1 do Livro dos Autômatos. Faltam: fundamentos de ML/deep learning/PLN, ética e Estratégia Brasileira de IA, ciência de dados e Big Data |
| Segurança da Informação (4) | 8 | 1 | `ti.seguranca.criptografia` → Códice das Sete Chaves, cap. 1; lições lic.seg.01.a/b; questões q.seg.01.001–020 (autorais, não revisadas) |
| SO, Redes e Nuvem (5) | 5 | 0 (o cap. 1 cobre parcialmente HTTPS/TLS de `ti.infra.redes`) | — |
| Governança de TI (4) | 5 | 0 | — |
| Legislação Aplicada à TI (4) | 5 | 0 (o cap. 1 toca certificação digital/ICP-Brasil) | — |
| Língua Inglesa (2) | 1 | 0 | — |

Seções do cap. 1: fundamentos e objetivos · simétrica (DES/3DES/AES, ECB/CBC/CTR/GCM) · assimétrica (RSA, DH, ECC, DSA) · hash/MAC/senhas · assinatura digital, certificados, ICP-Brasil · híbrida e TLS 1.3. O texto oficial do tópico ("Criptografia simétrica e assimétrica; infraestrutura de chaves públicas; certificados e assinatura digital") está integralmente coberto.

## Prioridade sugerida (peso 2 e volume)
IA total = 9 questões (Eng. Software Assistida por IA 4 + IA/Ciência de Dados 5) → Desenvolvimento 5 → SO/Redes/Nuvem 5 → Segurança (restante) → Banco de Dados, DevOps, Governança, Legislação de TI, Eng. de Software (4 cada) → Gerais.
