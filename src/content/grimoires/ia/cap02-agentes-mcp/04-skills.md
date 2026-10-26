### De instruções repetidas a extensões sob demanda

Equipes passaram de prompts repetidos para convenções persistentes, procedimentos especializados e automações acionadas por eventos. Na documentação atual da Anthropic, *skills* carregam instruções e recursos quando são relevantes; *hooks* disparam ações em eventos definidos. A diferença prática é importante: um procedimento orienta uma tarefa, enquanto uma automação pode fazer uma verificação rodar no ponto configurado.

Fontes: [Agent Skills (Anthropic)](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) e [skills, hooks, regras e subagentes no Claude Code](https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more).

O edital cita "extensibilidade e automação de fluxos de trabalho especializados (*skills* e *tool use*)". Já vimos o *tool use*. Esta seção trata das formas de ensinar ao agente procedimentos próprios da equipe.

### Por que estender o agente

Um agente genérico sabe programar, mas não conhece o jeito da sua organização: como fazer o deploy, quais verificações são obrigatórias antes de um commit, qual o modelo de documento técnico, como consultar o sistema interno. Repetir essas instruções em toda conversa gasta contexto e gera inconsistência.

### Mecanismos de extensão

| Mecanismo | O que é | Quando usar |
|---|---|---|
| Instruções do projeto | Arquivo lido no início da sessão (ex.: `CLAUDE.md`) com regras e convenções. | Regras que valem para quase todo trabalho no repositório. |
| *Skills* | Pacotes de instruções, e às vezes scripts e modelos, carregados só quando a tarefa pede. | Procedimentos especializados e repetíveis. |
| Ferramentas e servidores MCP | Novas ações que o agente pode executar. | Acesso a sistemas externos. |
| Comandos personalizados | Atalhos que disparam um fluxo pronto. | Tarefas frequentes acionadas pelo usuário. |
| *Hooks* | Ações automáticas executadas pela aplicação em eventos (antes de usar uma ferramenta, ao terminar uma tarefa). | Garantias que não podem depender da "boa vontade" do modelo, como sempre rodar o formatador. |

### Skills

Nas ferramentas da Anthropic, uma *skill* é uma pasta com um arquivo `SKILL.md`. O cabeçalho do arquivo tem nome e descrição; o corpo, as instruções. A pasta pode conter scripts e arquivos de apoio.

O ponto técnico importante é a **divulgação progressiva** (*progressive disclosure*): de início, o agente vê apenas o nome e a descrição de cada skill. O conteúdo completo só entra no contexto quando a tarefa é relevante. Assim, é possível ter muitas skills instaladas sem lotar a janela de contexto.

```
.claude/skills/revisao-acessibilidade/
├── SKILL.md        (nome, descrição e passo a passo)
└── checklist.md    (material de apoio lido sob demanda)
```

### Instrução ou garantia?

Uma diferença sutil e cobrável: instruções em texto (prompt, `CLAUDE.md`, skill) **orientam** o modelo, que pode deixar de segui-las. Já um *hook* ou uma regra de permissão é executado pela aplicação e **garante** o comportamento. Para requisitos de segurança, prefira garantias a pedidos.
