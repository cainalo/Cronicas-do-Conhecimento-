import type { Lesson } from '@/content/types';

export const licoesCap01: Lesson[] = [
  {
    id: 'lic.seg.01.a',
    chapterId: 'cap.seg.01',
    title: 'Criptografia simétrica e assimétrica',
    goal: 'Distinguir criptografia simétrica e assimétrica e saber qual chave usar em cada situação.',
    cards: [
      {
        title: 'Uma chave ou um par?',
        body: '**Simétrica:** a mesma chave cifra e decifra; é rápida, mas exige combinar a chave antes. Para *n* pessoas: **n(n − 1)/2** chaves.\n\n**Assimétrica:** par de chaves (pública e privada) — resolve a distribuição de chaves e permite assinaturas, mas é lenta. Para *n* pessoas: **n pares**.',
      },
      {
        title: 'As duas regras de ouro',
        body: '- **Sigilo:** cifre com a **pública do destinatário**.\n- **Assinatura:** assine com a **privada do remetente**; verifique com a pública do remetente.',
      },
      {
        title: 'AES e seus modos',
        body: 'O **AES** tem bloco fixo de **128 bits** e chaves de **128, 192 ou 256 bits**.\n\n**ECB** revela padrões; **CBC** encadeia blocos com IV; **CTR** vira fluxo; **GCM** cifra **e** autentica.',
      },
    ],
    questionIds: ['q.seg.01.001', 'q.seg.01.002', 'q.seg.01.003', 'q.seg.01.004', 'q.seg.01.005', 'q.seg.01.006', 'q.seg.01.007', 'q.seg.01.008', 'q.seg.01.009', 'q.seg.01.010'],
  },
  {
    id: 'lic.seg.01.b',
    chapterId: 'cap.seg.01',
    title: 'Hash, assinatura digital, certificados e TLS',
    goal: 'Dominar hash, HMAC, armazenamento de senhas, assinatura digital, certificados e TLS.',
    cards: [
      {
        title: 'Hash não é cifra',
        body: 'Hash gera um **resumo de tamanho fixo**, **sem chave** e **irreversível**. MD5 e SHA-1 estão quebrados para colisões; use **SHA-256/SHA-3**.\n\n**HMAC** = hash + chave compartilhada → integridade e autenticidade, **sem** não repúdio.',
      },
      {
        title: 'Assinatura e certificado',
        body: 'Assina-se o **hash** com a **privada** do signatário. Garante **integridade, autenticidade e não repúdio**, mas não sigilo.\n\nO **certificado X.509** liga uma chave **pública** a uma identidade e é assinado por uma **AC**. ICP-Brasil: MP 2.200-2/2001, AC Raiz = **ITI**.',
      },
      {
        title: 'TLS é híbrido',
        body: 'Assimétrica para **autenticar e combinar a chave de sessão**; simétrica (AES-GCM, ChaCha20) para **os dados**. TLS 1.3 exige acordo **efêmero** → *forward secrecy*.',
      },
    ],
    questionIds: ['q.seg.01.011', 'q.seg.01.012', 'q.seg.01.013', 'q.seg.01.014', 'q.seg.01.015', 'q.seg.01.016', 'q.seg.01.017', 'q.seg.01.018', 'q.seg.01.019', 'q.seg.01.020'],
  },
];
