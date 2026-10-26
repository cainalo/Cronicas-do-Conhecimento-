### Infraestrutura como código (IaC)

Descrever servidores, redes, bancos e permissões em **arquivos versionados**, aplicados por ferramentas, em vez de configurar à mão. Benefícios: **reprodutibilidade** (o mesmo código cria ambientes idênticos), revisão por *pull request*, histórico, menos erros manuais e recuperação rápida.

| Abordagem | Descreve | Exemplo |
|---|---|---|
| **Declarativa** | **O estado desejado**; a ferramenta descobre como chegar lá | Terraform, Kubernetes, CloudFormation |
| **Imperativa** | **Os passos** a executar | *Scripts* de shell |

- **Provisionamento**: criar a infraestrutura (Terraform, OpenTofu, CloudFormation). O Terraform mantém um **arquivo de estado** e mostra o que mudará com `plan` antes de `apply`.
- **Gerenciamento de configuração**: deixar servidores existentes no estado desejado (pacotes, arquivos, serviços), como Ansible, Puppet e Chef. O **Ansible** é *agentless* (conecta por SSH) e usa *playbooks* em YAML.
- **Idempotência**: aplicar a mesma configuração várias vezes leva ao mesmo resultado, sem efeitos duplicados.
- **Deriva de configuração** (*drift*): diferença entre o código e o ambiente real, geralmente por mudanças manuais.
- **Infraestrutura imutável**: em vez de alterar um servidor, cria-se um novo a partir da imagem atualizada e descarta-se o antigo.

### Contêineres e Docker

Um **contêiner** empacota a aplicação com suas dependências e roda isolado, **compartilhando o kernel** do sistema hospedeiro. Por isso é mais leve e sobe mais rápido que uma **máquina virtual**, que tem sistema operacional próprio sobre um *hypervisor*.

| Conceito | O que é |
|---|---|
| **Imagem** | Modelo somente leitura, em **camadas**, construído a partir de um **Dockerfile** |
| **Contêiner** | Instância em execução de uma imagem |
| **Registro** | Repositório de imagens (Docker Hub, GitHub Container Registry, registros privados) |
| **Volume** | Armazenamento persistente fora do ciclo de vida do contêiner |

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]
```

Boas práticas: imagem base pequena e oficial; ***multi-stage build*** para não levar ferramentas de compilação à imagem final; não rodar como *root*; nada de segredos na imagem; versões fixas; varredura de vulnerabilidades.

**Docker Compose** define e sobe **vários contêineres** de uma aplicação (por exemplo, aplicação, banco e cache) num arquivo `compose.yaml`, com `docker compose up`. É muito usado em desenvolvimento e testes.

### Kubernetes

Orquestrador de contêineres que automatiza implantação, escala, recuperação e rede em um *cluster*.

| Objeto | Função |
|---|---|
| **Pod** | Menor unidade implantável: um ou mais contêineres que compartilham rede e armazenamento |
| **Deployment** | Mantém o número desejado de réplicas de um Pod e faz atualizações graduais (*rolling update*) e *rollback* |
| **Service** | Endereço estável e balanceamento para um conjunto de Pods (ClusterIP, NodePort, LoadBalancer) |
| **Ingress** | Regras de entrada HTTP/HTTPS de fora do *cluster* para os Services |
| **ConfigMap** / **Secret** | Configuração e dados sensíveis injetados nos Pods |
| **Namespace** | Divisão lógica do *cluster* |
| **Node** | Máquina (física ou virtual) que executa os Pods |

O *control plane* (API server, *scheduler*, *controllers* e o banco **etcd**) mantém o **estado desejado** declarado em YAML: se um Pod morre, outro é criado. *Probes* de **liveness** (reiniciar se travou) e **readiness** (só receber tráfego quando pronto) informam a saúde. O **HorizontalPodAutoscaler** ajusta as réplicas conforme métricas como CPU.

### Pegadinhas

1. "Contêineres têm, cada um, seu próprio kernel." Falso. Compartilham o kernel do hospedeiro; quem tem sistema próprio é a VM.
2. "No Kubernetes, a menor unidade implantável é o contêiner." Falso. É o Pod.
3. "Secrets do Kubernetes dispensam outros cuidados, pois são sempre criptografados." Falso. Por padrão são só codificados em base64; a cifragem em repouso precisa ser configurada.
4. "Ferramentas declarativas exigem descrever cada passo." Falso. Descrevem o estado desejado.
