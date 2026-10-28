# Arquitetura do laboratório com execução real

Atualizado em 28/10/2026. Este documento separa o simulador educacional já implementado do runtime real que deve ser integrado na próxima etapa.

## Estado atual: terminal didático isolado

`src/lib/terminal.ts` interpreta um subconjunto explícito de comandos num sistema de arquivos virtual. Isso permite ensinar navegação, leitura de logs, permissões Unix (`ls -l`, `stat`, `chmod`), memória/processos, execução guiada de JavaScript e Git sem dar acesso ao dispositivo, ao navegador ou ao servidor de hospedagem. As tarefas do exercício só contam como concluídas quando os comandos e os estados exigidos são observados.

Esse runtime é intencionalmente limitado. Ele **não é um kernel Linux nem um shell POSIX completo**: as saídas de processos e rede são dados do cenário, o comando `node` interpreta exemplos conhecidos em vez de executar JavaScript arbitrário, e parte dos comandos ainda não está implementada. A interface informa essa distinção.

## Próximo passo: dois runtimes com objetivos diferentes

### A. Sistema operacional Linux de verdade — v86

Avaliar e integrar o emulador [copy/v86](https://github.com/copy/v86) e seu [pacote npm](https://www.npmjs.com/package/v86). O projeto emula hardware x86 no navegador usando WebAssembly; a documentação informa que extensões x86 de 64 bits não são suportadas, portanto a primeira imagem deverá ser um Linux educacional de 32 bits ou uma imagem pequena compatível.

A implementação deve:

1. Carregar o emulador apenas quando o aluno entrar no laboratório de sistema real; não aumentar o bundle inicial do Pórtico.
2. Servir de forma controlada os arquivos necessários (emulador/WASM, BIOS e imagem de boot). Não assumir que esses binários já existem no repositório: o v86 upstream informa que as imagens de disco de teste não são incluídas no código-fonte.
3. Preferir uma imagem pequena, sem dados pessoais nem credenciais, sem rede externa por padrão e com botão de reinicialização para restaurar um estado conhecido.
4. Confirmar licença e proveniência da imagem Linux; documentar tamanho e checksum dos artefatos, política de atualização e origem dos recursos.
5. Testar no Chrome Android e num navegador de desktop. Medir o tempo de boot, memória utilizada, consumo de bateria e o tamanho dos downloads antes de ativar o laboratório na trilha principal.
6. Manter o terminal virtual atual como modo introdutório e fallback se os recursos de emulação falharem.

A documentação do v86 demonstra o boot com BIOS e uma imagem de CD/disco. Quando os recursos são hospedados em outro domínio, CORS e carregamento por intervalos HTTP podem ser necessários. Por isso, não se deve apontar o laboratório para imagens aleatórias de terceiros nem presumir que qualquer hospedagem estática as servirá de modo compatível.

### B. Programação executada de verdade — WebContainers

Para exercícios focados em JavaScript/Node.js, analisar a [API WebContainers](https://webcontainers.io/api). Ela fornece um runtime Node.js no navegador, um sistema de arquivos e processos iniciados por `spawn`; isso é diferente de emular um kernel Linux. É uma alternativa complementar para executar `node`, `npm`, testes e scripts reais sem prometer que comandos de administração Linux terão semântica de uma máquina virtual.

Antes de adotar, verificar os requisitos da hospedagem atual do Pórtico, suporte do navegador Android, isolamento entre origens, política comercial, funcionamento no APK Capacitor e modo de degradação em navegadores incompatíveis.

## Arquitetura de segurança necessária

- Não enviar comandos do aluno para uma shell do servidor Pórtico.
- Não montar o sistema de arquivos pessoal do usuário no ambiente de treino.
- Começar com rede externa desabilitada e sem segredos; qualquer atividade de rede deverá ter alvos didáticos próprios e explícitos.
- Limitar CPU, memória, duração e tamanho do filesystem quando o runtime permitir.
- Reiniciar a VM a partir de uma imagem limpa e separar os snapshots por usuário/aparelho.
- Mostrar claramente em cada laboratório qual runtime está ativo: **simulador**, **Linux emulado** ou **Node.js no navegador**.
- Nunca marcar tarefa como concluída apenas por abrir a página: validar evidência do comando/execução esperado.
- O ambiente deve funcionar como ferramenta de apoio de estudo; não deve transformar o Pórtico num servidor de execução remota.

## Critério de conclusão da próxima etapa

O modo Linux real só poderá ser considerado pronto quando a imagem de boot for escolhida e licenciada, carregar no site publicado e no APK, permitir executar comandos reais de uma sessão Linux, reiniciar com segurança, funcionar sem acesso ao host, passar testes de regressão e ser verificado visualmente em tela móvel e desktop.

## Referências técnicas

- [copy/v86 — código, README e licença BSD-2-Clause](https://github.com/copy/v86)
- [v86 no npm](https://www.npmjs.com/package/v86)
- [Exemplo oficial de carregamento assíncrono de imagem no v86](https://github.com/copy/v86/blob/master/examples/async_load.html)
- [WebContainers API Reference](https://webcontainers.io/api)
- [WebContainers — Introduction](https://webcontainers.io/guides/introduction)
