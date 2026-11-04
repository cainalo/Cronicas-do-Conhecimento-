import type { CSSProperties, ReactNode } from 'react';
import type { FictionalTeacher } from '@/content/teachers';

export type TeacherPose = 'greeting' | 'presenting' | 'thinking' | 'celebrating' | 'listening';
type Outfit = 'blazer' | 'hoodie' | 'cardigan' | 'labcoat' | 'shirt' | 'vest' | 'tunic';
type Look = {
  skin: string; hair: string; shirt: string; jacket: string; pants: string; accent: string;
  hairStyle: 'long' | 'bun' | 'short' | 'curls' | 'bob' | 'braid' | 'waves' | 'fade';
  outfit: Outfit;
  accessory?: 'glasses' | 'round-glasses' | 'headset' | 'earrings' | 'headband' | 'beard';
  prop?: 'book' | 'map' | 'shield' | 'chip' | 'folder' | 'terminal' | 'mug' | 'scroll' | 'speech';
};

const LOOKS: Record<string, Look> = {
  'prof.clara': { skin:'#E9B994',hair:'#3B2418',shirt:'#FFF4E3',jacket:'#C8402A',pants:'#314B55',accent:'#D4A017',hairStyle:'long',outfit:'blazer',accessory:'earrings',prop:'book' },
  'prof.lia': { skin:'#C98E6A',hair:'#1D1A17',shirt:'#F7EEDF',jacket:'#0F4C5C',pants:'#263D43',accent:'#D4A017',hairStyle:'bun',outfit:'hoodie',accessory:'headset',prop:'terminal' },
  'prof.davi': { skin:'#8D5A3F',hair:'#1D1A17',shirt:'#F7EEDF',jacket:'#243F63',pants:'#273642',accent:'#D4A017',hairStyle:'short',outfit:'vest',accessory:'beard',prop:'map' },
  'prof.iara': { skin:'#A86F4C',hair:'#2A1A12',shirt:'#F7EEDF',jacket:'#6B3A6E',pants:'#3D4D3C',accent:'#556B2F',hairStyle:'curls',outfit:'tunic',accessory:'earrings',prop:'shield' },
  'prof.nina': { skin:'#E4B99B',hair:'#2C3444',shirt:'#F7EEDF',jacket:'#6B3A6E',pants:'#303B58',accent:'#D4A017',hairStyle:'bob',outfit:'labcoat',accessory:'round-glasses',prop:'chip' },
  'prof.ravi': { skin:'#A96F4F',hair:'#241B18',shirt:'#F7EEDF',jacket:'#556B2F',pants:'#243D49',accent:'#C8402A',hairStyle:'fade',outfit:'hoodie',accessory:'beard',prop:'terminal' },
  'prof.mateus': { skin:'#D4A17B',hair:'#513629',shirt:'#F7EEDF',jacket:'#345C66',pants:'#3B414B',accent:'#D4A017',hairStyle:'short',outfit:'cardigan',accessory:'glasses',prop:'folder' },
  'prof.marina': { skin:'#B97855',hair:'#2C1D1B',shirt:'#F7EEDF',jacket:'#556B2F',pants:'#34433C',accent:'#C8402A',hairStyle:'braid',outfit:'shirt',accessory:'earrings',prop:'mug' },
  'prof.beatriz': { skin:'#E8C2A4',hair:'#493126',shirt:'#FFF5E8',jacket:'#6B3A6E',pants:'#37364C',accent:'#D4A017',hairStyle:'bun',outfit:'blazer',accessory:'glasses',prop:'scroll' },
  'prof.sofia': { skin:'#F0C6A5',hair:'#A64F2D',shirt:'#FFF4E4',jacket:'#C8402A',pants:'#31505B',accent:'#556B2F',hairStyle:'waves',outfit:'cardigan',accessory:'headband',prop:'book' },
  'prof.helena': { skin:'#D5A17B',hair:'#211E28',shirt:'#F7EEDF',jacket:'#315F68',pants:'#474052',accent:'#D4A017',hairStyle:'long',outfit:'tunic',accessory:'headband',prop:'speech' },
  'prof.augusto': { skin:'#B77D5D',hair:'#D2C7B5',shirt:'#F7EEDF',jacket:'#0F4C5C',pants:'#45404A',accent:'#C8402A',hairStyle:'short',outfit:'vest',accessory:'glasses',prop:'folder' },
  'prof.caio': { skin:'#D09A76',hair:'#27222B',shirt:'#F7EEDF',jacket:'#3B5B62',pants:'#263C43',accent:'#D4A017',hairStyle:'fade',outfit:'shirt',accessory:'headset',prop:'chip' },
};

function Hair({ look }: { look: Look }) {
  const c = look.hair;
  switch (look.hairStyle) {
    case 'long': return <g fill={c} stroke="#35231E" strokeWidth="2.5" strokeLinejoin="round"><path d="M65 80Q55 20 120 19Q185 20 175 80L171 148Q161 164 150 149L151 82Q143 48 120 46Q96 47 88 83L90 149Q78 164 69 148Z"/><path d="M91 39Q106 28 123 30" fill="none" stroke="#FFFFFF" strokeOpacity=".18" strokeWidth="4" strokeLinecap="round"/></g>;
    case 'bun': return <g fill={c} stroke="#35231E" strokeWidth="2.5"><circle cx="120" cy="24" r="18"/><path d="M65 81Q62 36 120 32Q178 36 175 81L164 98Q151 61 120 59Q88 60 76 98Z"/></g>;
    case 'short': return <path d="M65 82Q61 29 120 28Q179 29 175 82Q155 60 120 59Q85 59 65 82Z" fill={c} stroke="#35231E" strokeWidth="2.5" strokeLinejoin="round"/>;
    case 'curls': return <g fill={c} stroke="#35231E" strokeWidth="2.2" strokeLinejoin="round"><path d="M62 93Q51 43 87 32Q98 13 120 24Q143 12 155 35Q188 48 178 94L165 137L157 85Q143 58 120 59Q94 58 82 86L74 139Z"/>{[[70,61,12],[89,36,13],[111,26,14],[134,28,13],[155,43,13],[171,65,12]].map(([x,y,r])=><circle key={x} cx={x} cy={y} r={r}/>)}</g>;
    case 'bob': return <path d="M64 82Q61 28 120 28Q180 29 176 83L171 128Q160 144 149 128L151 82Q143 59 120 58Q96 58 87 83L89 128Q77 144 68 128Z" fill={c} stroke="#35231E" strokeWidth="2.5" strokeLinejoin="round"/>;
    case 'braid': return <g fill={c} stroke="#35231E" strokeWidth="2.5" strokeLinejoin="round"><path d="M64 82Q61 29 120 28Q179 29 176 83L166 128L153 120L151 82Q143 58 120 58Q96 58 87 83L77 130L67 128Z"/><path d="M166 80Q188 101 176 123Q190 139 174 154Q157 140 167 123Q152 103 166 80Z"/><path d="M168 102l7 11-7 12-7-12" fill="none" stroke="#D9A66F" strokeWidth="2.7"/></g>;
    case 'waves': return <path d="M64 84Q57 23 120 22Q184 23 176 84Q173 104 160 98Q166 118 153 137L151 82Q143 57 120 57Q95 57 87 85Q92 107 77 135Q61 119 68 100Z" fill={c} stroke="#35231E" strokeWidth="2.5" strokeLinejoin="round"/>;
    case 'fade': return <path d="M65 81Q62 32 120 31Q178 32 175 81L161 70Q143 59 120 59Q92 58 77 72Z" fill={c} stroke="#35231E" strokeWidth="2.5" strokeLinejoin="round"/>;
  }
}

function OutfitDetails({ look }: { look: Look }) {
  const line = { fill:'none', stroke:'#263E45', strokeWidth:2.2, strokeLinecap:'round' as const, strokeLinejoin:'round' as const };
  switch (look.outfit) {
    case 'blazer': return <g {...line}><path d="M104 145L120 168L136 145L147 213"/><path d="M104 145L93 171L105 180L114 168"/><path d="M136 145L147 171L135 180L126 168"/><path d="M120 178v23" stroke={look.accent} strokeDasharray="2 5"/><circle cx="132" cy="190" r="2.4" fill={look.accent} stroke="none"/></g>;
    case 'hoodie': return <g {...line}><path d="M90 145Q120 126 150 145L161 161"/><path d="M104 147Q120 169 136 147" stroke={look.accent}/><path d="M112 170l-2 26M128 170l2 26" stroke={look.accent}/><path d="M91 190Q120 202 149 190L146 205Q120 215 94 205Z" fill={look.jacket} stroke="#263E45"/><path d="M110 197h20" stroke={look.accent}/></g>;
    case 'cardigan': return <g {...line}><path d="M101 143L105 211M139 143L135 211"/><path d="M105 160L120 177L135 160" stroke={look.accent}/><circle cx="128" cy="184" r="2.2" fill={look.accent} stroke="none"/><circle cx="128" cy="197" r="2.2" fill={look.accent} stroke="none"/><path d="M83 177Q94 183 103 178M137 178Q148 183 157 177"/></g>;
    case 'labcoat': return <g {...line}><path d="M99 141L108 173L120 161L132 173L141 141"/><path d="M108 173L100 211M132 173L140 211"/><path d="M91 183h15v17H91ZM134 183h15v17h-15Z" fill="#FFFDF7" stroke="#6F8B8C"/><path d="M120 163v45" stroke={look.accent}/></g>;
    case 'shirt': return <g {...line}><path d="M105 142L120 160L135 142L142 211H98Z" fill={look.shirt} stroke="#263E45"/><path d="M105 145L120 160L135 145" stroke={look.accent}/><path d="M139 175h14v19h-14Z"/><path d="M146 179v5" stroke={look.accent}/><path d="M120 169v31" stroke={look.accent} strokeDasharray="2 5"/></g>;
    case 'vest': return <g {...line}><path d="M103 143L120 165L137 143L151 211H132L120 187L108 211H89Z" fill={look.jacket} stroke="#263E45"/><path d="M120 165v27M108 178l12 12 12-12" stroke={look.accent}/><circle cx="120" cy="203" r="2.2" fill={look.accent} stroke="none"/></g>;
    case 'tunic': return <g {...line}><path d="M104 143L120 162L136 143L148 215H92Z"/><path d="M120 163v51" stroke={look.accent} strokeDasharray="3 5"/><path d="M94 183h14M132 183h14" stroke={look.accent}/><path d="M101 211h38" stroke="#263E45"/></g>;
  }
}

function Prop({ look }: { look: Look }) {
  const c = look.accent;
  switch (look.prop) {
    case 'book': return <g><path d="M145 166Q157 161 169 167V194Q157 190 145 195Z" fill="#FFF4E3" stroke="#46535A" strokeWidth="2.4"/><path d="M157 165V192M150 174h6M160 174h6M150 182h6M160 182h6" stroke={c} strokeWidth="1.8" fill="none"/></g>;
    case 'map': return <g><path d="M145 166l8-3 9 4 8-3v29l-8 3-9-4-8 4Z" fill="#F7EEDF" stroke="#46535A" strokeWidth="2.4"/><path d="M153 163v29M162 167v29M148 184l7-6 5 3 6-8" fill="none" stroke={c} strokeWidth="2"/></g>;
    case 'shield': return <path d="M157 163L171 168V181Q170 194 157 199Q144 194 143 181V168Z" fill={c} stroke="#46535A" strokeWidth="2.4"/>;
    case 'chip': return <g><rect x="146" y="165" width="27" height="27" rx="5" fill="#0F4C5C" stroke={c} strokeWidth="2.4"/><rect x="153" y="172" width="13" height="13" rx="2" fill="#F7EEDF"/><path d="M151 160v5M159 160v5M167 160v5M151 192v5M159 192v5M167 192v5" stroke={c} strokeWidth="2"/></g>;
    case 'folder': return <g><path d="M143 170h13l5 5h13v20h-31Z" fill="#E7BF79" stroke="#46535A" strokeWidth="2.4"/><path d="M149 181h19M149 187h14" stroke="#8A5B34" strokeWidth="1.8"/></g>;
    case 'mug': return <g><rect x="148" y="171" width="22" height="22" rx="5" fill="#FFF4E3" stroke="#46535A" strokeWidth="2.4"/><path d="M170 176h5Q181 187 170 189" fill="none" stroke="#46535A" strokeWidth="2.6"/><path d="M154 167Q149 160 155 156M163 167Q158 160 164 156" fill="none" stroke="#C8402A" strokeWidth="1.8"/></g>;
    case 'scroll': return <g><path d="M148 165h23v30q-11 8-23 0Z" fill="#FFF4E3" stroke="#46535A" strokeWidth="2.4"/><path d="M153 173h13M153 181h13M153 189h9" stroke="#31505B" strokeWidth="1.8"/></g>;
    case 'speech': return <g><path d="M144 165h30v25h-12l-8 8v-8h-10Z" fill="#FFF4E3" stroke="#46535A" strokeWidth="2.4"/><path d="M150 174h18M150 181h13" stroke="#31505B" strokeWidth="1.8"/></g>;
    case 'terminal': return <g><rect x="144" y="167" width="30" height="24" rx="5" fill="#102B32" stroke={c} strokeWidth="2.4"/><path d="M150 174l5 4-5 4M160 182h8" stroke="#F7EEDF" strokeWidth="2" fill="none" strokeLinecap="round"/></g>;
  }
}

function Hand({ x, y, skin, side }: { x: number; y: number; skin: string; side: 'left'|'right' }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M-9 2Q-12-5-8-11Q-3-15 1-10L4-5Q8-12 12-9Q16-6 12 1Q12 9 4 12Q-6 13-9 2Z" fill={skin} stroke="#805742" strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M-4-5Q-3 0-4 4M2-5Q3 0 2 5M8-4Q9 0 7 4" fill="none" stroke="#A66F57" strokeWidth="1.4" strokeLinecap="round"/>
    {side === 'right' && <path d="M-8 0Q-13-1-14-5" fill="none" stroke="#805742" strokeWidth="1.7" strokeLinecap="round"/>}
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
  const arms: Record<TeacherPose, { left: string; right: string; lh: [number,number]; rh: [number,number] }> = {
    presenting: { left:'M82 158Q67 171 60 199', right:'M158 158Q177 160 187 143', lh:[60,201], rh:[188,142] },
    greeting: { left:'M82 158Q67 178 70 205', right:'M158 157Q181 128 183 84', lh:[70,207], rh:[184,82] },
    thinking: { left:'M82 158Q66 178 67 205', right:'M157 156Q172 143 160 129', lh:[67,207], rh:[160,127] },
    celebrating: { left:'M83 158Q56 130 57 80', right:'M157 158Q184 128 183 80', lh:[57,78], rh:[184,78] },
    listening: { left:'M82 158Q98 183 116 179', right:'M158 158Q142 183 124 179', lh:[116,181], rh:[124,181] },
  };
  const a = arms[pose];
  const brows = pose === 'thinking'
    ? ['M94 67Q103 60 112 66','M128 66Q138 59 147 67']
    : pose === 'celebrating'
      ? ['M94 65Q103 57 112 64','M128 64Q138 57 147 65']
      : ['M94 68Q103 64 112 68','M128 68Q138 64 147 68'];
  const mouth = pose === 'thinking' ? 'M109 108Q120 103 131 108'
    : pose === 'celebrating' ? 'M104 102Q120 127 136 102'
    : pose === 'listening' ? 'M109 105Q120 112 131 105' : 'M106 103Q120 119 134 103';
  const style: CSSProperties = portrait ? { width:size, height:size } : { width:Math.round(size * .92), height:size };
  return (
    <svg viewBox={portrait ? '40 0 160 160' : '0 0 240 260'} width={style.width} height={style.height}
      className={`shrink-0 ${portrait ? 'rounded-full overflow-hidden' : 'overflow-visible'} ${className}`}
      style={style} role="img" aria-label={`${teacher.name}, personagem ilustrado do Pórtico`}
      data-character-style="portico-rounded-v2" focusable="false">
      {portrait && <circle cx="120" cy="80" r="82" fill={`rgb(var(--${teacher.tone}))`}/>}
      {!portrait && <ellipse cx="120" cy="253" rx="58" ry="5" fill="#1F3438" opacity=".13"/>}

      {/* Pernas e calçados: mais alongados para equilibrar a cabeça e dar postura adulta-cartunesca. */}
      <path d="M94 207Q91 225 94 244L111 244L116 209Z" fill={look.pants} stroke="#34464C" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M124 209L129 244L147 244Q150 224 145 207Z" fill={look.pants} stroke="#34464C" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M82 242Q99 237 114 245Q119 250 113 256Q95 261 78 254Q74 249 82 242Z" fill="#263B40" stroke="#182B30" strokeWidth="3"/>
      <path d="M127 245Q143 237 158 242Q166 249 159 255Q143 261 127 255Q121 250 127 245Z" fill="#263B40" stroke="#182B30" strokeWidth="3"/>
      <path d="M91 250h11M140 250h10" stroke="#F2D9B2" strokeWidth="2.2" strokeLinecap="round" opacity=".8"/>

      {/* Tronco com costuras, gola e detalhes específicos de cada professor. */}
      <path d="M83 139Q120 125 157 139Q171 146 172 177L166 214Q120 226 74 214L68 178Q69 148 83 139Z"
        fill={look.jacket} stroke="#34464C" strokeWidth="3.2" strokeLinejoin="round"/>
      <path d="M105 139L120 158L135 139L142 214H98Z" fill={look.shirt} stroke="#34464C" strokeWidth="2.2" strokeLinejoin="round"/>
      <path d="M105 140L120 158L135 140" fill="none" stroke={look.accent} strokeWidth="3.5" strokeLinejoin="round"/>
      <path d="M78 183Q88 188 98 183M142 183Q153 188 163 183" fill="none" stroke="#FFFFFF" strokeOpacity=".2" strokeWidth="2"/>
      <path d="M83 202Q120 213 157 202" fill="none" stroke="#263E45" strokeOpacity=".25" strokeWidth="2"/>
      <OutfitDetails look={look}/>
      <g transform="translate(0 4)"><Prop look={look}/></g>

      {/* Braços são desenhados depois do tronco, com punhos e mãos sobrepostos às mangas. */}
      <path d={a.left} fill="none" stroke="#34464C" strokeWidth="27" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={a.right} fill="none" stroke="#34464C" strokeWidth="27" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={a.left} fill="none" stroke={look.jacket} strokeWidth="21" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={a.right} fill="none" stroke={look.jacket} strokeWidth="21" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={a.left} fill="none" stroke="#FFFFFF" strokeOpacity=".16" strokeWidth="2" strokeLinecap="round"/>
      <path d={a.right} fill="none" stroke="#FFFFFF" strokeOpacity=".16" strokeWidth="2" strokeLinecap="round"/>
      <Hand x={a.lh[0]} y={a.lh[1]} skin={look.skin} side="left"/>
      <Hand x={a.rh[0]} y={a.rh[1]} skin={look.skin} side="right"/>

      {/* Pescoço, orelhas e rosto um pouco menores, com contorno e luz suaves. */}
      <path d="M108 126Q120 137 132 126V149Q120 159 108 149Z" fill={look.skin} stroke="#8A5C49" strokeWidth="2.2"/>
      <ellipse cx="66" cy="86" rx="9" ry="13" fill={look.skin} stroke="#8A5C49" strokeWidth="2.2"/>
      <ellipse cx="174" cy="86" rx="9" ry="13" fill={look.skin} stroke="#8A5C49" strokeWidth="2.2"/>
      <ellipse cx="120" cy="82" rx="55" ry="62" fill={look.skin} stroke="#684738" strokeWidth="3"/>
      <path d="M78 103Q82 120 95 130M162 103Q158 120 145 130" fill="none" stroke="#D78E72" strokeOpacity=".45" strokeWidth="2.1" strokeLinecap="round"/>
      <ellipse cx="84" cy="100" rx="8" ry="4" fill="#D97873" opacity=".2"/>
      <ellipse cx="156" cy="100" rx="8" ry="4" fill="#D97873" opacity=".2"/>
      <Hair look={look}/>
      {look.accessory === 'beard' && <path d="M74 98Q79 137 120 143Q161 137 166 98Q150 121 120 121Q90 121 74 98Z" fill={look.hair} stroke="#553B32" strokeWidth="2.4" strokeLinejoin="round"/>}
      <path d={brows[0]} fill="none" stroke={look.hair} strokeWidth="4.2" strokeLinecap="round"/>
      <path d={brows[1]} fill="none" stroke={look.hair} strokeWidth="4.2" strokeLinecap="round"/>
      <ellipse cx="101" cy="84" rx="9.5" ry="12" fill="#FFFCF4" stroke="#60483D" strokeWidth="1.8"/>
      <ellipse cx="139" cy="84" rx="9.5" ry="12" fill="#FFFCF4" stroke="#60483D" strokeWidth="1.8"/>
      <ellipse cx={pose === 'greeting' ? 103 : 102} cy={pose === 'thinking' ? 86 : 87} rx="4.7" ry="6.2" fill="#302A29"/>
      <ellipse cx="140" cy={pose === 'thinking' ? 82 : 87} rx="4.7" ry="6.2" fill="#302A29"/>
      <circle cx="104" cy="82" r="1.8" fill="#fff"/>
      <circle cx="142" cy="82" r="1.8" fill="#fff"/>
      <path d="M120 88Q116 96 120 98" fill="none" stroke="#A26B59" strokeWidth="1.8" strokeLinecap="round"/>
      <path d={mouth} fill={pose === 'celebrating' ? '#753D40' : 'none'} stroke="#743E3C" strokeWidth="2.8" strokeLinecap="round"/>
      {look.accessory === 'glasses' && <g fill="none" stroke="#243B43" strokeWidth="2.7"><rect x="87" y="73" width="28" height="23" rx="8"/><rect x="125" y="73" width="28" height="23" rx="8"/><path d="M115 83h10"/></g>}
      {look.accessory === 'round-glasses' && <g fill="none" stroke={look.accent} strokeWidth="2.8"><circle cx="101" cy="84" r="14"/><circle cx="139" cy="84" r="14"/><path d="M115 82h10"/></g>}
      {look.accessory === 'earrings' && <g fill={look.accent} stroke="#6B4A27" strokeWidth="1.3"><circle cx="65" cy="100" r="3.5"/><circle cx="175" cy="100" r="3.5"/></g>}
      {look.accessory === 'headband' && <path d="M66 59Q120 21 174 59" fill="none" stroke={look.accent} strokeWidth="6" strokeLinecap="round"/>}
      {look.accessory === 'headset' && <g fill="none" stroke={look.accent} strokeWidth="4.5" strokeLinecap="round"><path d="M66 75Q65 24 120 22Q175 24 174 75"/><rect x="59" y="69" width="11" height="24" rx="5" fill="#D4A017" stroke="#76501B" strokeWidth="1.8"/><rect x="170" y="69" width="11" height="24" rx="5" fill="#D4A017" stroke="#76501B" strokeWidth="1.8"/></g>}
      {pose === 'thinking' && <path d="M153 119Q166 111 172 121" fill="none" stroke="#8A5C49" strokeWidth="2.1" strokeLinecap="round"/>}
      {portrait && <path d="M79 139Q120 150 161 139" fill="none" stroke="#FFF4E3" strokeOpacity=".48" strokeWidth="3"/>}
    </svg>
  );
}

function HairAccessory({ look }: { look: Look }) {
  if (look.accessory === 'headband') return null;
  return null;
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
    <section className={`teacher-scene ${className}`} style={{ '--teacher-tone': `rgb(var(--${teacher.tone}))` } as CSSProperties} aria-label={`${teacher.name} explicando: ${heading}`}>
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
    <div className={`teacher-cue flex items-center gap-2.5 rounded-2xl border px-3 py-2 ${compact ? 'min-h-[4.5rem]' : 'min-h-[6rem]'} ${className}`}
      style={{ borderColor: `rgb(var(--${teacher.tone}) / .28)`, backgroundColor: `rgb(var(--${teacher.tone}) / .07)` }}
      aria-label={`Professor ${teacher.name}`}>
      <TeacherCharacter teacher={teacher} pose={pose} size={size} portrait/>
      <div className="min-w-0 flex-1">
        <p className="text-[.68rem] font-bold uppercase tracking-[.11em] text-muted">{teacher.name} · {teacher.expertiseLabel}</p>
        <div className="mt-1 text-sm leading-snug text-ink">{children}</div>
      </div>
    </div>
  );
}
