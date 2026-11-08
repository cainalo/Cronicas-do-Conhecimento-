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


  it('usa desenho vetorial próprio e contorno único para cada professor humano', () => {
    const { container } = render(<div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={180}/>)}</div>);
    const figures = Array.from(container.querySelectorAll('svg[role="img"]'));
    expect(figures).toHaveLength(13);
    for (const figure of figures) {
      expect(figure.getAttribute('viewBox')).toBe('0 0 240 270');
      expect(figure.querySelectorAll('path, rect, circle, ellipse').length).toBeGreaterThan(14);
      expect(figure.getAttribute('data-character-style')).toBe('portico-humans-v27');
      expect(figure.getAttribute('data-character-anatomy')).toBe('human');
    }
    const silhouettes = figures.map(figure => figure.getAttribute('data-character-silhouette'));
    expect(new Set(silhouettes).size).toBe(teachers.length);
    expect(new Set(figures.map(figure => figure.innerHTML)).size).toBe(teachers.length);
  });

  it('mostra treze silhuetas pretas independentes, sem detalhes internos', () => {
    const { container } = render(
      <div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} silhouette size={128}/>)}</div>,
    );
    const figures = Array.from(container.querySelectorAll('svg[role="img"]'));
    expect(figures).toHaveLength(13);
    expect(figures.every(f => f.getAttribute('data-character-mode') === 'silhouette')).toBe(true);
    expect(figures.every(f => f.querySelectorAll('[data-silhouette-art]').length === 1)).toBe(true);
    const drawings = figures.map(f => f.querySelector('[data-silhouette-art]')?.innerHTML);
    expect(new Set(drawings).size).toBe(13);
    expect(figures.every(f => Array.from(f.querySelectorAll('[data-silhouette-art] path')).every(p => p.getAttribute('fill') === '#1E2529'))).toBe(true);
  });

  it('usa a mesma geometria na silhueta e na versão colorida de todo o elenco', () => {
    const color = render(<div>{teachers.map(teacher => <TeacherCharacter key={teacher.id} teacher={teacher}/>)}</div>);
    const mono = render(<div>{teachers.map(teacher => <TeacherCharacter key={teacher.id} teacher={teacher} silhouette/>)}</div>);
    const colorFigures = Array.from(color.container.querySelectorAll('svg[data-character-id]'));
    const monoFigures = Array.from(mono.container.querySelectorAll('svg[data-character-id]'));
    const geometry = (figure: Element) => Array.from(
      figure.querySelectorAll('[data-silhouette-art] path'),
    ).map(path => path.getAttribute('d')).join('|');

    expect(colorFigures).toHaveLength(13);
    for (const figure of colorFigures) {
      const id = figure.getAttribute('data-character-id');
      const silhouette = monoFigures.find(item => item.getAttribute('data-character-id') === id);
      expect(figure.getAttribute('data-character-renderer')).toBe('organic-v27');
      expect(figure.querySelector('[data-character-details]')).toBeInTheDocument();
      expect(silhouette).toBeDefined();
      expect(geometry(figure)).toBe(geometry(silhouette as Element));
    }
    expect(new Set(colorFigures.map(geometry)).size).toBe(13);
  });

  it('atribui tipos corporais distintos e os expõe à revisão visual', () => {
    const { container } = render(
      <div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={180}/>)}</div>,
    );
    const figures = Array.from(container.querySelectorAll('svg[data-character-id]'));
    expect(figures).toHaveLength(13);
    const bodyShapes = figures.map(figure => figure.getAttribute('data-character-body-shape'));
    expect(bodyShapes.every(Boolean)).toBe(true);
    expect(new Set(bodyShapes).size).toBeGreaterThanOrEqual(6);
    expect(figures.every(figure => figure.getAttribute('data-character-renderer') === 'organic-v27')).toBe(true);
  });

  it('desenha mãos legíveis e ligadas aos punhos nos treze professores', () => {
    const { container } = render(
      <div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={180}/>)}</div>,
    );
    const figures = Array.from(container.querySelectorAll('svg[data-character-id]'));
    expect(figures).toHaveLength(13);
    for (const figure of figures) {
      const hands = Array.from(figure.querySelectorAll('[data-hand]'));
      expect(hands).toHaveLength(2);
      expect(hands.map(hand => hand.getAttribute('data-hand')).sort()).toEqual(['left', 'right']);
      expect(hands.every(hand => hand.getAttribute('data-hand-anatomy') === 'v27')).toBe(true);
      for (const hand of hands) {
        const path = hand.getAttribute('d') ?? '';
        expect(path.length).toBeGreaterThan(65);
        expect(path).toContain('Q');
      }
    }
  });

  it('diferencia os gestos de cumprimento, mão elevada e apontar', () => {
    const poses = ['one-hand-up', 'greeting', 'pointing'] as const;
    const drawings = poses.map(pose => {
      const { container } = render(<TeacherCharacter teacher={teachers[0]} pose={pose} size={180}/>);
      const rightHand = container.querySelector('[data-hand="right"]');
      expect(rightHand).toBeInTheDocument();
      expect(rightHand?.getAttribute('data-hand-anatomy')).toBe('v27');
      return rightHand?.getAttribute('d') ?? '';
    });
    expect(new Set(drawings).size).toBe(3);
  });

  it('mantém cabeça, cabelo e rosto no mesmo grupo proporcional', () => {
    const { container } = render(
      <div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={180}/>)}</div>,
    );
    const figures = Array.from(container.querySelectorAll('svg[data-character-id]'));
    expect(figures).toHaveLength(13);
    for (const figure of figures) {
      expect(figure.querySelector('[data-head-group="v27"]')).toBeInTheDocument();
      expect(figure.querySelector('[data-head-group="details"]')).toBeInTheDocument();
      expect(figure.querySelector('[data-head-group="v27"]')?.getAttribute('transform')).toContain('scale(.92 .90)');
    }
  });

  it('liga os braços à largura dos ombros e mantém pescoço único no corpo', () => {
    const { container } = render(
      <div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={180}/>)}</div>,
    );
    const figures = Array.from(container.querySelectorAll('svg[data-character-id]'));
    expect(figures).toHaveLength(13);
    for (const figure of figures) {
      expect(figure.querySelectorAll('[data-arm="left"], [data-arm="right"]')).toHaveLength(2);
      expect(figure.querySelector('[data-arm="left"]')?.getAttribute('transform')).toMatch(/^translate\(-?\d+ 0\)$/);
      expect(figure.querySelector('[data-arm="right"]')?.getAttribute('transform')).toMatch(/^translate\(-?\d+ 0\)$/);
      expect(figure.querySelector('[data-neck="true"]')).toBeInTheDocument();
      expect(figure.querySelector('[data-connected-body="true"]')).toBeInTheDocument();
      expect(Array.from(figure.querySelectorAll('[data-arm]')).every(arm => arm.getAttribute('data-wrist-join') === 'v27')).toBe(true);
    }
  });

  it('mantém tronco, parte inferior e calçados alinhados no desenho de cada pessoa', () => {
    const { container } = render(
      <div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={180}/>)}</div>,
    );
    const figures = Array.from(container.querySelectorAll('svg[data-character-id]'));
    expect(figures).toHaveLength(13);
    const torsoPaths:string[]=[];
    for (const figure of figures) {
      const torso = figure.querySelector('[data-connected-body="true"]');
      const lower = figure.querySelector('[data-connected-lower-body="true"]');
      const footwear = figure.querySelectorAll('[data-footwear="true"]');
      expect(torso).toBeInTheDocument();
      expect(lower).toBeInTheDocument();
      expect(torso?.getAttribute('d')).toBeTruthy();
      expect(lower?.getAttribute('d')).toBeTruthy();
      expect(footwear).toHaveLength(2);
      expect(figure.querySelectorAll('[data-shoe-sole="v27"]')).toHaveLength(2);
      for (const shoe of Array.from(footwear)) {
        const path = shoe.getAttribute('d') ?? '';
        expect(shoe.getAttribute('data-shoe-shape')).toBe('v27');
        expect(path.length).toBeGreaterThan(125);
        expect(path).toContain('C');
        expect(path).toContain('Q');
      }
      torsoPaths.push(torso?.getAttribute('d') ?? '');
    }
    expect(new Set(torsoPaths).size).toBeGreaterThanOrEqual(10);
  });

  it('atribui treze rostos e expressões individuais aos professores', () => {
    const { container } = render(
      <div>{teachers.map(teacher => <TeacherCharacter key={teacher.id} teacher={teacher} size={160}/>)}</div>,
    );
    const figures = Array.from(container.querySelectorAll('svg[data-character-id]'));
    expect(figures).toHaveLength(13);
    expect(figures.every(figure => figure.getAttribute('data-character-renderer') === 'organic-v27')).toBe(true);
    expect(figures.every(figure => figure.querySelector('[data-character-details^="v27-"]'))).toBe(true);
    expect(new Set(figures.map(figure => figure.getAttribute('data-character-face-design'))).size).toBe(13);
    expect(new Set(figures.map(figure => figure.getAttribute('data-character-expression'))).size).toBe(13);
    expect(figures.every(figure => figure.querySelectorAll('[data-character-details] path, [data-character-details] ellipse, [data-character-details] circle, [data-character-details] rect').length >= 5)).toBe(true);
  });

  it('mantém todos os treze professores humanos e sem anatomia animal', () => {
    const { container } = render(<div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={140}/>)}</div>);
    const figures = Array.from(container.querySelectorAll('svg[role="img"]'));
    expect(figures).toHaveLength(13);
    expect(figures.every(f => f.getAttribute('data-character-anatomy') === 'human')).toBe(true);
    expect(figures.every(f => f.getAttribute('data-character-style') === 'portico-humans-v27')).toBe(true);
    expect(new Set(figures.map(f => f.getAttribute('data-character-id'))).size).toBe(13);
    expect(figures.every(f => !f.hasAttribute('data-character-species'))).toBe(true);
  });

  it('usa uma silhueta própria para cada pessoa do elenco', () => {
    const { container } = render(<div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={140}/>)}</div>);
    const figures = Array.from(container.querySelectorAll('svg[role="img"]'));
    const silhouettes = figures.map(figure => figure.getAttribute('data-character-silhouette'));
    expect(new Set(silhouettes).size).toBe(teachers.length);
    const drawings = figures.map(figure => figure.innerHTML);
    expect(new Set(drawings).size).toBe(teachers.length);
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
    expect(container.querySelectorAll('svg[data-character-style="portico-humans-v27"]')).toHaveLength(teachers.length);
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
