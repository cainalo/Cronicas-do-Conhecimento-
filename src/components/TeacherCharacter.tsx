import type { CSSProperties, ReactNode } from 'react';
import type { FictionalTeacher } from '@/content/teachers';

export type TeacherPose = 'greeting' | 'presenting' | 'thinking' | 'celebrating' | 'listening';

type HairStyle = 'long' | 'bun' | 'short' | 'curls' | 'bob' | 'braid' | 'waves' | 'fade';
type Accessory = 'glasses' | 'round-glasses' | 'headset' | 'earrings' | 'headband' | 'beard';

type Look = {
  skin: string;
  hair: string;
  shirt: string;
  jacket: string;
  pants: string;
  accent: string;
  hairStyle: HairStyle;
  accessory?: Accessory;
};

/**
 * Direção v3: personagens construídos com poucas massas vetoriais, cores chapadas,
 * silhuetas legíveis e expressões exageradas. A referência é a clareza da ilustração
 * educativa contemporânea; os desenhos, rostos, roupas e silhuetas são originais do Pórtico.
 */
const LOOKS: Record<string, Look> = {
  'prof.clara': { skin:'#E9B994', hair:'#34201C', shirt:'#FFF0D7', jacket:'#F05A4F', pants:'#304D76', accent:'#FFC83D', hairStyle:'long', accessory:'earrings' },
  'prof.lia': { skin:'#C98E6A', hair:'#211B1B', shirt:'#FFF0D7', jacket:'#009E9A', pants:'#174C70', accent:'#FFD13F', hairStyle:'bun', accessory:'headset' },
  'prof.davi': { skin:'#8D5A3F', hair:'#211B1B', shirt:'#FFF0D7', jacket:'#3678D8', pants:'#24445A', accent:'#F4B52B', hairStyle:'short', accessory:'beard' },
  'prof.iara': { skin:'#A86F4C', hair:'#2A1A12', shirt:'#FFF0D7', jacket:'#8B5BC7', pants:'#425C45', accent:'#FFC83D', hairStyle:'curls', accessory:'earrings' },
  'prof.nina': { skin:'#E4B99B', hair:'#30364B', shirt:'#FFF7E8', jacket:'#E9A62B', pants:'#354C78', accent:'#7A55B6', hairStyle:'bob', accessory:'round-glasses' },
  'prof.ravi': { skin:'#A96F4F', hair:'#241B18', shirt:'#FFF0D7', jacket:'#2E9A65', pants:'#25475A', accent:'#F2C13A', hairStyle:'fade', accessory:'beard' },
  'prof.mateus': { skin:'#D4A17B', hair:'#513629', shirt:'#FFF0D7', jacket:'#E17A36', pants:'#43516A', accent:'#F7C74B', hairStyle:'short', accessory:'glasses' },
  'prof.marina': { skin:'#B97855', hair:'#2C1D1B', shirt:'#FFF0D7', jacket:'#339A75', pants:'#344C45', accent:'#F2C13A', hairStyle:'braid', accessory:'earrings' },
  'prof.beatriz': { skin:'#E8C2A4', hair:'#493126', shirt:'#FFF0D7', jacket:'#8658C2', pants:'#45436A', accent:'#F8C34B', hairStyle:'bun', accessory:'glasses' },
  'prof.sofia': { skin:'#F0C6A5', hair:'#A64F2D', shirt:'#FFF0D7', jacket:'#EE684F', pants:'#315778', accent:'#6FAE69', hairStyle:'waves', accessory:'headband' },
  'prof.helena': { skin:'#D5A17B', hair:'#211E28', shirt:'#FFF0D7', jacket:'#318AA7', pants:'#514765', accent:'#F5C84A', hairStyle:'long', accessory:'headband' },
  'prof.augusto': { skin:'#B77D5D', hair:'#D2C7B5', shirt:'#FFF0D7', jacket:'#247D91', pants:'#49434B', accent:'#EFB64A', hairStyle:'short', accessory:'glasses' },
  'prof.caio': { skin:'#D09A76', hair:'#27222B', shirt:'#FFF0D7', jacket:'#D99A26', pants:'#294E59', accent:'#4B9E9C', hairStyle:'fade', accessory:'headset' },
};

function Hair({ look }: { look: Look }) {
  const c = look.hair;
  switch (look.hairStyle) {
    case 'long':
      return <g fill={c}>
        <path d="M65 91Q55 25 120 22Q185 25 175 91L174 151Q163 165 151 148L151 87Q145 58 120 55Q94 57 88 88L89 148Q77 165 66 151Z"/>
        <path d="M72 55Q90 25 121 29Q151 24 168 55Q145 44 126 47Q94 45 72 55Z"/>
      </g>;
    case 'bun':
      return <g fill={c}>
        <circle cx="120" cy="23" r="20"/>
        <path d="M65 86Q61 31 120 29Q180 31 175 86Q154 65 120 63Q85 64 65 86Z"/>
      </g>;
    case 'short':
      return <path d="M65 87Q61 29 120 28Q179 29 175 87Q155 65 120 64Q85 64 65 87Z" fill={c}/>;
    case 'curls':
      return <g fill={c}>
        <path d="M62 92Q51 43 86 34Q99 14 120 24Q145 11 157 36Q188 49 178 94L164 138L155 87Q144 63 120 63Q94 62 82 88L73 138Z"/>
        <circle cx="70" cy="64" r="15"/><circle cx="91" cy="39" r="15"/>
        <circle cx="116" cy="27" r="15"/><circle cx="141" cy="31" r="15"/>
        <circle cx="163" cy="49" r="15"/><circle cx="174" cy="73" r="13"/>
      </g>;
    case 'bob':
      return <path d="M64 87Q61 29 120 28Q180 29 176 87L171 132Q160 146 148 130L151 87Q143 63 120 63Q96 63 87 88L89 132Q77 146 67 132Z" fill={c}/>;
    case 'braid':
      return <g fill={c}>
        <path d="M64 87Q61 29 120 28Q179 29 176 87L165 129L153 122L151 86Q143 63 120 63Q96 63 87 87L77 130L67 129Z"/>
        <path d="M166 76Q188 93 176 113Q190 130 175 148Q157 135 167 115Q153 94 166 76Z"/>
        <circle cx="175" cy="146" r="8" fill={look.accent}/>
      </g>;
    case 'waves':
      return <g fill={c}>
        <path d="M64 88Q57 24 120 23Q184 24 176 88Q173 109 159 101Q166 119 153 139L151 86Q143 62 120 62Q95 62 87 88Q92 111 77 138Q61 121 68 101Z"/>
        <path d="M68 71Q83 35 111 36Q91 55 86 77M151 40Q173 48 175 76" fill="none" stroke={c} strokeWidth="13" strokeLinecap="round"/>
      </g>;
    case 'fade':
      return <path d="M65 85Q62 31 120 30Q178 31 175 85L160 75Q143 65 120 65Q92 64 77 76Z" fill={c}/>;
  }
}

function Face({ look, pose }: { look: Look; pose: TeacherPose }) {
  const mouth = pose === 'thinking'
    ? <path d="M111 119Q120 113 129 119" fill="none" stroke="#633B36" strokeWidth="4" strokeLinecap="round"/>
    : pose === 'celebrating'
      ? <g><path d="M105 112Q120 139 135 112Q132 137 120 137Q108 137 105 112Z" fill="#633B36"/><path d="M111 130Q120 126 129 130Q126 136 120 136Q114 136 111 130Z" fill="#F28A83"/></g>
      : pose === 'listening'
        ? <path d="M111 119Q120 127 129 119" fill="none" stroke="#633B36" strokeWidth="4" strokeLinecap="round"/>
        : <path d="M105 113Q120 133 135 113Q131 132 120 132Q109 132 105 113Z" fill="#633B36"/>;
  const brows = pose === 'thinking'
    ? ['M93 77Q102 69 112 77','M128 77Q138 69 147 76']
    : pose === 'celebrating'
      ? ['M93 75Q102 66 112 73','M128 73Q138 66 147 75']
      : ['M93 79Q102 75 112 79','M128 79Q138 75 147 79'];
  return <g>
    <path d="M74 76Q72 38 120 37Q168 38 166 76L163 116Q161 145 120 150Q79 145 77 116Z" fill={look.skin}/>
    <circle cx="72" cy="91" r="10" fill={look.skin}/>
    <circle cx="168" cy="91" r="10" fill={look.skin}/>
    <path d={brows[0]} fill="none" stroke={look.hair} strokeWidth="5" strokeLinecap="round"/>
    <path d={brows[1]} fill="none" stroke={look.hair} strokeWidth="5" strokeLinecap="round"/>
    <ellipse cx="101" cy="96" rx="10.5" ry="14" fill="#FFFFFF"/>
    <ellipse cx="139" cy="96" rx="10.5" ry="14" fill="#FFFFFF"/>
    <ellipse cx={pose === 'greeting' ? 103 : 101} cy="99" rx="5.1" ry="7.4" fill="#28252B"/>
    <ellipse cx={pose === 'greeting' ? 141 : 139} cy="99" rx="5.1" ry="7.4" fill="#28252B"/>
    <circle cx="104" cy="95" r="2.1" fill="#FFFFFF"/>
    <circle cx="142" cy="95" r="2.1" fill="#FFFFFF"/>
    <ellipse cx="120" cy="108" rx="3.1" ry="2.4" fill="#B9795E" opacity=".55"/>
    {mouth}
    {look.accessory === 'beard' && <path d="M82 113Q91 145 120 148Q149 145 158 113Q145 126 120 126Q95 126 82 113Z" fill={look.hair}/>}
    {look.accessory === 'glasses' && <g fill="none" stroke="#302D36" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><rect x="86" y="83" width="29" height="27" rx="9"/><rect x="125" y="83" width="29" height="27" rx="9"/><path d="M115 94h10"/></g>}
    {look.accessory === 'round-glasses' && <g fill="none" stroke={look.accent} strokeWidth="3.4"><circle cx="101" cy="96" r="15"/><circle cx="139" cy="96" r="15"/><path d="M116 94h8"/></g>}
  </g>;
}

function Hands({ x, y, skin, gesture }: { x: number; y: number; skin: string; gesture: 'open'|'closed' }) {
  return <g transform={\`translate(\${x} \${y})\`}>
    <circle r="9.5" fill={skin}/>
    {gesture === 'open' && <g fill={skin}>
      <rect x="-10" y="-15" width="5.5" height="13" rx="2.7"/>
      <rect x="-3" y="-18" width="5.5" height="15" rx="2.7"/>
      <rect x="4" y="-16" width="5.5" height="13" rx="2.7"/>
      <path d="M-7 1Q-15-4-13-9Q-8-13-3-5Z"/>
    </g>}
  </g>;
}

export function TeacherCharacter({
  teacher, pose = 'presenting', size = 160, className = '', portrait = false,
}: {
  teacher: FictionalTeacher;
  pose?: TeacherPose;
  size?: number;
  className?: string;
  portrait?: boolean;
}) {
  const look = LOOKS[teacher.id] ?? LOOKS['prof.lia'];
  const arms: Record<TeacherPose, { left: string; right: string; lh: [number,number]; rh: [number,number]; open: boolean }> = {
    presenting: { left:'M91 160Q76 174 66 193', right:'M149 160Q169 156 181 139', lh:[66,194], rh:[182,139], open:true },
    greeting: { left:'M91 160Q78 177 82 194', right:'M149 158Q174 126 181 91', lh:[82,195], rh:[182,90], open:true },
    thinking: { left:'M91 160Q76 177 77 194', right:'M149 158Q163 144 151 128', lh:[77,195], rh:[151,128], open:false },
    celebrating: { left:'M91 158Q66 129 58 91', right:'M149 158Q176 128 184 91', lh:[58,90], rh:[184,90], open:true },
    listening: { left:'M91 160Q102 183 114 181', right:'M149 160Q138 183 126 181', lh:[114,182], rh:[126,182], open:false },
  };
  const a = arms[pose];
  const style: CSSProperties = portrait ? { width:size, height:size } : { width:Math.round(size * .9), height:size };
  const gesture = a.open ? 'open' : 'closed';
  return (
    <svg viewBox={portrait ? '40 18 160 160' : '0 0 240 280'} width={style.width} height={style.height}
      className={\`shrink-0 \${portrait ? 'rounded-full overflow-hidden' : 'overflow-visible'} \${className}\`}
      style={style} role="img" aria-label={\`\${teacher.name}, personagem ilustrado do Pórtico\`}
      data-character-style="portico-friends-v3" focusable="false">
      {portrait && <circle cx="120" cy="98" r="88" fill={\`rgb(var(--\${teacher.tone}))\`}/>}

      {!portrait && <ellipse cx="120" cy="266" rx="46" ry="5" fill="#1E3035" opacity=".12"/>}

      {/* Corpo e membros usam poucas formas largas, sem contorno decorativo. */}
      <path d="M103 205Q104 224 101 252" fill="none" stroke={look.pants} strokeWidth="18" strokeLinecap="round"/>
      <path d="M137 205Q136 224 139 252" fill="none" stroke={look.pants} strokeWidth="18" strokeLinecap="round"/>
      <rect x="78" y="250" width="34" height="11" rx="5.5" fill={look.accent}/>
      <rect x="128" y="250" width="34" height="11" rx="5.5" fill={look.accent}/>

      <path d="M90 144Q120 130 150 144Q162 151 160 185L156 214Q120 225 84 214L80 185Q78 151 90 144Z" fill={look.jacket}/>
      <path d="M105 142Q120 155 135 142L139 210H101Z" fill={look.shirt}/>
      <path d="M105 145Q120 158 135 145" fill="none" stroke={look.accent} strokeWidth="6" strokeLinecap="round"/>

      {/* As mangas são uma só massa visual com os braços e terminam em mãos simples. */}
      <path d={a.left} fill="none" stroke={look.jacket} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={a.right} fill="none" stroke={look.jacket} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round"/>
      <Hands x={a.lh[0]} y={a.lh[1]} skin={look.skin} gesture={gesture}/>
      <Hands x={a.rh[0]} y={a.rh[1]} skin={look.skin} gesture={gesture}/>

      <path d="M108 128Q120 140 132 128V151Q120 159 108 151Z" fill={look.skin}/>
      <Hair look={look}/>
      <Face look={look} pose={pose}/>

      {/* Acessórios são poucos, grandes e reconhecíveis em tamanho pequeno. */}
      {look.accessory === 'headset' && <g fill="none" stroke={look.accent} strokeWidth="7" strokeLinecap="round">
        <path d="M64 88Q61 22 120 22Q179 22 176 88"/>
        <path d="M63 83v21M177 83v21"/>
      </g>}
      {look.accessory === 'headband' && <path d="M68 60Q120 27 172 60" fill="none" stroke={look.accent} strokeWidth="9" strokeLinecap="round"/>}
      {look.accessory === 'earrings' && <g fill={look.accent}><circle cx="69" cy="110" r="4.2"/><circle cx="171" cy="110" r="4.2"/></g>}
      {pose === 'thinking' && <path d="M157 120Q168 111 175 119" fill="none" stroke={look.skin} strokeWidth="5" strokeLinecap="round"/>}
    </svg>
  );
}

export function TeacherScene({
  teacher, pose = 'presenting', size = 174, eyebrow = 'AULA COM SEU PROFESSOR', heading, message, className = '',
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
  teacher, pose = 'presenting', size = 98, children, compact = false, className = '',
}: {
  teacher: FictionalTeacher;
  pose?: TeacherPose;
  size?: number;
  children: ReactNode;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={\`teacher-cue flex items-center gap-2.5 rounded-2xl border px-3 py-2 \${compact ? 'min-h-[4.5rem]' : 'min-h-[6rem]'} \${className}\`}
      style={{ borderColor: \`rgb(var(--\${teacher.tone}) / .28)\`, backgroundColor: \`rgb(var(--\${teacher.tone}) / .07)\` }}
      aria-label={\`Professor \${teacher.name}\`}>
      <TeacherCharacter teacher={teacher} pose={pose} size={size} portrait/>
      <div className="min-w-0 flex-1">
        <p className="text-[.68rem] font-bold uppercase tracking-[.11em] text-muted">{teacher.name} · {teacher.expertiseLabel}</p>
        <div className="mt-1 text-sm leading-snug text-ink">{children}</div>
      </div>
    </div>
  );
}
