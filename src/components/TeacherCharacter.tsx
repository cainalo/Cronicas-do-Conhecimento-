import type { CSSProperties, ReactNode } from 'react';
import type { FictionalTeacher } from '@/content/teachers';

export type TeacherPose = 'greeting' | 'presenting' | 'thinking' | 'celebrating' | 'listening';

type Look = {
  skin: string; hair: string; shirt: string; jacket: string; pants: string; accent: string;
  hairStyle: 'long' | 'bun' | 'short' | 'curls' | 'bob' | 'braid' | 'waves' | 'fade';
  accessory?: 'glasses' | 'round-glasses' | 'headset' | 'earrings' | 'tie' | 'headband' | 'beard' | 'none';
  prop?: 'book' | 'tablet' | 'map' | 'shield' | 'chip' | 'folder' | 'terminal' | 'mug' | 'scroll' | 'speech';
};

/** Cada professor tem silhueta, cabelo, roupa, acessório e objeto próprios. */
const LOOKS: Record<string, Look> = {
  'prof.clara': { skin:'#E9B994',hair:'#3B2418',shirt:'#FFF4E3',jacket:'#C8402A',pants:'#314B55',accent:'#D4A017',hairStyle:'long',accessory:'earrings',prop:'book' },
  'prof.lia': { skin:'#C98E6A',hair:'#1D1A17',shirt:'#F7EEDF',jacket:'#0F4C5C',pants:'#263D43',accent:'#D4A017',hairStyle:'bun',accessory:'headset',prop:'terminal' },
  'prof.davi': { skin:'#8D5A3F',hair:'#1D1A17',shirt:'#F7EEDF',jacket:'#243F63',pants:'#273642',accent:'#D4A017',hairStyle:'short',accessory:'beard',prop:'map' },
  'prof.iara': { skin:'#A86F4C',hair:'#2A1A12',shirt:'#F7EEDF',jacket:'#6B3A6E',pants:'#3D4D3C',accent:'#556B2F',hairStyle:'curls',accessory:'earrings',prop:'shield' },
  'prof.nina': { skin:'#E4B99B',hair:'#2C3444',shirt:'#F7EEDF',jacket:'#6B3A6E',pants:'#303B58',accent:'#D4A017',hairStyle:'bob',accessory:'round-glasses',prop:'chip' },
  'prof.ravi': { skin:'#A96F4F',hair:'#241B18',shirt:'#F7EEDF',jacket:'#556B2F',pants:'#243D49',accent:'#C8402A',hairStyle:'fade',accessory:'beard',prop:'terminal' },
  'prof.mateus': { skin:'#D4A17B',hair:'#513629',shirt:'#F7EEDF',jacket:'#345C66',pants:'#3B414B',accent:'#D4A017',hairStyle:'short',accessory:'glasses',prop:'folder' },
  'prof.marina': { skin:'#B97855',hair:'#2C1D1B',shirt:'#F7EEDF',jacket:'#556B2F',pants:'#34433C',accent:'#C8402A',hairStyle:'braid',accessory:'earrings',prop:'mug' },
  'prof.beatriz': { skin:'#E8C2A4',hair:'#493126',shirt:'#FFF5E8',jacket:'#6B3A6E',pants:'#37364C',accent:'#D4A017',hairStyle:'bun',accessory:'glasses',prop:'scroll' },
  'prof.sofia': { skin:'#F0C6A5',hair:'#A64F2D',shirt:'#FFF4E4',jacket:'#C8402A',pants:'#31505B',accent:'#556B2F',hairStyle:'waves',accessory:'headband',prop:'book' },
  'prof.helena': { skin:'#D5A17B',hair:'#211E28',shirt:'#F7EEDF',jacket:'#315F68',pants:'#474052',accent:'#D4A017',hairStyle:'long',accessory:'headband',prop:'speech' },
  'prof.augusto': { skin:'#B77D5D',hair:'#D2C7B5',shirt:'#F7EEDF',jacket:'#0F4C5C',pants:'#45404A',accent:'#C8402A',hairStyle:'short',accessory:'glasses',prop:'folder' },
  'prof.caio': { skin:'#D09A76',hair:'#27222B',shirt:'#F7EEDF',jacket:'#3B5B62',pants:'#263C43',accent:'#D4A017',hairStyle:'fade',accessory:'headset',prop:'chip' },
};

function Hair({ look }: { look: Look }) {
  const common = { fill: look.hair };
  switch (look.hairStyle) {
    case 'long': return <path {...common} d="M58 75Q54 25 100 23Q145 25 142 78L136 139L126 132L123 75Q113 51 99 49Q78 51 72 77L70 137L59 141Z"/>;
    case 'bun': return <><circle cx="100" cy="25" r="15" {...common}/><path {...common} d="M62 76Q58 39 100 38Q140 39 138 77L130 91Q120 56 100 55Q79 56 70 91Z"/></>;
    case 'short': return <path {...common} d="M62 78Q60 33 101 33Q139 33 138 79Q123 57 100 56Q77 57 62 78Z"/>;
    case 'curls': return <><path {...common} d="M53 92Q42 42 78 35Q86 17 107 27Q127 17 143 43Q160 57 145 92L137 125L126 84Q115 59 99 61Q78 59 68 88L63 126Z"/><g fill={look.hair}><circle cx="62" cy="55" r="12"/><circle cx="78" cy="36" r="12"/><circle cx="98" cy="30" r="13"/><circle cx="119" cy="35" r="12"/><circle cx="140" cy="56" r="12"/></g></>;
    case 'bob': return <path {...common} d="M59 80Q56 32 101 30Q145 31 141 82L134 116L124 105L127 75Q117 57 100 56Q80 57 72 77L75 109L64 118Z"/>;
    case 'braid': return <><path {...common} d="M59 78Q55 33 101 31Q143 33 140 80L132 117L122 106L127 75Q116 55 100 56Q78 56 71 79L68 117Z"/><path d="M136 81Q154 103 140 125Q151 140 137 153Q124 140 134 126Q119 104 136 81Z" fill={look.hair}/></>;
    case 'waves': return <path {...common} d="M57 82Q52 28 101 26Q146 27 143 82Q139 97 129 90Q134 108 122 117L120 80Q113 54 99 53Q80 52 72 83Q76 102 65 116Q54 104 61 91Z"/>;
    case 'fade': return <path {...common} d="M63 78Q61 37 100 35Q138 36 137 78L126 64Q114 53 100 54Q80 53 70 67Z"/>;
  }
}

function Prop({ look }: { look: Look }) {
  const c = look.accent;
  switch (look.prop) {
    case 'book': return <g><path d="M126 113Q139 105 151 111V151Q138 146 126 154Z" fill="#FFF4E3" stroke={c} strokeWidth="3"/><path d="M139 113V149" stroke={c} strokeWidth="2"/><path d="M132 123h10M132 131h10" stroke="#0F4C5C" strokeWidth="2"/></g>;
    case 'tablet': return <g><rect x="125" y="107" width="29" height="46" rx="5" fill="#243D49" stroke={c} strokeWidth="3"/><path d="M131 116h17v26h-17z" fill="#F7EEDF"/><path d="M135 122h9M135 129h9" stroke="#0F4C5C" strokeWidth="2"/></g>;
    case 'map': return <g><path d="M125 113l11-5 12 5v39l-12-5-11 5z" fill="#F7EEDF" stroke={c} strokeWidth="3"/><path d="M136 108v39M125 127l11-5 12 5" fill="none" stroke="#0F4C5C" strokeWidth="2"/><path d="M128 134l6-7 6 3 5-8" fill="none" stroke={c} strokeWidth="2.5"/></g>;
    case 'shield': return <path d="M139 106L155 112V128Q154 146 139 154Q124 146 123 128V112Z" fill={c} stroke="#F7EEDF" strokeWidth="2"/>;
    case 'chip': return <g><rect x="126" y="112" width="29" height="29" rx="4" fill="#0F4C5C" stroke={c} strokeWidth="3"/><rect x="134" y="120" width="13" height="13" fill="#F7EEDF"/><path d="M131 106v6M140 106v6M149 106v6M131 141v6M140 141v6M149 141v6" stroke={c} strokeWidth="2"/></g>;
    case 'folder': return <path d="M123 117H137L142 122H156V151H123Z" fill="#F0CE91" stroke={c} strokeWidth="3"/>;
    case 'mug': return <g><rect x="127" y="119" width="25" height="27" rx="4" fill="#FFF4E3" stroke={c} strokeWidth="3"/><path d="M152 125h6Q165 137 152 140" fill="none" stroke={c} strokeWidth="3"/><path d="M135 114Q130 107 136 102M144 114Q139 107 145 102" fill="none" stroke="#C8402A" strokeWidth="2"/></g>;
    case 'scroll': return <g><path d="M130 109H153V148Q142 156 130 148Z" fill="#FFF4E3" stroke={c} strokeWidth="3"/><path d="M135 120h13M135 128h13M135 136h10" stroke="#0F4C5C" strokeWidth="2"/></g>;
    case 'speech': return <g><path d="M126 110H155V139H143L135 147V139H126Z" fill="#FFF4E3" stroke={c} strokeWidth="3"/><path d="M132 120h16M132 128h11" stroke="#0F4C5C" strokeWidth="2"/></g>;
    case 'terminal': return <g><rect x="125" y="113" width="31" height="28" rx="4" fill="#102B32" stroke={c} strokeWidth="3"/><path d="M131 121l5 4-5 4M139 130h10" stroke="#F7EEDF" strokeWidth="2" fill="none"/></g>;
    default: return null;
  }
}

export function TeacherCharacter({
  teacher, pose = 'presenting', size = 160, className = '',
}: {
  teacher: FictionalTeacher;
  pose?: TeacherPose;
  size?: number;
  className?: string;
}) {
  const look = LOOKS[teacher.id] ?? LOOKS['prof.lia'];
  const style: CSSProperties = { height: size, width: Math.round(size * .91) };
  const arm = pose === 'celebrating'
    ? { left: 'M73 111Q51 99 42 63L25 53Q15 91 57 137L77 143Z', right: 'M130 111Q153 98 163 63L180 53Q191 91 148 137L127 143Z', leftHand: 'M29 58Q18 59 16 47L9 32Q12 23 19 32L25 43Q24 27 31 27L37 48Q43 38 49 45L43 64Z', rightHand: 'M176 58Q187 59 189 47L196 32Q193 23 186 32L180 43Q181 27 174 27L168 48Q162 38 156 45L162 64Z' }
    : pose === 'greeting'
      ? { left: 'M73 111Q58 122 64 151L80 162L94 133Z', right: 'M130 108Q150 92 153 58L172 49L184 58Q181 105 149 133L131 127Z', leftHand: 'M66 151Q57 155 62 167L70 178Q79 181 83 170L78 156Z', rightHand: 'M172 55Q165 49 168 38L170 24Q175 16 180 25L179 36Q186 20 191 27L188 43Q196 32 201 40L194 57Q185 69 174 63Z' }
      : pose === 'thinking'
        ? { left: 'M73 111Q57 122 65 151L83 164L95 133Z', right: 'M130 109Q151 115 152 140L138 155Q122 143 119 126Z', leftHand: 'M66 153Q57 158 62 170L72 181Q81 181 84 170L78 156Z', rightHand: 'M139 153Q129 149 133 135L144 118Q152 112 157 121L153 137L164 128Q172 132 166 142L153 158Z' }
        : pose === 'listening'
          ? { left: 'M73 111Q57 130 65 158L82 173L94 143Z', right: 'M130 111Q149 130 141 158L124 173L112 143Z', leftHand: 'M67 162Q58 165 63 178L71 191Q80 193 84 182L79 169Z', rightHand: 'M139 162Q148 165 143 178L135 191Q126 193 122 182L127 169Z' }
          : { left: 'M73 110Q52 103 37 81L20 88Q26 128 67 146L83 137Z', right: 'M130 110Q153 103 168 81L185 88Q179 128 138 146L122 137Z', leftHand: 'M24 92Q15 91 14 81L13 68Q17 60 23 68L28 79Q31 69 37 75L39 91Q36 101 25 99Z', rightHand: 'M181 92Q190 91 191 81L192 68Q188 60 182 68L177 79Q174 69 168 75L166 91Q169 101 180 99Z' };
  return (
    <svg viewBox="0 0 200 220" width={style.width} height={style.height} className={\`shrink-0 overflow-visible \${className}\`} role="img" aria-label={\`\${teacher.name}, personagem vetorial\`} focusable="false">
      {/* Silhueta principal contínua: pernas, sapatos, tronco e braços preenchidos. */}
      <path d="M78 151Q103 161 129 151L126 190L117 202L107 190L101 202L91 190L79 200L74 190Z" fill={look.pants} stroke="#263D43" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M77 190Q88 187 99 193L99 207H65Q61 201 69 195Z" fill="#233840" stroke="#172D34" strokeWidth="2"/>
      <path d="M108 193Q120 186 132 191L140 201Q143 208 135 208H106Z" fill="#233840" stroke="#172D34" strokeWidth="2"/>
      <path d="M68 201h22M116 201h17" stroke="#F7EEDF" strokeWidth="2" strokeLinecap="round" opacity=".75"/>
      <path d="M75 90Q103 77 131 90Q143 97 147 124L143 160Q104 172 61 160L59 125Q63 98 75 90Z" fill={look.jacket} stroke="#263D43" strokeWidth="2.8" strokeLinejoin="round"/>
      <path d="M91 88L103 103L116 88L124 160H81Z" fill={look.shirt} stroke="#263D43" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M91 90L103 104L116 90" fill="none" stroke={look.accent} strokeWidth="3" strokeLinejoin="round"/>
      <path d="M103 108v42" stroke={look.accent} strokeWidth="2" strokeDasharray="3 6"/>
      <path d={arm.left} fill={look.jacket} stroke="#263D43" strokeWidth="2.6" strokeLinejoin="round"/>
      <path d={arm.right} fill={look.jacket} stroke="#263D43" strokeWidth="2.6" strokeLinejoin="round"/>
      <path d={arm.leftHand} fill={look.skin} stroke="#794B3A" strokeWidth="2" strokeLinejoin="round"/>
      <path d={arm.rightHand} fill={look.skin} stroke="#794B3A" strokeWidth="2" strokeLinejoin="round"/>
      <path d={pose === 'greeting' ? 'M176 43l-1-11M185 45l4-11M194 49l5-8' : pose === 'celebrating' ? 'M23 45l-5-10M184 45l5-10' : 'M22 81l-1-7M30 91l1-7M181 91l-1-7'} stroke="#794B3A" strokeWidth="1.7" strokeLinecap="round" fill="none"/>
      <path d="M92 72H114V96Q103 105 92 96Z" fill={look.skin} stroke="#794B3A" strokeWidth="1.6"/>
      <ellipse cx="103" cy="53" rx="31" ry="36" fill={look.skin} stroke="#794B3A" strokeWidth="2.3"/>
      <ellipse cx="72" cy="67" rx="5" ry="8" fill={look.skin}/>
      <ellipse cx="134" cy="67" rx="5" ry="8" fill={look.skin}/>
      <Hair look={look}/>
      <path d="M88 53q5-4 10 0M111 53q5-4 10 0" stroke={look.hair} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <ellipse cx="93" cy="61" rx="2.5" ry="3" fill="#241D1B"/><ellipse cx="114" cy="61" rx="2.5" ry="3" fill="#241D1B"/>
      <path d={pose === 'thinking' ? 'M98 76q5-4 10 0' : 'M96 76q7 7 14 0'} stroke="#71422F" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      {look.accessory === 'glasses' && <g stroke="#243940" strokeWidth="2.2" fill="none"><circle cx="92" cy="61" r="8"/><circle cx="115" cy="61" r="8"/><path d="M100 61h7"/></g>}
      {look.accessory === 'round-glasses' && <g stroke={look.accent} strokeWidth="2.5" fill="none"><circle cx="92" cy="61" r="9"/><circle cx="115" cy="61" r="9"/><path d="M101 61h5"/></g>}
      {look.accessory === 'headset' && <g stroke={look.accent} strokeWidth="4" fill="none"><path d="M70 59Q69 20 103 18Q138 20 136 59"/><path d="M69 55v18M136 55v18M136 72h-8"/></g>}
      {look.accessory === 'headband' && <path d="M73 42Q103 21 133 42" fill="none" stroke={look.accent} strokeWidth="5" strokeLinecap="round"/>}
      {look.accessory === 'earrings' && <g fill={look.accent}><circle cx="70" cy="69" r="3.2"/><circle cx="136" cy="69" r="3.2"/></g>}
      {look.accessory === 'tie' && <path d="M103 104l-7 12 7 27 8-27Z" fill={look.accent}/>}
      {look.accessory === 'beard' && <path d="M76 67Q77 101 103 104Q129 101 130 67Q119 89 103 86Q87 89 76 67Z" fill={look.hair} stroke="#794B3A" strokeWidth="1"/>}
      {look.prop && <Prop look={look}/>}
      <ellipse cx="103" cy="214" rx="43" ry="5" fill="#162E34" opacity=".12"/>
    </svg>
  );
}

/** Cena didática: professor em destaque, enquadrado em uma bancada e falando diretamente com o aluno. */
export function TeacherScene({
  teacher, pose = 'presenting', size = 156, eyebrow = 'AULA COM SEU PROFESSOR', heading, message, className = '',
}: {
  teacher: FictionalTeacher;
  pose?: TeacherPose;
  size?: number;
  eyebrow?: string;
  heading: string;
  message: ReactNode;
  className?: string;
}) {
  return (
    <section className={\`teacher-scene \${className}\`} style={{ '--teacher-tone': \`rgb(var(--\${teacher.tone}))\` } as CSSProperties} aria-label={\`\${teacher.name} explicando: \${heading}\`}>
      <div className="teacher-scene__portrait">
        <span className="teacher-scene__spotlight" aria-hidden="true"/>
        <TeacherCharacter teacher={teacher} pose={pose} size={size} className="teacher-scene__figure"/>
        <span className="teacher-scene__name">{teacher.name}</span>
      </div>
      <div className="teacher-scene__lesson">
        <p className="teacher-scene__eyebrow">{eyebrow} · {teacher.expertiseLabel}</p>
        <h2 className="teacher-scene__heading">{heading}</h2>
        <div className="teacher-scene__speech"><span className="teacher-scene__quote" aria-hidden="true">“</span><div>{message}</div></div>
      </div>
    </section>
  );
}

export function TeacherCue({
  teacher, pose = 'presenting', size = 112, children, compact = false, className = '',
}: {
  teacher: FictionalTeacher;
  pose?: TeacherPose;
  size?: number;
  children: ReactNode;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`teacher-cue flex items-center gap-2.5 rounded-2xl border px-3 py-2 ${compact ? 'min-h-[4.5rem]' : 'min-h-[6rem]'} ${className}`}
      style={{ borderColor: `rgb(var(--${teacher.tone}) / .28)`, backgroundColor: `rgb(var(--${teacher.tone}) / .07)` }}
      aria-label={`Professor ${teacher.name}`}
    >
      <TeacherCharacter teacher={teacher} pose={pose} size={size}/>
      <div className="min-w-0 flex-1">
        <p className="text-[.68rem] font-bold uppercase tracking-[.11em] text-muted">{teacher.name} · {teacher.expertiseLabel}</p>
        <div className="mt-1 text-sm leading-snug text-ink">{children}</div>
      </div>
    </div>
  );
}
