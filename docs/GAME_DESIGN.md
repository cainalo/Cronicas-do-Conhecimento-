# Game design

## Aprovado
- **Tom:** mistério investigativo. O aprendiz é um auditor-escriba que investiga registros adulterados no reino.
- **Trilha:** mapa do reino com uma região por disciplina do edital.
- **Recompensas:** XP, níveis, títulos, selos, inventário e missões semanais.

## Implementado (`src/lib/game.ts`, `src/content/game/`)
- **Títulos por nível:** Aprendiz (1), Copista (3), Escriba (5), Investigador (8), Auditor (12), Mestre da Torre (16).
- **Selos (12):** Primeira Página, Capítulo Selado, Bibliotecário (5 capítulos), Primeira Lição, Lição sem Mácula (100%), Cem Respostas, Redenção (10 recuperações), Constância (7 dias seguidos), Provação Simulada (≥10 questões e ≥70%), Pena Firme (estudo de caso entregue), Memória de Ferro (10 cartões ≥21 dias), Domínio Demonstrado (100% de um tópico). Derivados do histórico; não precisam de tabela própria.
- **Inventário:** um artefato por tópico com questões, revelado com domínio ≥ 80% (última tentativa correta). Nomes em `content/game/artifacts.ts` (provisórios).
- **Missões semanais (segunda a domingo):** 50 questões, 2 lições, 30 flashcards, 1 simulado ou estudo de caso. 40 XP por missão, resgatável uma vez por semana (`weekly_mission`, ref `<segunda>:<missão>`; unicidade também no banco). Não cumprir não tira nada.
- **Sequência de dias:** dias com atividade registrada (respostas, lições, cartões, entregas, leitura).
- **Mapa:** 14 regiões com nomes provisórios em `content/game/realm.ts`; névoa onde não há grimório; aguada de cor proporcional ao domínio; Torre dos Escribas no centro.

## Mecânicas anteriores (mantidas)
- XP por estudo real, uma vez por conquista: 1º acerto de questão 10 · recuperar questão na revisão 5 · concluir lição 30 · ler capítulo inteiro 50 · entregar estudo de caso 20 · cartão dominado 3 · missão semanal 40.
- Nível n a partir de 50·(n−1)² XP. Sem vidas, sem punição por descanso.

## Pendente (perguntar ao usuário)
Protagonista, conflito central, personagens recorrentes (mestres, antagonista), prólogo e provação final; nomes definitivos de regiões e artefatos; nome da plataforma.
