### CI, entrega contínua e implantação contínua

| Prática | Significa | Até onde vai |
|---|---|---|
| **Integração contínua** (CI) | Integrar o código no tronco com frequência; a cada integração, um *pipeline* **compila e roda os testes** automaticamente | Artefato testado |
| **Entrega contínua** (*Continuous Delivery*) | Todo *commit* aprovado gera uma versão **pronta para produção**; a publicação final é uma **decisão manual** | Pronto para implantar |
| **Implantação contínua** (*Continuous Deployment*) | Todo *commit* que passa no *pipeline* vai **automaticamente** para produção | Em produção, sem intervenção |

A diferença entre as duas últimas é só a aprovação manual antes da produção.

### O pipeline

Etapas típicas:

1. *checkout* do código;
2. instalação de dependências;
3. ***build***;
4. **testes unitários**;
5. **análise estática** e de segurança (SAST, dependências vulneráveis, segredos);
6. empacotamento (imagem de contêiner, pacote);
7. testes de integração;
8. implantação em **homologação**;
9. testes de aceitação;
10. implantação em **produção**.

Princípios:

- **Construa uma vez, implante muitas**: o mesmo artefato passa por todos os ambientes; só a configuração muda.
- ***Fail fast***: etapas rápidas primeiro, para dar retorno em minutos.
- *Pipeline* quebrado é prioridade da equipe.
- **Segredos** em cofres ou variáveis protegidas, nunca no repositório.

### Ambientes

| Ambiente | Para quê |
|---|---|
| **Desenvolvimento** | Trabalho diário dos desenvolvedores |
| **Homologação** (*staging*) | Réplica o mais fiel possível da produção, para testes e aceite do usuário |
| **Produção** | Usuários reais |

Diferenças de configuração entre ambientes devem ser explícitas e versionadas. Dados pessoais reais de produção não devem ser copiados para desenvolvimento sem mascaramento.

### Estratégias de implantação

| Estratégia | Como funciona |
|---|---|
| ***Rolling*** | Substitui as instâncias aos poucos |
| ***Blue-green*** | Dois ambientes idênticos; o tráfego é trocado de uma vez do antigo (azul) para o novo (verde), com retorno imediato se der errado |
| ***Canary*** | A nova versão recebe primeiro uma pequena fatia dos usuários; amplia-se se as métricas estiverem boas |
| ***Feature flags*** | O código vai para produção desligado e é ativado por configuração, separando **implantar** de **lançar** |

### Ferramentas

| Ferramenta | Como se configura |
|---|---|
| **GitHub Actions** | Arquivos YAML em `.github/workflows/`. Um *workflow* é disparado por **eventos** (`on: push`, `pull_request`, `schedule`) e tem **jobs**, que rodam em ***runners*** e têm **steps**; reaproveita **actions** prontas (`uses:`) |
| **GitLab CI/CD** | Arquivo `.gitlab-ci.yml` na raiz; **stages** executados em ordem (por exemplo, build, test, deploy) e **jobs** em cada stage, executados por ***GitLab Runners*** |
| **Jenkins** | Servidor de automação de código aberto, extensível por *plugins*; *pipelines* descritos num **`Jenkinsfile`** (declarativo ou *scripted*) com `pipeline`, `agent`, `stages`, `steps` |

```yaml
# Exemplo mínimo de GitHub Actions
name: ci
on: [push, pull_request]
jobs:
  testes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
```

### Pegadinhas

1. "Na entrega contínua, toda mudança vai automaticamente para produção." Falso. Isso é implantação contínua.
2. "Deve-se compilar um artefato diferente para cada ambiente." Falso. Constrói-se uma vez e muda-se só a configuração.
3. "No blue-green, os usuários são migrados aos poucos por percentual." Falso. Essa é a canary; no blue-green a troca é de uma vez.
4. "O arquivo de pipeline do GitLab fica em `.github/workflows`." Falso. É `.gitlab-ci.yml`.
