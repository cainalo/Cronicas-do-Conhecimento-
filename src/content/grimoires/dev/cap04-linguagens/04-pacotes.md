Quase nenhum sistema é escrito do zero: ele depende de bibliotecas de terceiros, que dependem de outras. O edital cobra o **gerenciamento de dependências** (declarar, instalar e travar versões), o **empacotamento** (gerar um artefato distribuível) e a **publicação** (disponibilizar o artefato em um registro ou ambiente).

### Dos primeiros repositórios ao lockfile

- **1995: o CPAN.** A comunidade Perl criou um dos primeiros grandes repositórios de pacotes.
- **2004 e 2010: Maven e npm.** Saiu o Maven 1.0, da Apache, para Java (2004); Isaac Schlueter lançou o npm (2010).
- **Por volta de 2010: o SemVer.** Tom Preston-Werner, cofundador do GitHub, publicou o Versionamento Semântico.
- **2016 e 2017: left-pad e lockfile.** A retirada do minúsculo pacote left-pad do npm quebrou milhares de builds (2016); o npm 5 passou a gerar o package-lock.json (2017).

### Versionamento semântico

O **SemVer** (semver.org) usa o formato **MAJOR.MINOR.PATCH**:

| Parte | Incrementa quando | Exemplo |
|---|---|---|
| MAJOR | há mudança **incompatível** na API | 2.4.1 → 3.0.0 |
| MINOR | há funcionalidade nova **compatível** | 2.4.1 → 2.5.0 |
| PATCH | há correção de defeito compatível | 2.4.1 → 2.4.2 |

Versões `0.y.z` indicam desenvolvimento inicial: a API pode mudar a qualquer momento. Rótulos de pré-lançamento vêm após hífen (`1.0.0-beta.1`).

No npm, os intervalos mais cobrados são:

| Notação | Aceita | Em palavras |
|---|---|---|
| `1.2.3` | só 1.2.3 | versão exata |
| `~1.2.3` | ≥ 1.2.3 e < 1.3.0 | só **patches** |
| `^1.2.3` | ≥ 1.2.3 e < 2.0.0 | **minor e patch**, mantendo o major |
| `^0.2.3` | ≥ 0.2.3 e < 0.3.0 | com major 0, o circunflexo fica mais conservador |
| `*` | qualquer | evitar |

O circunflexo (`^`) é o padrão que o `npm install` grava no `package.json`.

### package.json e lockfile

O `package.json` descreve o projeto Node.js:

```json
{
  "name": "painel-auditoria",
  "version": "1.4.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run"
  },
  "dependencies": { "react": "^18.3.1" },
  "devDependencies": { "typescript": "~5.6.2", "vitest": "^2.1.0" }
}
```

- `dependencies`: necessárias em produção.
- `devDependencies`: só para desenvolver, testar e construir (compilador, testes, linters).
- `peerDependencies`: o pacote espera que o projeto hospedeiro forneça (comum em plugins de React).
- `scripts`: comandos executados com `npm run <nome>` (`npm test` e `npm start` dispensam o `run`).

O **lockfile** (`package-lock.json` no npm; `yarn.lock` e `pnpm-lock.yaml` em outras ferramentas) registra a versão **exata** de **toda a árvore**, incluindo dependências transitivas, com hashes de integridade. Ele deve ser **versionado no Git** para que todos os ambientes instalem o mesmo conjunto. Em integração contínua, `npm ci` instala estritamente pelo lockfile, apaga o `node_modules` antes e falha se lockfile e `package.json` estiverem inconsistentes. A pasta `node_modules` **não** vai para o repositório.

Outros comandos úteis: `npm install <pacote>` (adiciona dependência), `npm install -D <pacote>` (de desenvolvimento), `npm update`, `npm outdated`, `npm audit` (vulnerabilidades conhecidas) e `npx <ferramenta>` (executa um binário sem instalá-lo globalmente).

### pip e Maven

**Python**: o `pip` instala pacotes do **PyPI**. O arquivo `requirements.txt` lista dependências, geralmente fixadas com `==`; o operador `~=` indica "versão compatível" (`~=1.4.2` aceita ≥ 1.4.2 e < 1.5). O `pyproject.toml` é o arquivo moderno de configuração de projeto e build. O empacotamento gera uma *wheel* (`.whl`, distribuição pronta) e uma *sdist* (código-fonte), normalmente com `python -m build`; a publicação no PyPI costuma ser feita com a ferramenta `twine`. Instale sempre dentro de um `venv`.

**Java**: o **Maven** declara dependências no `pom.xml`, identificando cada artefato por **groupId**, **artifactId** e **version** (as "coordenadas"). Baixa do **Maven Central** e guarda em cache no repositório local (`~/.m2`). O ciclo de vida padrão tem fases encadeadas; executar uma fase executa todas as anteriores:

| Fase | O que faz |
|---|---|
| `validate` | verifica se o projeto está correto |
| `compile` | compila o código-fonte |
| `test` | roda os testes unitários |
| `package` | empacota em **JAR** ou **WAR** |
| `verify` | executa verificações de integração e qualidade |
| `install` | copia o artefato para o repositório **local** |
| `deploy` | envia o artefato para o repositório **remoto** |

Escopos de dependência: `compile` (padrão), `test` (só nos testes), `provided` (fornecida pelo servidor de aplicação), `runtime`. Versões terminadas em `-SNAPSHOT` indicam versão em desenvolvimento, que pode ser substituída. O **Gradle** é a principal alternativa ao Maven.

### Build, empacotamento e publicação

O **build** transforma o código-fonte em um **artefato** executável ou implantável. Em front-end, isso inclui transpilar TypeScript e JSX, **empacotar** módulos em poucos arquivos (*bundling*, com Vite, webpack, esbuild), **minificar** e eliminar código não usado (*tree shaking*). Em Java, gerar o JAR/WAR; em Python, a wheel; em qualquer linguagem, possivelmente uma **imagem de contêiner** (tratada no grimório de DevOps).

Para publicar uma biblioteca no npm:

```bash
npm version minor     # 1.4.0 -> 1.5.0, cria commit e tag Git v1.5.0
npm publish           # envia ao registro (exige login e nome disponível)
```

Uma versão publicada no registro do npm **não pode ser republicada** com o mesmo número: correções exigem nova versão. Organizações costumam usar **registros privados** (Nexus, Artifactory, GitHub Packages, GitLab Package Registry) para artefatos internos e como cache dos públicos.

A marcação da versão no Git usa **tags** (`git tag v1.5.0`); o restante do fluxo de Git é tratado no grimório de DevOps.

Cuidados de **cadeia de suprimentos**: travar versões com lockfile, revisar dependências novas, rodar `npm audit` ou `pip-audit`, desconfiar de nomes parecidos com pacotes populares (*typosquatting*) e gerar uma lista de componentes (**SBOM**) quando o órgão exigir. Builds **reprodutíveis**, em que o mesmo código e o mesmo lockfile geram o mesmo artefato, facilitam a auditoria do que foi implantado.

### Pegadinhas

1. "`~1.2.3` aceita a versão 1.3.0." Falso. O til aceita só patches: até antes de 1.3.0.
2. "`^1.2.3` aceita a versão 1.9.0, mas não a 2.0.0." Verdadeiro. O circunflexo mantém o major.
3. "O lockfile deve ficar fora do controle de versão, como o node_modules." Falso. O lockfile deve ser versionado; o node_modules, não.
4. "No SemVer, uma mudança incompatível na API exige incrementar o MINOR." Falso. Exige incrementar o MAJOR.
5. "No Maven, `mvn package` executa também as fases compile e test." Verdadeiro. Cada fase executa as anteriores do ciclo.
