### Segurança da informação nas contratações de TIC

A segurança deve entrar desde o **Estudo Técnico Preliminar** e o **Termo de Referência**, não depois da assinatura. Requisitos que costumam constar:

| Momento | Exemplos de requisito |
|---|---|
| **Planejamento** | Classificação das informações envolvidas; análise de riscos da contratação; requisitos de segurança e de proteção de dados no TR; papel do fornecedor como **operador** na LGPD |
| **Seleção** | Comprovação de capacidade técnica; certificações quando justificadas (por exemplo, ISO/IEC 27001 do serviço de nuvem) |
| **Início do contrato** | **Termo de compromisso de manutenção de sigilo**, assinado pelo representante da empresa, e **termo de ciência**, assinado pelos profissionais que atuarão no contrato (IN SGD/ME nº 94/2022) |
| **Execução** | Acesso com menor privilégio e contas nominais; registro e auditoria; notificação de incidentes em prazo definido; desenvolvimento seguro (revisão de código, testes de segurança, correção de vulnerabilidades em prazo fixado) |
| **Encerramento** | Devolução dos dados em formato aberto, eliminação comprovada das cópias, revogação de acessos, transferência de conhecimento |

Para nuvem no Executivo federal, a **IN GSI/PR nº 5/2021** traz requisitos mínimos de segurança da informação, como avaliação de riscos, classificação dos dados e cuidados com a localização e o tratamento de informações sensíveis.

### Certificação digital em sistemas

A **ICP-Brasil** (MP nº 2.200-2/2001) é a cadeia hierárquica de confiança dos certificados com validade jurídica no país:

- **AC Raiz**: o ITI (Instituto Nacional de Tecnologia da Informação).
- **Autoridades Certificadoras** (AC): emitem e revogam os certificados.
- **Autoridades de Registro** (AR): identificam o titular presencialmente ou por meio admitido em norma.

Documentos assinados com certificado ICP-Brasil **presumem-se verdadeiros** em relação aos signatários (MP 2.200-2, art. 10, § 1º).

| Tipo de certificado | Onde fica a chave privada |
|---|---|
| **A1** | Em software (arquivo no computador ou servidor) |
| **A3** | Em hardware criptográfico: *token* ou cartão inteligente |

A **Lei nº 14.063/2020** classifica as assinaturas eletrônicas em interações com o poder público:

| Assinatura | Característica |
|---|---|
| **Simples** | Identifica o signatário (por exemplo, login e senha) |
| **Avançada** | Usa certificado não ICP-Brasil ou outro meio que garanta vínculo unívoco com o signatário e detecte alterações (por exemplo, a conta gov.br prata ou ouro) |
| **Qualificada** | Usa certificado **ICP-Brasil**; nível mais alto, exigido em atos como transferência de imóveis e em hipóteses previstas em lei |

Como um sistema usa certificados:

- **Assinar documentos** (formatos PAdES para PDF, CAdES, XAdES), de preferência com **carimbo do tempo**, que comprova quando a assinatura foi feita.
- **Autenticar** usuários e sistemas com certificado de cliente (TLS mútuo).
- **Validar** a assinatura: verificar a cadeia até a AC Raiz, a validade na data e a revogação (**LCR** ou **OCSP**).

### Pegadinhas

1. "O certificado A3 guarda a chave privada em arquivo no disco." Falso. Isso é o A1.
2. "A assinatura avançada exige certificado ICP-Brasil." Falso. Essa é a qualificada.
3. "Basta checar a assinatura matematicamente; a revogação do certificado é irrelevante." Falso. Certificado revogado à época da assinatura a invalida.
4. "Segurança da informação só se trata depois de assinado o contrato." Falso. Começa no ETP e no TR.
