import { describe, expect, it } from 'vitest';
import { bestPortugueseVoiceIndex, portugueseVoiceScore, type VoiceCandidate } from '@/app/voice';

describe('seleção de voz para aulas narradas', () => {
  it('prefere voz pt-BR neural/natural a uma voz básica padrão', () => {
    const voices: VoiceCandidate[] = [
      { name: 'Português Brasil - Standard', lang: 'pt-BR', default: true },
      { name: 'Google pt-BR Neural2-A', lang: 'pt-BR' },
      { name: 'Microsoft English Neural', lang: 'en-US' },
    ];
    expect(bestPortugueseVoiceIndex(voices)).toBe(1);
    expect(portugueseVoiceScore(voices[1])).toBeGreaterThan(portugueseVoiceScore(voices[0]));
  });

  it('não escolhe uma voz sem suporte a português', () => {
    expect(bestPortugueseVoiceIndex([
      { name: 'English US Neural', lang: 'en-US' },
      { name: 'Spanish Neural', lang: 'es-ES' },
    ])).toBeUndefined();
  });

  it('prefere variantes de voz de rede/alta qualidade quando o sistema as expõe', () => {
    const voices: VoiceCandidate[] = [
      { name: 'Português Brasil local', lang: 'pt-BR', localService: true },
      { name: 'pt-BR-network', lang: 'pt-BR', localService: false },
    ];
    expect(bestPortugueseVoiceIndex(voices)).toBe(1);
  });
});
