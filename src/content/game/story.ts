// História do Crônicas do Conhecimento (decidida com o usuário em 17/10/2026):
// o jogador é um auditor aprendiz da Ordem dos Auditores; a Névoa do Esquecimento apaga os
// registros do Reino; Bubo, a coruja escriba, é o mentor. A história aparece em três lugares:
// prólogo (primeira visita), falas por região do mapa e o diário de pistas (uma pista por lição
// concluída, sempre na mesma ordem, qualquer que seja a lição).

export interface ProloguePage {
  title: string;
  text: string;
  scene: 'reino' | 'biblioteca' | 'treino';
}

export const prologue: ProloguePage[] = [
  {
    title: 'A Névoa do Esquecimento',
    scene: 'reino',
    text: 'Há três invernos, uma névoa cinzenta desceu sobre o Reino. Por onde passa, apaga registros: contratos somem dos arquivos, livros perdem páginas, e regiões inteiras desaparecem do mapa.',
  },
  {
    title: 'A Torre dos Escribas',
    scene: 'biblioteca',
    text: 'Só a Ordem dos Auditores enxerga através dela. Você acaba de chegar à Torre como aprendiz. Eu sou Bubo, guardião da biblioteca, e vou acompanhar seus estudos.',
  },
  {
    title: 'O Grande Exame',
    scene: 'treino',
    text: 'Cada tópico que você domina dissipa a névoa de um pedaço do mapa. Em janeiro, o Conselho realiza o Grande Exame e nomeia os novos auditores. Até lá, estude, colecione pistas e descubra quem alimenta a névoa.',
  },
];

export interface RegionStory {
  /** Fala de Bubo ao abrir o grimório da região. */
  intro: string;
  /** Fala quando o domínio da região passa de 80%. */
  cleared: string;
}

/** Uma cena por disciplina do edital (chave = id da disciplina). */
export const regionStories: Record<string, RegionStory> = {
  'cg.portugues': {
    intro: 'No Vale das Letras, a névoa troca vírgulas de lugar e muda o sentido dos decretos. Leia com atenção redobrada.',
    cleared: 'O Vale voltou a falar claro. Nenhuma crase fora do lugar escapa de você.',
  },
  'cg.matematica': {
    intro: 'Nos Montes dos Números, os tesoureiros perderam a conta. Sem razão e proporção, ninguém sabe quanto foi desviado.',
    cleared: 'As contas dos Montes fecham de novo, e cada porcentagem tem nome e destino.',
  },
  'cg.legislacao': {
    intro: 'A Cidadela das Leis guarda a Carta que dá poder ao Tribunal. A névoa quer que esqueçamos quem fiscaliza quem.',
    cleared: 'A Carta brilha outra vez: você sabe de cor quem julga as contas do Reino.',
  },
  'ti.engsoft': {
    intro: 'Nas Oficinas dos Arquitetos, as plantas foram borradas. Sem requisitos, as obras desabam antes do telhado.',
    cleared: 'As Oficinas voltaram a construir com prumo, e cada viga passa no martelo de prova.',
  },
  'ti.dev': {
    intro: 'As Pontes de Pedra ligam os sistemas do Reino. A névoa esconde quem atravessa e com que selo.',
    cleared: 'As Pontes estão firmes: cada mensageiro mostra seu selo, e só passa quem deve.',
  },
  'ti.ia-eng': {
    intro: 'Na Forja dos Autômatos, os aprendizes de ferro trabalham sozinhos. Sem vigilância, um deles pode apagar o arquivo errado.',
    cleared: 'Os autômatos da Forja agora pedem licença antes de agir, e você sabe por quê.',
  },
  'ti.devops': {
    intro: 'No Porto das Entregas, navios zarpam sem inspeção e voltam avariados. Ninguém sabe qual carga causou o naufrágio.',
    cleared: 'O Porto tem esteiras, faróis e diário de bordo: nenhuma avaria passa despercebida.',
  },
  'ti.dados': {
    intro: 'O Arquivo Profundo fica sob o castelo. É ali que a névoa é mais densa, e é ali que os registros mais importam.',
    cleared: 'O Arquivo Profundo está em ordem: cada registro tem chave, e cada cópia, ponto de retorno.',
  },
  'ti.ia': {
    intro: 'No Bosque dos Oráculos, as previsões parecem certeiras, mas ninguém sabe explicar como foram feitas.',
    cleared: 'Os Oráculos do Bosque agora mostram seus motivos, e você sabe medir quando acertam.',
  },
  'ti.seguranca': {
    intro: 'A Fortaleza das Sete Chaves resistiu à névoa até agora. Proteja-a, ou nenhum segredo do Reino estará a salvo.',
    cleared: 'As Sete Chaves estão sob sua guarda. A Fortaleza nunca esteve tão segura.',
  },
  'ti.infra': {
    intro: 'Na Encruzilhada das Estradas, os pacotes se perdem no caminho e as máquinas emperram. Alguém trocou as placas.',
    cleared: 'As estradas da Encruzilhada estão sinalizadas, e cada engrenagem gira no seu ritmo.',
  },
  'ti.governanca': {
    intro: 'No Conselho dos Regentes, decide-se o que o Reino compra e por quê. A névoa adora contratos sem estudo.',
    cleared: 'O Conselho só aprova o que tem estudo, indicadores e prestação de contas.',
  },
  'ti.legislacao': {
    intro: 'O Cartório do Reino guarda as leis que todo sistema deve obedecer. A névoa apaga justamente os dados pessoais dos súditos.',
    cleared: 'O Cartório protege os súditos: cada dado pessoal tem finalidade, guarda e prazo.',
  },
  'ti.ingles': {
    intro: 'Na Ilha dos Estrangeiros chegam os manuais de terras distantes. Quem não os lê fica refém da névoa.',
    cleared: 'Os manuais da Ilha não guardam mais segredos para você.',
  },
};

/** Diário de pistas: revelado na ordem, uma pista por lição concluída. */
export const clues: string[] = [
  'Pista 1. A névoa começou na mesma semana em que o antigo Arquivista-Mor se aposentou. Coincidência?',
  'Pista 2. Os primeiros registros apagados eram todos contratos de obras sem estudo técnico.',
  'Pista 3. Onde os auditores estudam, a névoa recua. Onde ninguém lê, ela engrossa.',
  'Pista 4. Um mensageiro jura ter visto um homem de capuz cinza saindo do Arquivo Profundo à meia-noite.',
  'Pista 5. As cópias de segurança do Arquivo também sumiram. Quem apagou sabia onde elas ficavam.',
  'Pista 6. No Porto, um navio de carga partiu sem registro no diário de bordo. Levava caixas lacradas com o selo do Tesouro.',
  'Pista 7. Bubo encontrou uma pena cinzenta entre os pergaminhos queimados. Não é de coruja.',
  'Pista 8. As senhas do Arquivo estavam guardadas em texto claro. Qualquer um com acesso poderia lê-las.',
  'Pista 9. O homem de capuz usava a conta de um servidor que estava de férias.',
  'Pista 10. A conta emprestada tinha privilégios demais para quem só precisava ler relatórios.',
  'Pista 11. Na Forja, um autômato executou um comando de apagar sem pedir confirmação a ninguém.',
  'Pista 12. Quem configurou o autômato deixou de lado o princípio do menor privilégio. Por descuido ou de propósito?',
  'Pista 13. Os relatórios do Tesouro somam valores que não batem: a diferença é sempre de três por cento.',
  'Pista 14. Os três por cento seguem para um fornecedor cujo endereço se repete em vinte contratos diferentes.',
  'Pista 15. O fornecedor não tem funcionários, nem sede, nem histórico. Existe só no papel.',
  'Pista 16. O Oráculo do Bosque recomendou esse fornecedor em todos os pregões. Ninguém sabe explicar por quê.',
  'Pista 17. Os dados usados para treinar o Oráculo foram escolhidos a dedo. O viés não foi acidente.',
  'Pista 18. Nos registros de conexão, o capuz cinza sempre entrava pela mesma estrada esquecida, sem firewall.',
  'Pista 19. A estrada esquecida leva a uma máquina antiga, fora do inventário, que ninguém atualiza há anos.',
  'Pista 20. Na máquina antiga, Bubo encontrou um script agendado para rodar toda madrugada: ele espalha a névoa.',
  'Pista 21. O script foi escrito por alguém que conhece bem o shell e as permissões da Torre.',
  'Pista 22. Uma carta interceptada, em língua estrangeira, fala em "deprecate the audit trail". Apagar a trilha de auditoria.',
  'Pista 23. A carta foi assinada digitalmente. O certificado ainda não foi revogado.',
  'Pista 24. O certificado pertence a uma autoridade de registro que só emitiu um documento: este.',
  'Pista 25. No Cartório, o nome do titular do certificado foi pseudonimizado. A tabela de correspondência está guardada à parte.',
  'Pista 26. Para abrir a tabela de correspondência, é preciso autorização do Conselho dos Regentes.',
  'Pista 27. O Conselho aprovou o pedido por unanimidade, menos um voto. O voto contrário era do Tesoureiro-Mor.',
  'Pista 28. O Tesoureiro-Mor assinou todos os contratos do fornecedor fantasma, sempre com pagamento por posto, nunca por resultado.',
  'Pista 29. A tabela de correspondência revela o nome por trás do pseudônimo. É um antigo aprendiz da própria Torre.',
  'Pista 30. O antigo aprendiz foi reprovado no Grande Exame de anos atrás. Desde então, jurou apagar o que não conseguiu aprender.',
  'Pista 31. Ele e o Tesoureiro-Mor se correspondem pela estrada esquecida. Cada mensagem tem um carimbo do tempo.',
  'Pista 32. Os carimbos mostram que a névoa sempre engrossa na véspera dos pagamentos ao fornecedor fantasma.',
  'Pista 33. Quem domina a matéria vê através da névoa. Por isso eles temem que novos auditores sejam nomeados.',
  'Pista 34. O plano final é apagar o próprio Grande Exame dos registros do Reino, em janeiro.',
  'Pista 35. Bubo fecha o diário: "Agora você sabe tudo o que eu sei. O resto se decide no dia do Exame. Estude, aprendiz, e a névoa não terá onde se esconder."',
];

export const PROLOGUE_KEY = 'cronicas:prologo:v1';
