O edital pede "ética em inteligência artificial: IA responsável, explicabilidade e governança de IA". Para um auditor de TI, o tema é prático: o Tribunal pode usar IA e também fiscalizar sistemas de IA usados pelos jurisdicionados.

### IA responsável

**IA responsável** é o conjunto de princípios e práticas para que sistemas de IA sejam desenvolvidos e usados de forma segura, justa e passível de controle. Os princípios aparecem com nomes parecidos em vários documentos internacionais, como os Princípios de IA da OCDE (2019) e a Recomendação sobre a Ética da IA da UNESCO (2021).

| Princípio | Ideia |
|---|---|
| **Justiça e não discriminação** | O sistema não deve produzir resultados injustamente desfavoráveis a grupos. |
| **Transparência** | Saber que se está diante de uma IA e como ela é usada. |
| **Explicabilidade** | Conseguir explicar por que o sistema chegou a uma saída. |
| **Responsabilização** (*accountability*) | Haver pessoa ou órgão que responde pelas decisões e pode ser cobrado. |
| **Privacidade** | Tratar dados pessoais de acordo com a lei e o mínimo necessário. |
| **Segurança e robustez** | Funcionar como esperado e resistir a falhas e ataques. |
| **Supervisão humana** | Pessoas podem acompanhar, corrigir e interromper o sistema. |

A supervisão humana costuma ser descrita em graus: *human-in-the-loop* (a pessoa aprova cada decisão), *human-on-the-loop* (a pessoa monitora e pode intervir) e *human-out-of-the-loop* (sem intervenção). Quanto maior o impacto da decisão sobre direitos, mais forte deve ser a supervisão.

### Vieses

Um **viés algorítmico** ocorre quando o sistema produz erros sistemáticos que favorecem ou prejudicam certos grupos. As origens mais citadas:

| Tipo | Origem | Exemplo |
|---|---|---|
| **Histórico** | Os dados refletem desigualdades do passado. | Modelo treinado com fiscalizações antigas concentra alertas nos municípios que sempre foram mais fiscalizados. |
| **De amostragem ou representação** | Alguns grupos aparecem pouco nos dados. | Reconhecimento facial com desempenho pior em grupos sub-representados. |
| **De medição** | A variável usada é um substituto ruim do que se quer medir. | Usar "número de denúncias" como medida de corrupção. |
| **De automação** | Pessoas confiam demais na saída da máquina. | Auditor aceita a lista de risco sem conferir. |

Retirar a variável sensível (sexo, raça) **não elimina** o viés por si só, porque outras variáveis podem funcionar como *proxies* (CEP, escola, renda). Mitigações: auditar os dados, medir desempenho por grupo, usar métricas de equidade, documentar limitações e manter revisão humana.

### Explicabilidade (XAI)

**XAI** (*Explainable AI*) reúne técnicas para tornar compreensíveis as decisões de modelos. Há dois caminhos:

- **Modelos interpretáveis por natureza**: regressão linear, árvores de decisão pequenas, regras. A lógica é visível.
- **Explicações *post hoc*** para modelos caixa-preta (redes profundas, *ensembles*): aplicadas depois do treino.

Também se distingue a explicação **global** (como o modelo se comporta em geral, por exemplo a importância das variáveis) da **local** (por que uma decisão específica saiu daquele jeito).

| Técnica | Noção |
|---|---|
| **LIME** (Ribeiro et al., 2016) | Gera variações em torno de uma instância e ajusta um modelo simples e interpretável que imita o modelo complexo naquela vizinhança. Explicação **local** e independente do modelo (*model-agnostic*). |
| **SHAP** (Lundberg e Lee, 2017) | Baseado nos **valores de Shapley** da teoria dos jogos cooperativos: distribui a previsão entre as variáveis conforme a contribuição de cada uma. Gera explicações locais que, agregadas, dão visão global. |

Exemplo: um modelo marca um convênio como de alto risco. Com SHAP, o auditor vê que pesaram mais "aditivos acima de 25%" e "entidade criada há menos de um ano". Isso permite conferir se a lógica faz sentido e explicar o achado ao gestor.

### Governança de IA

**Governança de IA** é o conjunto de estruturas, políticas, papéis e processos para dirigir, monitorar e prestar contas do uso de IA em uma organização. Elementos usuais:

- Inventário dos sistemas de IA em uso e classificação por risco.
- Políticas de uso aceitável (no TCE-GO, a Resolução Administrativa nº 24/2024 trata do uso de ferramentas de IA, conforme o edital).
- Avaliação de impacto antes da implantação e monitoramento contínuo (desempenho, deriva dos dados, vieses).
- Documentação: dados usados, finalidade, limitações e responsáveis.
- Registro das decisões e possibilidade de auditoria.

Referências de mercado: a norma **ISO/IEC 42001:2023** (sistema de gestão de IA), a **ISO/IEC 23894:2023** (gestão de riscos de IA) e o **AI RMF 1.0** do NIST (2023), organizado nas funções *Govern*, *Map*, *Measure* e *Manage*. Na União Europeia, o Regulamento (UE) 2024/1689 (AI Act) classifica sistemas por nível de risco.

> Nota de fonte: o edital não cita nenhuma dessas normas internacionais. Elas aparecem aqui como referência conceitual. O projeto de lei brasileiro sobre IA (PL 2.338/2023) não foi tratado porque sua tramitação não foi conferida em fonte oficial nesta revisão.

### Pegadinhas

1. "Remover do conjunto de dados as variáveis sensíveis garante um modelo sem viés." Falso. Outras variáveis podem funcionar como *proxies*.
2. "LIME gera explicações locais, aproximando o modelo complexo por um modelo simples em torno de uma instância." Verdadeiro. É a ideia central da técnica.
3. "SHAP é baseado em valores de Shapley, da teoria dos jogos." Verdadeiro. Distribui a previsão entre as variáveis.
4. "Explicabilidade só é possível em modelos lineares." Falso. Há técnicas *post hoc* para modelos caixa-preta.
5. "Viés de automação é a tendência das pessoas de confiar em excesso na saída do sistema." Verdadeiro. Por isso a revisão humana precisa ser efetiva.
