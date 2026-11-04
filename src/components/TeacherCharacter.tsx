import type { CSSProperties, ReactNode } from 'react';
import type { FictionalTeacher } from '@/content/teachers';

export type TeacherPose = 'greeting' | 'presenting' | 'thinking' | 'celebrating' | 'listening';

type Look = {
  skin: string; hair: string; shirt: string; jacket: string; pants: string; accent: string;
  hairStyle: 'long' | 'bun' | 'short' | 'curls' | 'bob' | 'braid' | 'waves' | 'fade';
  accessory?: 'glasses' | 'round-glasses' | 'headset' | 'earrings' | 'tie' | 'headband' | 'beard' | 'none';
  prop?: 'book' | 'tablet' | 'map' | 'shield' | 'chip' | 'folder' | 'terminal' | 'mug' | 'scroll' | 'speech';
};

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
  const c = look.hair;
  switch (look.hairStyle) {
    case 'long': return <g fill={c} stroke="#35231E" strokeWidth="2.5" strokeLinejoin="round"><path d="M61 79Q50 18 120 18Q190 18 179 81L172 158Q164 174 151 157L153 84Q144 47 120 45Q94 46 86 84L88 158Q75 174 66 157Z"/><path d="M91 39Q104 28 121 29" fill="none" stroke="#FFFFFF" strokeOpacity=".16" strokeWidth="5" strokeLinecap="round"/></g>;
    case 'bun': return <g fill={c} stroke="#35231E" strokeWidth="2.5"><circle cx="120" cy="25" r="22"/><path d="M61 81Q58 34 120 31Q181 34 179 81L165 101Q151 61 120 60Q87 60 74 101Z"/></g>;
    case 'short': return <path d="M61 83Q57 27 120 26Q183 27 179 83Q158 59 120 57Q83 58 61 83Z" fill={c} stroke="#35231E" strokeWidth="2.5" strokeLinejoin="round"/>;
    case 'curls': return <g fill={c} stroke="#35231E" strokeWidth="2.2" strokeLinejoin="round"><path d="M59 95Q45 42 85 31Q97 10 120 23Q144 10 157 34Q195 46 181 96L166 145L157 86Q142 57 120 58Q92 57 81 87L74 146Z"/>{[[69,60,14],[88,34,15],[111,25,15],[135,28,15],[157,43,15],[174,65,14]].map(([x,y,r])=><circle key={x} cx={x} cy={y} r={r}/>)}</g>;
    case 'bob': return <path d="M60 82Q57 25 120 25Q184 25 180 84L174 133Q164 150 150 132L153 83Q142 58 120 57Q94 58 85 83L88 132Q74 150 66 133Z" fill={c} stroke="#35231E" strokeWidth="2.5" strokeLinejoin="round"/>;
    case 'braid': return <g fill={c} stroke="#35231E" strokeWidth="2.5" strokeLinejoin="round"><path d="M60 82Q57 26 120 25Q183 26 180 83L169 131L155 121L153 83Q142 56 120 57Q94 57 85 83L76 132L65 130Z"/><path d="M169 80Q193 102 178 126Q194 143 175 160Q155 146 169 126Q151 104 169 80Z"/><path d="M169 103l8 13-8 13-8-13" fill="none" stroke="#D9A66F" strokeWidth="3"/></g>;
    case 'waves': return <path d="M59 86Q50 20 120 20Q189 21 181 86Q178 106 162 100Q169 121 153 141L151 84Q142 55 120 55Q91 55 84 88Q91 113 74 139Q56 120 66 102Z" fill={c} stroke="#35231E" strokeWidth="2.5" strokeLinejoin="round"/>;
    case 'fade': return <path d="M62 82Q58 31 120 29Q181 30 178 81L163 70Q143 55 120 56Q90 56 75 72Z" fill={c} stroke="#35231E" strokeWidth="2.5" strokeLinejoin="round"/>;
  }
}

function Prop({ look }: { look: Look }) {
  const accent = look.accent;
  switch (look.prop) {
    case 'book': return <g><path d="M151 159Q170 151 190 161V205Q169 197 151 207Z" fill="#FFF4E3" stroke="#46535A" strokeWidth="3"/><path d="M170 157V202" stroke={accent} strokeWidth="3"/><path d="M158 174h9M158 184h9M178 174h8M178 184h8" stroke="#31505B" strokeWidth="2.5" strokeLinecap="round"/></g>;
    case 'tablet': return <g><rect x="151" y="153" width="39" height="54" rx="8" fill="#203840" stroke={accent} strokeWidth="3"/><rect x="157" y="160" width="27" height="38" rx="3" fill="#F7EEDF"/><path d="M163 169h15M163 178h15M163 187h10" stroke="#0F4C5C" strokeWidth="2.4"/></g>;
    case 'map': return <g><path d="M151 159l13-6 14 6 13-6v48l-13 6-14-6-13 6Z" fill="#F7EEDF" stroke="#46535A" strokeWidth="3"/><path d="M164 153v48M178 159v48M157 185l7-8 8 3 9-11" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round"/></g>;
    case 'shield': return <path d="M172 152L193 160V181Q191 199 172 208Q153 199 151 181V160Z" fill={accent} stroke="#46535A" strokeWidth="3"/>;
    case 'chip': return <g><rect x="153" y="158" width="39" height="39" rx="7" fill="#0F4C5C" stroke={accent} strokeWidth="3"/><rect x="163" y="168" width="19" height="19" rx="3" fill="#F7EEDF"/><path d="M160 150v8M172 150v8M184 150v8M160 197v8M172 197v8M184 197v8" stroke={accent} strokeWidth="3"/></g>;
    case 'folder': return <g><path d="M151 163h17l6 7h18v37h-40Z" fill="#E7BF79" stroke="#46535A" strokeWidth="3"/><path d="M158 181h24M158 190h18" stroke="#8A5B34" strokeWidth="2.5"/></g>;
    case 'mug': return <g><rect x="155" y="167" width="34" height="34" rx="7" fill="#FFF4E3" stroke="#46535A" strokeWidth="3"/><path d="M189 175h7Q203 191 189 194" fill="none" stroke="#46535A" strokeWidth="4"/><path d="M164 160Q158 150 166 145M177 160Q171 150 179 145" fill="none" stroke="#C8402A" strokeWidth="2.7" strokeLinecap="round"/></g>;
    case 'scroll': return <g><path d="M158 157h33v48q-16 12-33 0Z" fill="#FFF4E3" stroke="#46535A" strokeWidth="3"/><path d="M165 170h19M165 181h19M165 192h13" stroke="#31505B" strokeWidth="2.5" strokeLinecap="round"/></g>;
    case 'speech': return <g><path d="M151 158h42v35h-17l-11 11v-11h-14Z" fill="#FFF4E3" stroke="#46535A" strokeWidth="3"/><path d="M160 170h24M160 180h17" stroke="#31505B" strokeWidth="2.5" strokeLinecap="round"/></g>;
    case 'terminal': return <g><rect x="151" y="160" width="43" height="36" rx="7" fill="#102B32" stroke={accent} strokeWidth="3"/><path d="M160 171l8 6-8 6M174 183h12" stroke="#F7EEDF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></g>;
    default: return null;
  }
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
  const arms: Record<TeacherPose, { left: string; right: string; leftHand: [number,number]; rightHand: [number,number] }> = {
    presenting: { left:'M81 166Q55 174 43 198', right:'M159 165Q184 166 198 145', leftHand:[42,199], rightHand:[200,143] },
    greeting: { left:'M81 166Q59 177 58 205', right:'M158 162Q182 129 185 79', leftHand:[58,207], rightHand:[187,75] },
    thinking: { left:'M81 166Q55 176 52 205', right:'M159 164Q175 142 164 119', leftHand:[52,207], rightHand:[163,116] },
    celebrating: { left:'M82 164Q51 130 52 82', right:'M158 164Q190 127 189 81', leftHand:[51,78], rightHand:[190,77] },
    listening: { left:'M82 165Q100 190 117 183', right:'M158 165Q140 190 123 183', leftHand:[117,184], rightHand:[123,184] },
  };
  const poseArms = arms[pose];
  const mouth = pose === 'thinking' ? 'M106 109Q120 103 134 109' : pose === 'celebrating' ? 'M101 103Q120 131 139 103' : pose === 'listening' ? 'M108 107Q120 114 132 107' : 'M103 103Q120 123 137 103';
  const brows = pose === 'thinking'
    ? ['M91 69Q103 60 111 68','M129 68Q140 60 150 69']
    : pose === 'celebrating'
      ? ['M91 66Q102 56 112 66','M128 66Q139 56 149 66']
      : ['M91 67Q102 62 111 67','M129 67Q139 62 149 67'];
  const sizeStyle: CSSProperties = portrait ? { width:size, height:size } : { width:Math.round(size * .92), height:size };
  const hand = (point: [number,number]) => `M${point[0]-10} ${point[1]}Q${point[0]-9} ${point[1]-15} ${point[0]+1} ${point[1]-13}Q${point[0]+15} ${point[1]-10} ${point[0]+11} ${point[1]+4}Q${point[0]} ${point[1]+15} ${point[0]-10} ${point[1]}Z`;
  return (
    <svg viewBox={portrait ? '40 0 160 160' : '0 0 240 260'} width={sizeStyle.width} height={sizeStyle.height}
      className={`shrink-0 ${portrait ? 'rounded-full overflow-hidden' : 'overflow-visible'} ${className}`}
      style={sizeStyle} role="img" aria-label={`${teacher.name}, personagem ilustrado do Pórtico`}
      data-character-style="portico-rounded-v1" focusable="false">
      {portrait && <circle cx="120" cy="78" r="82" fill={`rgb(var(--${teacher.tone}))`} />}
      {!portrait && <ellipse cx="120" cy="251" rx="66" ry="6" fill="#1F3438" opacity=".13"/>}
      {/* Pés destacados, pernas curtas e volume central compacto. */}
      <path d="M91 203Q90 219 93 230L111 230L115 207Z" fill={look.pants} stroke="#35434A" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M126 207L131 230L150 230Q152 217 147 202Z" fill={look.pants} stroke="#35434A" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M82 228Q99 224 114 232Q119 239 113 246Q97 252 77 244Q72 237 82 228Z" fill="#263B40" stroke="#182B30" strokeWidth="3"/>
      <path d="M128 232Q143 224 159 229Q168 237 159 245Q141 252 126 246Q120 239 128 232Z" fill="#263B40" stroke="#182B30" strokeWidth="3"/>
      <path d="M92 237h10M139 237h10" stroke="#F2D9B2" strokeWidth="2.5" strokeLinecap="round" opacity=".8"/>
      {/* Braços em fita grossa e mãos tipo luva: sem dedos finos desconectados do gesto. */}
      <path d={poseArms.left} fill="none" stroke="#34464C" strokeWidth="31" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={poseArms.right} fill="none" stroke="#34464C" strokeWidth="31" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={poseArms.left} fill="none" stroke={look.jacket} strokeWidth="25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={poseArms.right} fill="none" stroke={look.jacket} strokeWidth="25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M79 143Q120 126 161 143Q174 150 173 180L166 210Q120 225 73 210L67 180Q66 151 79 143Z" fill={look.jacket} stroke="#34464C" strokeWidth="3.5" strokeLinejoin="round"/>
      <path d="M105 143L120 162L136 143L144 211H96Z" fill={look.shirt} stroke="#34464C" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M105 144L120 163L136 144" fill="none" stroke={look.accent} strokeWidth="4" strokeLinejoin="round"/>
      <path d="M120 169v28" stroke={look.accent} strokeWidth="2.5" strokeDasharray="3 6" strokeLinecap="round"/>
      <path d="M145 180Q157 174 166 182L166 199Q154 204 145 198Z" fill={look.jacket} stroke="#34464C" strokeWidth="2"/>
      <path d="M151 186h8" stroke={look.accent} strokeWidth="2.5" strokeLinecap="round"/>
      {pose === 'thinking' && <path d="M158 120Q170 111 175 122" stroke="#8A5C49" strokeWidth="2.5" fill="none" strokeLinecap="round"/>}
      <path d={hand(poseArms.leftHand)} fill={look.skin} stroke="#8A5C49" strokeWidth="2.5"/>
      <path d={hand(poseArms.rightHand)} fill={look.skin} stroke="#8A5C49" strokeWidth="2.5"/>
      {look.prop && <Prop look={look}/>}
      {/* Pescoço, orelhas e cabeça arredondada com bochechas. */}
      <path d="M105 127Q120 143 135 127V151Q120 165 105 151Z" fill={look.skin} stroke="#8A5C49" strokeWidth="2.5"/>
      <ellipse cx="61" cy="88" rx="11" ry="16" fill={look.skin} stroke="#8A5C49" strokeWidth="2.5"/>
      <ellipse cx="179" cy="88" rx="11" ry="16" fill={look.skin} stroke="#8A5C49" strokeWidth="2.5"/>
      <ellipse cx="120" cy="83" rx="62" ry="68" fill={look.skin} stroke="#684738" strokeWidth="3.5"/>
      <ellipse cx="82" cy="105" rx="10" ry="5" fill="#D97873" opacity=".22"/>
      <ellipse cx="158" cy="105" rx="10" ry="5" fill="#D97873" opacity=".22"/>
      <Hair look={look}/>
      {look.accessory === 'beard' && <path d="M71 104Q77 143 120 148Q163 143 169 104Q152 126 120 126Q89 126 71 104Z" fill={look.hair} stroke="#553B32" strokeWidth="2.5" strokeLinejoin="round"/>}
      <path d={brows[0]} fill="none" stroke={look.hair} strokeWidth="5" strokeLinecap="round"/>
      <path d={brows[1]} fill="none" stroke={look.hair} strokeWidth="5" strokeLinecap="round"/>
      <ellipse cx="101" cy="86" rx="12" ry="15" fill="#FFFCF4" stroke="#60483D" strokeWidth="2"/>
      <ellipse cx="139" cy="86" rx="12" ry="15" fill="#FFFCF4" stroke="#60483D" strokeWidth="2"/>
      <ellipse cx={pose === 'greeting' ? 104 : 103} cy={pose === 'thinking' ? 88 : 89} rx="5.7" ry="7.3" fill="#302A29"/>
      <ellipse cx="140" cy={pose === 'thinking' ? 85 : 89} rx="5.7" ry="7.3" fill="#302A29"/>
      <circle cx="105" cy="84" r="2.2" fill="#fff"/>
      <circle cx="142" cy="84" r="2.2" fill="#fff"/>
      <path d="M118 91Q114 100 120 101" fill="none" stroke="#A26B59" strokeWidth="2" strokeLinecap="round"/>
      <path d={mouth} fill={pose === 'celebrating' ? '#753D40' : 'none'} stroke="#743E3C" strokeWidth="3" strokeLinecap="round"/>
      <path d="M121 113l-1 4" stroke="#F3D5B4" strokeWidth="2" strokeLinecap="round" opacity=".7"/>
      {look.accessory === 'glasses' && <g fill="none" stroke="#243B43" strokeWidth="3.2"><rect x="84" y="73" width="34" height="28" rx="10"/><rect x="122" y="73" width="34" height="28" rx="10"/><path d="M118 84h4"/></g>}
      {look.accessory === 'round-glasses' && <g fill="none" stroke={look.accent} strokeWidth="3.5"><circle cx="101" cy="86" r="18"/><circle cx="139" cy="86" r="18"/><path d="M119 84h2"/></g>}
      {look.accessory === 'earrings' && <g fill={look.accent} stroke="#6B4A27" strokeWidth="1.5"><circle cx="60" cy="106" r="4.5"/><circle cx="180" cy="106" r="4.5"/></g>}
      {look.accessory === 'headband' && <path d="M62 62Q120 19 178 62" fill="none" stroke={look.accent} strokeWidth="7" strokeLinecap="round"/>}
      {look.accessory === 'tie' && <path d="M120 164l-9 13 9 34 9-34Z" fill={look.accent}/>}
      {look.accessory === 'headset' && <g fill="none" stroke={look.accent} strokeWidth="5" strokeLinecap="round"><path d="M65 74Q63 15 120 15Q178 15 175 74"/><rect x="58" y="68" width="12" height="28" rx="6" fill="#D4A017" stroke="#76501B" strokeWidth="2"/><rect x="170" y="68" width="12" height="28" rx="6" fill="#D4A017" stroke="#76501B" strokeWidth="2"/></g>}
      {portrait && <path d="M76 142Q120 155 164 142" fill="none" stroke="#FFF4E3" strokeOpacity=".5" strokeWidth="4"/>}
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
