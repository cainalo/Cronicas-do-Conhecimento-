import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TeacherCharacter, TeacherScene, TEACHER_SIGNATURE_POSES } from '@/components/TeacherCharacter';
import { Illustration, type IllustrationName } from '@/components/Illustration';
import { teacherForChapter, teachers } from '@/content';
import { TeacherCharacterReviewPage } from '@/pages/TeacherCharacterReview';

describe('elenco vetorial original do Pórtico — V20', () => {
  it('desenha um personagem completo e identificável para cada docente', () => {
    const { container } = render(
      <div>{teachers.map((teacher) => (
        <TeacherCharacter key={teacher.id} teacher={teacher} pose={TEACHER_SIGNATURE_POSES[teacher.id]} size={180}/>
      ))}</div>,
    );
    const figures = Array.from(container.querySelectorAll('svg[role="img"]'));
    expect(figures).toHaveLength(teachers.length);
    expect(new Set(figures.map((svg) => svg.getAttribute('aria-label'))).size).toBe(teachers.length);
    expect(new Set(figures.map((svg) => svg.innerHTML)).size).toBe(teachers.length);
    for (const figure of figures) {
      expect(figure.getAttribute('viewBox')).toBe('0 0 240 280');
      expect(figure.getAttribute('data-character-style')).toBe('portico-friends-v20');
      expect(figure.querySelectorAll('path, rect, circle, ellipse').length).toBeGreaterThan(14);
      expect(figure.getAttribute('data-character-pose')).toBeTruthy();
      expect(figure.getAttribute('data-character-motion')).toBeTruthy();
      expect(figure.querySelector('.p-character__art')?.getAttribute('class')).toContain('p-character__art--');
      expect(figure.querySelectorAll('.p-character__eye').length).toBeGreaterThan(0);
    }
  });

  it('atribui um canal de movimento distinto a cada professor', () => {
    const { container } = render(<div>{teachers.map((teacher) => (
      <TeacherCharacter key={teacher.id} teacher={teacher} size={180}/>
    ))}</div>);
    const figures = Array.from(container.querySelectorAll('svg[role="img"]'));
    const motionNames = figures.map((figure) => figure.getAttribute('data-character-motion'));
    expect(new Set(motionNames).size).toBe(teachers.length);
    expect(container.querySelectorAll('.p-character__art')).toHaveLength(teachers.length);
  });

  it('desenha piscadas e movimentos localizados nas espécies que os exigem', () => {
    const { container } = render(<div>{teachers.map((teacher) => (
      <TeacherCharacter key={teacher.id} teacher={teacher} size={180}/>
    ))}</div>);
    expect(container.querySelectorAll('.p-character__eye').length).toBeGreaterThanOrEqual(24);
    expect(container.querySelector('.p-character__tail')).toBeInTheDocument();
    expect(container.querySelector('.p-character__gills')).toBeInTheDocument();
    expect(container.querySelector('.p-character__wings')).toBeInTheDocument();
    expect(container.querySelector('.p-character__eye-stalks')).toBeInTheDocument();
  });

  it('distingue os quatro professores humanos por assinaturas faciais próprias', () => {
    const { container } = render(<div>{teachers.map((teacher) => (
      <TeacherCharacter key={teacher.id} teacher={teacher} size={180}/>
    ))}</div>);
    for (const signature of ['lia', 'beatriz', 'helena', 'augusto']) {
      expect(container.querySelector('.p-character__face-signature--' + signature)).toBeInTheDocument();
    }
  });

  it('mantém treze silhuetas, roupas, cabeças e expressões distintas', () => {
    const { container } = render(<div>{teachers.map((teacher) => (
      <TeacherCharacter key={teacher.id} teacher={teacher} size={180}/>
    ))}</div>);
    const figures = Array.from(container.querySelectorAll('svg[role="img"]'));
    const unique = (attribute:string) => new Set(figures.map((figure) => figure.getAttribute(attribute)));
    expect(unique('data-character-body').size).toBe(teachers.length);
    expect(unique('data-character-lower').size).toBe(teachers.length);
    expect(unique('data-character-hair').size).toBe(teachers.length);
    expect(unique('data-character-outfit').size).toBe(teachers.length);
    expect(unique('data-character-eyes').size).toBeGreaterThanOrEqual(9);
    expect(unique('data-character-eye-shape').size).toBeGreaterThanOrEqual(5);
    expect(unique('data-character-mouth').size).toBeGreaterThanOrEqual(6);
    expect(unique('data-character-nose').size).toBeGreaterThanOrEqual(4);
    expect(unique('data-character-brows').size).toBeGreaterThanOrEqual(6);
    expect(unique('data-character-spacing').size).toBe(teachers.length);
  });

  it('trata as nove espécies com anatomia própria, incluindo quadrúpedes e ave', () => {
    const { container } = render(<div>{teachers.map((teacher) => (
      <TeacherCharacter key={teacher.id} teacher={teacher} size={160}/>
    ))}</div>);
    const figures = Array.from(container.querySelectorAll('svg[role="img"]'));
    const nonHumans = figures.filter((figure) => figure.getAttribute('data-character-species') !== 'human');
    expect(nonHumans).toHaveLength(9);
    expect(new Set(nonHumans.map((figure) => figure.getAttribute('data-character-species'))).size).toBe(9);
    expect(nonHumans.every((figure) => figure.getAttribute('data-character-anatomy') === 'species-specific')).toBe(true);
    expect(new Set(nonHumans.map((figure) => figure.getAttribute('data-character-limbs'))).size).toBe(9);
    const limbs = nonHumans.map((figure) => figure.getAttribute('data-character-limbs'));
    expect(limbs).toContain('four short armored legs with digging claws');
    expect(limbs).toContain('four splayed flipper-legs');
    expect(limbs).toContain('feathered wings and curved talons');
    expect(limbs).toContain('four gripping limbs with split toes');
    const bodies = figures.map((figure) => figure.getAttribute('data-character-body'));
    expect(bodies).toContain('low horizontal armored shell');
    expect(bodies).toContain('low rounded turtle shell');
    expect(bodies).toContain('horizontal agile chameleon body');
  });

  it('aplica de fato os formatos de olhos ao SVG, sem contorno escuro repetido', () => {
    const { container } = render(<div>{teachers.map((teacher) => (
      <TeacherCharacter key={teacher.id} teacher={teacher} size={180}/>
    ))}</div>);
    const figures = Array.from(container.querySelectorAll('svg[role="img"]'));
    for (const figure of figures) {
      const eyeBases = Array.from(figure.querySelectorAll('[data-eye-base="true"]'));
      expect(eyeBases.length).toBeGreaterThan(0);
      expect(eyeBases.every((eye) => !eye.hasAttribute('stroke'))).toBe(true);
      expect(figure.querySelectorAll('[data-eye-shape]').length).toBeGreaterThan(0);
      expect(figure.getAttribute('data-character-eye-shape')).toBeTruthy();
    }
    const mittenRenderers = container.querySelectorAll('[data-hand-style="soft-mitten"]');
    expect(mittenRenderers.length).toBeGreaterThanOrEqual(7);
  });

  it('reutiliza a mesma ilustração na versão de retrato e de corpo inteiro', () => {
    const { container } = render(<div>{teachers.map((teacher) => (
      <TeacherCharacter key={teacher.id} teacher={teacher} portrait size={48}/>
    ))}</div>);
    expect(container.querySelectorAll('svg[data-character-style="portico-friends-v20"]')).toHaveLength(teachers.length);
  });

  it('apresenta o professor em uma cena de explicação contextualizada', () => {
    const { container, getByRole, getByText } = render(
      <TeacherScene teacher={teachers[0]} heading="Somar números inteiros"
        message="Vamos caminhar pela reta numérica juntos." size={180}/>,
    );
    expect(getByRole('region', { name:/explicando: Somar números inteiros/i })).toBeInTheDocument();
    expect(getByText('Somar números inteiros')).toBeInTheDocument();
    expect(getByText(/Vamos caminhar pela reta numérica juntos/)).toBeInTheDocument();
    expect(container.querySelector('.teacher-scene__figure')).toBeInTheDocument();
  });


  it('permite comparar cor, silhueta, retrato e poses na prancha de revisão', () => {
    const { container, getByRole } = render(<TeacherCharacterReviewPage />);
    const main = container.querySelector('main');
    expect(main).toHaveAttribute('data-character-review-mode', 'color');
    expect(main).toHaveAttribute('data-character-review-pose', 'signature');
    expect(container.querySelectorAll('[data-review-character]')).toHaveLength(teachers.length);

    fireEvent.click(getByRole('button', { name: 'Silhuetas' }));
    expect(main).toHaveAttribute('data-character-review-mode', 'silhouette');
    expect(container.querySelectorAll('[data-review-art="silhouette"]')).toHaveLength(teachers.length);

    fireEvent.click(getByRole('button', { name: 'Pensando' }));
    expect(main).toHaveAttribute('data-character-review-pose', 'thinking');
    expect(Array.from(container.querySelectorAll('svg[data-character-style="portico-friends-v20"]'))
      .every((svg) => svg.getAttribute('data-character-pose') === 'thinking')).toBe(true);

    fireEvent.click(getByRole('button', { name: 'Retratos' }));
    expect(main).toHaveAttribute('data-character-review-mode', 'portrait');
    expect(container.querySelectorAll('svg[data-character-style="portico-friends-v20"]')).toHaveLength(teachers.length);

    fireEvent.click(getByRole('button', { name: 'Comemorando' }));
    expect(main).toHaveAttribute('data-character-review-pose', 'celebrating');
  });

  it('amplia com proporção preservada os corpos horizontais sem os tornar bípedes', () => {
    const { container } = render(<div>{teachers.map((teacher) => (
      <TeacherCharacter key={teacher.id} teacher={teacher} size={180}/>
    ))}</div>);
    const framed = Array.from(container.querySelectorAll('svg[data-character-frame="horizontal-species"]'));
    expect(framed.map((svg) => svg.getAttribute('data-character-species')).sort())
      .toEqual(['armadillo', 'chameleon', 'turtle']);
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
