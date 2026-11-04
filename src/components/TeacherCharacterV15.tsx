import type { CSSProperties, ReactNode } from 'react';
import type { FictionalTeacher } from '@/content/teachers';

export type TeacherPose =
  | 'greeting' | 'presenting' | 'thinking' | 'celebrating' | 'listening'
  | 'hands-on-hips' | 'arms-down' | 'shrug' | 'arms-crossed' | 'hand-on-chin'
  | 'hands-forward' | 'one-hand-on-hip' | 'pointing' | 'one-hand-up';

type CharacterMeta = {
  species: string; outfit: string; body: string; lower: string; hair: string;
  eyes: string; eyeShape: EyeShape; mouth: string; nose: string; brows: string; spacing: string; limbs: string;
};

const O = '#3D302E';
const WHITE = '#FFFDF7';

const META: Record<string, CharacterMeta> = {
  'prof.clara': { species:'capybara', outfit:'terracotta field scarf and notebook satchel', body:'rounded pear-shaped capybara', lower:'two broad paw-feet', hair:'rounded capybara ears and muzzle', eyes:'warm oval eyes', eyeShape:'round', mouth:'wide reassuring smile', nose:'broad capybara nose', brows:'soft raised brows', spacing:'wide-set-22', limbs:'short capybara forepaws and broad hind paws' },
  'prof.lia': { species:'human', outfit:'petrol utility jacket with bright zipper', body:'compact upright engineer', lower:'tapered work trousers and boots', hair:'high bun with side sweep', eyes:'focused almond eyes', eyeShape:'almond', mouth:'confident half-smile', nose:'small bridge', brows:'straight decisive brows', spacing:'precise-19', limbs:'human hands and work boots' },
  'prof.davi': { species:'beaver', outfit:'blue network vest with tool pockets', body:'broad beaver torso and paddle tail', lower:'short sturdy hind legs', hair:'round beaver ears and flat tail', eyes:'kind rounded eyes', eyeShape:'sleepy', mouth:'buck-toothed grin', nose:'wide dark beaver nose', brows:'strong friendly brows', spacing:'broad-24', limbs:'broad webbed forepaws and short hind paws' },
  'prof.iara': { species:'axolotl', outfit:'plum capelet with gold shield clasp', body:'small aquatic teardrop body', lower:'short webbed feet', hair:'branching external gills', eyes:'large round turquoise eyes', eyeShape:'wide', mouth:'small delighted smile', nose:'tiny nostril marks', brows:'curious lifted brows', spacing:'round-25', limbs:'four small webbed axolotl limbs' },
  'prof.nina': { species:'cat', outfit:'mustard laboratory coat and round spectacles', body:'slim feline body with curved tail', lower:'soft feline paws', hair:'pointed cat ears and cheek tufts', eyes:'narrow observant cat eyes', eyeShape:'slit', mouth:'knowing side-smile', nose:'tiny pink feline nose', brows:'slanted clever brows', spacing:'narrow-18', limbs:'feline forepaws and padded hind paws' },
  'prof.ravi': { species:'frog', outfit:'leaf-green hoodie with code badge', body:'springy round frog body', lower:'oversized webbed feet', hair:'raised frog eye domes', eyes:'bulbous bright eyes', eyeShape:'wide', mouth:'huge open grin', nose:'two tiny nostrils', brows:'playful arched brows', spacing:'bulbous-30', limbs:'long springy frog arms and webbed feet' },
  'prof.mateus': { species:'armadillo', outfit:'ochre data satchel with record tabs', body:'low horizontal armored shell', lower:'four short digging legs', hair:'segmented domed carapace', eyes:'small precise eyes behind glasses', eyeShape:'tiny', mouth:'quiet content smile', nose:'long tapered snout', brows:'subtle thoughtful brows', spacing:'side-facing-16', limbs:'four short armored legs with digging claws' },
  'prof.marina': { species:'turtle', outfit:'olive neck scarf and compass pin', body:'low rounded turtle shell', lower:'four splayed flipper-feet', hair:'large patterned shell', eyes:'calm rounded eyes', eyeShape:'sleepy', mouth:'gentle closed smile', nose:'small turtle beak', brows:'soft sloping brows', spacing:'side-facing-18', limbs:'four splayed flipper-legs' },
  'prof.beatriz': { species:'human', outfit:'structured plum coat and cream collar', body:'tall composed silhouette', lower:'straight trousers and pointed shoes', hair:'short sculpted pixie cut', eyes:'measured eyes behind fine glasses', eyeShape:'almond', mouth:'precise thoughtful line', nose:'straight bridge', brows:'firm angular brows', spacing:'measured-20', limbs:'human hands and tailored shoes' },
  'prof.sofia': { species:'parrot', outfit:'green language scarf and feathered tail', body:'upright feathered bird body', lower:'thin bird legs and talons', hair:'coral crest and curved beak', eyes:'bright expressive bird eyes', eyeShape:'almond', mouth:'curved hooked beak', nose:'hooked golden beak', brows:'feathered expressive crest', spacing:'bird-24', limbs:'feathered wings and curved talons' },
  'prof.helena': { species:'human', outfit:'teal embroidered tunic with ochre trim', body:'flowing grounded silhouette', lower:'wide tunic hem and boots', hair:'long individual locs framing face', eyes:'warm attentive eyes', eyeShape:'round', mouth:'generous open smile', nose:'soft rounded nose', brows:'expressive soft brows', spacing:'open-23', limbs:'human hands and sturdy boots' },
  'prof.augusto': { species:'human', outfit:'petrol blazer and document folio', body:'solid mature professor silhouette', lower:'straight trousers and leather shoes', hair:'silver curls and trimmed moustache', eyes:'kind eyes behind round glasses', eyeShape:'sleepy', mouth:'warm restrained smile', nose:'rounded bridge', brows:'gentle silver brows', spacing:'kind-22', limbs:'human hands and leather shoes' },
  'prof.caio': { species:'chameleon', outfit:'ochre tech harness and signal device', body:'horizontal agile chameleon body', lower:'four gripping feet and curled tail', hair:'two independent swivelling eye turrets', eyes:'independent panoramic eyes', eyeShape:'wide', mouth:'curious curved smile', nose:'long chameleon snout', brows:'expressive eye ridges', spacing:'turret-34', limbs:'four gripping limbs with split toes' },
};

export const TEACHER_SIGNATURE_POSES: Record<string, TeacherPose> = {
  'prof.clara':'presenting', 'prof.lia':'hands-on-hips', 'prof.davi':'arms-crossed',
  'prof.iara':'shrug', 'prof.nina':'hand-on-chin', 'prof.ravi':'celebrating',
  'prof.mateus':'arms-down', 'prof.marina':'greeting', 'prof.beatriz':'hands-forward',
  'prof.sofia':'one-hand-on-hip', 'prof.helena':'listening', 'prof.augusto':'pointing',
  'prof.caio':'one-hand-up',
};

type EyeShape = 'round' | 'almond' | 'sleepy' | 'slit' | 'tiny' | 'wide';

function Eye({
  x, y, rx = 10, ry = 14, iris = '#263B43', dx = 0,
  shape = 'round', lidColor = WHITE, pupilScale = 1, tilt = 0,
}: {
  x:number; y:number; rx?:number; ry?:number; iris?:string; dx?:number;
  shape?:EyeShape; lidColor?:string; pupilScale?:number; tilt?:number;
}) {
  const scale = shape === 'tiny' ? .78 : shape === 'wide' ? 1.08 : 1;
  const eyeRx = rx * scale;
  const eyeRy = ry * scale;
  const pupilRx = eyeRx * (shape === 'slit' ? .23 : shape === 'tiny' ? .34 : .45) * pupilScale;
  const pupilRy = eyeRy * (shape === 'slit' ? .72 : .57) * pupilScale;
  const almond = 'M' + (x - eyeRx) + ' ' + y
    + ' Q' + x + ' ' + (y - eyeRy * 1.05) + ' ' + (x + eyeRx) + ' ' + y
    + ' Q' + x + ' ' + (y + eyeRy * 1.05) + ' ' + (x - eyeRx) + ' ' + y + 'Z';
  const upperLid = 'M' + (x - eyeRx) + ' ' + (y - eyeRy * .12)
    + ' Q' + x + ' ' + (y - eyeRy * .88) + ' ' + (x + eyeRx) + ' ' + (y - eyeRy * .12);
  return (
    <g className="p-character__eye" data-eye-shape={shape} data-eye-x={x}>
      <g transform={'rotate(' + tilt + ' ' + x + ' ' + y + ')'}>
        {shape === 'almond'
          ? <path data-eye-base="true" d={almond} fill={WHITE}/>
          : <ellipse data-eye-base="true" cx={x} cy={y} rx={eyeRx} ry={eyeRy} fill={WHITE}/>}
        <ellipse cx={x + dx} cy={y + 2} rx={pupilRx} ry={pupilRy} fill={iris}/>
        <ellipse cx={x + dx + 1} cy={y + 2} rx={pupilRx * .52} ry={pupilRy * .72} fill="#17252C"/>
        <circle cx={x + dx - pupilRx * .42} cy={y - pupilRy * .48} r={Math.max(1.8, eyeRx * .19)} fill={WHITE}/>
        {shape === 'sleepy' && <path d={upperLid} fill="none" stroke={lidColor} strokeWidth={Math.max(3, eyeRy * .58)} strokeLinecap="round"/>}
        {shape === 'slit' && <path d={upperLid} fill="none" stroke={lidColor} strokeWidth={Math.max(2, eyeRy * .18)} strokeLinecap="round" opacity=".8"/>}
      </g>
    </g>
  );
}

function GestureArms({ pose, sleeve, hand = '#D29A76' }: { pose:TeacherPose; sleeve:string; hand?:string }) {
  const poses: Record<TeacherPose, { l:string; r:string; lh:[number,number]; rh:[number,number] }> = {
    presenting:{l:'M91 172Q69 171 62 151',r:'M149 171Q169 165 184 145',lh:[62,151],rh:[184,145]},
    greeting:{l:'M91 172Q73 190 75 208',r:'M149 170Q178 132 179 100',lh:[75,208],rh:[179,100]},
    thinking:{l:'M91 172Q72 190 75 208',r:'M149 170Q166 153 146 143',lh:[75,208],rh:[146,143]},
    celebrating:{l:'M91 165Q60 125 43 81',r:'M149 165Q180 125 197 81',lh:[43,81],rh:[197,81]},
    listening:{l:'M91 174Q102 193 116 190',r:'M149 174Q138 193 124 190',lh:[116,190],rh:[124,190]},
    'hands-on-hips':{l:'M91 169Q70 185 91 199',r:'M149 169Q170 185 149 199',lh:[91,199],rh:[149,199]},
    'arms-down':{l:'M91 171Q72 193 76 216',r:'M149 171Q168 193 164 216',lh:[76,216],rh:[164,216]},
    shrug:{l:'M91 168Q69 144 57 145',r:'M149 168Q171 144 183 145',lh:[57,145],rh:[183,145]},
    'arms-crossed':{l:'M91 169Q112 187 145 194',r:'M149 169Q130 187 96 194',lh:[145,194],rh:[96,194]},
    'hand-on-chin':{l:'M91 171Q72 193 76 216',r:'M149 169Q167 151 145 139',lh:[76,216],rh:[145,139]},
    'hands-forward':{l:'M91 172Q104 190 113 188',r:'M149 172Q136 190 127 188',lh:[113,188],rh:[127,188]},
    'one-hand-on-hip':{l:'M91 169Q70 185 91 199',r:'M149 171Q168 193 164 216',lh:[91,199],rh:[164,216]},
    pointing:{l:'M91 171Q72 193 76 216',r:'M149 168Q174 145 194 120',lh:[76,216],rh:[194,120]},
    'one-hand-up':{l:'M91 171Q72 193 76 216',r:'M149 168Q170 133 166 96',lh:[76,216],rh:[166,96]},
  };
  const p = poses[pose];
  const renderHand = (x:number, y:number, flip:number, pointing = false) => (
    <g transform={'translate(' + x + ' ' + y + ') scale(' + flip + ' 1)'}>
      <path d="M-7 1C-10 -4 -8 -9 -3 -9C1 -12 6 -9 6 -5C11 -3 10 4 6 8C2 11 -5 10 -8 5Z" fill={hand}/>
      <path d="M-3 1Q0 4 3 3" fill="none" stroke={O} strokeWidth="1.3" opacity=".2" strokeLinecap="round"/>
      {pointing && <path d="M2 -4Q4 -12 7 -17Q11 -19 11 -14L8 -1Z" fill={hand}/>}
    </g>
  );
  return (
    <g data-hand-style="soft-mitten">
      <g fill="none" stroke={sleeve} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
        <path d={p.l}/><path d={p.r}/>
      </g>
      {renderHand(p.lh[0], p.lh[1], -1)}
      {renderHand(p.rh[0], p.rh[1], 1, pose === 'pointing')}
    </g>
  );
}

function Capybara({ pose }: { pose:TeacherPose }) {
  return <g>
    <ellipse cx="120" cy="263" rx="49" ry="7" fill="#2D2926" opacity=".13" stroke="none"/>
    <path d="M80 204Q57 203 54 224Q64 242 91 230" fill="#94613F"/>
    <path d="M94 170Q120 151 146 170Q163 190 153 235Q120 252 87 235Q77 191 94 170Z" fill="#AD754D"/>
    <path d="M87 183Q120 198 153 183L148 211Q120 229 92 211Z" fill="#E96A4D"/>
    <path d="M103 181L120 200L137 181L132 224L120 233L108 224Z" fill="#F4B53E"/>
    <GestureArms pose={pose} sleeve="#E96A4D" hand="#AD754D"/>
    <path d="M96 236Q90 246 91 255L112 255L115 240M126 240L129 255L150 255Q151 246 144 236" fill="#93603F"/>
    <ellipse cx="100" cy="255" rx="14" ry="7" fill="#614334"/><ellipse cx="140" cy="255" rx="14" ry="7" fill="#614334"/>
    <ellipse cx="120" cy="105" rx="57" ry="59" fill="#B78056"/>
    <circle cx="76" cy="69" r="13" fill="#9F6948"/><circle cx="164" cy="69" r="13" fill="#9F6948"/>
    <circle cx="76" cy="69" r="6" fill="#D9AC83"/><circle cx="164" cy="69" r="6" fill="#D9AC83"/>
    <ellipse cx="120" cy="129" rx="38" ry="28" fill="#E5BD94"/>
    <path d="M86 78Q99 69 111 78M129 78Q141 69 154 77" fill="none" stroke="#8F6046" strokeWidth="3.6" strokeLinecap="round"/>
    <Eye x={99} y={96} rx={10} ry={13} iris="#4E3930" shape="round" pupilScale={1.08} tilt={-2}/>
    <Eye x={141} y={96} rx={10} ry={13} iris="#4E3930" shape="round" pupilScale={1.08} tilt={2}/>
    <ellipse cx="120" cy="122" rx="9" ry="6" fill="#382A28"/>
    <path d="M120 128Q116 139 106 139M120 128Q124 139 134 139" fill="none" stroke="#57372F" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M104 145Q120 160 136 145Q130 163 120 163Q110 163 104 145Z" fill="#5A3434"/>
    <path d="M85 134l-12 3M86 141l-11 6M155 134l12 3M154 141l11 6" stroke="#8E6047" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M151 182Q164 167 174 174L169 188L156 195Z" fill="#E96A4D"/>
    <rect x="154" y="188" width="27" height="21" rx="5" fill="#315D69"/>
    <path d="M160 194h15M160 199h10" stroke="#F8E7C8" strokeWidth="2"/>
  </g>;
}

function Lia({ pose }: { pose:TeacherPose }) {
  return <g>
    <ellipse cx="120" cy="263" rx="43" ry="7" fill="#2D2926" opacity=".13" stroke="none"/>
    <path d="M103 229L100 250L119 250L123 231M132 231L136 250L155 250L151 228" fill="#214D5D"/>
    <path d="M95 248h27v11H93Q89 255 95 248ZM133 248h26Q163 256 156 259H132Z" fill="#E7B94A"/>
    <path d="M98 155Q120 145 142 155L151 231Q120 245 89 231Z" fill="#087F7A"/>
    <path d="M120 157V224" stroke="#B6E1D7" strokeWidth="3"/>
    <path d="M97 169L118 190L106 208L91 188Z" fill="#0B655F"/>
    <path d="M143 169L122 190L134 208L149 188Z" fill="#0B655F"/>
    <path d="M119 186L128 197L119 208L110 197Z" fill="#F6C84A"/>
    <GestureArms pose={pose} sleeve="#087F7A" hand="#C78E6C"/>
    <path d="M83 87Q79 42 119 37Q165 36 164 91L150 111L91 109Z" fill="#231D20"/>
    <circle cx="120" cy="30" r="20" fill="#231D20"/>
    <path d="M78 94Q74 50 120 47Q166 48 163 94Q159 147 120 151Q80 147 78 94Z" fill="#C98E6A"/>
    <path d="M78 84Q77 44 118 43Q153 42 164 75L157 88Q137 66 105 73Q91 77 78 91Z" fill="#231D20"/>
    <Eye x={101} y={95} rx={10} ry={14} shape="almond" lidColor="#C98E6A" tilt={-4}/>
    <Eye x={140} y={95} rx={10} ry={14} shape="almond" lidColor="#C98E6A" tilt={-4}/>
    <path d="M88 80Q101 72 112 80M130 79Q142 71 153 79" fill="none" stroke="#231D20" strokeWidth="5" strokeLinecap="round"/>
    <path d="M115 115Q120 120 125 115" fill="none" stroke="#925E50" strokeWidth="3" strokeLinecap="round"/>
    <path d="M105 128Q120 140 135 128" fill="none" stroke="#75433E" strokeWidth="4" strokeLinecap="round"/>
    <path d="M155 90Q171 92 168 110" fill="none" stroke="#F1C54B" strokeWidth="5" strokeLinecap="round"/>
    <rect x="153" y="103" width="12" height="18" rx="5" fill="#F1C54B"/>
    <path d="M161 116Q169 121 161 130L149 133" fill="none" stroke="#F1C54B" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="148" cy="133" r="3.2" fill="#F1C54B"/>
    <g fill="#875C4D" opacity=".6"><circle cx="91" cy="121" r="1.6"/><circle cx="97" cy="124" r="1.4"/><circle cx="146" cy="122" r="1.5"/></g>
    <rect x="87" y="190" width="18" height="22" rx="3" fill="#204D5A"/>
    <path d="M92 196h8M92 202h8" stroke="#F1C54B" strokeWidth="2"/>
  </g>;
}

function Beaver({ pose }: { pose:TeacherPose }) {
  return <g>
    <g className="p-character__tail">
      <ellipse cx="50" cy="207" rx="24" ry="51" transform="rotate(20 50 207)" fill="#8F563B"/>
      <path d="M37 177Q49 163 67 171L75 227Q59 244 42 231Z" fill="#B07B51"/>
    </g>
    <path d="M89 167Q120 145 151 167L161 235Q120 250 79 235Z" fill="#3676C9"/>
    <path d="M94 174L120 194L146 174L150 225L120 237L90 225Z" fill="#22558F"/>
    <path d="M104 181L120 198L136 181" fill="none" stroke="#F4C653" strokeWidth="5" strokeLinecap="round"/>
    <path d="M90 197h19v17H90ZM131 197h19v17h-19Z" fill="#E9B44B"/>
    <path d="M99 241L95 253Q107 259 116 253L119 240M128 240L131 253Q142 259 152 253L147 241" fill="#805039"/>
    <ellipse cx="104" cy="255" rx="15" ry="7" fill="#65402F"/><ellipse cx="143" cy="255" rx="15" ry="7" fill="#65402F"/>
    <GestureArms pose={pose} sleeve="#95603F" hand="#95603F"/>
    <ellipse cx="120" cy="101" rx="56" ry="56" fill="#966044"/>
    <circle cx="77" cy="64" r="13" fill="#865137"/><circle cx="163" cy="64" r="13" fill="#865137"/>
    <ellipse cx="120" cy="125" rx="39" ry="25" fill="#D5A276"/>
    <ellipse cx="99" cy="121" rx="20" ry="15" fill="#E0B78F"/><ellipse cx="141" cy="121" rx="20" ry="15" fill="#E0B78F"/>
    <path d="M86 75Q99 68 111 76M130 76Q142 68 154 75" fill="none" stroke="#6F4735" strokeWidth="4" strokeLinecap="round"/>
    <Eye x={99} y={91} rx={11} ry={14} iris="#382C2A" shape="sleepy" lidColor="#966044" pupilScale={.9}/>
    <Eye x={141} y={91} rx={11} ry={14} iris="#382C2A" shape="sleepy" lidColor="#966044" pupilScale={.9}/>
    <ellipse cx="120" cy="116" rx="9" ry="6" fill="#342927"/>
    <path d="M120 122Q116 132 108 132M120 122Q124 132 132 132" fill="none" stroke="#6B4637" strokeWidth="3"/>
    <rect x="108" y="137" width="11" height="18" rx="2" fill="#FFF4D6"/>
    <rect x="121" y="137" width="11" height="18" rx="2" fill="#FFF4D6"/>
    <path d="M104 164Q120 177 136 164" fill="none" stroke="#F4C653" strokeWidth="3"/>
  </g>;
}

function Axolotl({ pose }: { pose:TeacherPose }) {
  return <g>
    <ellipse cx="120" cy="262" rx="43" ry="7" fill="#2D2926" opacity=".13" stroke="none"/>
    <path d="M86 186Q64 170 58 146Q81 148 97 169M154 186Q176 170 182 146Q159 148 143 169" fill="#F2A0AD"/>
    <path d="M94 170Q120 152 146 170Q161 197 148 237Q120 250 92 237Q79 197 94 170Z" fill="#F0A0B1"/>
    <path d="M85 185Q120 207 155 185L148 224Q120 243 92 224Z" fill="#7854AE"/>
    <path d="M92 187Q120 203 148 187L143 200Q120 214 97 200Z" fill="#A987D0"/>
    <path d="M120 193L129 204L120 215L111 204Z" fill="#F6C950"/>
    <path d="M97 235Q88 246 93 255L111 255L115 238M125 238L129 255L147 255Q152 246 143 235" fill="#E48A9C"/>
    <ellipse cx="101" cy="255" rx="13" ry="7" fill="#D8788C"/><ellipse cx="139" cy="255" rx="13" ry="7" fill="#D8788C"/>
    {pose !== "shrug" && <path d="M92 188Q72 195 68 211M148 188Q168 195 172 211" fill="none" stroke="#E78FA1" strokeWidth="12" strokeLinecap="round"/>}
    <ellipse cx="120" cy="104" rx="52" ry="54" fill="#F5B4C1"/>
    <g className="p-character__gills">
      <path d="M76 87Q53 65 63 37Q83 44 92 69Q96 37 111 24Q123 44 119 68Q135 38 153 30Q160 55 140 83Z" fill="#E88198"/>
      <path d="M164 87Q187 65 177 37Q157 44 148 69Q144 37 129 24Q117 44 121 68Q105 38 87 30Q80 55 100 83Z" fill="#E88198"/>
    </g>
    <path d="M87 111Q120 127 153 111" fill="none" stroke="#E9A0AE" strokeWidth="6" strokeLinecap="round"/>
    <path d="M85 82Q98 72 111 82M129 82Q142 72 155 82" fill="none" stroke="#DE8FA0" strokeWidth="3.5" strokeLinecap="round"/>
    <Eye x={99} y={100} rx={13} ry={16} iris="#3F8191" shape="wide" pupilScale={.92} tilt={-2}/>
    <Eye x={141} y={100} rx={13} ry={16} iris="#3F8191" shape="wide" pupilScale={.92} tilt={2}/>
    <path d="M111 132Q120 139 129 132" fill="none" stroke="#9B5B70" strokeWidth="4" strokeLinecap="round"/>
    <path d="M91 143q5 3 10 0M139 143q5 3 10 0" fill="none" stroke="#E48A9C" strokeWidth="3" strokeLinecap="round"/>
    {pose === "shrug" && <g fill="none" stroke="#E78FA1" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"><path d="M92 190Q75 174 57 158"/><path d="M148 190Q165 174 183 158"/></g>}
    {pose === "shrug" && <g fill="#E78FA1"><path d="M51 153Q44 145 50 140Q55 136 60 143L65 154Q59 164 51 153Z"/><path d="M189 153Q196 145 190 140Q185 136 180 143L175 154Q181 164 189 153Z"/></g>}
    {pose === 'celebrating' && <path d="M60 132l-10 -12M180 132l10 -12" stroke="#F2A0AD" strokeWidth="4" strokeLinecap="round"/>}
  </g>;
}

function Cat({ pose }: { pose:TeacherPose }) {
  return <g>
    <path className="p-character__tail" d="M155 205Q197 211 186 241Q178 261 154 249Q142 242 158 230" fill="none" stroke="#25334B" strokeWidth="15" strokeLinecap="round"/>
    <path d="M95 166Q120 148 145 166L152 234Q120 248 88 234Z" fill="#26334F"/>
    <path d="M100 177L120 193L140 177L144 229L120 238L96 229Z" fill="#E7A82C"/>
    <path d="M91 185L109 198L100 216L87 204ZM149 185L131 198L140 216L153 204Z" fill="#F4E9D4"/>
    <path d="M100 235L97 253L116 253L120 237M128 237L132 253L151 253L147 235" fill="#25334B"/>
    <ellipse cx="105" cy="255" rx="14" ry="7" fill="#171E2D"/><ellipse cx="140" cy="255" rx="14" ry="7" fill="#171E2D"/>
    <GestureArms pose={pose} sleeve="#26334F" hand="#29364E"/>
    <path d="M72 88L79 35L111 63Q120 58 129 63L161 35L168 88Q172 133 145 150Q120 165 95 150Q68 133 72 88Z" fill="#303A57"/>
    <path d="M83 80L87 52L105 70M157 80L153 52L135 70" fill="#E7A4A2"/>
    <path d="M81 112Q93 95 120 101Q147 95 159 112Q151 148 120 150Q89 148 81 112Z" fill="#F0D9C8"/>
    <path d="M88 82Q101 74 113 81M128 81Q140 73 153 80" fill="none" stroke="#1F2A46" strokeWidth="4" strokeLinecap="round"/>
    <Eye x={101} y={100} rx={11} ry={13} iris="#7FB4B1" shape="slit" lidColor="#303A57" pupilScale={.9} tilt={-7}/>
    <Eye x={140} y={100} rx={11} ry={13} iris="#7FB4B1" shape="slit" lidColor="#303A57" pupilScale={.9} tilt={-7}/>
    <ellipse cx="120" cy="119" rx="5" ry="4" fill="#E58D9A"/>
    <path d="M120 123Q114 132 107 128M120 123Q126 132 133 128" fill="none" stroke="#704A4B" strokeWidth="3.3" strokeLinecap="round"/>
    <path d="M88 121L72 118M89 128L73 132M152 121L168 118M151 128L167 132" stroke="#F7EFE3" strokeWidth="2.4" strokeLinecap="round"/>
    <circle cx="120" cy="203" r="10" fill="#FFF4DF" stroke="#BD8527" strokeWidth="2"/>
    <path d="M114 203h12M120 197v12" stroke="#BD8527" strokeWidth="2"/>
    {pose === 'hand-on-chin' && <path d="M145 133q11 -6 9 8" stroke="#EEDCCB" strokeWidth="6" strokeLinecap="round"/>}
  </g>;
}

function Frog({ pose }: { pose:TeacherPose }) {
  return <g>
    <ellipse cx="120" cy="263" rx="48" ry="7" fill="#2D2926" opacity=".13" stroke="none"/>
    <path d="M94 232Q75 241 63 250Q62 261 81 257L109 245M146 232Q165 241 177 250Q178 261 159 257L131 245" fill="none" stroke="#5B9F59" strokeWidth="15" strokeLinecap="round"/>
    <path d="M81 251Q65 242 53 249Q49 260 65 265Q82 266 90 258M159 251Q175 242 187 249Q191 260 175 265Q158 266 150 258" fill="#7CBA63"/>
    <path d="M91 167Q120 148 149 167L158 235Q120 251 82 235Z" fill="#6AAE57"/>
    <path d="M91 182Q120 201 149 182L147 221Q120 238 93 221Z" fill="#2F8E6D"/>
    <path d="M98 174L120 196L142 174" fill="none" stroke="#B9DF79" strokeWidth="5" strokeLinecap="round"/>
    <path d="M111 198Q120 190 129 198L126 217H114Z" fill="#F2C34A"/>
    <GestureArms pose={pose} sleeve="#6AAE57" hand="#78B967"/>
    <ellipse cx="120" cy="107" rx="58" ry="51" fill="#83C466"/>
    <circle cx="87" cy="57" r="27" fill="#75B95B"/><circle cx="153" cy="57" r="27" fill="#75B95B"/>
    <path d="M72 35Q87 25 102 36M138 36Q153 25 168 35" fill="none" stroke="#4F9650" strokeWidth="4.2" strokeLinecap="round"/>
    <Eye x={87} y={56} rx={15} ry={18} iris="#2E5D50" shape="wide" pupilScale={1.04}/>
    <Eye x={153} y={56} rx={15} ry={18} iris="#2E5D50" shape="wide" pupilScale={1.04}/>
    <path d="M76 79Q87 70 98 79M142 79Q153 70 164 79" fill="none" stroke="#477D47" strokeWidth="4.5" strokeLinecap="round"/>
    <path d="M75 124Q120 166 165 124Q158 159 120 162Q82 159 75 124Z" fill="#30483C"/>
    <path d="M86 134Q120 153 154 134Q145 149 120 151Q95 149 86 134Z" fill="#F0A2A0"/>
    <circle cx="105" cy="111" r="3.5" fill="#4A8A53"/><circle cx="135" cy="111" r="3.5" fill="#4A8A53"/>
    <path d="M107 179l13 10l13-10" fill="none" stroke="#E2F0BD" strokeWidth="2.5"/>
    {pose === "celebrating" && <g fill="none" stroke="#5B9F59" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"><path d="M92 170Q65 136 43 81"/><path d="M148 170Q175 136 197 81"/></g>}
    {pose === "celebrating" && <g fill="#7CBA63"><path d="M36 82Q29 72 36 66Q43 61 49 69L55 80Q49 91 40 88Z"/><path d="M204 82Q211 72 204 66Q197 61 191 69L185 80Q191 91 200 88Z"/></g>}
  </g>;
}

function Armadillo() {
  return <g>
    <ellipse cx="123" cy="258" rx="77" ry="7" fill="#2D2926" opacity=".13" stroke="none"/>
    <path d="M64 191Q45 217 56 243Q68 252 82 236L88 208M103 207Q95 230 101 250Q113 257 122 244L126 212M145 207Q150 230 145 250Q133 257 126 244L122 212M174 191Q194 218 185 243Q173 252 158 236L153 208" fill="#8C715D"/>
    <path d="M50 174Q47 129 105 120Q157 112 188 150L185 211Q119 246 61 211Z" fill="#A68A70"/>
    <path d="M63 166Q78 119 123 119Q165 119 179 164Q174 208 121 221Q71 208 63 166Z" fill="#B79A7C"/>
    <path d="M76 140Q119 113 166 140M67 159Q118 132 177 159M67 179Q119 153 177 179M76 198Q120 178 167 198" fill="none" stroke="#80654F" strokeWidth="7" strokeLinecap="round"/>
    <path d="M86 143Q119 125 153 143M76 162Q119 143 165 162M78 182Q119 166 164 182" fill="none" stroke="#D6B99A" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M164 156Q188 137 214 151L222 170Q208 187 175 184Z" fill="#B68D6D"/>
    <path d="M195 151Q211 142 222 157L219 169Q204 177 190 168Z" fill="#D8AE8A"/>
    <Eye x={186} y={146} rx={7} ry={9} iris="#4C3A31" shape="tiny" pupilScale={.8}/>
    <ellipse cx="219" cy="160" rx="5.5" ry="4" fill="#3A302B"/>
    <path d="M188 174Q199 182 208 174" fill="none" stroke="#725642" strokeWidth="3" strokeLinecap="round"/>
    <path d="M99 191Q126 210 151 193" fill="none" stroke="#EAB44E" strokeWidth="5" strokeLinecap="round"/>
    <rect x="111" y="184" width="36" height="22" rx="5" fill="#E7A53B"/>
    <path d="M119 191h20M119 197h13" stroke="#664A3E" strokeWidth="2.4" strokeLinecap="round"/>
    <path d="M53 230l-5 8M65 238l-1 9M78 236l3 9M101 243l-2 9M115 245v9M145 243l2 9M158 236l-3 9M174 238l1 9M187 230l5 8" stroke="#E6D1B5" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M175 126Q190 115 204 127" fill="none" stroke="#80654F" strokeWidth="3"/>
  </g>;
}

function Turtle({ pose }: { pose:TeacherPose }) {
  return <g>
    <ellipse cx="120" cy="258" rx="75" ry="7" fill="#2D2926" opacity=".13" stroke="none"/>
    <path d="M67 188Q48 202 48 232Q58 247 75 230L92 205M108 207Q99 231 105 250Q118 259 128 244L128 207M143 207Q151 231 145 250Q132 259 122 244L122 207M172 188Q193 202 192 232Q181 247 164 230L148 205" fill="#6E9F67"/>
    <path d="M48 160Q53 112 120 111Q187 112 192 160Q188 221 120 228Q52 221 48 160Z" fill="#91613D"/>
    <path d="M66 159Q74 128 120 127Q166 128 174 159Q171 196 120 208Q69 196 66 159Z" fill="#B77B4A"/>
    <path d="M120 128L120 208M78 151L120 171L162 151M74 181L120 171L166 181" fill="none" stroke="#E4BE76" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M167 139Q181 115 208 124Q226 131 220 157Q214 180 188 178Q166 176 157 159Z" fill="#7CA967"/>
    <path d="M177 147Q190 136 207 145" fill="none" stroke="#9EC883" strokeWidth="5" strokeLinecap="round"/>
    <path d="M180 124Q190 118 198 124M204 126Q213 120 220 127" fill="none" stroke="#5F8F5A" strokeWidth="2.8" strokeLinecap="round"/>
    <Eye x={188} y={137} rx={8} ry={10} iris="#476D51" shape="sleepy" lidColor="#7CA967" pupilScale={.86}/>
    <Eye x={211} y={140} rx={7} ry={9} iris="#476D51" shape="sleepy" lidColor="#7CA967" pupilScale={.86}/>
    <path d="M194 159Q205 166 214 158" fill="none" stroke="#4C6C4A" strokeWidth="3" strokeLinecap="round"/>
    <path d="M155 170Q174 179 188 169L185 188Q169 197 154 186Z" fill="#2E997A"/>
    <path d="M162 178Q174 184 184 177" fill="none" stroke="#BDE0A1" strokeWidth="3"/>
    <circle cx="173" cy="185" r="5" fill="#E9C15B"/>
    <path d="M69 190Q57 177 53 158" fill="none" stroke="#5F8F5A" strokeWidth="12" strokeLinecap="round"/>
    {pose === 'greeting' && <path d="M54 162Q38 144 43 127" fill="none" stroke="#6E9F67" strokeWidth="13" strokeLinecap="round"/>}
    <path d="M47 230l-5 6M61 237l-2 7M75 226l3 8M104 245l-2 8M119 245v9M144 245l2 8M166 226l-3 8M180 237l2 7M193 230l5 6" stroke="#D1E2A6" strokeWidth="2.3" strokeLinecap="round"/>
  </g>;
}

function Beatriz({ pose }: { pose:TeacherPose }) {
  return <g>
    <ellipse cx="120" cy="263" rx="43" ry="7" fill="#2D2926" opacity=".13" stroke="none"/>
    <path d="M103 230L99 252L117 252L122 231M131 231L136 252L154 252L149 230" fill="#39354B"/>
    <path d="M94 249h26v10H91Q88 254 94 249ZM135 249h26Q164 256 157 259H134Z" fill="#A98A73"/>
    <path d="M85 160Q120 144 155 160L167 232Q120 246 73 232Z" fill="#76539B"/>
    <path d="M96 161L120 185L144 161L135 229H105Z" fill="#F4E6D5"/>
    <path d="M120 183L132 196L120 210L108 196Z" fill="#C68B43"/>
    <path d="M85 173L103 182L96 215L78 208ZM155 173L137 182L144 215L162 208Z" fill="#8D69AE"/>
    <GestureArms pose={pose} sleeve="#76539B" hand="#E8C0A3"/>
    <path d="M76 83Q79 38 120 36Q161 37 164 83L158 127Q148 151 120 153Q92 151 82 127Z" fill="#E9C3A5"/>
    <path d="M77 92Q67 50 101 35Q128 22 151 39Q174 55 161 91L148 81L139 57Q116 71 98 62Q90 80 77 92Z" fill="#4A3028"/>
    <path d="M74 84L70 64L85 67M165 84L170 64L155 67" fill="#4A3028"/>
    <Eye x={101} y={97} rx={9} ry={12} iris="#3B3A44" shape="almond" lidColor="#E9C3A5" pupilScale={.9}/>
    <Eye x={140} y={97} rx={9} ry={12} iris="#3B3A44" shape="almond" lidColor="#E9C3A5" pupilScale={.9}/>
    <path d="M88 79L111 78M129 78L152 79" stroke="#4A3028" strokeWidth="4.5" strokeLinecap="round"/>
    <rect x="86" y="89" width="29" height="23" rx="8" fill="none" stroke="#65506D" strokeWidth="2.5"/>
    <rect x="126" y="89" width="29" height="23" rx="8" fill="none" stroke="#65506D" strokeWidth="2.5"/>
    <path d="M115 99h11" stroke="#65506D" strokeWidth="2.5"/>
    <path d="M116 116l4 4l4-4" fill="none" stroke="#B08069" strokeWidth="3" strokeLinecap="round"/>
    <path d="M108 132Q120 128 132 132" fill="none" stroke="#87544E" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="77" cy="117" r="3.2" fill="#C68B43"/>
    <circle cx="163" cy="117" r="3.2" fill="#C68B43"/>
    <path d="M146 190l15 15M94 190l-15 15" stroke="#F2D9C5" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M158 208l-7 13" stroke="#D8B85B" strokeWidth="4" strokeLinecap="round"/>
  </g>;
}

function Parrot({ pose }: { pose:TeacherPose }) {
  return <g>
    <ellipse cx="120" cy="263" rx="43" ry="7" fill="#2D2926" opacity=".13" stroke="none"/>
    <path d="M103 224L99 248M137 224L141 248" stroke="#8B5E37" strokeWidth="7" strokeLinecap="round"/>
    <path d="M99 247q-13 7 -18 1M100 248q0 11 7 12M141 248q13 7 18 1M140 248q0 11 -7 12" fill="none" stroke="#8B5E37" strokeWidth="4" strokeLinecap="round"/>
    <path d="M93 151Q120 131 147 151Q162 186 145 229Q120 246 95 229Q78 186 93 151Z" fill="#E65C47"/>
    <g className="p-character__wings">
      <path d="M92 178Q65 191 71 224Q88 217 105 192" fill="#2C9D7C"/>
      <path d={pose === "one-hand-on-hip" ? "M148 178Q174 168 183 185Q187 201 165 209Q151 204 135 192Z" : "M148 178Q175 191 169 224Q152 217 135 192"} fill="#2C9D7C"/>
    </g>
    <path d="M76 205L89 193L98 213M164 205L151 193L142 213" fill="none" stroke="#F3C64F" strokeWidth="5" strokeLinecap="round"/>
    <path d="M111 223L120 251L129 223" fill="#EFBF45"/>
    <path d="M105 160Q120 177 135 160L132 185Q120 194 108 185Z" fill="#2B9D7C"/>
    <path d="M88 88Q84 39 120 34Q159 37 154 90Q150 135 120 144Q90 135 88 88Z" fill="#E66A4F"/>
    <path d="M103 45L95 23L114 36L123 15L133 37L152 27L144 51Z" fill="#F1B844"/>
    <path d="M79 86Q88 69 103 79L119 96L109 111L90 105Z" fill="#F7C64B"/>
    <Eye x={99} y={82} rx={12} ry={15} iris="#2B5D50" shape="almond" lidColor="#E66A4F" pupilScale={1.02} tilt={-3}/>
    <path d="M128 82Q154 70 156 95Q155 113 134 115Q122 102 128 82Z" fill="#F1C14A"/>
    <path d="M135 96Q159 91 148 119Q141 134 128 125Q135 115 135 96Z" fill="#E5A33B"/>
    <path d="M146 114Q139 136 121 139Q109 137 108 128Q126 125 132 113Z" fill="#D97731"/>
    <path d="M104 119Q120 133 136 119" fill="none" stroke="#974B3E" strokeWidth="3"/>
    <path d="M86 153Q120 174 154 153" fill="none" stroke="#F1C64A" strokeWidth="5" strokeLinecap="round"/>
    <path d="M91 162l29 15l29-15" fill="none" stroke="#FFF0C7" strokeWidth="3" strokeLinecap="round"/>
    <path d="M101 175Q120 189 139 175" fill="none" stroke="#277C68" strokeWidth="3"/>
    {pose === 'celebrating' && <path d="M70 145l-10-12M170 145l10-12" stroke="#F1C64A" strokeWidth="4" strokeLinecap="round"/>}
  </g>;
}

function Helena({ pose }: { pose:TeacherPose }) {
  return <g>
    <ellipse cx="120" cy="263" rx="44" ry="7" fill="#2D2926" opacity=".13" stroke="none"/>
    <path d="M100 229L96 252L116 252L120 230M130 230L134 252L154 252L149 229" fill="#36505A"/>
    <path d="M93 249h27v10H89Q86 254 93 249ZM135 249h27Q165 256 157 259H134Z" fill="#D6B15A"/>
    <path d="M88 156Q120 137 152 156L170 238Q120 255 70 238Z" fill="#247F90"/>
    <path d="M99 169Q120 185 141 169L138 228Q120 239 102 228Z" fill="#3198A0"/>
    <path d="M91 183Q120 205 149 183M89 198Q120 220 151 198M96 216Q120 230 144 216" fill="none" stroke="#E7BE63" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M110 168L120 181L130 168" fill="none" stroke="#F0D89A" strokeWidth="4" strokeLinecap="round"/>
    <GestureArms pose={pose} sleeve="#247F90" hand="#D29B79"/>
    <path d="M67 87Q63 39 119 31Q176 38 173 91L168 183Q164 197 150 190L151 92Q139 61 120 61Q96 61 88 93L90 190Q77 197 67 183Z" fill="#241F28"/>
    <path d="M73 80Q85 55 98 52M91 67Q101 50 109 48M148 50Q163 62 168 81" fill="none" stroke="#44313A" strokeWidth="7" strokeLinecap="round"/>
    <g fill="none" stroke="#241F28" strokeWidth="6" strokeLinecap="round">
      <path d="M76 75Q68 96 76 119Q71 143 79 169"/>
      <path d="M88 63Q81 89 89 113Q83 139 91 161"/>
      <path d="M151 61Q160 88 151 113Q157 139 149 164"/>
      <path d="M164 77Q172 100 163 122Q170 146 161 170"/>
    </g>
    <g fill="#D6B15A"><circle cx="79" cy="170" r="4"/><circle cx="91" cy="162" r="3.2"/><circle cx="149" cy="165" r="3.2"/><circle cx="161" cy="171" r="4"/></g>
    <path d="M80 86Q80 41 120 41Q161 41 160 86Q159 136 120 148Q81 136 80 86Z" fill="#D6A17C"/>
    <Eye x={100} y={92} rx={10} ry={14} iris="#382D2E" shape="round" pupilScale={1.06} tilt={-1}/>
    <Eye x={140} y={92} rx={10} ry={14} iris="#382D2E" shape="round" pupilScale={1.06} tilt={1}/>
    <path d="M87 76Q100 68 112 76M129 76Q141 68 153 76" fill="none" stroke="#211B22" strokeWidth="4" strokeLinecap="round"/>
    <path d="M117 111q3 6 7 0" fill="none" stroke="#996B58" strokeWidth="3" strokeLinecap="round"/>
    <path d="M105 126Q120 143 135 126Q131 145 120 145Q109 145 105 126Z" fill="#6D3F43"/>
    <path d="M110 130Q120 136 130 130" stroke="#FFF1DB" strokeWidth="2.5" fill="none"/>
    <path d="M68 136Q55 169 69 191M171 136Q185 169 171 191" fill="none" stroke="#241F28" strokeWidth="8" strokeLinecap="round"/>
  </g>;
}

function Augusto({ pose }: { pose:TeacherPose }) {
  return <g>
    <ellipse cx="120" cy="263" rx="43" ry="7" fill="#2D2926" opacity=".13" stroke="none"/>
    <path d="M101 229L98 252L117 252L121 230M132 230L136 252L155 252L150 229" fill="#49434B"/>
    <path d="M94 249h26v10H90Q87 254 94 249ZM137 249h26Q166 256 159 259H136Z" fill="#886B55"/>
    <path d="M81 159Q120 137 159 159L172 233Q120 251 68 233Z" fill="#247D91"/>
    <path d="M98 162L120 188L142 162L132 231H108Z" fill="#EDE3D5"/>
    <path d="M120 185L129 196L120 210L111 196Z" fill="#B77D43"/>
    <path d="M91 174L106 183L98 213L83 207M149 174L134 183L142 213L157 207" fill="#1E6578"/>
    <GestureArms pose={pose} sleeve="#247D91" hand="#B77D5D"/>
    <rect x="139" y="186" width="31" height="34" rx="4" fill="#8D6245"/>
    <rect x="143" y="190" width="23" height="26" rx="2" fill="#F3E6CD"/>
    <path d="M148 196h14M148 202h14M148 208h9" stroke="#8D6245" strokeWidth="2"/>
    <path d="M80 88Q78 36 120 34Q163 34 160 88Q157 139 120 149Q83 139 80 88Z" fill="#B77D5D"/>
    <path d="M77 81Q71 44 95 34Q107 15 123 26Q144 11 156 39Q171 49 163 85L151 70Q147 55 135 54Q120 67 103 55Q91 67 88 85Z" fill="#D2C8B7"/>
    <g fill="#D2C8B7" stroke={O} strokeWidth="2">
      <circle cx="86" cy="48" r="12"/><circle cx="105" cy="31" r="13"/><circle cx="126" cy="28" r="12"/><circle cx="147" cy="39" r="13"/><circle cx="157" cy="58" r="11"/>
    </g>
    <path d="M88 78Q101 71 113 78M128 78Q140 71 152 78" fill="none" stroke="#8F6B59" strokeWidth="3.5" strokeLinecap="round"/>
    <Eye x={101} y={95} rx={10} ry={13} iris="#3C3734" shape="sleepy" lidColor="#B77D5D" pupilScale={.86}/>
    <Eye x={140} y={95} rx={10} ry={13} iris="#3C3734" shape="sleepy" lidColor="#B77D5D" pupilScale={.86}/>
    <circle cx="101" cy="95" r="17" fill="none" stroke="#665B54" strokeWidth="2.5"/>
    <circle cx="140" cy="95" r="17" fill="none" stroke="#665B54" strokeWidth="2.5"/>
    <path d="M118 95h5" stroke="#665B54" strokeWidth="2.5"/>
    <path d="M113 115l7 4l7-4" fill="none" stroke="#865D4E" strokeWidth="3" strokeLinecap="round"/>
    <path d="M103 131Q120 141 137 131Q132 149 120 149Q108 149 103 131Z" fill="#6A4441"/>
    <path d="M110 132Q120 136 130 132" stroke="#F2E4D3" strokeWidth="2.5" fill="none"/>
    <path d="M111 121Q120 126 129 121" fill="none" stroke="#5B4036" strokeWidth="4" strokeLinecap="round"/>
    <path d="M89 117Q84 121 83 128M151 117Q156 121 157 128" fill="none" stroke="#875D50" strokeWidth="2" strokeLinecap="round" opacity=".65"/>
    <path d="M102 146Q120 153 138 146" fill="none" stroke="#875D50" strokeWidth="2" strokeLinecap="round" opacity=".45"/>
  </g>;
}

function Chameleon({ pose }: { pose:TeacherPose }) {
  return <g>
    <ellipse cx="120" cy="258" rx="80" ry="7" fill="#2D2926" opacity=".13" stroke="none"/>
    <path d="M64 191Q30 173 39 211Q48 239 75 221Q91 210 73 201Q62 194 55 207" fill="none" stroke="#6AAE55" strokeWidth="17" strokeLinecap="round"/>
    <path d="M81 173Q122 146 163 168Q185 182 176 214Q145 237 94 218Q71 206 81 173Z" fill="#86C75D"/>
    <path d="M90 181Q121 198 166 180L162 211Q120 229 91 211Z" fill="#3A956C"/>
    <path d="M93 184L121 202L150 184" fill="none" stroke="#DDA83C" strokeWidth="7" strokeLinecap="round"/>
    <rect x="114" y="194" width="34" height="22" rx="6" fill="#DDA83C"/>
    <circle cx="131" cy="205" r="6" fill="#2E6770"/>
    <path d="M88 211Q76 225 83 247L99 249L108 222M130 220L137 248L153 250Q161 231 148 214" fill="#67A951" stroke={O} strokeWidth="3"/>
    <path d="M85 247l-11 7M91 248v9M99 246l7 8M139 247l-7 8M147 248v9M155 247l11 7" stroke="#D8E6A1" strokeWidth="3" strokeLinecap="round"/>
    <path d="M154 176Q177 145 198 151Q216 158 224 176L210 194Q188 200 165 190Z" fill="#84C65E"/>
    <path d="M184 167Q208 166 223 179" fill="none" stroke="#A7D978" strokeWidth="5" strokeLinecap="round"/>
    <g className="p-character__eye-stalks">
      <path d="M154 158Q160 124 158 105M194 152Q210 120 211 99" fill="none" stroke="#4C9855" strokeWidth="8" strokeLinecap="round"/>
      <Eye x={158} y={93} rx={15} ry={17} iris="#365E50" shape="wide" pupilScale={.86} tilt={-4}/>
      <Eye x={212} y={87} rx={14} ry={16} iris="#365E50" shape="wide" pupilScale={.86} tilt={4}/>
    </g>
    <path d="M202 193Q214 199 220 189" fill="none" stroke="#426B45" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M157 199Q172 210 187 199" fill="none" stroke="#B5E27B" strokeWidth="4" strokeLinecap="round"/>
    {pose === 'one-hand-up' || pose === 'greeting' ? <path d="M89 194Q66 181 63 161" fill="none" stroke="#6AAE55" strokeWidth="12" strokeLinecap="round"/> : null}
  </g>;
}

function CharacterArt({ id, pose }: { id:string; pose:TeacherPose }) {
  switch (id) {
    case 'prof.clara': return <Capybara pose={pose}/>;
    case 'prof.lia': return <Lia pose={pose}/>;
    case 'prof.davi': return <Beaver pose={pose}/>;
    case 'prof.iara': return <Axolotl pose={pose}/>;
    case 'prof.nina': return <Cat pose={pose}/>;
    case 'prof.ravi': return <Frog pose={pose}/>;
    case 'prof.mateus': return <Armadillo/>;
    case 'prof.marina': return <Turtle pose={pose}/>;
    case 'prof.beatriz': return <Beatriz pose={pose}/>;
    case 'prof.sofia': return <Parrot pose={pose}/>;
    case 'prof.helena': return <Helena pose={pose}/>;
    case 'prof.augusto': return <Augusto pose={pose}/>;
    case 'prof.caio': return <Chameleon pose={pose}/>;
    default: return <Lia pose={pose}/>;
  }
}

export function TeacherCharacter({
  teacher, pose, size = 160, className = '', portrait = false,
}: {
  teacher:FictionalTeacher; pose?:TeacherPose; size?:number; className?:string; portrait?:boolean;
}) {
  const meta = META[teacher.id] ?? META['prof.lia'];
  const characterPose = pose ?? TEACHER_SIGNATURE_POSES[teacher.id] ?? 'presenting';
  const characterMotion = teacher.id.replace('prof.', '');
  const style:CSSProperties = portrait ? { width:size, height:size } : { width:Math.round(size * .9), height:size };
  return (
    <svg
      viewBox={portrait ? '12 18 216 216' : '0 0 240 280'}
      width={style.width} height={style.height}
      className={'shrink-0 ' + (portrait ? 'rounded-full overflow-hidden ' : 'overflow-visible ') + className}
      style={style} role="img" aria-label={teacher.name + ', personagem original do Pórtico'}
      data-character-style="portico-friends-v18"
      data-character-motion={characterMotion}
      data-character-species={meta.species} data-character-outfit={meta.outfit}
      data-character-body={meta.body} data-character-lower={meta.lower}
      data-character-hair={meta.hair} data-character-eyes={meta.eyes} data-character-eye-shape={meta.eyeShape}
      data-character-eye-treatment={meta.species + '-eyes'}
      data-character-mouth={meta.mouth} data-character-nose={meta.nose}
      data-character-brows={meta.brows} data-character-spacing={meta.spacing}
      data-character-anatomy={meta.species === 'human' ? 'human' : 'species-specific'}
      data-character-limbs={meta.limbs} data-character-pose={characterPose}
      focusable="false" preserveAspectRatio="xMidYMax meet"
    >
      {portrait && <circle cx="120" cy="120" r="106" fill={'rgb(var(--' + teacher.tone + '))'}/>}
      {!portrait && <ellipse cx="120" cy="265" rx="78" ry="5" fill="#2D2926" opacity=".06" stroke="none"/>}
      <g className={'p-character__art p-character__art--' + characterMotion}>
        {CharacterArt({ id:teacher.id, pose:characterPose })}
      </g>
    </svg>
  );
}

export function TeacherScene({
  teacher, pose, size = 174, eyebrow = 'AULA COM SEU PROFESSOR', heading, message, className = '',
}: {
  teacher:FictionalTeacher; pose?:TeacherPose; size?:number; eyebrow?:string;
  heading:string; message:ReactNode; className?:string;
}) {
  return (
    <section className={'teacher-scene ' + className} style={{ '--teacher-tone':'rgb(var(--' + teacher.tone + '))' } as CSSProperties}
      aria-label={teacher.name + ' explicando: ' + heading}>
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
  teacher:FictionalTeacher; pose?:TeacherPose; size?:number; children:ReactNode;
  compact?:boolean; className?:string;
}) {
  return (
    <div className={'teacher-cue flex items-center gap-2.5 rounded-2xl border px-3 py-2 ' + (compact ? 'min-h-[4.5rem]' : 'min-h-[6rem]') + ' ' + className}
      style={{ borderColor:'rgb(var(--' + teacher.tone + ') / .28)', backgroundColor:'rgb(var(--' + teacher.tone + ') / .07)' }}
      aria-label={'Professor ' + teacher.name}>
      <TeacherCharacter teacher={teacher} pose={pose} size={size} portrait/>
      <div className="min-w-0 flex-1">
        <p className="text-[.68rem] font-bold uppercase tracking-[.11em] text-muted">{teacher.name} · {teacher.expertiseLabel}</p>
        <div className="mt-1 text-sm leading-snug text-ink">{children}</div>
      </div>
    </div>
  );
}
