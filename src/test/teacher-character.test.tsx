import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TeacherCharacter, TeacherScene, CompanionMascots, companionMascots } from '@/components/TeacherCharacter';
import { Illustration, type IllustrationName } from '@/components/Illustration';
import { teacherForChapter, teachers } from '@/content';
import { TeacherCharacterReviewPage } from '@/pages/TeacherCharacterReview';

describe('elenco humano do Pórtico — V22.1', () => {
  it('desenha treze professores humanos, cada um com arte vetorial própria', () => {
    const { container } = render(<div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={200}/>)}</div>);
    const figures = Array.from(container.querySelectorAll('svg[data-character-style="portico-friends-v22"]'));
    expect(figures).toHaveLength(13);
    expect(figures.every((svg) => svg.getAttribute('data-character-species') === 'human')).toBe(true);
    expect(new Set(figures.map((svg) => svg.innerHTML)).size).toBe(13);
    expect(new Set(figures.map((svg) => svg.getAttribute('data-character-hair'))).size).toBe(13);
    expect(new Set(figures.map((svg) => svg.getAttribute('data-character-outfit'))).size).toBe(13);
    expect(figures.every((svg) => svg.getAttribute('data-character-stage') === 'static-design')).toBe(true);
  });

  it('usa silhuetas, rostos e roupas variados sem apresentar professores animais', () => {
    const { container } = render(<div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={200}/>)}</div>);
    const figures = Array.from(container.querySelectorAll('svg[data-character-style="portico-friends-v22"]'));
    expect(figures.every((svg) => svg.getAttribute('data-character-species') === 'human')).toBe(true);
    expect(figures.every((svg) => svg.querySelector('path[d]'))).toBe(true);
    expect(figures.every((svg) => svg.querySelectorAll('circle, rect, polygon').length === 0)).toBe(true);
  });

  it('mantém os animais em uma coleção separada de mascotes companheiros', () => {
    const { container } = render(<CompanionMascots/>);
    expect(companionMascots.map((mascot) => mascot.name)).toEqual(['Miau','Teco','Bento','Zeca']);
    expect(container.querySelectorAll('[data-mascot-id]')).toHaveLength(4);
    expect(container.querySelectorAll('[data-review-character]')).toHaveLength(0);
  });

  it('apresenta os treze humanos e a seção separada de mascotes na prancha V22', () => {
    const { container, getByRole } = render(<TeacherCharacterReviewPage/>);
    expect(container.querySelectorAll('[data-review-character]')).toHaveLength(13);
    expect(getByRole('region', { name:'Professores humanos do Pórtico' })).toBeInTheDocument();
    expect(getByRole('region', { name:'Mascotes companheiros do Pórtico' })).toBeInTheDocument();
  });


  it('usa silhuetas corporais conectadas, não peças independentes montadas', () => {
    const { container } = render(<div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={200}/>)}</div>);
    const figures = Array.from(container.querySelectorAll('svg[data-character-style="portico-friends-v22"]'));
    expect(figures).toHaveLength(13);
    expect(figures.every((svg) => svg.getAttribute('data-character-silhouette') === 'bespoke-connected-body')).toBe(true);
    expect(new Set(figures.map((svg) => svg.getAttribute('data-character-id'))).size).toBe(13);
    expect(new Set(figures.map((svg) => svg.getAttribute('data-character-face-shape'))).size).toBe(13);
    expect(new Set(figures.map((svg) => svg.getAttribute('data-character-eyes'))).size).toBe(4);
    expect(figures.every((svg) => Number((svg.getAttribute('data-character-head-scale') || '0').split('x')[0]) >= 1.14)).toBe(true);
    expect(new Set(figures.map((svg) => svg.getAttribute('data-character-eye-size'))).size).toBe(13);
  });

  it('varia a proporção da cabeça e os traços faciais sem perder a família visual', () => {
    const { container } = render(<div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={200}/>)}</div>);
    const figures = Array.from(container.querySelectorAll('svg[data-character-style="portico-friends-v22"]'));
    expect(new Set(figures.map((svg) => svg.getAttribute('data-character-head-scale'))).size).toBe(13);
    expect(figures.some((svg) => svg.querySelector('path[d*="M80 94"]'))).toBe(true);
  });

  it('varia as proporções do corpo entre os treze professores sem perder a unidade visual', () => {
    const { container } = render(<div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} size={200}/>)}</div>);
    const figures = Array.from(container.querySelectorAll('svg[data-character-style="portico-friends-v22"]'));
    expect(new Set(figures.map((svg) => svg.getAttribute('data-character-body-scale'))).size).toBe(13);
  });

  it('mantém os retratos coerentes em avatar e corpo inteiro', () => {
    const { container } = render(<div>{teachers.map((teacher) => <TeacherCharacter key={teacher.id} teacher={teacher} portrait size={64}/>)}</div>);
    expect(container.querySelectorAll('svg[data-character-style="portico-friends-v22"]')).toHaveLength(13);
    expect(Array.from(container.querySelectorAll('svg')).every((svg) => svg.getAttribute('viewBox') === '24 18 132 132')).toBe(true);
  });

  it('apresenta o professor em uma cena de explicação contextualizada', () => {
    const { container, getByRole, getByText } = render(
      <TeacherScene teacher={teachers[0]} heading="Somar números inteiros" message="Vamos caminhar pela reta numérica juntos." size={180}/>,
    );
    expect(getByRole('region', { name:/explicando: Somar números inteiros/i })).toBeInTheDocument();
    expect(getByText('Somar números inteiros')).toBeInTheDocument();
    expect(getByText(/Vamos caminhar pela reta numérica juntos/)).toBeInTheDocument();
    expect(container.querySelector('.teacher-scene__figure')).toBeInTheDocument();
  });

  it('mantém a atribuição dos professores às disciplinas', () => {
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
