import type { CSSProperties, ReactNode } from 'react';
import type { FictionalTeacher } from '@/content/teachers';

export type TeacherPose = 'greeting' | 'presenting' | 'thinking' | 'celebrating' | 'listening' | 'hands-on-hips' | 'arms-down' | 'shrug' | 'arms-crossed' | 'hand-on-chin' | 'hands-forward' | 'one-hand-on-hip' | 'pointing' | 'one-hand-up';
type HairStyle = 'afro' | 'bun' | 'short' | 'curls' | 'bob' | 'braid' | 'waves' | 'fade' | 'ponytail' | 'pixie' | 'locs' | 'sidepart' | 'spiky';
type FaceShape = 'round' | 'wide' | 'long' | 'square' | 'pear' | 'oval';
type BodyShape = 'pear' | 'tall' | 'broad' | 'cape' | 'box' | 'round' | 'wide' | 'dress' | 'longcoat' | 'flared' | 'compact' | 'tunic' | 'hood';
type LowerShape = 'clara-skirt' | 'lia-slim' | 'davi-wide' | 'iara-cape' | 'nina-straight' | 'ravi-jogger' | 'mateus-round' | 'marina-a-line' | 'beatriz-coat' | 'sofia-bell' | 'helena-wide' | 'augusto-shorts' | 'caio-tapered';
type Accessory = 'glasses' | 'round-glasses' | 'headset' | 'earrings' | 'headband';
type FacialHair = 'beard' | 'mustache';
type EyeStyle = 'bright' | 'narrow' | 'soft' | 'round' | 'sleepy' | 'wide' | 'small' | 'focused' | 'surprised' | 'curious';
type MouthStyle = 'big-grin' | 'gentle-smile' | 'neutral' | 'open' | 'smirk' | 'frown' | 'tight-smile';
type NoseStyle = 'none' | 'dot' | 'button' | 'bridge' | 'broad';
type BrowStyle = 'arched' | 'straight' | 'angled' | 'soft' | 'heavy' | 'sleepy' | 'raised';
type CheekStyle = 'none' | 'freckles' | 'dimples' | 'flush' | 'spots';
type HandGesture = 'open' | 'closed' | 'point';

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
  lower: LowerShape;
  eyes: EyeStyle;
  mouth: MouthStyle;
  nose: NoseStyle;
  brows: BrowStyle;
  cheeks: CheekStyle;
  eyeSpacing: number;
  eyeOffsetY: number;
  eyeTilt: number;
  eyeAsymmetry: number;
  pupilShift: number;
  headTilt: number;
  torsoTilt: number;
  headScaleX: number;
  headScaleY: number;
  torsoScaleX: number;
  torsoScaleY: number;
  accessory?: Accessory;
  facialHair?: FacialHair;
};

/**
 * Pórtico — família de personagens V6.
 * Princípios: silhueta memorável antes dos detalhes; corpo como massa gráfica;
 * cabeça e tronco integrados; olhos expressivos; cintura e roupas com silhuetas próprias; braços simples; pés destacados.
 * A linguagem é original e não reproduz personagens, desenhos ou ativos do Duolingo.
 */
const LOOKS: Record<string, Look> = {
  'prof.clara': { skin:'#E9B994', hair:'#34201C', top:'#F05A4F', bottom:'#304D76', shoe:'#FFC83D', accent:'#FFC83D', hairStyle:'ponytail', face:'wide', body:'pear', lower:'clara-skirt', eyes:'bright', mouth:'big-grin', headScaleX:1.08, headScaleY:1.02, torsoScaleX:1.05, torsoScaleY:1.00, accessory:'earrings', nose:'button', brows:'arched', cheeks:'freckles', eyeSpacing:20, eyeOffsetY:-1, eyeTilt:-2, eyeAsymmetry:1.04, pupilShift:0, headTilt:-3, torsoTilt:2 },
  'prof.lia': { skin:'#C98E6A', hair:'#211B1B', top:'#009E9A', bottom:'#174C70', shoe:'#FFD13F', accent:'#FFD13F', hairStyle:'bun', face:'round', body:'tall', lower:'lia-slim', eyes:'focused', mouth:'neutral', headScaleX:0.95, headScaleY:1.05, torsoScaleX:0.86, torsoScaleY:1.12, accessory:'headset', nose:'none', brows:'straight', cheeks:'none', eyeSpacing:18, eyeOffsetY:1, eyeTilt:0, eyeAsymmetry:0.94, pupilShift:1, headTilt:2, torsoTilt:-2 },
  'prof.davi': { skin:'#8D5A3F', hair:'#211B1B', top:'#3678D8', bottom:'#24445A', shoe:'#F4B52B', accent:'#F4B52B', hairStyle:'short', face:'square', body:'broad', lower:'davi-wide', eyes:'soft', mouth:'gentle-smile', headScaleX:1.00, headScaleY:1.08, torsoScaleX:1.18, torsoScaleY:0.98, facialHair:'mustache', nose:'broad', brows:'heavy', cheeks:'none', eyeSpacing:22, eyeOffsetY:0, eyeTilt:1, eyeAsymmetry:1.02, pupilShift:-1, headTilt:-2, torsoTilt:-1 },
  'prof.iara': { skin:'#A86F4C', hair:'#2A1A12', top:'#8B5BC7', bottom:'#425C45', shoe:'#FFC83D', accent:'#FFC83D', hairStyle:'afro', face:'pear', body:'cape', lower:'iara-cape', eyes:'round', mouth:'open', headScaleX:1.16, headScaleY:1.02, torsoScaleX:1.20, torsoScaleY:1.00, accessory:'earrings', nose:'button', brows:'raised', cheeks:'dimples', eyeSpacing:24, eyeOffsetY:-2, eyeTilt:-1, eyeAsymmetry:1.08, pupilShift:0, headTilt:1, torsoTilt:2 },
  'prof.nina': { skin:'#E4B99B', hair:'#30364B', top:'#E9A62B', bottom:'#354C78', shoe:'#7A55B6', accent:'#7A55B6', hairStyle:'bob', face:'square', body:'box', lower:'nina-straight', eyes:'sleepy', mouth:'smirk', headScaleX:0.98, headScaleY:0.98, torsoScaleX:1.00, torsoScaleY:1.04, accessory:'round-glasses', nose:'dot', brows:'sleepy', cheeks:'none', eyeSpacing:17, eyeOffsetY:2, eyeTilt:0, eyeAsymmetry:0.92, pupilShift:2, headTilt:0, torsoTilt:2 },
  'prof.ravi': { skin:'#A96F4F', hair:'#241B18', top:'#2E9A65', bottom:'#25475A', shoe:'#F2C13A', accent:'#F2C13A', hairStyle:'fade', face:'long', body:'round', lower:'ravi-jogger', eyes:'wide', mouth:'big-grin', headScaleX:0.92, headScaleY:1.12, torsoScaleX:1.06, torsoScaleY:1.08, facialHair:'beard', nose:'broad', brows:'angled', cheeks:'spots', eyeSpacing:25, eyeOffsetY:-1, eyeTilt:2, eyeAsymmetry:1.07, pupilShift:0, headTilt:4, torsoTilt:-1 },
  'prof.mateus': { skin:'#D4A17B', hair:'#513629', top:'#E17A36', bottom:'#43516A', shoe:'#F7C74B', accent:'#F7C74B', hairStyle:'sidepart', face:'round', body:'wide', lower:'mateus-round', eyes:'small', mouth:'tight-smile', headScaleX:0.96, headScaleY:0.92, torsoScaleX:1.22, torsoScaleY:0.92, accessory:'glasses', nose:'button', brows:'soft', cheeks:'dimples', eyeSpacing:16, eyeOffsetY:1, eyeTilt:-1, eyeAsymmetry:0.96, pupilShift:-1, headTilt:-2, torsoTilt:2 },
  'prof.marina': { skin:'#B97855', hair:'#2C1D1B', top:'#339A75', bottom:'#344C45', shoe:'#F2C13A', accent:'#F2C13A', hairStyle:'braid', face:'oval', body:'dress', lower:'marina-a-line', eyes:'soft', mouth:'gentle-smile', headScaleX:0.92, headScaleY:1.10, torsoScaleX:0.90, torsoScaleY:1.14, accessory:'earrings', nose:'dot', brows:'arched', cheeks:'freckles', eyeSpacing:21, eyeOffsetY:0, eyeTilt:-2, eyeAsymmetry:1.03, pupilShift:1, headTilt:-3, torsoTilt:-2 },
  'prof.beatriz': { skin:'#E8C2A4', hair:'#493126', top:'#8658C2', bottom:'#45436A', shoe:'#F8C34B', accent:'#F8C34B', hairStyle:'pixie', face:'long', body:'longcoat', lower:'beatriz-coat', eyes:'narrow', mouth:'frown', headScaleX:0.88, headScaleY:1.14, torsoScaleX:0.86, torsoScaleY:1.16, accessory:'glasses', nose:'bridge', brows:'straight', cheeks:'none', eyeSpacing:19, eyeOffsetY:1, eyeTilt:1, eyeAsymmetry:0.91, pupilShift:-2, headTilt:-1, torsoTilt:0 },
  'prof.sofia': { skin:'#F0C6A5', hair:'#A64F2D', top:'#EE684F', bottom:'#315778', shoe:'#6FAE69', accent:'#6FAE69', hairStyle:'waves', face:'round', body:'flared', lower:'sofia-bell', eyes:'surprised', mouth:'open', headScaleX:1.03, headScaleY:0.96, torsoScaleX:1.10, torsoScaleY:1.00, accessory:'headband', nose:'button', brows:'raised', cheeks:'flush', eyeSpacing:23, eyeOffsetY:-1, eyeTilt:-2, eyeAsymmetry:1.05, pupilShift:1, headTilt:3, torsoTilt:-3 },
  'prof.helena': { skin:'#D5A17B', hair:'#211E28', top:'#318AA7', bottom:'#514765', shoe:'#F5C84A', accent:'#F5C84A', hairStyle:'locs', face:'wide', body:'tunic', lower:'helena-wide', eyes:'sleepy', mouth:'neutral', headScaleX:1.14, headScaleY:0.94, torsoScaleX:1.02, torsoScaleY:1.12, nose:'dot', brows:'sleepy', cheeks:'spots', eyeSpacing:26, eyeOffsetY:0, eyeTilt:0, eyeAsymmetry:0.97, pupilShift:-1, headTilt:-2, torsoTilt:1 },
  'prof.augusto': { skin:'#B77D5D', hair:'#D2C7B5', top:'#247D91', bottom:'#49434B', shoe:'#EFB64A', accent:'#EFB64A', hairStyle:'curls', face:'pear', body:'compact', lower:'augusto-shorts', eyes:'soft', mouth:'gentle-smile', headScaleX:0.92, headScaleY:0.94, torsoScaleX:0.96, torsoScaleY:0.90, accessory:'glasses', nose:'broad', brows:'soft', cheeks:'none', eyeSpacing:27, eyeOffsetY:1, eyeTilt:1, eyeAsymmetry:1.06, pupilShift:0, headTilt:2, torsoTilt:-1 },
  'prof.caio': { skin:'#D09A76', hair:'#27222B', top:'#D99A26', bottom:'#294E59', shoe:'#4B9E9C', accent:'#4B9E9C', hairStyle:'spiky', face:'square', body:'hood', lower:'caio-tapered', eyes:'curious', mouth:'smirk', headScaleX:1.02, headScaleY:1.00, torsoScaleX:1.00, torsoScaleY:0.98, accessory:'headset', nose:'none', brows:'angled', cheeks:'dimples', eyeSpacing:28, eyeOffsetY:0, eyeTilt:-1, eyeAsymmetry:0.93, pupilShift:2, headTilt:3, torsoTilt:2 },
};

export const TEACHER_SIGNATURE_POSES: Record<string, TeacherPose> = {
  'prof.clara': 'presenting',
  'prof.lia': 'hands-on-hips',
  'prof.davi': 'arms-crossed',
  'prof.iara': 'shrug',
  'prof.nina': 'hand-on-chin',
  'prof.ravi': 'celebrating',
  'prof.mateus': 'arms-down',
  'prof.marina': 'greeting',
  'prof.beatriz': 'hands-forward',
  'prof.sofia': 'one-hand-on-hip',
  'prof.helena': 'listening',
  'prof.augusto': 'pointing',
  'prof.caio': 'one-hand-up',
};

const FACE_PATH: Record<FaceShape, string> = {
  round: 'M73 76Q73 32 120 31Q167 32 167 76L163 112Q157 144 120 146Q83 144 77 112Z',
  wide: 'M65 77Q65 34 120 34Q175 34 175 77L168 112Q158 143 120 145Q82 143 72 112Z',
  long: 'M82 49Q120 21 158 49Q169 64 162 119Q153 147 120 151Q87 147 78 119Q71 64 82 49Z',
  square: 'M76 54Q83 31 120 31Q157 31 164 54L163 115Q158 146 120 146Q82 146 77 115Z',
  pear: 'M78 52Q120 25 162 52Q170 67 163 112Q153 148 120 150Q87 148 77 112Q70 67 78 52Z',
  oval: 'M80 47Q120 19 160 47Q169 64 162 119Q153 147 120 150Q87 147 78 119Q71 64 80 47Z',
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

/** Silhuetas da parte inferior: cada professor tem uma leitura de roupa própria. */
const LOWER_PATH: Record<LowerShape, string> = {
  'clara-skirt': 'M94 184Q120 197 146 184L174 229Q120 243 66 229Z',
  'lia-slim': 'M98 184Q120 193 142 184L145 230Q120 235 95 230Z',
  'davi-wide': 'M90 183Q120 197 150 183L163 231Q120 240 77 231Z',
  'iara-cape': 'M92 180Q120 194 148 180L183 231Q120 247 57 231Z',
  'nina-straight': 'M96 184Q120 193 144 184L151 230Q120 235 89 230Z',
  'ravi-jogger': 'M91 183Q120 196 149 183L155 221L145 230L127 224L120 232L113 224L95 230L85 221Z',
  'mateus-round': 'M89 183Q120 197 151 183Q166 206 156 231Q120 239 84 231Q74 206 89 183Z',
  'marina-a-line': 'M94 184Q120 197 146 184L166 231Q120 244 74 231Z',
  'beatriz-coat': 'M90 178Q120 188 150 178L160 230Q120 237 80 230Z',
  'sofia-bell': 'M96 183Q120 198 144 183L177 230Q120 247 63 230Z',
  'helena-wide': 'M86 183Q120 198 154 183L169 231Q120 240 71 231Z',
  'augusto-shorts': 'M94 183Q120 195 146 183L152 216Q120 225 88 216Z',
  'caio-tapered': 'M94 183Q120 194 146 183L150 230Q120 236 90 230Z',
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
  const eyeMetrics: Record<EyeStyle, { rx:number; ry:number; pupil:number; gaze:number; lid?:boolean }> = {
    bright: { rx:13, ry:19, pupil:5.6, gaze:-1 },
    narrow: { rx:13, ry:13, pupil:5.3, gaze:2, lid:true },
    soft: { rx:11, ry:16, pupil:5.0, gaze:0 },
    round: { rx:14, ry:19, pupil:5.8, gaze:0 },
    sleepy: { rx:12, ry:15, pupil:5.0, gaze:3, lid:true },
    wide: { rx:15, ry:15, pupil:5.7, gaze:-2 },
    small: { rx:9.5, ry:13, pupil:4.5, gaze:0 },
    focused: { rx:10.5, ry:16, pupil:5.4, gaze:1 },
    surprised: { rx:12.5, ry:21, pupil:5.4, gaze:0 },
    curious: { rx:12, ry:18, pupil:5.3, gaze:4 },
  };
  const eye = eyeMetrics[look.eyes];
  const eyeY = 98 + look.eyeOffsetY + (pose === 'thinking' ? 2 : 0);
  const leftX = 120 - look.eyeSpacing;
  const rightX = 120 + look.eyeSpacing;
  const pupilShift = eye.gaze + look.pupilShift;
  const leftRy = eye.ry * look.eyeAsymmetry;
  const rightRy = eye.ry * (2 - look.eyeAsymmetry);
  const mouthStyle: MouthStyle = pose === 'celebrating' ? 'open' : pose === 'thinking' ? 'neutral' : pose === 'listening' ? 'gentle-smile' : look.mouth;
  const mouths: Record<MouthStyle, ReactNode> = {
    'big-grin': <g><path d="M99 113Q120 150 141 113Q136 145 120 145Q104 145 99 113Z" fill="#633B3C"/><path d="M107 116Q120 121 133 116L130 126Q120 130 110 126Z" fill="#FFFFFF"/></g>,
    'gentle-smile': <path d="M109 121Q120 132 131 121Q127 133 120 133Q113 133 109 121Z" fill="#633B3C"/>,
    neutral: <path d="M111 124Q120 126 129 124" fill="none" stroke="#653B3C" strokeWidth="4" strokeLinecap="round"/>,
    open: <g><ellipse cx="120" cy="126" rx="11" ry="14" fill="#633B3C"/><path d="M112 135Q120 130 128 135Q124 141 120 141Q116 141 112 135Z" fill="#F28A83"/></g>,
    smirk: <path d="M108 126Q123 134 134 119" fill="none" stroke="#633B3C" strokeWidth="5" strokeLinecap="round"/>,
    frown: <path d="M108 130Q120 117 132 130" fill="none" stroke="#633B3C" strokeWidth="4.5" strokeLinecap="round"/>,
    'tight-smile': <path d="M112 124Q120 130 128 124" fill="none" stroke="#633B3C" strokeWidth="4" strokeLinecap="round"/>,
  };
  const browY = eyeY - eye.ry - 8;
  const browPaths: Record<BrowStyle, [string,string]> = {
    arched: [
      'M' + (leftX - 11) + ' ' + (browY + 3) + ' Q' + leftX + ' ' + (browY - 8) + ' ' + (leftX + 11) + ' ' + (browY + 2),
      'M' + (rightX - 11) + ' ' + (browY + 2) + ' Q' + rightX + ' ' + (browY - 8) + ' ' + (rightX + 11) + ' ' + (browY + 3),
    ],
    straight: [
      'M' + (leftX - 10) + ' ' + (browY + 1) + ' L' + (leftX + 10) + ' ' + (browY + 1),
      'M' + (rightX - 10) + ' ' + (browY + 1) + ' L' + (rightX + 10) + ' ' + (browY + 1),
    ],
    angled: [
      'M' + (leftX - 10) + ' ' + (browY + 3) + ' L' + (leftX + 10) + ' ' + (browY - 3),
      'M' + (rightX - 10) + ' ' + (browY - 3) + ' L' + (rightX + 10) + ' ' + (browY + 3),
    ],
    soft: [
      'M' + (leftX - 10) + ' ' + (browY + 2) + ' Q' + leftX + ' ' + (browY - 3) + ' ' + (leftX + 10) + ' ' + (browY + 2),
      'M' + (rightX - 10) + ' ' + (browY + 2) + ' Q' + rightX + ' ' + (browY - 3) + ' ' + (rightX + 10) + ' ' + (browY + 2),
    ],
    heavy: [
      'M' + (leftX - 11) + ' ' + (browY + 3) + ' Q' + leftX + ' ' + (browY - 5) + ' ' + (leftX + 11) + ' ' + (browY + 2),
      'M' + (rightX - 11) + ' ' + (browY + 2) + ' Q' + rightX + ' ' + (browY - 5) + ' ' + (rightX + 11) + ' ' + (browY + 3),
    ],
    sleepy: [
      'M' + (leftX - 10) + ' ' + (browY + 4) + ' Q' + leftX + ' ' + (browY - 1) + ' ' + (leftX + 10) + ' ' + (browY + 4),
      'M' + (rightX - 10) + ' ' + (browY + 4) + ' Q' + rightX + ' ' + (browY - 1) + ' ' + (rightX + 10) + ' ' + (browY + 4),
    ],
    raised: [
      'M' + (leftX - 10) + ' ' + (browY + 1) + ' Q' + leftX + ' ' + (browY - 11) + ' ' + (leftX + 10) + ' ' + (browY + 1),
      'M' + (rightX - 10) + ' ' + (browY + 1) + ' Q' + rightX + ' ' + (browY - 11) + ' ' + (rightX + 10) + ' ' + (browY + 1),
    ],
  };
  const browWidth = look.brows === 'heavy' ? 7 : look.brows === 'soft' ? 4 : 5.5;
  const noses: Record<NoseStyle, ReactNode> = {
    none: null,
    dot: <circle cx="120" cy={eyeY + 17} r="2.6" fill="#A86F58" opacity=".8"/>,
    button: <ellipse cx="120" cy={eyeY + 17} rx="4.3" ry="3.2" fill="#B77960" opacity=".72"/>,
    bridge: <path d={'M120 ' + (eyeY + 8) + ' Q115 ' + (eyeY + 20) + ' 120 ' + (eyeY + 21)} fill="none" stroke="#A86F58" strokeWidth="2.8" strokeLinecap="round"/>,
    broad: <path d={'M114 ' + (eyeY + 18) + ' Q120 ' + (eyeY + 24) + ' 126 ' + (eyeY + 18)} fill="none" stroke="#A86F58" strokeWidth="3.5" strokeLinecap="round"/>,
  };
  const cheeks: Record<CheekStyle, ReactNode> = {
    none: null,
    freckles: <g fill="#9A5E49" opacity=".62"><circle cx="83" cy="115" r="1.8"/><circle cx="88" cy="119" r="1.5"/><circle cx="93" cy="115" r="1.4"/><circle cx="147" cy="115" r="1.4"/><circle cx="152" cy="119" r="1.5"/><circle cx="157" cy="115" r="1.8"/></g>,
    dimples: <g fill="none" stroke="#995E4B" strokeWidth="2.1" strokeLinecap="round"><path d="M83 120q4 3 8 0M149 120q4 3 8 0"/></g>,
    flush: <g fill="#F07878" opacity=".32"><ellipse cx="82" cy="115" rx="10" ry="6"/><ellipse cx="158" cy="115" rx="10" ry="6"/></g>,
    spots: <g fill="#9A5E49" opacity=".45"><circle cx="86" cy="117" r="2.2"/><circle cx="154" cy="117" r="2.2"/></g>,
  };
  return <g>
    <path d={FACE_PATH[look.face]} fill={look.skin}/>
    <path d={browPaths[look.brows][0]} fill="none" stroke={look.hair} strokeWidth={browWidth} strokeLinecap="round"/>
    <path d={browPaths[look.brows][1]} fill="none" stroke={look.hair} strokeWidth={browWidth} strokeLinecap="round"/>
    <g transform={'rotate(' + look.eyeTilt + ' ' + leftX + ' ' + eyeY + ')'}>
      <ellipse cx={leftX} cy={eyeY} rx={eye.rx} ry={leftRy} fill="#FFFFFF"/>
      <ellipse cx={leftX + pupilShift} cy={eyeY + (pose === 'thinking' ? 3 : 0)} rx={eye.pupil} ry={Math.max(4.5, eye.pupil + 2.2)} fill="#27252B"/>
      <circle cx={leftX + pupilShift + 2} cy={eyeY - 3} r="2.1" fill="#FFFFFF"/>
    </g>
    <g transform={'rotate(' + (-look.eyeTilt) + ' ' + rightX + ' ' + eyeY + ')'}>
      <ellipse cx={rightX} cy={eyeY} rx={eye.rx} ry={rightRy} fill="#FFFFFF"/>
      <ellipse cx={rightX + pupilShift} cy={eyeY + (pose === 'thinking' ? 3 : 0)} rx={eye.pupil} ry={Math.max(4.5, eye.pupil + 2.2)} fill="#27252B"/>
      <circle cx={rightX + pupilShift + 2} cy={eyeY - 3} r="2.1" fill="#FFFFFF"/>
    </g>
    {eye.lid && <g fill={look.skin}>
      <path d={'M' + (leftX - eye.rx) + ' ' + (eyeY - 4) + ' Q' + leftX + ' ' + (eyeY - eye.ry - 5) + ' ' + (leftX + eye.rx) + ' ' + (eyeY - 4) + ' L' + (leftX + eye.rx) + ' ' + (eyeY + 2) + ' Q' + leftX + ' ' + (eyeY - 5) + ' ' + (leftX - eye.rx) + ' ' + (eyeY + 2) + 'Z'}/>
      <path d={'M' + (rightX - eye.rx) + ' ' + (eyeY - 4) + ' Q' + rightX + ' ' + (eyeY - eye.ry - 5) + ' ' + (rightX + eye.rx) + ' ' + (eyeY - 4) + ' L' + (rightX + eye.rx) + ' ' + (eyeY + 2) + ' Q' + rightX + ' ' + (eyeY - 5) + ' ' + (rightX - eye.rx) + ' ' + (eyeY + 2) + 'Z'}/>
    </g>}
    {noses[look.nose]}
    {cheeks[look.cheeks]}
    {look.facialHair === 'beard' && <path d="M81 111Q87 145 120 150Q153 145 159 111Q145 128 120 127Q95 128 81 111Z" fill={look.hair}/>}
    {look.facialHair === 'mustache' && <g fill={look.hair}><ellipse cx="110" cy="117" rx="10" ry="5.3"/><ellipse cx="130" cy="117" rx="10" ry="5.3"/></g>}
    {mouths[mouthStyle]}
    {look.accessory === 'glasses' && <g fill="none" stroke="#302D36" strokeWidth="3.8"><rect x="85" y="82" width="31" height="31" rx="10"/><rect x="124" y="82" width="31" height="31" rx="10"/><path d="M116 94h8"/></g>}
    {look.accessory === 'round-glasses' && <g fill="none" stroke={look.accent} strokeWidth="4"><circle cx={leftX} cy={eyeY} r="16"/><circle cx={rightX} cy={eyeY} r="16"/><path d="M117 95h6"/></g>}
  </g>;
}

function Hand({ x, y, skin, gesture }: { x: number; y: number; skin: string; gesture: HandGesture }) {
  return <g transform={'translate(' + x + ' ' + y + ')'}>
    <ellipse cx="0" cy="0" rx="10.5" ry="11" fill={skin}/>
    {gesture === 'open' && <g fill={skin}>
      <rect x="-9" y="-16" width="5.5" height="13" rx="2.75"/>
      <rect x="-2.5" y="-19" width="5.5" height="16" rx="2.75"/>
      <rect x="4" y="-15" width="5.5" height="12" rx="2.75"/>
      <ellipse cx="-11" cy="-3" rx="4.5" ry="7" transform="rotate(-34 -11 -3)"/>
    </g>}
    {gesture === 'point' && <g fill={skin}>
      <rect x="-2.8" y="-24" width="5.6" height="23" rx="2.8"/>
      <rect x="-9" y="-9" width="5.6" height="10" rx="2.8"/>
      <rect x="-2.5" y="-7" width="5.6" height="8" rx="2.8"/>
      <rect x="4" y="-8" width="5.6" height="9" rx="2.8"/>
      <ellipse cx="-10" cy="-3" rx="4.5" ry="6.5" transform="rotate(-34 -10 -3)"/>
    </g>}
  </g>;
}

export function TeacherCharacter({
  teacher, pose, size = 160, className = '', portrait = false,
}: {
  teacher: FictionalTeacher;
  pose?: TeacherPose;
  size?: number;
  className?: string;
  portrait?: boolean;
}) {
  const look = LOOKS[teacher.id] ?? LOOKS['prof.lia'];
  const characterPose = pose ?? TEACHER_SIGNATURE_POSES[teacher.id] ?? 'presenting';
  const arms: Record<TeacherPose, { left: string; right: string; lh: [number,number]; rh: [number,number]; hand: HandGesture }> = {
    presenting: { left:'M88 164Q72 176 62 194', right:'M152 162Q174 152 188 132', lh:[62,194], rh:[188,132], hand:'open' },
    greeting: { left:'M88 164Q75 180 80 197', right:'M152 160Q177 127 184 88', lh:[80,197], rh:[184,88], hand:'open' },
    thinking: { left:'M88 164Q74 181 78 197', right:'M152 160Q168 145 157 127', lh:[78,197], rh:[157,127], hand:'closed' },
    celebrating: { left:'M88 158Q63 129 55 88', right:'M152 158Q177 128 185 88', lh:[55,88], rh:[185,88], hand:'open' },
    listening: { left:'M88 164Q103 184 114 181', right:'M152 164Q137 184 126 181', lh:[114,181], rh:[126,181], hand:'closed' },
    'hands-on-hips': { left:'M88 164Q68 176 80 191', right:'M152 164Q172 176 160 191', lh:[80,191], rh:[160,191], hand:'closed' },
    'arms-down': { left:'M88 164Q76 184 76 207', right:'M152 164Q164 184 164 207', lh:[76,207], rh:[164,207], hand:'closed' },
    shrug: { left:'M88 164Q68 145 58 150', right:'M152 164Q172 145 182 150', lh:[58,150], rh:[182,150], hand:'open' },
    'arms-crossed': { left:'M88 164Q104 179 132 190', right:'M152 164Q136 179 108 190', lh:[132,190], rh:[108,190], hand:'closed' },
    'hand-on-chin': { left:'M88 164Q74 184 76 207', right:'M152 164Q168 151 151 143', lh:[76,207], rh:[151,143], hand:'closed' },
    'hands-forward': { left:'M88 164Q101 183 111 180', right:'M152 164Q139 183 129 180', lh:[111,180], rh:[129,180], hand:'open' },
    'one-hand-on-hip': { left:'M88 164Q66 178 80 191', right:'M152 164Q164 184 164 207', lh:[80,191], rh:[164,207], hand:'closed' },
    pointing: { left:'M88 164Q76 184 76 207', right:'M152 160Q174 137 190 111', lh:[76,207], rh:[190,111], hand:'point' },
    'one-hand-up': { left:'M88 164Q76 184 76 207', right:'M152 160Q178 127 184 88', lh:[76,207], rh:[184,88], hand:'open' },
  };
  const a = arms[characterPose];
  const style: CSSProperties = portrait ? { width:size, height:size } : { width:Math.round(size * .92), height:size };
  return (
    <svg viewBox={portrait ? '40 12 160 160' : '0 0 240 270'} width={style.width} height={style.height}
      className={'shrink-0 ' + (portrait ? 'rounded-full overflow-hidden ' : 'overflow-visible ') + className}
      style={style} role="img" aria-label={teacher.name + ', personagem ilustrado do Pórtico'}
      data-character-style="portico-friends-v7" data-character-body={look.body} data-character-lower={look.lower} data-character-face={look.face} data-character-hair={look.hairStyle} data-character-eyes={look.eyes} data-character-mouth={look.mouth} data-character-nose={look.nose} data-character-brows={look.brows} data-character-spacing={look.eyeSpacing} focusable="false">
      {portrait && <circle cx="120" cy="98" r="90" fill={'rgb(var(--' + teacher.tone + '))'}/>}
      {!portrait && <rect x="83" y="260" width="74" height="6" rx="3" fill="#243840" opacity=".14"/>}

      {/* Tronco: uma massa simples, com cintura definida sem contorno decorativo. */}
      <g transform={'translate(120 174) rotate(' + look.torsoTilt + ') scale(' + look.torsoScaleX + ' ' + look.torsoScaleY + ') translate(-120 -174)'}>
        <path d={BODY_PATH[look.body]} fill={look.top}/>
        <path d={LOWER_PATH[look.lower]} fill={look.bottom}/>

        {/* Braços grossos integrados ao corpo, mas com gestos próprios. */}
        <path d={a.left} fill="none" stroke={look.top} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={a.right} fill="none" stroke={look.top} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round"/>
        <Hand x={a.lh[0]} y={a.lh[1]} skin={look.skin} gesture={gesture}/>
        <Hand x={a.rh[0]} y={a.rh[1]} skin={look.skin} gesture={gesture}/>
      </g>

      {/* Pernas curtas e calçados realmente separados, com espaço negativo visível. */}
      {!portrait && <g>
        <path d="M104 222Q103 230 102 237" fill="none" stroke={look.bottom} strokeWidth="13" strokeLinecap="round"/>
        <path d="M136 222Q137 230 138 237" fill="none" stroke={look.bottom} strokeWidth="13" strokeLinecap="round"/>
        <rect x="86" y="245" width="31" height="12" rx="6" fill={look.shoe}/>
        <rect x="123" y="245" width="31" height="12" rx="6" fill={look.shoe}/>
      </g>}
      {/* A cabeça também varia em largura e altura; rosto e cabelo formam uma única unidade. */}
      <g transform={'translate(120 91) rotate(' + look.headTilt + ') scale(' + look.headScaleX + ' ' + look.headScaleY + ') translate(-120 -91)'}>
        <Face look={look} pose={characterPose}/>
        <Hair look={look}/>

        {/* Acessórios pequenos, mas desenhados na escala de cada rosto. */}
        {look.accessory === 'headset' && <g fill="none" stroke={look.accent} strokeWidth="7" strokeLinecap="round">
          <path d="M64 91Q61 20 120 20Q179 20 176 91"/><path d="M63 82v24M177 82v24"/>
        </g>}
        {look.accessory === 'headband' && <path d="M69 58Q120 27 171 58" fill="none" stroke={look.accent} strokeWidth="9" strokeLinecap="round"/>}
        {look.accessory === 'earrings' && <g fill={look.accent}><circle cx="69" cy="112" r="4.5"/><circle cx="171" cy="112" r="4.5"/></g>}
        {pose === 'thinking' && <circle cx="174" cy="112" r="5" fill={look.accent}/>}
      </g>
    </svg>
  );
}

export function TeacherScene({
  teacher, pose, size = 174, eyebrow = 'AULA COM SEU PROFESSOR', heading, message, className = '',
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
  teacher, pose, size = 98, children, compact = false, className = '',
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
