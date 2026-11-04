import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TeacherCharacter, TeacherScene } from '@/components/TeacherCharacter';
import { Illustration, type IllustrationName } from '@/components/Illustration';
import { teacherForChapter, teachers } from '@/content';

describe('personagens-professores vetoriais', () => {
  it('desenha um personagem SVG próprio para cada docente', () => {
    const { container } = render(
      <div>
        {teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} pose="presenting" size={120} />)}
      </div>,
    );
    const portraits = Array.from(container.querySelectorAll('svg[role="img"]'));
    expect(portraits).toHaveLength(teachers.length);
    const labels = portraits.map((portrait) => portrait.getAttribute('aria-label'));
    expect(new Set(labels).size).toBe(teachers.length);
    const drawings = portraits.map((portrait) => portrait.innerHTML);
    expect(new Set(drawings).size).toBe(teachers.length);
  });


  it('desenha silhuetas fechadas de corpo inteiro, com mãos visíveis e ligadas aos braços', () => {
    const { container } = render(<div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} pose="presenting" size={180}/>)}</div>);
    const figures = Array.from(container.querySelectorAll('svg[role="img"]'));
    expect(figures).toHaveLength(teachers.length);
    for (const figure of figures) {
      expect(figure.getAttribute('viewBox')).toBe('0 0 240 270');
      expect(figure.querySelectorAll('path, rect, circle, ellipse').length).toBeGreaterThan(14);
      expect(figure.querySelectorAll('[stroke-width]').length).toBeLessThan(22);
      expect(figure.getAttribute('data-character-style')).toBe('portico-friends-v13');
    }
    const bodySilhouettes = figures.map((figure) => figure.getAttribute('data-character-body'));
    expect(new Set(bodySilhouettes).size).toBe(teachers.length);
    const lowerSilhouettes = figures.map((figure) => figure.getAttribute('data-character-lower'));
    expect(new Set(lowerSilhouettes).size).toBe(teachers.length);
    const hairSilhouettes = figures.map((figure) => figure.getAttribute('data-character-hair'));
    expect(new Set(hairSilhouettes).size).toBe(teachers.length);
    const eyeStyles = figures.map((figure) => figure.getAttribute('data-character-eyes'));
    expect(new Set(eyeStyles).size).toBeGreaterThanOrEqual(9);
    const mouthStyles = figures.map((figure) => figure.getAttribute('data-character-mouth'));
    expect(new Set(mouthStyles).size).toBeGreaterThanOrEqual(6);
    const noseStyles = figures.map((figure) => figure.getAttribute('data-character-nose'));
    expect(new Set(noseStyles).size).toBeGreaterThanOrEqual(4);
    const browStyles = figures.map((figure) => figure.getAttribute('data-character-brows'));
    expect(new Set(browStyles).size).toBeGreaterThanOrEqual(6);
    const eyeSpacings = figures.map((figure) => figure.getAttribute('data-character-spacing'));
    expect(new Set(eyeSpacings).size).toBe(teachers.length);
    const differentDrawings = figures.map((figure) => figure.innerHTML);
    expect(new Set(differentDrawings).size).toBe(teachers.length);
  });

  it('usa anatomia de tronco, patas e pernas própria para os animais', () => {
    const { container } = render(<div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={140}/>)}</div>);
    const figures = Array.from(container.querySelectorAll('svg[role="img"]'));
    expect(figures.filter(f => f.getAttribute('data-character-species') !== 'human')).toHaveLength(9);
    expect(figures.filter(f => f.getAttribute('data-character-anatomy') === 'species-specific')).toHaveLength(9);
    expect(figures.every(f => f.getAttribute('data-character-style') === 'portico-friends-v13')).toBe(true);
    const animalLimbs = figures.filter(f => f.getAttribute('data-character-species') !== 'human').map(f => f.getAttribute('data-character-limbs'));
    expect(new Set(animalLimbs).size).toBe(9);
    expect(animalLimbs).toContain('four short armored legs and digging claws');
    expect(animalLimbs).toContain('four splayed flipper-legs');
    expect(animalLimbs).toContain('feathered wings and curved talons');
  });

  it('mistura humanos e criaturas originais ligadas às disciplinas', () => {
    const { container } = render(<div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={140}/>)}</div>);
    const figures = Array.from(container.querySelectorAll('svg[role="img"]'));
    const species = figures.map((figure) => figure.getAttribute('data-character-species'));
    const outfits = figures.map((figure) => figure.getAttribute('data-character-outfit'));
    expect(species).toHaveLength(teachers.length);
    expect(new Set(species).size).toBeGreaterThanOrEqual(9);
    expect(species.filter(value => value !== 'human')).toHaveLength(9);
    expect(figures.filter(f => f.getAttribute('data-character-anatomy') === 'species-specific')).toHaveLength(9);
    expect(new Set(outfits).size).toBe(teachers.length);
  });

  it('mostra o professor em uma cena de explicação, com fala contextual e presença visual grande', () => {
    const { container, getByRole, getByText } = render(<TeacherScene teacher={teachers[0]} heading="Somar números inteiros" message="Vamos caminhar pela reta numérica juntos." size={180}/>);
    expect(getByRole('region', { name: /explicando: Somar números inteiros/i })).toBeInTheDocument();
    expect(getByText('Somar números inteiros')).toBeInTheDocument();
    expect(getByText(/Vamos caminhar pela reta numérica juntos/)).toBeInTheDocument();
    expect(container.querySelector('.teacher-scene__figure')).toBeInTheDocument();
  });

  it('usa a mesma linguagem vetorial nas versões de avatar e corpo inteiro', () => {
    const { container } = render(<div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} portrait size={48}/>)}</div>);
    expect(container.querySelectorAll('svg[data-character-style="portico-friends-v13"]')).toHaveLength(teachers.length);
  });

  it('atribui um professor coerente às principais disciplinas', () => {
    expect(teacherForChapter('cap.mat.01').id).toBe('prof.clara');
    expect(teacherForChapter('cap.infra.01').id).toBe('prof.davi');
    expect(teacherForChapter('cap.infra.03').id).toBe('prof.lia');
    expect(teacherForChapter('cap.seg.01').id).toBe('prof.iara');
    expect(teacherForChapter('cap.ia.01').id).toBe('prof.nina');
    expect(teacherForChapter('cap.dev.01').id).toBe('prof.ravi');
    expect(teacherForChapter('cap.dados.01').id).toBe('prof.mateus');
    expect(teacherForChapter('cap.gov.01').id).toBe('prof.marina');
    expect(teacherForChapter('cap.leg.01').id).toBe('prof.beatriz');
    expect(teacherForChapter('cap.ingles.01').id).toBe('prof.sofia');
    expect(teacherForChapter('cap.port.01').id).toBe('prof.helena');
    expect(teacherForChapter('cap.inst.01').id).toBe('prof.augusto');
    expect(teacherForChapter('cap.devops.01').id).toBe('prof.caio');
  });
});


describe('ilustrações vetoriais dos conceitos', () => {
  it('mantém um desenho próprio para cada conceito técnico adicionado', () => {
    const names: IllustrationName[] = [
      'processador', 'processo', 'identificador', 'threads', 'estados-processo',
      'escalonador', 'dns-consulta', 'cripto-roda', 'rede-neural', 'modelo-relacional',
    ];
    const { container } = render(
      <div>{names.map((name) => <Illustration key={name} name={name} label={name} animate={false}/>)}</div>,
    );
    const drawings = Array.from(container.querySelectorAll('svg[role="img"]')).map((svg) => svg.innerHTML);
    expect(drawings).toHaveLength(names.length);
    expect(new Set(drawings).size).toBe(names.length);
  });
});
