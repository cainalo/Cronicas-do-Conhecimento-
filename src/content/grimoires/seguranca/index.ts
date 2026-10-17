import type { Chapter, Grimoire } from '@/content/types';
import s01 from './cap01-criptografia/01-fundamentos.md?raw';
import s02 from './cap01-criptografia/02-simetrica.md?raw';
import s03 from './cap01-criptografia/03-assimetrica.md?raw';
import s04 from './cap01-criptografia/04-hash.md?raw';
import s05 from './cap01-criptografia/05-assinatura-certificados.md?raw';
import s06 from './cap01-criptografia/06-hibrida-tls.md?raw';

export const grimorioSeguranca: Grimoire = {
  id: 'grim.seguranca',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'ti.seguranca',
  title: 'O Códice das Sete Chaves',
  epithet: 'Grimório de Segurança da Informação',
  description:
    'Criptografia, OWASP Top 10, DevSecOps, Zero Trust e a família ISO/IEC 27000. Começa pelo segredo mais antigo: como guardar e provar a palavra escrita.',
  chapterIds: ['cap.seg.01'],
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
