import type { Chapter, Grimoire, Lesson } from '@/content/types';
import s01 from './cap01-criptografia/01-fundamentos.md?raw';
import s02 from './cap01-criptografia/02-simetrica.md?raw';
import s03 from './cap01-criptografia/03-assimetrica.md?raw';
import s04 from './cap01-criptografia/04-hash.md?raw';
import s05 from './cap01-criptografia/05-assinatura-certificados.md?raw';
import s06 from './cap01-criptografia/06-hibrida-tls.md?raw';
import d01 from './cap02-defesa/01-principios.md?raw';
import d02 from './cap02-defesa/02-acesso.md?raw';
import d03 from './cap02-defesa/03-owasp.md?raw';
import d04 from './cap02-defesa/04-ameacas.md?raw';
import d05 from './cap02-defesa/05-continuidade.md?raw';
import d06 from './cap02-defesa/06-iso.md?raw';

export const grimorioSeguranca: Grimoire = {
  id: 'grim.seguranca',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'ti.seguranca',
  title: 'O Códice das Sete Chaves',
  epithet: 'Grimório de Segurança da Informação',
  description:
    'Criptografia, OWASP Top 10, DevSecOps, Zero Trust e a família ISO/IEC 27000. Começa pelo segredo mais antigo: como guardar e provar a palavra escrita.',
  chapterIds: ['cap.seg.01', 'cap.seg.02'],
  sigil: 'chave',
  binding: 'sangue',
};

export const capCriptografia: Chapter = {
  id: 'cap.seg.01',
  grimoireId: 'grim.seguranca',
  number: 1,
  title: 'Criptografia',
  subtitle: 'Chaves, selos e resumos: a arte de guardar e provar a informação',
  topicIds: ['ti.seguranca.criptografia'],
  review: 'nao-revisado',
  estimatedMinutes: 55,
  sections: [
    { id: 'fundamentos', title: '1. Fundamentos e objetivos', body: s01 },
    { id: 'simetrica', title: '2. Criptografia simétrica', body: s02 },
    { id: 'assimetrica', title: '3. Criptografia assimétrica', body: s03 },
    { id: 'hash', title: '4. Funções hash, MAC e senhas', body: s04 },
    { id: 'assinatura', title: '5. Assinatura digital e certificados', body: s05 },
    { id: 'hibrida', title: '6. Criptografia híbrida e TLS', body: s06 },
  ],
  glossary: [
    { term: 'AEAD', definition: 'Cifragem autenticada com dados associados: garante confidencialidade e integridade/autenticidade (ex.: AES-GCM, ChaCha20-Poly1305).' },
    { term: 'AC', definition: 'Autoridade Certificadora: entidade que emite e assina certificados digitais.' },
    { term: 'Colisão', definition: 'Duas entradas diferentes que produzem o mesmo resumo hash.' },
    { term: 'Forward secrecy', definition: 'Sigilo futuro: o vazamento posterior da chave privada de longo prazo não permite decifrar sessões passadas.' },
    { term: 'HMAC', definition: 'Código de autenticação de mensagem baseado em hash e em uma chave secreta compartilhada (RFC 2104).' },
    { term: 'IV / nonce', definition: 'Valor inicial usado por modos de operação; não deve se repetir com a mesma chave (e, no CBC, deve ser imprevisível).' },
    { term: 'LCR / OCSP', definition: 'Mecanismos de consulta à revogação de certificados: lista publicada pela AC / protocolo de consulta online.' },
    { term: 'Não repúdio', definition: 'Impossibilidade de o autor negar a autoria; obtido com assinatura digital.' },
    { term: 'Salt (sal)', definition: 'Valor aleatório único por senha, armazenado com o hash, que impede tabelas pré-computadas.' },
    { term: 'X.509', definition: 'Padrão de formato de certificados digitais.' },
  ],
  references: [
    { title: 'NIST FIPS 197', detail: 'Advanced Encryption Standard (AES), 2001 (atualizado em 2023).' },
    { title: 'NIST FIPS 180-4', detail: 'Secure Hash Standard (SHA-1 e família SHA-2).' },
    { title: 'NIST FIPS 202', detail: 'SHA-3 Standard: Permutation-Based Hash and Extendable-Output Functions.' },
    { title: 'NIST SP 800-57 Parte 1', detail: 'Recommendation for Key Management (equivalência de níveis de segurança entre RSA e ECC).' },
    { title: 'IETF RFC 8446', detail: 'The Transport Layer Security (TLS) Protocol Version 1.3.' },
    { title: 'IETF RFC 2104', detail: 'HMAC: Keyed-Hashing for Message Authentication.' },
    { title: 'OWASP Password Storage Cheat Sheet', detail: 'Recomendações de armazenamento de senhas (Argon2id, scrypt, bcrypt, PBKDF2).' },
    { title: 'Medida Provisória nº 2.200-2/2001', detail: 'Institui a Infraestrutura de Chaves Públicas Brasileira (ICP-Brasil).' },
    { title: 'STALLINGS, William', detail: 'Criptografia e Segurança de Redes: Princípios e Práticas. Pearson.' },
  ],
  lessonIds: ['lic.seg.01.a', 'lic.seg.01.b'],
};

export const capDefesa: Chapter = {
  id: 'cap.seg.02',
  grimoireId: 'grim.seguranca',
  number: 2,
  title: 'Defesa em Profundidade',
  subtitle: 'Riscos, acessos, aplicações seguras, ameaças, continuidade e normas',
  topicIds: [
    'ti.seguranca.principios',
    'ti.seguranca.acesso',
    'ti.seguranca.zero-trust',
    'ti.seguranca.owasp',
    'ti.seguranca.ameacas',
    'ti.seguranca.continuidade',
    'ti.seguranca.iso27000',
  ],
  review: 'nao-revisado',
  estimatedMinutes: 60,
  sections: [
    { id: 'principios', title: '1. Princípios, riscos e classificação', body: d01 },
    { id: 'acesso', title: '2. Controle de acesso, IAM e Zero Trust', body: d02 },
    { id: 'owasp', title: '3. OWASP Top 10:2025 e DevSecOps', body: d03 },
    { id: 'ameacas', title: '4. Ameaças, detecção e testes', body: d04 },
    { id: 'continuidade', title: '5. Backup e continuidade', body: d05 },
    { id: 'iso', title: '6. Família ISO/IEC 27000', body: d06 },
  ],
  glossary: [
    { term: 'Risco', definition: 'Combinação da probabilidade de uma ameaça explorar uma vulnerabilidade e do impacto resultante.' },
    { term: 'Risco residual', definition: 'Risco que permanece após a aplicação dos controles.' },
    { term: 'Segregação de funções', definition: 'Divisão de etapas críticas entre pessoas diferentes para evitar fraude.' },
    { term: 'RBAC', definition: 'Controle de acesso baseado em papéis.' },
    { term: 'Zero Trust', definition: 'Modelo sem confiança implícita pela localização na rede; cada acesso é verificado (NIST SP 800-207).' },
    { term: 'IDOR / BOLA', definition: 'Acesso a objeto de outro usuário trocando o identificador; falha de controle de acesso.' },
    { term: 'SAST e DAST', definition: 'Análise estática do código / análise dinâmica da aplicação em execução.' },
    { term: 'SBOM', definition: 'Inventário dos componentes de software de uma aplicação.' },
    { term: 'Worm', definition: 'Malware que se propaga sozinho pela rede, sem hospedeiro.' },
    { term: 'IPS', definition: 'Sistema inline que detecta e bloqueia intrusões; o IDS apenas detecta e alerta.' },
    { term: 'Backup incremental', definition: 'Copia o que mudou desde o último backup de qualquer tipo.' },
    { term: 'Backup diferencial', definition: 'Copia o que mudou desde o último backup completo.' },
    { term: 'BIA', definition: 'Análise de impacto nos negócios: processos críticos, impactos e prazos toleráveis.' },
    { term: 'ISO/IEC 27001', definition: 'Requisitos do SGSI; norma certificável. Anexo A 2022: 93 controles em 4 temas.' },
  ],
  references: [
    { title: 'OWASP Top 10:2025', detail: 'owasp.org/Top10/2025 (lista conferida em fontes concordantes; site oficial inacessível do ambiente de desenvolvimento).' },
    { title: 'NIST SP 800-207', detail: 'Zero Trust Architecture (2020).' },
    { title: 'NIST SP 800-61', detail: 'Computer Security Incident Handling Guide.' },
    { title: 'ABNT NBR ISO/IEC 27001:2022 e 27002:2022', detail: 'Requisitos do SGSI e controles de segurança da informação.' },
    { title: 'ISO 22301', detail: 'Sistemas de gestão de continuidade de negócios.' },
    { title: 'Lei nº 12.527/2011', detail: 'Lei de Acesso à Informação (classificação: reservada, secreta, ultrassecreta).' },
    { title: 'TCE-GO, RA nº 17/2024', detail: 'Política de Segurança da Informação do Tribunal (citada no edital).' },
  ],
  lessonIds: ['lic.seg.02.a', 'lic.seg.02.b'],
};

export const licoesCap02: Lesson[] = [
  {
    id: 'lic.seg.02.a',
    chapterId: 'cap.seg.02',
    title: 'Os Guardiões das Portas',
    goal: 'Riscos, classificação, controle de acesso, Zero Trust e OWASP Top 10:2025.',
    cards: [
      { title: 'Risco', body: 'Vulnerabilidade (fraqueza) + ameaça (causa) + impacto. Tratar: **mitigar, transferir, evitar ou aceitar**.\n\nLAI: reservada 5, secreta 15, ultrassecreta 25 anos.' },
      { title: 'Quem entra', body: 'Menor privilégio, segregação de funções. **DAC** (dono decide), **MAC** (rótulos), **RBAC** (papéis), **ABAC** (atributos).\n\n**Zero Trust**: nenhuma confiança pela rede; PE decide, PA executa, PEP aplica.' },
      { title: 'OWASP 2025', body: 'A01 Controle de acesso · A02 Configuração · **A03 Cadeia de suprimentos (nova)** · A04 Criptografia · A05 Injeção · A06 Projeto · A07 Autenticação · A08 Integridade · A09 Registro e alerta · **A10 Condições excepcionais (nova)**.' },
    ],
    questionIds: ['q.seg.02.001', 'q.seg.02.002', 'q.seg.02.003', 'q.seg.02.004', 'q.seg.02.005', 'q.seg.02.006', 'q.seg.02.007', 'q.seg.02.008', 'q.seg.02.009', 'q.seg.02.010', 'q.seg.02.011', 'q.seg.02.012'],
  },
  {
    id: 'lic.seg.02.b',
    chapterId: 'cap.seg.02',
    title: 'Muralhas, Cópias e Normas',
    goal: 'Malware, engenharia social, IDS/IPS, pentest, backup, continuidade e ISO 27000.',
    cards: [
      { title: 'Ameaças', body: 'Vírus precisa de hospedeiro; **worm** anda sozinho. Spear phishing é direcionado.\n\n**IDS** detecta; **IPS** bloqueia. Caixa preta, cinza e branca.' },
      { title: 'Cópias', body: '**Incremental**: desde o último backup qualquer (restaura com todos). **Diferencial**: desde o último completo (restaura com o último).\n\nRegra 3-2-1. BIA orienta RTO e RPO.' },
      { title: 'Normas', body: '**27001**: requisitos do SGSI, certificável; Anexo A 2022 com **93 controles em 4 temas**. **27002**: como implementar. **27005**: riscos.' },
    ],
    questionIds: ['q.seg.02.013', 'q.seg.02.014', 'q.seg.02.015', 'q.seg.02.016', 'q.seg.02.017', 'q.seg.02.018', 'q.seg.02.019', 'q.seg.02.020'],
  },
];
