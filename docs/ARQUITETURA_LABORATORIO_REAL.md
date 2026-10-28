# Arquitetura dos ambientes práticos de TI

Atualizado em 28/10/2026. Este documento distingue o que está realmente publicado do que ainda é uma etapa futura de desenvolvimento.

## O que existe hoje

### Terminal didático isolado

O runtime em uso é `src/lib/terminal-lab.ts`. Ele interpreta um conjunto explícito de comandos Linux sobre um sistema de arquivos, processos e estado Git virtuais. Os cinco laboratórios são:

- **Processos e recursos:** `ps`, `top`, `vmstat`, `kill`, `free` e `df`.
- **Arquivos e logs:** navegação, leitura e filtragem de registros.
- **Shell, cópias e permissões:** diretórios, cópia de arquivos, `chmod` e verificação.
- **Rede e serviços:** interfaces, conectividade, serviços e logs do sistema.
- **Git e histórico:** `git status`, `git diff`, `git add`, `git commit` e `git log --oneline`.

O laboratório de código de `/laboratorio-codigo` é uma experiência separada. Os estados locais dos terminais didáticos não executam comandos no aparelho, no servidor de hospedagem nem numa shell do sistema operacional.

O terminal interno é deliberadamente limitado: certas saídas representam um cenário de aprendizagem; isso não equivale a um kernel Linux, a um shell POSIX completo ou à execução arbitrária de JavaScript. A interface precisa manter essa distinção clara. Uma tarefa só conta como concluída quando a evidência prevista é observada, não apenas porque a página foi aberta.

### Linux x86 emulado fora do Pórtico

No laboratório de processos existe um link para o perfil Buildroot do [emulador v86](https://copy.sh/v86/?profile=buildroot). Esse link abre uma experiência externa independente. **A sessão externa não compartilha estado nem registra o progresso do aluno no Pórtico.** Não a descreva como se já fosse uma máquina virtual integrada ao aplicativo.

## Próxima etapa: runtimes reais com objetivos diferentes

### A. Linux emulado no navegador — v86

Avaliar a integração do [v86](https://github.com/copy/v86) e do [pacote npm](https://www.npmjs.com/package/v86). O v86 emula hardware x86 com WebAssembly; a imagem do sistema operacional precisa ser selecionada e licenciada separadamente. A compatibilidade, o tamanho do download e o boot devem ser testados no Chrome Android e no desktop.

A implementação proposta deve:

1. Carregar o emulador apenas quando o aluno abrir o laboratório real, sem aumentar o bundle inicial do Pórtico.
2. Hospedar ou buscar de forma controlada os recursos necessários (emulador/WASM, BIOS e imagem de boot). Não presumir que imagens de disco estão incluídas no pacote upstream.
3. Começar com uma imagem pequena, educacional, licenciada e sem dados pessoais ou credenciais.
4. Manter rede externa desativada por padrão, oferecer reinício para voltar a um estado conhecido e evitar qualquer montagem do sistema de arquivos pessoal do usuário.
5. Documentar origem, licença, tamanho, checksum e política de atualização dos binários.
6. Medir tempo de inicialização, memória, bateria, estabilidade, acessibilidade e desempenho em aparelhos Android modestos.
7. Preservar o terminal didático como introdução e fallback se a emulação não carregar.

A hospedagem e o carregamento de imagens podem exigir CORS e suporte a requisições HTTP por intervalos. Não apontar para imagens aleatórias de terceiros nem presumir que qualquer hospedagem estática seja compatível.

### B. JavaScript/Node.js no navegador — WebContainers

Para executar código JavaScript/Node.js de verdade, avaliar a [API WebContainers](https://webcontainers.io/api). Esse runtime oferece recursos de Node.js, sistema de arquivos e processos próprios; ele é complementar à máquina virtual Linux, não um substituto para um kernel Linux nem para comandos de administração de sistema.

Antes da adoção, verificar suporte no navegador Android, integração com Capacitor, requisitos de origem segura, isolamento, política de licenciamento/comercial e comportamento em navegadores incompatíveis.

## Requisitos de segurança e experiência

- Nunca encaminhar comandos do aluno para uma shell do servidor Pórtico.
- Não montar arquivos pessoais do dispositivo no ambiente de treino.
- Desabilitar rede externa por padrão; exercícios de conectividade devem usar alvos didáticos explícitos.
- Limitar CPU, memória, tempo de execução e tamanho do filesystem quando o runtime oferecer esses controles.
- Reiniciar a VM a partir de uma imagem limpa e isolar snapshots por usuário/dispositivo.
- Identificar claramente o modo ativo em cada laboratório: **simulador didático**, **Linux emulado** ou **Node.js no navegador**.
- Validar tarefas por evidência objetiva da execução e manter estado de progresso separado por usuário.
- Ter mensagens de erro e um caminho alternativo quando o runtime não puder iniciar.
- Testar a navegação em tela pequena, orientação vertical/horizontal, modo claro/escuro e teclado virtual Android.

## Critério de conclusão do Linux real

O modo Linux integrado só estará pronto quando uma imagem licenciada iniciar dentro do site e do APK, aceitar comandos reais de uma sessão Linux, puder ser reiniciada com segurança, ficar isolada do host, funcionar em dispositivos móveis suportados, passar a suíte de regressão e auditoria visual e registrar claramente seu estado e limitações.

## Referências técnicas

- [v86 — código e documentação](https://github.com/copy/v86)
- [v86 no npm](https://www.npmjs.com/package/v86)
- [Exemplo de carregamento assíncrono de imagem no v86](https://github.com/copy/v86/blob/master/examples/async_load.html)
- [WebContainers API Reference](https://webcontainers.io/api)
- [WebContainers — Introduction](https://webcontainers.io/guides/introduction)
