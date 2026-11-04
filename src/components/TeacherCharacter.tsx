import type { CSSProperties, ReactNode } from 'react';
import type { FictionalTeacher } from '@/content/teachers';

export type TeacherPose = 'greeting' | 'presenting' | 'thinking' | 'celebrating' | 'listening';
type HairStyle = 'afro' | 'bun' | 'short' | 'curls' | 'bob' | 'braid' | 'waves' | 'fade' | 'ponytail' | 'pixie' | 'locs' | 'sidepart' | 'spiky';
type FaceShape = 'round' | 'wide' | 'long' | 'square' | 'pear';
type BodyShape = 'pear' | 'tall' | 'broad' | 'cape' | 'box' | 'round' | 'wide' | 'dress' | 'longcoat' | 'flared' | 'compact' | 'tunic' | 'hood';
type Accessory = 'glasses' | 'round-glasses' | 'headset' | 'earrings' | 'headband';
type FacialHair = 'beard' | 'mustache';

type Look = {
  skin: string;
  hair: string;
  top: string;
  bottom: string;
  shoe: string;
  accent: string;
  hairStyle: HairStyle;
  face: FaceShape;
  body: BodyShape;
  accessory?: Accessory;
  facialHair?: FacialHair;
};

/**
 * Pórtico — família de personagens V4.
 * Princípios: silhueta memorável antes dos detalhes; corpo como massa gráfica;
 * cabeça e tronco integrados; olhos expressivos; braços simples; pés destacados.
 * A linguagem é original e não reproduz personagens, desenhos ou ativos do Duolingo.
 */
const LOOKS: Record<string, Look> = {
  'prof.clara': { skin:'#E9B994', hair:'#34201C', top:'#F05A4F', bottom:'#304D76', shoe:'#FFC83D', accent:'#FFC83D', hairStyle:'waves', face:'wide', body:'pear', accessory:'headband' },
  'prof.lia': { skin:'#C98E6A', hair:'#211B1B', top:'#009E9A', bottom:'#174C70', shoe:'#FFD13F', accent:'#FFD13F', hairStyle:'bun', face:'round', body:'tall', accessory:'headset' },
  'prof.davi': { skin:'#8D5A3F', hair:'#211B1B', top:'#3678D8', bottom:'#24445A', shoe:'#F4B52B', accent:'#F4B52B', hairStyle:'short', face:'square', body:'broad', facialHair:'mustache' },
  'prof.iara': { skin:'#A86F4C', hair:'#2A1A12', top:'#8B5BC7', bottom:'#425C45', shoe:'#FFC83D', accent:'#FFC83D', hairStyle:'afro', face:'pear', body:'cape', accessory:'earrings' },
  'prof.nina': { skin:'#E4B99B', hair:'#30364B', top:'#E9A62B', bottom:'#354C78', shoe:'#7A55B6', accent:'#7A55B6', hairStyle:'bob', face:'square', body:'box', accessory:'round-glasses' },
  'prof.ravi': { skin:'#A96F4F', hair:'#241B18', top:'#2E9A65', bottom:'#25475A', shoe:'#F2C13A', accent:'#F2C13A', hairStyle:'fade', face:'long', body:'round', facialHair:'beard' },
  'prof.mateus': { skin:'#D4A17B', hair:'#513629', top:'#E17A36', bottom:'#43516A', shoe:'#F7C74B', accent:'#F7C74B', hairStyle:'sidepart', face:'round', body:'wide', accessory:'glasses' },
  'prof.marina': { skin:'#B97855', hair:'#2C1D1B', top:'#339A75', bottom:'#344C45', shoe:'#F2C13A', accent:'#F2C13A', hairStyle:'braid', face:'oval', body:'dress', accessory:'earrings' },
  'prof.beatriz': { skin:'#E8C2A4', hair:'#493126', top:'#8658C2', bottom:'#45436A', shoe:'#F8C34B', accent:'#F8C34B', hairStyle:'pixie', face:'long', body:'longcoat', accessory:'glasses' },
  'prof.sofia': { skin:'#F0C6A5', hair:'#A64F2D', top:'#EE684F', bottom:'#315778', shoe:'#6FAE69', accent:'#6FAE69', hairStyle:'waves', face:'round', body:'flared', accessory:'headband' },
  'prof.helena': { skin:'#D5A17B', hair:'#211E28', top:'#318AA7', bottom:'#514765', shoe:'#F5C84A', accent:'#F5C84A', hairStyle:'locs', face:'wide', body:'tunic' },
  'prof.augusto': { skin:'#B77D5D', hair:'#D2C7B5', top:'#247D91', bottom:'#49434B', shoe:'#EFB64A', accent:'#EFB64A', hairStyle:'short', face:'pear', body:'compact', accessory:'glasses' },
  'prof.caio': { skin:'#D09A76', hair:'#27222B', top:'#D99A26', bottom:'#294E59', shoe:'#4B9E9C', accent:'#4B9E9C', hairStyle:'spiky', face:'square', body:'hood', accessory:'headset' },
};

const FACE_PATH: Record<FaceShape, string> = {
  round: 'M73 76Q73 32 120 31Q167 32 167 76L163 112Q157 144 120 146Q83 144 77 112Z',
  wide: 'M65 77Q65 34 120 34Q175 34 175 77L168 112Q158 143 120 145Q82 143 72 112Z',
  long: 'M82 49Q120 21 158 49Q169 64 162 119Q153 147 120 151Q87 147 78 119Q71 64 82 49Z',
  square: 'M76 54Q83 31 120 31Q157 31 164 54L163 115Q158 146 120 146Q82 146 77 115Z',
  pear: 'M78 52Q120 25 162 52Q170 67 163 112Q153 148 120 150Q87 148 77 112Q70 67 78 52Z',
};

const BODY_PATH: Record<BodyShape, string> = {
  pear: 'M91 130Q120 120 149 130Q161 139 159 174L174 220Q120 237 66 220L81 174Q79 139 91 130Z',
  tall: 'M94 126Q120 118 146 126Q157 134 157 169L153 226Q120 233 87 226L83 169Q83 134 94 126Z',
  broad: 'M77 131Q120 115 163 131Q177 143 174 177L165 222Q120 232 75 222L66 177Q63 143 77 131Z',
  cape: 'M94 127Q120 119 146 127Q158 137 160 166L181 222Q120 238 59 222L80 166Q82 137 94 127Z',
  box: 'M82 127Q82 121 94 121H146Q158 121 158 133L157 222Q120 231 83 222Z',
  round: 'M89 132Q120 115 151 132Q171 151 163 188Q158 224 120 229Q82 224 77 188Q69 151 89 132Z',
  wide: 'M78 134Q120 119 162 134Q178 145 176 181L165 220Q120 231 75 220L64 181Q62 145 78 134Z',
  dress: 'M94 128Q120 119 146 128Q155 136 153 164L174 224Q120 237 66 224L87 164Q85 136 94 128Z',
  longcoat: 'M89 126Q120 116 151 126L163 222Q120 235 77 222Z',
  flared: 'M93 128Q120 117 147 128Q159 137 157 169L177 222Q120 238 63 222L83 169Q81 137 93 128Z',
  compact: 'M92 139Q120 124 148 139Q160 149 157 185L151 219Q120 228 89 219L83 185Q80 149 92 139Z',
  tunic: 'M92 128Q120 118 148 128Q160 138 158 172L153 225Q120 233 87 225L82 172Q80 138 92 128Z',
  hood: 'M88 129Q120 114 152 129Q165 141 161 180L156 222Q120 235 84 222L79 180Q75 141 88 129Z',
};

function Hair({ look }: { look: Look }) {
  const c = look.hair;
  switch (look.hairStyle) {
    case 'afro':
      return <g fill={c}>
        <circle cx="80" cy="53" r="24"/><circle cx="101" cy="34" r="25"/>
        <circle cx="127" cy="29" r="25"/><circle cx="151" cy="42" r="25"/>
        <circle cx="169" cy="65" r="22"/><path d="M63 67Q65 39 91 35L150 39Q176 48 177 76L166 104L157 73Q120 52 83 76L73 105Z"/>
      </g>;
    case 'bun':
      return <g fill={c}>
        <circle cx="120" cy="20" r="22"/>
        <path d="M68 79Q63 30 120 28Q177 30 172 79L160 92Q145 65 120 64Q94 65 80 92Z"/>
      </g>;
    case 'short':
      return <path d="M69 81Q65 31 120 28Q175 31 171 81Q148 65 120 65Q91 65 69 81Z" fill={c}/>;
    case 'curls':
      return <g fill={c}>
        <path d="M62 90Q51 42 86 33Q99 12 120 23Q145 10 157 35Q188 48 178 93L164 135L155 86Q144 62 120 62Q94 61 82 87L73 135Z"/>
        <circle cx="70" cy="63" r="14"/><circle cx="92" cy="37" r="15"/>
        <circle cx="116" cy="25" r="15"/><circle cx="141" cy="29" r="15"/>
        <circle cx="163" cy="48" r="15"/><circle cx="174" cy="73" r="13"/>
      </g>;
    case 'bob':
      return <path d="M66 81Q63 28 120 27Q177 28 174 82L170 133Q159 151 146 132L150 84Q143 64 120 63Q96 63 88 84L91 132Q77 151 66 133Z" fill={c}/>;
    case 'braid':
      return <g fill={c}>
        <path d="M67 81Q63 29 120 28Q177 29 173 81L164 126L151 119L150 84Q143 63 120 63Q96 63 89 84L78 127L67 126Z"/>
        <path d="M167 72Q190 91 177 113Q191 130 175 153Q157 139 168 115Q153 94 167 72Z"/>
        <circle cx="176" cy="152" r="9" fill={look.accent}/>
      </g>;
    case 'waves':
      return <g fill={c}>
        <path d="M66 84Q58 25 120 23Q183 24 175 85Q172 106 158 99Q165 119 152 141L150 85Q142 60 120 61Q96 61 88 87Q92 111 77 141Q61 123 68 100Z"/>
        <path d="M69 60Q89 31 116 34Q94 49 85 75M148 34Q169 43 175 69" fill="none" stroke={c} strokeWidth="12" strokeLinecap="round"/>
      </g>;
    case 'fade':
      return <path d="M67 81Q65 32 120 30Q175 32 173 81L160 74Q142 64 120 64Q92 64 79 75Z" fill={c}/>;
    case 'ponytail':
      return <g fill={c}>
        <path d="M67 80Q65 30 120 29Q176 30 173 80L160 89Q145 64 120 64Q94 64 80 89Z"/>
        <path d="M160 54Q188 62 181 91Q199 109 181 127Q163 116 170 96Q153 78 160 54Z"/>
      </g>;
    case 'pixie':
      return <path d="M71 79Q65 31 119 29Q157 28 171 59Q154 52 140 60Q116 49 96 72Q84 80 71 94Z" fill={c}/>;
    case 'locs':
      return <g fill={c}>
        <path d="M66 81Q64 28 120 27Q176 28 174 81L163 101L153 79Q141 60 120 62Q96 61 85 82L75 104Z"/>
        <rect x="68" y="65" width="12" height="65" rx="6"/><rect x="84" y="61" width="11" height="78" rx="5.5"/>
        <rect x="146" y="61" width="11" height="78" rx="5.5"/><rect x="162" y="65" width="12" height="65" rx="6"/>
      </g>;
    case 'sidepart':
      return <path d="M66 81Q65 31 120 29Q175 31 174 81L161 74Q143 65 125 65Q96 64 80 87Z" fill={c}/>;
    case 'spiky':
      return <path d="M68 79L63 54L86 63L91 28L111 55L127 20L139 55L165 34L158 65L177 57L171 86Q145 67 120 65Q92 65 68 86Z" fill={c}/>;
  }
}

function Face({ look, pose }: { look: Look; pose: TeacherPose }) {
  const closed = pose === 'thinking' || pose === 'listening';
  const pupilY = pose === 'thinking' ? 101 : 98;
  const eyeHeight = pose === 'celebrating' ? 15 : 18;
  const mouth = pose === 'thinking'
    ? <path d="M111 122Q120 116 129 122" fill="none" stroke="#653B3C" strokeWidth="4.5" strokeLinecap="round"/>
    : pose === 'listening'
      ? <path d="M111 120Q120 127 129 120" fill="none" stroke="#653B3C" strokeWidth="4.5" strokeLinecap="round"/>
      : pose === 'celebrating'
        ? <g><path d="M105 115Q120 144 135 115Q132 143 120 143Q108 143 105 115Z" fill="#633B3C"/><path d="M111 134Q120 130 129 134Q125 141 120 141Q115 141 111 134Z" fill="#F28A83"/></g>
        : <path d="M104 115Q120 139 136 115Q131 139 120 139Q109 139 104 115Z" fill="#633B3C"/>;
  const brow = pose === 'thinking' ? 'M92 76Q103 67 113 75 M127 75Q137 67 148 76'
    : pose === 'celebrating' ? 'M92 76Q103 65 113 74 M127 74Q137 65 148 76'
    : 'M92 79Q103 74 113 79 M127 79Q137 74 148 79';
  return <g>
    <path d={FACE_PATH[look.face]} fill={look.skin}/>
    <path d={brow} fill="none" stroke={look.hair} strokeWidth="5.5" strokeLinecap="round"/>
    <ellipse cx="101" cy="98" rx="12.5" ry={eyeHeight} fill="#FFFFFF"/>
    <ellipse cx="139" cy="98" rx="12.5" ry={eyeHeight} fill="#FFFFFF"/>
    <ellipse cx="104" cy={pupilY} rx="5.7" ry="8" fill="#27252B"/>
    <ellipse cx="142" cy={pupilY} rx="5.7" ry="8" fill="#27252B"/>
    <circle cx="106" cy={pupilY-3} r="2.1" fill="#FFFFFF"/>
    <circle cx="144" cy={pupilY-3} r="2.1" fill="#FFFFFF"/>
    <ellipse cx="82" cy="115" rx="8" ry="4.5" fill="#F08078" opacity=".25"/>
    <ellipse cx="158" cy="115" rx="8" ry="4.5" fill="#F08078" opacity=".25"/>
    {look.facialHair === 'beard' && <path d="M81 111Q87 145 120 150Q153 145 159 111Q145 128 120 127Q95 128 81 111Z" fill={look.hair}/>}
    {look.facialHair === 'mustache' && <g fill={look.hair}><ellipse cx="110" cy="117" rx="10" ry="5.3"/><ellipse cx="130" cy="117" rx="10" ry="5.3"/></g>}
    {mouth}
    {look.accessory === 'glasses' && <g fill="none" stroke="#302D36" strokeWidth="3.8"><rect x="85" y="82" width="31" height="31" rx="10"/><rect x="124" y="82" width="31" height="31" rx="10"/><path d="M116 94h8"/></g>}
    {look.accessory === 'round-glasses' && <g fill="none" stroke={look.accent} strokeWidth="4"><circle cx="101" cy="98" r="16"/><circle cx="139" cy="98" r="16"/><path d="M117 95h6"/></g>}
  </g>;
}

function Hand({ x, y, skin, open }: { x: number; y: number; skin: string; open: boolean }) {
  return <g transform={'translate(' + x + ' ' + y + ')'}>
    <ellipse cx="0" cy="0" rx="10.5" ry="11" fill={skin}/>
    {open && <g fill={skin}>
      <rect x="-9" y="-16" width="5.5" height="13" rx="2.75"/>
      <rect x="-2.5" y="-19" width="5.5" height="16" rx="2.75"/>
      <rect x="4" y="-15" width="5.5" height="12" rx="2.75"/>
      <ellipse cx="-11" cy="-3" rx="4.5" ry="7" transform="rotate(-34 -11 -3)"/>
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
    presenting: { left:'M88 164Q72 176 62 194', right:'M152 162Q174 152 188 132', lh:[62,194], rh:[188,132], open:true },
    greeting: { left:'M88 164Q75 180 80 197', right:'M152 160Q177 127 184 88', lh:[80,197], rh:[184,88], open:true },
    thinking: { left:'M88 164Q74 181 78 197', right:'M152 160Q168 145 157 127', lh:[78,197], rh:[157,127], open:false },
    celebrating: { left:'M88 158Q63 129 55 88', right:'M152 158Q177 128 185 88', lh:[55,88], rh:[185,88], open:true },
    listening: { left:'M88 164Q103 184 114 181', right:'M152 164Q137 184 126 181', lh:[114,181], rh:[126,181], open:false },
  };
  const a = arms[pose];
  const style: CSSProperties = portrait ? { width:size, height:size } : { width:Math.round(size * .92), height:size };
  return (
    <svg viewBox={portrait ? '40 12 160 160' : '0 0 240 270'} width={style.width} height={style.height}
      className={'shrink-0 ' + (portrait ? 'rounded-full overflow-hidden ' : 'overflow-visible ') + className}
      style={style} role="img" aria-label={teacher.name + ', personagem ilustrado do Pórtico'}
      data-character-style="portico-friends-v4" data-character-body={look.body} data-character-face={look.face} focusable="false">
      {portrait && <circle cx="120" cy="98" r="90" fill={'rgb(var(--' + teacher.tone + '))'}/>}
      {!portrait && <rect x="83" y="257" width="74" height="7" rx="3.5" fill="#243840" opacity=".16"/>}

      {/* Duas pernas simples e curtas deixam o corpo dominar a silhueta. */}
      {!portrait && <g>
        <path d="M104 215Q103 231 102 246" fill="none" stroke={look.bottom} strokeWidth="13" strokeLinecap="round"/>
        <path d="M136 215Q137 231 138 246" fill="none" stroke={look.bottom} strokeWidth="13" strokeLinecap="round"/>
        <rect x="86" y="245" width="31" height="12" rx="6" fill={look.shoe}/>
        <rect x="123" y="245" width="31" height="12" rx="6" fill={look.shoe}/>
      </g>}

      {/* A roupa é a própria forma do corpo: uma massa de cor, sem costuras ou contorno. */}
      <path d={BODY_PATH[look.body]} fill={look.top}/>

      {/* Braços grossos, simples e integrados ao corpo; as mãos são pequenas formas expressivas. */}
      <path d={a.left} fill="none" stroke={look.top} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={a.right} fill="none" stroke={look.top} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round"/>
      <Hand x={a.lh[0]} y={a.lh[1]} skin={look.skin} open={a.open}/>
      <Hand x={a.rh[0]} y={a.rh[1]} skin={look.skin} open={a.open}/>

      {/* O rosto encosta no corpo; não há pescoço anatômico ou roupa em camadas. */}
      <Hair look={look}/>
      <Face look={look} pose={pose}/>

      {/* Poucos sinais de identidade, escolhidos para continuar legíveis em miniatura. */}
      {look.accessory === 'headset' && <g fill="none" stroke={look.accent} strokeWidth="7" strokeLinecap="round">
        <path d="M64 91Q61 20 120 20Q179 20 176 91"/><path d="M63 82v24M177 82v24"/>
      </g>}
      {look.accessory === 'headband' && <path d="M69 58Q120 27 171 58" fill="none" stroke={look.accent} strokeWidth="9" strokeLinecap="round"/>}
      {look.accessory === 'earrings' && <g fill={look.accent}><circle cx="69" cy="112" r="4.5"/><circle cx="171" cy="112" r="4.5"/></g>}
      {pose === 'thinking' && <circle cx="174" cy="112" r="5" fill={look.accent}/>}
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
    <section className={'teacher-scene ' + className} style={{ '--teacher-tone': 'rgb(var(--' + teacher.tone + '))' } as CSSProperties} aria-label={teacher.name + ' explicando: ' + heading}>
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
    <div className={'teacher-cue flex items-center gap-2.5 rounded-2xl border px-3 py-2 ' + (compact ? 'min-h-[4.5rem]' : 'min-h-[6rem]') + ' ' + className}
      style={{ borderColor: 'rgb(var(--' + teacher.tone + ') / .28)', backgroundColor: 'rgb(var(--' + teacher.tone + ') / .07)' }}
      aria-label={'Professor ' + teacher.name}>
      <TeacherCharacter teacher={teacher} pose={pose} size={size} portrait/>
      <div className="min-w-0 flex-1">
        <p className="text-[.68rem] font-bold uppercase tracking-[.11em] text-muted">{teacher.name} · {teacher.expertiseLabel}</p>
        <div className="mt-1 text-sm leading-snug text-ink">{children}</div>
      </div>
    </div>
  );
}
