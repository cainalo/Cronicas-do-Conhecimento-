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
type Species = 'human' | 'capybara' | 'beaver' | 'axolotl' | 'cat' | 'frog' | 'armadillo' | 'turtle' | 'parrot' | 'chameleon';
type OutfitStyle = 'scarf' | 'tech-jacket' | 'utility-vest' | 'field-cape' | 'lab-coat' | 'hoodie' | 'knit-sweater' | 'cardigan' | 'formal-coat' | 'language-scarf' | 'embroidered-tunic' | 'blazer' | 'tech-hoodie';

type Look = {
  species: Species;
  outfit: OutfitStyle;
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
  'prof.clara': { species:'capybara', outfit:'scarf', skin:'#E9B994', hair:'#34201C', top:'#F05A4F', bottom:'#304D76', shoe:'#FFC83D', accent:'#FFC83D', hairStyle:'ponytail', face:'wide', body:'pear', lower:'clara-skirt', eyes:'bright', mouth:'big-grin', headScaleX:1.08, headScaleY:1.02, torsoScaleX:1.05, torsoScaleY:1.00, accessory:'earrings', nose:'button', brows:'arched', cheeks:'freckles', eyeSpacing:20, eyeOffsetY:-1, eyeTilt:-2, eyeAsymmetry:1.04, pupilShift:0, headTilt:-3, torsoTilt:2 },
  'prof.lia': { species:'human', outfit:'tech-jacket', skin:'#C98E6A', hair:'#211B1B', top:'#009E9A', bottom:'#174C70', shoe:'#FFD13F', accent:'#FFD13F', hairStyle:'bun', face:'round', body:'tall', lower:'lia-slim', eyes:'focused', mouth:'neutral', headScaleX:0.95, headScaleY:1.05, torsoScaleX:0.86, torsoScaleY:1.12, accessory:'headset', nose:'none', brows:'straight', cheeks:'none', eyeSpacing:18, eyeOffsetY:1, eyeTilt:0, eyeAsymmetry:0.94, pupilShift:1, headTilt:2, torsoTilt:-2 },
  'prof.davi': { species:'beaver', outfit:'utility-vest', skin:'#8D5A3F', hair:'#211B1B', top:'#3678D8', bottom:'#24445A', shoe:'#F4B52B', accent:'#F4B52B', hairStyle:'short', face:'square', body:'broad', lower:'davi-wide', eyes:'soft', mouth:'gentle-smile', headScaleX:1.00, headScaleY:1.08, torsoScaleX:1.18, torsoScaleY:0.98, facialHair:'mustache', nose:'broad', brows:'heavy', cheeks:'none', eyeSpacing:22, eyeOffsetY:0, eyeTilt:1, eyeAsymmetry:1.02, pupilShift:-1, headTilt:-2, torsoTilt:-1 },
  'prof.iara': { species:'axolotl', outfit:'field-cape', skin:'#A86F4C', hair:'#2A1A12', top:'#8B5BC7', bottom:'#425C45', shoe:'#FFC83D', accent:'#FFC83D', hairStyle:'afro', face:'pear', body:'cape', lower:'iara-cape', eyes:'round', mouth:'open', headScaleX:1.16, headScaleY:1.02, torsoScaleX:1.20, torsoScaleY:1.00, accessory:'earrings', nose:'button', brows:'raised', cheeks:'dimples', eyeSpacing:24, eyeOffsetY:-2, eyeTilt:-1, eyeAsymmetry:1.08, pupilShift:0, headTilt:1, torsoTilt:2 },
  'prof.nina': { species:'cat', outfit:'lab-coat', skin:'#E4B99B', hair:'#30364B', top:'#E9A62B', bottom:'#354C78', shoe:'#7A55B6', accent:'#7A55B6', hairStyle:'bob', face:'square', body:'box', lower:'nina-straight', eyes:'sleepy', mouth:'smirk', headScaleX:0.98, headScaleY:0.98, torsoScaleX:1.00, torsoScaleY:1.04, accessory:'round-glasses', nose:'dot', brows:'sleepy', cheeks:'none', eyeSpacing:17, eyeOffsetY:2, eyeTilt:0, eyeAsymmetry:0.92, pupilShift:2, headTilt:0, torsoTilt:2 },
  'prof.ravi': { species:'frog', outfit:'hoodie', skin:'#A96F4F', hair:'#241B18', top:'#2E9A65', bottom:'#25475A', shoe:'#F2C13A', accent:'#F2C13A', hairStyle:'fade', face:'long', body:'round', lower:'ravi-jogger', eyes:'wide', mouth:'big-grin', headScaleX:0.92, headScaleY:1.12, torsoScaleX:1.06, torsoScaleY:1.08, facialHair:'beard', nose:'broad', brows:'angled', cheeks:'spots', eyeSpacing:25, eyeOffsetY:-1, eyeTilt:2, eyeAsymmetry:1.07, pupilShift:0, headTilt:4, torsoTilt:-1 },
  'prof.mateus': { species:'armadillo', outfit:'knit-sweater', skin:'#D4A17B', hair:'#513629', top:'#E17A36', bottom:'#43516A', shoe:'#F7C74B', accent:'#F7C74B', hairStyle:'sidepart', face:'round', body:'wide', lower:'mateus-round', eyes:'small', mouth:'tight-smile', headScaleX:0.96, headScaleY:0.92, torsoScaleX:1.22, torsoScaleY:0.92, accessory:'glasses', nose:'button', brows:'soft', cheeks:'dimples', eyeSpacing:16, eyeOffsetY:1, eyeTilt:-1, eyeAsymmetry:0.96, pupilShift:-1, headTilt:-2, torsoTilt:2 },
  'prof.marina': { species:'turtle', outfit:'cardigan', skin:'#B97855', hair:'#2C1D1B', top:'#339A75', bottom:'#344C45', shoe:'#F2C13A', accent:'#F2C13A', hairStyle:'braid', face:'oval', body:'dress', lower:'marina-a-line', eyes:'soft', mouth:'gentle-smile', headScaleX:0.92, headScaleY:1.10, torsoScaleX:0.90, torsoScaleY:1.14, accessory:'earrings', nose:'dot', brows:'arched', cheeks:'freckles', eyeSpacing:21, eyeOffsetY:0, eyeTilt:-2, eyeAsymmetry:1.03, pupilShift:1, headTilt:-3, torsoTilt:-2 },
  'prof.beatriz': { species:'human', outfit:'formal-coat', skin:'#E8C2A4', hair:'#493126', top:'#8658C2', bottom:'#45436A', shoe:'#F8C34B', accent:'#F8C34B', hairStyle:'pixie', face:'long', body:'longcoat', lower:'beatriz-coat', eyes:'narrow', mouth:'frown', headScaleX:0.88, headScaleY:1.14, torsoScaleX:0.86, torsoScaleY:1.16, accessory:'glasses', nose:'bridge', brows:'straight', cheeks:'none', eyeSpacing:19, eyeOffsetY:1, eyeTilt:1, eyeAsymmetry:0.91, pupilShift:-2, headTilt:-1, torsoTilt:0 },
  'prof.sofia': { species:'parrot', outfit:'language-scarf', skin:'#F0C6A5', hair:'#A64F2D', top:'#EE684F', bottom:'#315778', shoe:'#6FAE69', accent:'#6FAE69', hairStyle:'waves', face:'round', body:'flared', lower:'sofia-bell', eyes:'surprised', mouth:'open', headScaleX:1.03, headScaleY:0.96, torsoScaleX:1.10, torsoScaleY:1.00, accessory:'headband', nose:'button', brows:'raised', cheeks:'flush', eyeSpacing:23, eyeOffsetY:-1, eyeTilt:-2, eyeAsymmetry:1.05, pupilShift:1, headTilt:3, torsoTilt:-3 },
  'prof.helena': { species:'human', outfit:'embroidered-tunic', skin:'#D5A17B', hair:'#211E28', top:'#318AA7', bottom:'#514765', shoe:'#F5C84A', accent:'#F5C84A', hairStyle:'locs', face:'wide', body:'tunic', lower:'helena-wide', eyes:'sleepy', mouth:'neutral', headScaleX:1.14, headScaleY:0.94, torsoScaleX:1.02, torsoScaleY:1.12, nose:'dot', brows:'sleepy', cheeks:'spots', eyeSpacing:26, eyeOffsetY:0, eyeTilt:0, eyeAsymmetry:0.97, pupilShift:-1, headTilt:-2, torsoTilt:1 },
  'prof.augusto': { species:'human', outfit:'blazer', skin:'#B77D5D', hair:'#D2C7B5', top:'#247D91', bottom:'#49434B', shoe:'#EFB64A', accent:'#EFB64A', hairStyle:'curls', face:'pear', body:'compact', lower:'augusto-shorts', eyes:'soft', mouth:'gentle-smile', headScaleX:0.92, headScaleY:0.94, torsoScaleX:0.96, torsoScaleY:0.90, accessory:'glasses', nose:'broad', brows:'soft', cheeks:'none', eyeSpacing:27, eyeOffsetY:1, eyeTilt:1, eyeAsymmetry:1.06, pupilShift:0, headTilt:2, torsoTilt:-1 },
  'prof.caio': { species:'chameleon', outfit:'tech-hoodie', skin:'#D09A76', hair:'#27222B', top:'#D99A26', bottom:'#294E59', shoe:'#4B9E9C', accent:'#4B9E9C', hairStyle:'spiky', face:'square', body:'hood', lower:'caio-tapered', eyes:'curious', mouth:'smirk', headScaleX:1.02, headScaleY:1.00, torsoScaleX:1.00, torsoScaleY:0.98, accessory:'headset', nose:'none', brows:'angled', cheeks:'dimples', eyeSpacing:28, eyeOffsetY:0, eyeTilt:-1, eyeAsymmetry:0.93, pupilShift:2, headTilt:3, torsoTilt:2 },
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
  'clara-skirt': 'M96 184Q120 194 144 184Q157 197 160 222Q120 235 80 222Q83 197 96 184Z',
  'lia-slim': 'M99 184Q120 193 141 184L139 222Q134 230 124 227L120 205L116 227Q106 230 101 222Z',
  'davi-wide': 'M88 184Q120 198 152 184L150 227Q138 231 124 227L120 207L116 227Q102 231 90 227Z',
  'iara-cape': 'M91 180Q120 194 149 180L164 220L147 226L120 212L93 226L76 220Z',
  'nina-straight': 'M100 184Q120 192 140 184L138 227L122 227L120 206L118 227L102 227Z',
  'ravi-jogger': 'M92 183Q120 196 148 183L151 219Q143 228 126 225L120 217L114 225Q97 228 89 219Z',
  'mateus-round': 'M90 183Q120 196 150 183Q162 193 159 216Q155 229 120 229Q85 229 81 216Q78 193 90 183Z',
  'marina-a-line': 'M96 184Q120 195 144 184Q157 201 163 224Q120 235 77 224Q83 201 96 184Z',
  'beatriz-coat': 'M94 178Q120 188 146 178L153 225Q139 230 125 222L120 209L115 222Q101 230 87 225Z',
  'sofia-bell': 'M98 183Q120 194 142 183L144 208Q153 217 157 232Q140 237 126 228L120 209L114 228Q100 237 83 232Q87 217 96 208Z',
  'helena-wide': 'M90 183Q120 197 150 183L156 226Q142 232 126 226L120 206L114 226Q98 232 84 226Z',
  'augusto-shorts': 'M95 183Q120 194 145 183L148 215Q135 223 120 217Q105 223 92 215Z',
  'caio-tapered': 'M98 183Q120 193 142 183L140 226Q131 231 124 225L120 209L116 225Q109 231 100 226Z',
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
    dot: <circle cx="120" cy={eyeY + 12} r="2.6" fill="#A86F58" opacity=".8"/>,
    button: <ellipse cx="120" cy={eyeY + 12} rx="4.3" ry="3.2" fill="#B77960" opacity=".72"/>,
    bridge: <path d={'M120 ' + (eyeY + 5) + ' Q115 ' + (eyeY + 13) + ' 120 ' + (eyeY + 15)} fill="none" stroke="#A86F58" strokeWidth="2.8" strokeLinecap="round"/>,
    broad: <path d={'M114 ' + (eyeY + 12) + ' Q120 ' + (eyeY + 18) + ' 126 ' + (eyeY + 12)} fill="none" stroke="#A86F58" strokeWidth="3.5" strokeLinecap="round"/>,
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


function AnimalEyes({ y, spacing, rx = 11.5, ry = 15, look }: { y:number; spacing:number; rx?:number; ry?:number; look:Look }) {
  const left=120-spacing, right=120+spacing, shift=look.pupilShift;
  return <g>
    <ellipse cx={left} cy={y} rx={rx} ry={ry} fill="#FFF"/><ellipse cx={right} cy={y} rx={rx} ry={ry} fill="#FFF"/>
    <ellipse cx={left+shift} cy={y+2} rx={rx*.43} ry={ry*.56} fill="#27252B"/>
    <ellipse cx={right+shift} cy={y+2} rx={rx*.43} ry={ry*.56} fill="#27252B"/>
    <circle cx={left+shift+2} cy={y-2} r="2.1" fill="#FFF"/><circle cx={right+shift+2} cy={y-2} r="2.1" fill="#FFF"/>
  </g>;
}

function AnimalHead({ look, pose }: { look:Look; pose:TeacherPose }) {
  const fur=look.hair, muzzle=look.skin;
  const mouth=pose==='celebrating'
    ? <ellipse cx="120" cy="122" rx="10" ry="12" fill="#593A36"/>
    : pose==='thinking'
      ? <path d="M113 124Q120 121 127 124" fill="none" stroke="#593A36" strokeWidth="3.5" strokeLinecap="round"/>
      : <path d="M108 120Q120 132 132 120" fill="none" stroke="#593A36" strokeWidth="3.5" strokeLinecap="round"/>;
  switch(look.species) {
    case 'capybara': return <g>
      <ellipse cx="81" cy="52" rx="12" ry="15" fill={fur}/><ellipse cx="159" cy="52" rx="12" ry="15" fill={fur}/>
      <ellipse cx="81" cy="53" rx="5" ry="7" fill="#A96F55"/><ellipse cx="159" cy="53" rx="5" ry="7" fill="#A96F55"/>
      <path d="M67 82Q67 37 120 36Q173 37 173 82Q172 129 145 143Q120 153 95 143Q68 129 67 82Z" fill={fur}/>
      <path d="M82 94Q90 77 120 79Q150 77 158 94Q157 121 120 129Q83 121 82 94Z" fill={muzzle}/>
      <AnimalEyes look={look} y={78} spacing={22} rx={10.5} ry={13.5}/>
      <ellipse cx="120" cy="96" rx="8" ry="5.5" fill="#49302A"/>
      <path d="M120 101Q116 109 108 109M120 101Q124 109 132 109" fill="none" stroke="#49302A" strokeWidth="3" strokeLinecap="round"/>{mouth}
      <path d="M91 117q5 3 10 0M139 117q5 3 10 0" fill="none" stroke="#8B5544" strokeWidth="2.5" strokeLinecap="round"/>
    </g>;
    case 'beaver': return <g>
      <circle cx="78" cy="61" r="13" fill={fur}/><circle cx="162" cy="61" r="13" fill={fur}/>
      <circle cx="78" cy="61" r="6" fill="#C28B6C"/><circle cx="162" cy="61" r="6" fill="#C28B6C"/>
      <path d="M70 81Q72 35 120 34Q168 35 170 81Q171 128 145 144Q120 154 95 144Q69 128 70 81Z" fill={fur}/>
      <ellipse cx="103" cy="105" rx="23" ry="19" fill="#D6A47B"/><ellipse cx="137" cy="105" rx="23" ry="19" fill="#D6A47B"/>
      <AnimalEyes look={look} y={77} spacing={22} rx={10} ry={14}/>
      <ellipse cx="120" cy="99" rx="7" ry="5" fill="#3A2925"/>
      <path d="M120 104Q118 113 109 114M120 104Q122 113 131 114" fill="none" stroke="#53332D" strokeWidth="3" strokeLinecap="round"/>
      <rect x="111" y="119" width="8" height="12" rx="2" fill="#FFF1D7"/><rect x="121" y="119" width="8" height="12" rx="2" fill="#FFF1D7"/>
    </g>;
    case 'axolotl': return <g>
      <path d="M79 81Q61 59 67 35Q84 40 91 63Q96 32 111 22Q122 42 119 63Q133 34 151 28Q157 52 139 76Z" fill="#EF8F9B"/>
      <path d="M161 81Q179 59 173 35Q156 40 149 63Q144 32 129 22Q118 42 121 63Q107 34 89 28Q83 52 101 76Z" fill="#EF8F9B" opacity=".92"/>
      <path d="M70 91Q68 39 120 38Q172 39 170 91Q167 136 120 145Q73 136 70 91Z" fill="#F4B0B3"/>
      <path d="M87 104Q96 92 110 100M153 104Q144 92 130 100" fill="none" stroke="#D98291" strokeWidth="3" strokeLinecap="round"/>
      <AnimalEyes look={look} y={83} spacing={23} rx={11} ry={15}/>
      <ellipse cx="120" cy="105" rx="3.5" ry="2.5" fill="#B85F72"/>{mouth}
      <circle cx="95" cy="115" r="2.2" fill="#D98291"/><circle cx="145" cy="115" r="2.2" fill="#D98291"/>
    </g>;
    case 'cat': return <g>
      <path d="M72 76Q61 45 73 23Q96 29 103 51Q120 44 137 51Q145 29 167 23Q179 47 168 78Q177 118 145 142Q120 153 95 142Q63 118 72 76Z" fill={fur}/>
      <path d="M80 54Q79 37 77 32Q91 37 96 56Z" fill="#E6A1A0"/><path d="M160 54Q161 37 163 32Q149 37 144 56Z" fill="#E6A1A0"/>
      <path d="M87 103Q98 91 111 102Q120 109 129 102Q142 91 153 103Q147 126 120 132Q93 126 87 103Z" fill="#F5E6D3"/>
      <AnimalEyes look={look} y={82} spacing={23} rx={10.5} ry={14}/>
      <path d="M114 105Q120 100 126 105L120 111Z" fill="#C66B73"/>
      <path d="M120 111Q116 119 109 118M120 111Q124 119 131 118" fill="none" stroke="#68423C" strokeWidth="3" strokeLinecap="round"/>
      <path d="M87 109L65 104M88 116L64 118M153 109L175 104M152 116L176 118" stroke="#F4E8D9" strokeWidth="2.5" strokeLinecap="round"/>{mouth}
    </g>;
    case 'frog': return <g>
      <path d="M70 85Q69 47 120 46Q171 47 170 85Q167 132 120 143Q73 132 70 85Z" fill={fur}/>
      <path d="M76 59Q69 15 94 22Q118 22 114 63Z" fill={fur}/><path d="M126 63Q122 22 146 22Q171 15 164 59Z" fill={fur}/>
      <ellipse cx="94" cy="48" rx="16" ry="20" fill="#BDE9B7"/><ellipse cx="146" cy="48" rx="16" ry="20" fill="#BDE9B7"/>
      <circle cx="96" cy="49" r="8" fill="#FFF"/><circle cx="144" cy="49" r="8" fill="#FFF"/>
      <circle cx="98" cy="51" r="4.8" fill="#27252B"/><circle cx="142" cy="51" r="4.8" fill="#27252B"/>
      <circle cx="100" cy="48" r="1.7" fill="#FFF"/><circle cx="144" cy="48" r="1.7" fill="#FFF"/>
      <ellipse cx="120" cy="113" rx="34" ry="19" fill="#B7DF91" opacity=".75"/>
      <path d="M91 112Q120 139 149 112" fill="none" stroke="#315E42" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="83" cy="93" r="4" fill="#245B40" opacity=".65"/><circle cx="157" cy="93" r="4" fill="#245B40" opacity=".65"/>
    </g>;
    case 'armadillo': return <g>
      <ellipse cx="78" cy="68" rx="13" ry="15" fill={fur}/>
      <path d="M68 82Q70 38 120 37Q170 38 172 82Q169 129 142 143Q120 151 98 143Q69 129 68 82Z" fill={fur}/>
      <path d="M114 90Q140 82 165 99Q171 109 156 121Q138 133 113 119Z" fill="#B98A65"/>
      <AnimalEyes look={look} y={77} spacing={22} rx={10} ry={14}/>
      <ellipse cx="164" cy="107" rx="5" ry="4" fill="#43312C"/>
      <path d="M105 122Q118 130 130 123" fill="none" stroke="#4A332B" strokeWidth="3" strokeLinecap="round"/>
    </g>;
    case 'turtle': return <g>
      <path d="M79 90Q65 57 87 42Q104 32 120 38Q136 32 153 42Q175 57 161 90Q154 129 120 142Q86 129 79 90Z" fill={fur}/>
      <path d="M82 112Q120 137 158 112" fill="none" stroke="#5D8C57" strokeWidth="6" strokeLinecap="round"/>
      <path d="M109 112Q120 122 131 112Q120 133 109 112Z" fill="#F0CE83"/>
      <AnimalEyes look={look} y={78} spacing={21} rx={10.5} ry={14}/>
      <ellipse cx="95" cy="105" rx="5" ry="3.5" fill="#6C9B61"/><ellipse cx="145" cy="105" rx="5" ry="3.5" fill="#6C9B61"/>{mouth}
      <path d="M84 61Q94 48 103 54M137 54Q146 48 156 61" fill="none" stroke="#477348" strokeWidth="3" strokeLinecap="round"/>
    </g>;
    case 'parrot': return <g>
      <path d="M78 82Q69 43 94 28Q107 20 119 39Q134 18 147 33Q177 48 163 86Q162 129 120 145Q78 129 78 82Z" fill={fur}/>
      <path d="M107 39Q92 17 104 11Q120 22 120 39Q134 12 147 19Q153 31 134 47Z" fill={look.accent}/>
      <AnimalEyes look={look} y={78} spacing={22} rx={10.5} ry={14}/>
      <path d="M117 88Q144 85 139 109Q134 126 115 121Q128 109 117 88Z" fill="#F2B33E"/>
      <path d="M120 94Q128 100 118 112" fill="none" stroke="#A9602D" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M92 123Q120 137 148 123" fill="none" stroke="#8F473B" strokeWidth="3" strokeLinecap="round"/>
    </g>;
    case 'chameleon': return <g>
      <path d="M61 82Q67 46 111 49Q133 35 160 51Q182 64 168 96Q151 129 116 135Q79 134 61 108Z" fill={fur}/>
      <path d="M75 53Q82 30 96 43Q107 56 94 69Z" fill={look.accent}/><path d="M132 53Q144 27 159 41Q168 55 151 70Z" fill={look.accent}/>
      <ellipse cx="93" cy="72" rx="19" ry="21" fill="#D7E98C"/><ellipse cx="148" cy="69" rx="18" ry="20" fill="#D7E98C"/>
      <circle cx="98" cy="73" r="8" fill="#FFF"/><circle cx="148" cy="70" r="8" fill="#FFF"/>
      <circle cx="100" cy="75" r="4.7" fill="#27252B"/><circle cx="150" cy="72" r="4.7" fill="#27252B"/>
      <path d="M122 91Q148 91 164 101Q152 115 126 111" fill="#A6CB65"/>
      <path d="M124 111Q143 119 158 108" fill="none" stroke="#45633A" strokeWidth="3.2" strokeLinecap="round"/>
      <circle cx="77" cy="94" r="3" fill="#47764A"/><circle cx="88" cy="110" r="3" fill="#47764A"/>
    </g>;
    case 'human': default: return <g><Face look={look} pose={pose}/><Hair look={look}/></g>;
  }
}

function CreatureBack({ look }: { look:Look }) {
  switch(look.species) {
    case 'beaver': return <g><path d="M64 181Q42 188 46 215Q52 237 76 230Q96 219 83 194Z" fill="#75462F"/><path d="M59 195L75 222M68 191L84 213M51 207L71 229" stroke="#B27B54" strokeWidth="2.4" strokeLinecap="round"/></g>;
    case 'axolotl': return <g><path d="M155 205Q184 202 197 218Q181 221 199 238Q178 232 164 251Q170 229 151 224Z" fill="#F09AA6"/><path d="M165 218L188 219M163 226L184 230M160 235L177 239" stroke="#D36F84" strokeWidth="2.5" strokeLinecap="round"/></g>;
    case 'cat': return <path d="M151 194Q188 189 185 218Q181 241 207 233" fill="none" stroke={look.hair} strokeWidth="16" strokeLinecap="round"/>;
    case 'armadillo': return <g><path d="M65 147Q67 119 104 121Q157 113 174 151L168 200Q120 221 72 200Z" fill="#9B785B"/><path d="M75 150Q118 130 166 150M72 164Q120 144 171 164M72 180Q120 159 169 180M78 195Q120 178 164 195" stroke="#D7B18A" strokeWidth="5" fill="none" strokeLinecap="round"/></g>;
    case 'turtle': return <g><path d="M60 154Q64 119 120 120Q176 119 180 154Q179 211 120 218Q61 211 60 154Z" fill="#8C603B"/><path d="M70 157Q78 128 120 129Q162 128 170 157Q167 196 120 204Q73 196 70 157Z" fill="#B9824D"/><path d="M120 131L120 202M80 160L120 176L160 160M88 190L120 176L152 190" fill="none" stroke="#E0B56D" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></g>;
    case 'parrot': return <g><path d="M151 181Q171 196 179 247Q162 238 151 221Z" fill="#2B9B78"/><path d="M141 181Q151 207 151 250Q136 233 133 211Z" fill="#E4B33D"/><path d="M130 184Q134 212 122 250Q111 225 119 205Z" fill="#E86A51"/></g>;
    case 'chameleon': return <path d="M154 191Q185 183 188 210Q191 236 169 235Q151 234 157 218Q162 206 174 214" fill="none" stroke={look.hair} strokeWidth="13" strokeLinecap="round"/>;
    default: return null;
  }
}

function AnimalFeet({ look }: { look:Look }) {
  switch(look.species) {
    case 'human': return <g><rect x="86" y="245" width="31" height="12" rx="6" fill={look.shoe}/><rect x="123" y="245" width="31" height="12" rx="6" fill={look.shoe}/></g>;
    case 'capybara': return <g fill="#614238"><rect x="87" y="244" width="29" height="14" rx="7"/><rect x="124" y="244" width="29" height="14" rx="7"/><path d="M96 248v6M104 248v6M133 248v6M141 248v6" stroke="#D6B18B" strokeWidth="1.6"/></g>;
    case 'beaver': return <g fill="#9A6347"><ellipse cx="101" cy="249" rx="19" ry="9"/><ellipse cx="139" cy="249" rx="19" ry="9"/><path d="M88 248v7M96 247v8M126 247v8M134 248v7M142 248v7" stroke="#E1B68F" strokeWidth="1.8"/></g>;
    case 'axolotl': return <g fill="#E88C9A"><ellipse cx="101" cy="250" rx="16" ry="8"/><ellipse cx="139" cy="250" rx="16" ry="8"/><circle cx="89" cy="247" r="3"/><circle cx="97" cy="244" r="3"/><circle cx="105" cy="244" r="3"/><circle cx="127" cy="244" r="3"/><circle cx="135" cy="244" r="3"/><circle cx="143" cy="247" r="3"/></g>;
    case 'cat': return <g fill={look.hair}><ellipse cx="101" cy="250" rx="17" ry="9"/><ellipse cx="139" cy="250" rx="17" ry="9"/><path d="M92 244v5M101 242v6M110 244v5M130 244v5M139 242v6M148 244v5" stroke="#E9D9CD" strokeWidth="1.8"/></g>;
    case 'frog': return <g fill="#B6DC72"><ellipse cx="100" cy="250" rx="21" ry="8"/><ellipse cx="140" cy="250" rx="21" ry="8"/><circle cx="84" cy="244" r="5"/><circle cx="95" cy="242" r="5"/><circle cx="106" cy="244" r="5"/><circle cx="134" cy="244" r="5"/><circle cx="145" cy="242" r="5"/><circle cx="156" cy="244" r="5"/></g>;
    case 'armadillo': return <g fill="#A78A70"><ellipse cx="101" cy="250" rx="17" ry="8"/><ellipse cx="139" cy="250" rx="17" ry="8"/><path d="M94 248l-3 6M102 247l-2 7M110 248l-1 6M132 248l-1 6M140 247l2 7M148 248l3 6" stroke="#5A4B40" strokeWidth="2"/></g>;
    case 'turtle': return <g fill="#6D9D5A"><ellipse cx="101" cy="250" rx="18" ry="9"/><ellipse cx="139" cy="250" rx="18" ry="9"/><path d="M91 246l-2 7M100 245v8M109 246l2 7M129 246l-2 7M139 245v8M149 246l2 7" stroke="#D0E3A3" strokeWidth="1.7"/></g>;
    case 'parrot': return <g fill="#51483D"><path d="M91 244Q102 239 113 247L108 256H94Z"/><path d="M127 247Q138 239 149 244L146 256H132Z"/></g>;
    case 'chameleon': return <g fill="#85B85A"><ellipse cx="101" cy="250" rx="18" ry="8"/><ellipse cx="139" cy="250" rx="18" ry="8"/><circle cx="86" cy="247" r="4"/><circle cx="94" cy="243" r="4"/><circle cx="107" cy="245" r="4"/><circle cx="133" cy="245" r="4"/><circle cx="146" cy="243" r="4"/><circle cx="154" cy="247" r="4"/></g>;
  }
}

function OutfitDetails({ look }: { look:Look }) {
  const a=look.accent;
  switch(look.outfit) {
    case 'scarf': return <g><path d="M91 132Q120 145 149 132L140 149Q120 159 100 149Z" fill={a}/><path d="M132 145L145 151L139 179L126 169Z" fill={a}/><path d="M96 137Q120 148 144 137" fill="none" stroke="#FFF1C8" strokeWidth="2.6"/><circle cx="120" cy="163" r="3" fill="#FFF1C8"/></g>;
    case 'tech-jacket': return <g><path d="M96 133L112 145L120 159L128 145L144 133" fill="none" stroke="#C7F0E9" strokeWidth="5" strokeLinecap="round"/><path d="M120 149V218" stroke="#B8E2DC" strokeWidth="2.5"/><rect x="132" y="169" width="16" height="18" rx="3" fill="none" stroke={a} strokeWidth="2.5"/><circle cx="120" cy="176" r="2.3" fill={a}/><circle cx="120" cy="193" r="2.3" fill={a}/></g>;
    case 'utility-vest': return <g><path d="M94 133L106 146L101 213L88 208L86 158ZM146 133L134 146L139 213L152 208L154 158Z" fill="#2D5C89"/><path d="M94 161H105V181H92ZM135 161H148V181H137Z" fill="#E6B64B"/><path d="M94 188H105M135 188H146" stroke="#F4D58A" strokeWidth="2.3"/></g>;
    case 'field-cape': return <g><path d="M88 135Q120 157 152 135L166 211Q120 228 74 211Z" fill="#6A469D" opacity=".34"/><path d="M89 139Q120 158 151 139" fill="none" stroke={a} strokeWidth="5" strokeLinecap="round"/><path d="M120 151L132 164L120 177L108 164Z" fill={a}/><circle cx="120" cy="164" r="4" fill="#F7E8C7"/></g>;
    case 'lab-coat': return <g><path d="M98 130L113 143L120 160L105 173L91 151Z" fill="#F5F0E7"/><path d="M142 130L127 143L120 160L135 173L149 151Z" fill="#E6E0D5"/><path d="M120 157V219" stroke="#F7F3EA" strokeWidth="3"/><path d="M91 179H108V198H91ZM132 179H149V198H132Z" fill="none" stroke="#F5F0E7" strokeWidth="2.5"/><path d="M139 180V190M143 180V190" stroke={a} strokeWidth="2.5"/></g>;
    case 'hoodie': return <g><path d="M90 140Q120 115 150 140L145 165Q120 179 95 165Z" fill="#286D4C"/><path d="M110 143Q120 157 130 143" fill="none" stroke="#BFE1C1" strokeWidth="3"/><path d="M112 152L109 171M128 152L131 171" stroke="#F4D984" strokeWidth="2.2" strokeLinecap="round"/><path d="M101 187Q120 178 139 187L137 205Q120 211 103 205Z" fill="#237D55" stroke="#BFE1C1" strokeWidth="2"/></g>;
    case 'knit-sweater': return <g><path d="M94 137Q120 151 146 137" fill="none" stroke="#F4D2AC" strokeWidth="5" strokeLinecap="round"/><path d="M89 177H151M91 184H149" stroke="#F4B27E" strokeWidth="2.3"/><path d="M108 157L120 168L132 157L120 146Z" fill="none" stroke={a} strokeWidth="3"/></g>;
    case 'cardigan': return <g><path d="M94 132L108 143L120 156L132 143L146 132" fill="none" stroke="#F3D6A0" strokeWidth="5" strokeLinecap="round"/><path d="M120 154V219" stroke="#D8E8C6" strokeWidth="2.5"/><circle cx="120" cy="172" r="3" fill={a}/><circle cx="120" cy="190" r="3" fill={a}/></g>;
    case 'formal-coat': return <g><path d="M96 130L112 143L120 160L103 174L91 151Z" fill="#EEE7DC"/><path d="M144 130L128 143L120 160L137 174L149 151Z" fill="#DAD0C3"/><path d="M120 154V217" stroke="#D8C9B8" strokeWidth="2.5"/><path d="M107 145L120 160L113 177L102 161ZM133 145L120 160L127 177L138 161Z" fill={a}/><circle cx="120" cy="188" r="3" fill="#EBCB70"/></g>;
    case 'language-scarf': return <g><path d="M92 133Q120 148 148 133L143 151Q120 163 97 151Z" fill={a}/><path d="M132 148L147 153L142 183L129 171Z" fill={a}/><path d="M99 140Q120 151 141 140" fill="none" stroke="#FFE9C5" strokeWidth="2.2"/><path d="M135 159l7 3M133 167l7 3M132 175l7 3" stroke="#FFE9C5" strokeWidth="2"/></g>;
    case 'embroidered-tunic': return <g><path d="M99 138Q120 151 141 138" fill="none" stroke={a} strokeWidth="4" strokeLinecap="round"/><path d="M92 183H148" stroke={a} strokeWidth="3" strokeDasharray="3 4"/><path d="M120 158L126 166L120 174L114 166Z" fill="none" stroke="#E9D7B9" strokeWidth="2.5"/></g>;
    case 'blazer': return <g><path d="M96 130L111 143L120 158L107 172L92 149Z" fill="#E9E0D4"/><path d="M144 130L129 143L120 158L133 172L148 149Z" fill="#D7CBBE"/><path d="M120 156V217" stroke="#F2E9DA" strokeWidth="2.5"/><path d="M120 164L126 172L120 180L114 172Z" fill={a}/><circle cx="120" cy="194" r="3" fill="#E9C97D"/></g>;
    case 'tech-hoodie': return <g><path d="M91 141Q120 112 149 141L143 164Q120 176 97 164Z" fill="#A87922"/><path d="M105 143Q120 159 135 143" fill="none" stroke="#F7DC95" strokeWidth="3.5"/><path d="M120 154V216" stroke="#F6E4B4" strokeWidth="2.5"/><rect x="130" y="178" width="17" height="14" rx="3" fill="none" stroke={a} strokeWidth="2.5"/></g>;
  }
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


function CharacterBody({ look }: { look:Look }) {
  if (look.species === 'human') return <path d={BODY_PATH[look.body]} fill={look.top}/>;
  const shapes: Record<Exclude<Species,'human'>,string> = {
    capybara: 'M81 145Q120 121 159 145Q176 164 166 211Q120 238 74 211Q64 164 81 145Z', beaver: 'M79 137Q120 119 161 137Q178 157 168 212Q120 235 72 212Q62 157 79 137Z', axolotl: 'M91 132Q120 118 149 132Q162 151 155 217Q120 239 85 217Q78 151 91 132Z',
    cat: 'M95 130Q120 116 145 130Q160 149 152 218Q120 234 88 218Q80 149 95 130Z', frog: 'M86 140Q120 119 154 140Q174 164 159 213Q120 242 81 213Q66 164 86 140Z', armadillo: 'M93 136Q120 122 147 136Q157 157 151 211Q120 231 89 211Q83 157 93 136Z',
    turtle: 'M91 136Q120 121 149 136Q160 154 153 209Q120 232 87 209Q80 154 91 136Z', parrot: 'M98 127Q120 111 142 127Q159 147 155 211Q120 237 85 211Q81 147 98 127Z', chameleon: 'M88 139Q120 121 152 139Q167 162 155 218Q120 237 85 218Q74 162 88 139Z',
  };
  return <path d={shapes[look.species]} fill={look.top}/>;
}

function CharacterLegs({ look }: { look:Look }) {
  if (look.species === 'human') return <g>
    <path d="M104 222Q103 230 102 237" fill="none" stroke={look.bottom} strokeWidth="13" strokeLinecap="round"/>
    <path d="M136 222Q137 230 138 237" fill="none" stroke={look.bottom} strokeWidth="13" strokeLinecap="round"/>
  </g>;
  const widths: Record<Exclude<Species,'human'>,number> = { capybara:15, beaver:15, axolotl:11, cat:11, frog:17, armadillo:14, turtle:16, parrot:8, chameleon:11 };
  const w=widths[look.species];
  return <g>
    <path d="M104 218Q102 230 100 239" fill="none" stroke={look.skin} strokeWidth={w} strokeLinecap="round"/>
    <path d="M136 218Q138 230 140 239" fill="none" stroke={look.skin} strokeWidth={w} strokeLinecap="round"/>
  </g>;
}

function CharacterHand({ look, x, y, gesture }: { look:Look; x:number; y:number; gesture:HandGesture }) {
  if (look.species === 'human') return <Hand x={x} y={y} skin={look.skin} gesture={gesture}/>;
  const c=look.skin;
  return <g transform={'translate('+x+' '+y+')'}>
    {look.species === 'frog'
      ? <g fill={c}><ellipse cx="0" cy="0" rx="10" ry="9"/><path d="M-5 -3Q-13 -18 -18 -17Q-25 -11 -12 -2ZM0 -6Q-4 -26 2 -25Q10 -23 7 -4ZM5 -3Q15 -18 20 -13Q23 -4 10 1Z"/><circle cx="-18" cy="-17" r="4.5" fill="#B6DC72"/><circle cx="2" cy="-25" r="4.5" fill="#B6DC72"/><circle cx="20" cy="-13" r="4.5" fill="#B6DC72"/></g>
      : look.species === 'parrot'
        ? <g fill="none" stroke="#51483D" strokeWidth="4.5" strokeLinecap="round"><ellipse cx="0" cy="0" rx="9" ry="8" fill="#51483D" stroke="none"/><path d="M-4 -3Q-11 -16 -8 -22M1 -4Q0 -19 6 -22M5 -2Q10 -14 16 -13"/></g>
        : look.species === 'chameleon'
          ? <g fill={c}><ellipse cx="0" cy="0" rx="10" ry="8"/><path d="M-6 -2Q-17 -14 -20 -8M-2 -5Q-8 -21 -1 -21M4 -3Q12 -16 18 -11" fill="none" stroke={c} strokeWidth="5" strokeLinecap="round"/><circle cx="-20" cy="-8" r="3.5"/><circle cx="-1" cy="-21" r="3.5"/><circle cx="18" cy="-11" r="3.5"/></g>
          : look.species === 'cat'
            ? <g fill={c}><ellipse cx="0" cy="0" rx="10.5" ry="9"/><circle cx="-7" cy="-8" r="4.7"/><circle cx="0" cy="-11" r="4.7"/><circle cx="7" cy="-8" r="4.7"/><path d="M-5 4l-2 3M2 4v4M8 4l2 3" stroke="#F3E1D3" strokeWidth="1.8" strokeLinecap="round"/></g>
            : <g fill={c}><ellipse cx="0" cy="0" rx="10.5" ry="9"/><path d="M-7 -2Q-12 -12 -8 -16M0 -5Q-2 -18 2 -20M7 -2Q13 -12 9 -16" fill="none" stroke={c} strokeWidth="4.2" strokeLinecap="round"/><path d="M-7 7l-2 3M0 8v3M7 7l2 3" stroke="#F1DCC8" strokeWidth="1.5" strokeLinecap="round"/></g>}
    {gesture === 'point' && <path d="M2 -7Q4 -22 9 -25" fill="none" stroke={c} strokeWidth="4.5" strokeLinecap="round"/>}
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
    thinking: { left:'M88 164Q74 181 78 197', right:'M152 160Q166 150 154 152', lh:[78,197], rh:[154,152], hand:'closed' },
    celebrating: { left:'M88 158Q63 129 55 88', right:'M152 158Q177 128 185 88', lh:[55,88], rh:[185,88], hand:'open' },
    listening: { left:'M88 164Q103 184 114 181', right:'M152 164Q137 184 126 181', lh:[114,181], rh:[126,181], hand:'closed' },
    'hands-on-hips': { left:'M88 164Q69 176 90 190', right:'M152 164Q171 176 150 190', lh:[90,190], rh:[150,190], hand:'closed' },
    'arms-down': { left:'M88 164Q76 184 76 207', right:'M152 164Q164 184 164 207', lh:[76,207], rh:[164,207], hand:'closed' },
    shrug: { left:'M88 164Q68 145 58 150', right:'M152 164Q172 145 182 150', lh:[58,150], rh:[182,150], hand:'open' },
    'arms-crossed': { left:'M88 164Q104 179 132 190', right:'M152 164Q136 179 108 190', lh:[132,190], rh:[108,190], hand:'closed' },
    'hand-on-chin': { left:'M88 164Q74 184 76 207', right:'M152 164Q168 153 151 154', lh:[76,207], rh:[151,154], hand:'closed' },
    'hands-forward': { left:'M88 164Q101 183 111 180', right:'M152 164Q139 183 129 180', lh:[111,180], rh:[129,180], hand:'open' },
    'one-hand-on-hip': { left:'M88 164Q68 177 91 190', right:'M152 164Q164 184 164 207', lh:[91,190], rh:[164,207], hand:'closed' },
    pointing: { left:'M88 164Q76 184 76 207', right:'M152 160Q174 137 190 111', lh:[76,207], rh:[190,111], hand:'point' },
    'one-hand-up': { left:'M88 164Q76 184 76 207', right:'M152 160Q168 132 166 96', lh:[76,207], rh:[166,96], hand:'open' },
  };
  const a = arms[characterPose];
  const gesture = a.hand;
  const style: CSSProperties = portrait ? { width:size, height:size } : { width:Math.round(size * .92), height:size };
  return (
    <svg viewBox={portrait ? '40 12 160 160' : '0 0 240 270'} width={style.width} height={style.height}
      className={'shrink-0 ' + (portrait ? 'rounded-full overflow-hidden ' : 'overflow-visible ') + className}
      style={style} role="img" aria-label={teacher.name + ', personagem ilustrado do Pórtico'}
      data-character-style="portico-friends-v10" data-character-body-species={look.species} data-character-pose={characterPose} data-character-species={look.species} data-character-outfit={look.outfit} data-character-body={look.body} data-character-lower={look.lower} data-character-face={look.face} data-character-hair={look.hairStyle} data-character-eyes={look.eyes} data-character-mouth={look.mouth} data-character-nose={look.nose} data-character-brows={look.brows} data-character-spacing={look.eyeSpacing} focusable="false">
      {portrait && <circle cx="120" cy="98" r="90" fill={'rgb(var(--' + teacher.tone + '))'}/>}
      {!portrait && <rect x="83" y="260" width="74" height="6" rx="3" fill="#243840" opacity=".14"/>}

      <CreatureBack look={look}/>
      {/* Roupa com acabamento discreto, aplicado sobre a silhueta principal. */}
      <g transform={'translate(120 174) rotate(' + look.torsoTilt + ') scale(' + look.torsoScaleX + ' ' + look.torsoScaleY + ') translate(-120 -174)'}>
        <CharacterBody look={look}/>
        <path d={LOWER_PATH[look.lower]} fill={look.bottom}/>
        <OutfitDetails look={look}/>
        {look.species === 'armadillo' && <g fill="none" stroke="#E2C39F" strokeWidth="3.2"><path d="M83 150Q120 132 157 150M79 165Q120 146 161 165M82 180Q120 164 158 180"/></g>}
        {look.species === 'turtle' && <g fill="none" stroke="#E2C487" strokeWidth="2.8"><path d="M87 154Q120 169 153 154M91 178Q120 191 149 178M120 150V201"/></g>}
        {look.species === 'parrot' && <path d="M92 160Q105 177 120 181Q135 177 148 160" fill="none" stroke="#F5D78A" strokeWidth="4" strokeLinecap="round"/>}

        {/* Braços grossos integrados ao corpo, mas com gestos próprios. */}
        <path d={a.left} fill="none" stroke={look.top} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={a.right} fill="none" stroke={look.top} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round"/>
        <CharacterHand look={look} x={a.lh[0]} y={a.lh[1]} gesture={gesture}/>
        <CharacterHand look={look} x={a.rh[0]} y={a.rh[1]} gesture={gesture}/>
      </g>

      {/* Pernas e pés adaptados à espécie. */}
      {!portrait && <g>
        <CharacterLegs look={look}/>
        <AnimalFeet look={look}/>
      </g>}
      {/* A cabeça também varia em largura e altura; rosto e cabelo formam uma única unidade. */}
      <g transform={'translate(120 91) rotate(' + look.headTilt + ') scale(' + look.headScaleX + ' ' + look.headScaleY + ') translate(-120 -91)'}>
        <AnimalHead look={look} pose={characterPose}/>

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
