import { describe, expect, it } from 'vitest';
import { journey, lessons, missions, seriesOf, trailExtras } from '@/content';
import { courseUnits } from '@/lib/pace';

describe('laboratórios e Escritório de TI integrados à trilha', () => {
  const units = courseUnits(journey, lessons, missions, seriesOf, trailExtras);
  const infra = units.filter((unit) => unit.chapterId === 'cap.infra.03');

  it('distribui as fases do escritório e os laboratórios pelos quatro assuntos do capítulo de SO', () => {
    const practical = infra.filter((unit) => unit.kind === 'laboratorio' || unit.kind === 'escritorio');
    expect(practical.map((unit) => unit.key)).toEqual([
      'escritorio:triagem',
      'laboratorio:processos',
      'laboratorio:arquivos',
      'laboratorio:shell',
      'escritorio:diagnostico',
      'laboratorio:rede',
      'escritorio:resolucao',
    ]);
    expect(practical.map((unit) => unit.to)).toContain('/escritorio?fase=triagem&u=escritorio%3Atriagem');
    expect(practical.map((unit) => unit.to)).toContain('/laboratorio/processos?u=laboratorio%3Aprocessos');
    expect(practical.map((unit) => unit.to)).toContain('/escritorio?fase=resolucao&u=escritorio%3Aresolucao');
  });

  it('mantém o laboratório de código junto ao primeiro assunto de lógica', () => {
    const codeLab = units.find((unit) => unit.key === 'laboratorio:codigo');
    expect(codeLab).toMatchObject({
      kind: 'laboratorio',
      chapterId: 'cap.dev.03',
      sectionId: 'logica',
      to: '/laboratorio-codigo?u=laboratorio%3Acodigo',
    });
  });

  it('reserva as fases do escritório ao capítulo de sistemas operacionais', () => {
    expect(units.filter((unit) => unit.kind === 'escritorio').every((unit) => unit.chapterId === 'cap.infra.03')).toBe(true);
    expect(units.filter((unit) => unit.kind === 'laboratorio' && !['laboratorio:codigo', 'laboratorio:git'].includes(unit.key)).every((unit) => unit.chapterId === 'cap.infra.03')).toBe(true);
  });

  it('liga a prática de Git ao assunto de versionamento e pull requests', () => {
    expect(units.find((unit) => unit.key === 'laboratorio:git')).toMatchObject({
      kind: 'laboratorio',
      chapterId: 'cap.devops.01',
      sectionId: 'git',
      to: '/laboratorio/git?u=laboratorio%3Agit',
    });
  });
});
