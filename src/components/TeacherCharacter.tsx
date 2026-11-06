import type { CSSProperties, ReactNode } from 'react';
import type { FictionalTeacher } from '@/content/teachers';

/**
 * Direção de arte Pórtico V18 — personagens humanos originais.
 *
 * A silhueta é desenhada para cada docente, não montada por combinação de
 * partes padronizadas. A família compartilha apenas a linguagem visual:
 * vetor chapado, curvas orgânicas, cor expressiva, poucos detalhes e leitura
 * clara em tamanhos pequenos. Nenhum desenho ou personagem do Duolingo é
 * reproduzido.
 */
export type TeacherPose =
  | 'greeting' | 'presenting' | 'thinking' | 'celebrating' | 'listening'
  | 'hands-on-hips' | 'arms-down' | 'shrug' | 'arms-crossed'
  | 'hand-on-chin' | 'hands-forward' | 'one-hand-on-hip' | 'pointing' | 'one-hand-up';


/**
 * V18 — rostos e expressões individualizados sobre as silhuetas já aprovadas.
 * A forma-base é compartilhada entre a prancha monocromática e a versão colorida.
 * Esta prancha é o teste de verdade: se a pessoa não se distingue em preto,
 * a silhueta ainda não está resolvida.
 */
type SilhouetteParts = {
  skin: string; hairColor: string; topColor: string; bottomColor: string; shoeColor: string; propColor?: string;
  head: string; hair: string; neck: string; body: string; arms: string[]; lower: string; shoes: string; props?: string[];
};
const SILHOUETTES: Record<string, SilhouetteParts> = {
  'prof.clara': {
    skin:'#B97050', hairColor:'#38251F', topColor:'#EE684F', bottomColor:'#D99A42', shoeColor:'#31576A',
    head:'M94 59Q99 36 121 35Q145 35 151 59L148 101Q142 122 121 124Q99 122 93 101Z',
    hair:'M91 82Q74 76 75 57Q70 40 90 31Q89 14 109 22Q121 9 135 22Q154 14 162 33Q179 40 168 62Q171 79 153 88L147 65Q130 77 109 68Q97 67 91 82Z M77 47Q65 35 77 24Q91 16 99 29L97 47Z M155 40Q167 26 178 37Q187 50 172 61Z',
    neck:'M106 119L136 119L143 145L120 157L97 145Z',
    body:'M82 141Q96 130 108 139L120 152L132 139Q145 130 159 141L164 177Q148 190 140 193L152 216Q120 232 88 216L100 193Q92 190 76 177Z',
    arms:['M86 146Q75 145 68 157L53 178Q50 187 61 191L72 182L91 164Z','M154 145Q168 145 174 157L168 171L151 181L145 171L157 160Z'],
    lower:'M91 188Q120 202 149 188L170 250Q120 260 70 250Z M101 243L99 260Q108 265 117 260L120 245 M129 245L135 260Q144 265 153 260L139 243',
    shoes:'M96 255Q108 251 119 257L118 265Q105 270 91 264ZM136 257Q148 251 158 256L162 264Q147 270 133 265Z',
  },
  'prof.lia': {
    skin:'#8C543E', hairColor:'#3D2922', topColor:'#087F7C', bottomColor:'#253A48', shoeColor:'#F0B95C',
    head:'M97 52Q104 38 122 38Q143 38 150 55L148 101Q141 121 121 124Q101 121 94 101Z',
    hair:'M91 68Q82 49 95 33Q106 20 125 24Q153 25 159 49Q164 67 151 79L147 62Q128 49 104 65L99 82Z M110 28Q104 8 122 8Q144 8 142 28Q135 41 120 41Q112 39 110 28Z',
    neck:'M108 119L135 119L141 145L120 155L99 145Z',
    body:'M94 137Q120 128 146 137L153 211Q120 225 87 211Z',
    arms:['M96 145Q79 148 75 166L91 184Q102 185 107 173L111 158Z','M144 145Q161 148 165 166L149 184Q138 185 133 173L129 158Z'],
    lower:'M94 205Q120 216 146 205L144 248L128 251L120 225L112 251L96 248Z',
    shoes:'M97 247Q109 245 119 251L119 263Q105 267 94 260ZM130 251Q142 245 153 248L158 260Q146 267 133 263Z',
  },
  'prof.davi': {
    skin:'#663F30', hairColor:'#4A2D23', topColor:'#3673B1', bottomColor:'#244B69', shoeColor:'#E9D4B3',
    head:'M82 61Q88 36 120 35Q153 35 160 62L155 105Q146 130 120 132Q92 130 84 105Z',
    hair:'M79 69Q69 45 87 31Q102 19 119 25Q138 16 154 32Q172 43 164 70L153 79Q137 66 120 68Q98 65 86 82Z',
    neck:'M99 121L141 121L151 151L120 166L89 151Z',
    body:'M54 143Q74 124 102 132L120 154L138 132Q166 124 186 143L202 207Q163 230 120 230Q77 230 38 207Z',
    arms:['M58 150Q40 155 31 176L29 195Q32 208 47 205L68 190L82 164Z','M182 150Q200 155 209 176L211 195Q208 208 193 205L172 190L158 164Z'],
    lower:'M74 210Q120 229 166 210L164 250Q145 259 126 255L120 228L114 255Q95 259 76 250Z',
    shoes:'M76 248Q96 244 115 253L115 265Q94 271 72 263ZM128 253Q147 244 167 248L174 263Q152 271 129 265Z',
  },
  'prof.iara': {
    skin:'#A7684B', hairColor:'#38241F', topColor:'#7650A2', bottomColor:'#315C56', shoeColor:'#E0AD62',
    head:'M97 57Q104 37 122 37Q144 38 150 58L147 100Q140 121 121 123Q101 121 95 100Z',
    hair:'M94 70Q84 44 105 27Q126 14 145 32Q160 45 153 70Q139 63 128 67Q110 71 99 85Z M91 63Q79 75 82 104L87 133Q92 139 99 131L102 83Z M143 62Q157 69 156 92L149 121L140 114Z M143 104Q157 113 154 133L161 157Q165 170 155 174Q144 176 140 164L130 140L135 119Z',
    neck:'M105 118L137 118L144 145L120 157L96 145Z',
    body:'M87 141Q102 130 111 139L120 153L131 139Q144 130 158 141L167 203Q150 224 120 228Q90 224 73 203Z',
    arms:['M88 146Q74 140 68 125L62 107Q59 96 50 100Q42 105 48 119L58 150L81 168Z','M155 146Q169 157 166 178L159 193Q151 197 145 188L146 164Z'],
    lower:'M91 211Q120 227 149 211L158 251Q120 259 82 251Z M106 246L104 261Q113 266 119 261L120 249 M130 249L136 261Q145 266 153 261L137 246',
    shoes:'M99 257Q110 253 120 259L119 266Q106 270 94 265ZM133 259Q145 253 155 257L160 265Q147 270 132 266Z',
  },
  'prof.nina': {
    skin:'#F0C7A9', hairColor:'#31324A', topColor:'#F4EDE2', bottomColor:'#3B415B', shoeColor:'#E9C66D',
    head:'M96 55Q105 39 121 40Q141 40 148 57L145 100Q138 119 120 121Q101 119 95 100Z',
    hair:'M79 78Q69 49 88 30Q103 17 122 22Q149 18 164 42Q176 61 164 91L157 126Q152 139 142 128L148 86Q139 68 120 68Q100 68 91 88L97 128Q87 139 79 126Z',
    neck:'M105 118L136 118L143 143L120 155L97 143Z',
    body:'M88 142L106 133L120 155L134 133L152 142L169 214Q120 231 71 214Z',
    arms:['M91 151Q76 160 72 184L83 202Q95 203 101 189L104 166Z','M149 151Q164 160 168 184L157 202Q145 203 139 189L136 166Z'],
    lower:'M91 208Q120 220 149 208L144 249L128 251L120 225L112 251L96 249Z',
    shoes:'M96 248Q108 245 120 252L119 263Q105 267 93 261ZM130 252Q142 245 154 248L160 261Q147 268 132 263Z',
  },
  'prof.ravi': {
    skin:'#B87956', hairColor:'#29231F', topColor:'#2D8C5D', bottomColor:'#273E4A', shoeColor:'#E6B84E',
    head:'M98 57Q105 38 122 38Q143 38 150 58L147 99Q140 120 121 122Q102 120 96 99Z',
    hair:'M91 69Q80 49 96 33Q108 22 121 27Q136 20 150 34Q162 48 153 69L145 78Q132 64 120 66Q104 64 95 81Z',
    neck:'M107 117L136 117L143 142L120 154L97 142Z',
    body:'M80 141Q97 129 109 138L120 151L131 138Q145 129 160 141L170 201Q120 222 70 201Z',
    arms:['M84 146Q71 141 66 126L61 109Q57 98 49 103Q42 108 48 121L59 151L78 168Z','M156 145Q170 145 178 159L185 177Q188 188 177 193L163 181L146 162Z'],
    lower:'M91 202Q120 216 149 202L153 248Q137 256 125 251L120 224L113 251Q99 256 84 248Z',
    shoes:'M87 245Q102 241 116 250L117 264Q99 269 82 260ZM125 250Q140 241 155 245L161 260Q145 269 126 264Z',
  },
  'prof.mateus': {
    skin:'#E5B993', hairColor:'#513A2F', topColor:'#D66C37', bottomColor:'#364F5E', shoeColor:'#E9C36B',
    head:'M91 56Q98 32 121 32Q147 32 154 58L151 102Q143 127 121 129Q98 127 91 102Z',
    hair:'M84 69Q77 45 97 28Q112 17 128 23Q148 22 159 43Q166 59 156 76L148 84Q139 65 121 66Q101 63 91 83Z',
    neck:'M106 122L137 122L143 145L120 157L97 145Z',
    body:'M78 143Q94 129 120 136Q146 129 162 143Q188 168 185 203Q183 230 120 237Q57 230 55 203Q52 168 78 143Z',
    arms:['M80 151Q67 159 68 178L83 194Q96 194 103 183L111 169L99 153Z','M160 151Q173 159 172 178L157 194Q144 194 137 183L129 169L141 153Z'],
    lower:'M79 216Q120 236 161 216L153 251Q137 257 126 251L120 230L114 251Q103 257 87 251Z',
    shoes:'M88 248Q103 244 118 253L118 265Q101 270 84 263ZM126 253Q141 244 156 248L161 263Q144 270 127 265Z',
  },
  'prof.marina': {
    skin:'#995E46', hairColor:'#241F25', topColor:'#24866D', bottomColor:'#33485A', shoeColor:'#E7BE6C',
    head:'M94 55Q103 37 121 37Q145 37 152 57L149 100Q142 121 120 124Q98 121 91 100Z',
    hair:'M82 72Q72 40 100 24Q124 10 149 28Q171 42 164 78Q174 99 160 126L151 132L150 77Q137 63 121 66Q99 62 87 86L91 132L80 126Q66 99 82 72Z',
    neck:'M104 119L139 119L145 143L120 155L96 143Z',
    body:'M83 142Q101 127 120 140Q139 127 157 142L176 215Q120 241 64 215Z',
    arms:['M84 150Q69 164 72 188L87 201Q100 199 100 184L96 160Z','M156 150Q171 164 168 188L153 201Q140 199 140 184L144 160Z'],
    lower:'M70 207Q120 228 170 207L164 239Q120 255 76 239Z',
    shoes:'M95 239Q108 237 120 246L119 261Q104 266 91 258ZM131 246Q143 237 156 239L161 258Q146 266 132 261Z',
  },
  'prof.beatriz': {
    skin:'#C58D6B', hairColor:'#4B3029', topColor:'#76509B', bottomColor:'#34394E', shoeColor:'#E8C16A',
    head:'M100 47Q108 29 122 29Q141 30 148 48L145 102Q139 123 120 125Q101 123 95 102Z',
    hair:'M89 59Q83 35 103 23Q125 10 146 28Q160 42 153 66L145 78Q132 58 118 62Q101 62 91 80Z',
    neck:'M106 120L137 120L144 145L120 157L96 145Z',
    body:'M88 140L107 132L120 154L134 132L152 140L169 226Q120 240 71 226Z',
    arms:['M90 149Q77 161 78 188L91 203Q102 202 105 188L104 164Z','M150 149Q163 161 162 188L149 203Q138 202 135 188L136 164Z'],
    lower:'M81 218Q120 230 159 218L153 250L130 253L120 228L110 253L87 250Z',
    shoes:'M88 248Q105 245 119 252L118 264Q102 269 85 262ZM130 252Q145 245 162 248L166 262Q149 269 131 264Z',
  },
  'prof.sofia': {
    skin:'#F0C8A9', hairColor:'#A54F38', topColor:'#E86D57', bottomColor:'#315574', shoeColor:'#EAC46B',
    head:'M95 56Q103 36 122 36Q145 37 151 59L147 100Q140 121 120 123Q99 121 93 100Z',
    hair:'M91 76Q72 58 76 34Q81 11 111 16Q135 5 157 25Q179 47 165 78L158 118Q155 143 144 153L137 119L145 77Q132 61 118 66Q101 63 92 86L99 120L93 153Q80 144 79 119L74 83Q63 65 72 44Q76 69 91 76Z',
    neck:'M104 119L138 119L145 145L120 157L96 145Z',
    body:'M85 141Q101 128 110 139L120 152L132 139Q145 128 160 141L168 198Q120 217 72 198Z',
    arms:['M88 146Q74 135 64 117L49 98Q43 89 35 96Q29 103 38 115L62 148L78 164Z','M156 146Q170 135 180 117L195 98Q201 89 209 96Q215 103 206 115L182 148L166 164Z'],
    lower:'M89 197Q120 212 151 197L148 250Q135 257 126 251L120 224L114 251Q103 257 91 250Z',
    shoes:'M91 247Q105 243 118 252L118 264Q104 269 88 261ZM125 252Q139 243 153 247L158 261Q143 269 126 264Z',
  },
  'prof.helena': {
    skin:'#8F5945', hairColor:'#211F27', topColor:'#267F91', bottomColor:'#50415D', shoeColor:'#E6B85D',
    head:'M95 54Q103 34 122 34Q145 35 152 58L149 101Q141 123 120 125Q98 123 92 101Z',
    hair:'M91 68Q74 45 91 26Q109 8 128 17Q150 8 166 29Q181 48 165 72Q150 82 137 75Q119 69 106 78Z M80 60Q65 76 73 113L77 159Q82 169 90 158L89 90Q98 78 93 66Z M100 67Q89 84 95 114L100 172Q105 181 113 172L111 91Q116 78 109 67Z M139 67Q131 80 135 102L137 173Q143 184 150 171L149 92Q154 78 149 68Z M158 61Q174 74 171 105L165 157Q159 168 152 157L158 90Q152 75 158 61Z',
    neck:'M104 120L139 120L145 146L120 158L96 146Z',
    body:'M78 143Q99 127 111 140L120 155L132 140Q149 127 163 143L178 216Q120 239 62 216Z',
    arms:['M82 150Q67 160 66 181L80 198Q93 200 99 187L103 164Z','M158 150Q173 160 174 181L160 198Q147 200 141 187L137 164Z'],
    lower:'M72 211Q120 234 168 211L163 250Q144 258 127 252L120 228L113 252Q96 258 77 250Z',
    shoes:'M78 247Q98 243 117 252L117 266Q95 271 73 262ZM127 252Q146 243 165 247L170 262Q148 271 127 266Z',
  },
  'prof.augusto': {
    skin:'#B97E5C', hairColor:'#C9BEB1', topColor:'#247D91', bottomColor:'#42424E', shoeColor:'#E5B95E', propColor:'#785A43',
    head:'M97 59Q103 38 121 38Q141 38 147 60L145 98Q140 119 121 122Q101 119 96 98Z',
    hair:'M94 67Q85 43 103 29Q116 19 128 27Q143 22 153 39L149 58Q136 48 121 52Q105 51 96 75Z M97 97Q101 111 120 113Q139 111 145 96L144 121Q139 139 120 143Q101 139 96 121Z M106 107Q120 116 136 107L132 114Q120 120 109 114Z',
    neck:'M108 119L133 119L139 141L120 153L101 141Z',
    body:'M88 143Q103 131 113 139L120 151L128 139Q142 131 154 143L164 199Q145 216 120 218Q95 216 76 199Z',
    arms:['M91 150Q77 158 76 177L87 192Q98 194 104 181L108 162Z','M151 150Q164 158 165 177L155 189L141 186L138 169Z'],
    lower:'M91 202Q120 216 149 202L148 246Q134 252 125 247L120 226L115 247Q105 252 92 246Z',
    shoes:'M92 244Q106 241 119 249L119 262Q105 267 89 260ZM125 249Q138 241 151 244L155 260Q140 267 126 262Z',
    props:['M51 177Q42 172 39 179Q44 187 50 188L47 259Q50 267 56 261L59 190Q66 185 61 179Q57 175 51 177Z'],
  },
  'prof.caio': {
    skin:'#AE7252', hairColor:'#28232A', topColor:'#D49A26', bottomColor:'#294B59', shoeColor:'#4E9E9C',
    head:'M95 54Q103 35 121 36Q143 36 150 57L147 100Q139 121 120 123Q100 121 93 100Z',
    hair:'M89 69L76 38L99 48L96 19L116 43L128 9L141 43L166 26L157 55L180 49L160 81Q138 63 120 65Q102 63 91 82Z',
    neck:'M106 119L137 119L143 142L120 154L97 142Z',
    body:'M94 140Q108 132 120 143Q132 132 147 140L165 207Q120 225 75 207Z',
    arms:['M94 150Q79 164 83 187L97 201Q108 197 105 181L105 157Z','M146 150Q161 164 157 187L143 201Q132 197 135 181L135 157Z'],
    lower:'M88 204Q120 218 152 204L148 251L129 256L120 224L111 256L92 251Z',
    shoes:'M92 249Q108 245 120 253L119 265Q105 269 89 262ZM130 253Q143 245 158 249L162 262Q146 269 131 265Z',
  },
};

function SilhouetteArt({ id, monochrome = false }: { id: string; monochrome?: boolean }) {
  const p = SILHOUETTES[id] ?? SILHOUETTES['prof.lia'];
  const c = monochrome ? '#1E2529' : null;
  return <g data-silhouette-art={id} aria-hidden="true">
    <path d={p.lower} fill={c ?? p.bottomColor}/>
    {p.props?.map((d, i) => <path key={'prop-' + i} d={d} fill={c ?? p.propColor ?? p.topColor}/>)}
    <path d={p.body} fill={c ?? p.topColor}/>
    {p.arms.map((d, i) => <path key={i} d={d} fill={c ?? p.topColor}/>)}
    <path d={p.neck} fill={c ?? p.skin}/>
    <path d={p.head} fill={c ?? p.skin}/>
    <path d={p.hair} fill={c ?? p.hairColor}/>
    <path d={p.shoes} fill={c ?? p.shoeColor}/>
  </g>;
}

export const TEACHER_FACE_EXPRESSIONS: Record<string, string> = {
  'prof.clara': 'alegre e acolhedora',
  'prof.lia': 'atenta e concentrada',
  'prof.davi': 'confiante e caloroso',
  'prof.iara': 'serena e observadora',
  'prof.nina': 'curiosa e questionadora',
  'prof.ravi': 'entusiasmado e colaborativo',
  'prof.mateus': 'gentil e paciente',
  'prof.marina': 'tranquila e estratégica',
  'prof.beatriz': 'firme e criteriosa',
  'prof.sofia': 'espontânea e animada',
  'prof.helena': 'expressiva e segura',
  'prof.augusto': 'sereno e experiente',
  'prof.caio': 'curioso e levemente cético',
};

/** Expressões faciais e marcas pessoais desenhadas por pessoa, não por molde. */
function CharacterDetailsV18({ id }: { id: string }) {
  switch (id) {
    case 'prof.clara': return <g data-character-details="v18-prof.clara">
      <path d="M104 83Q111 76 119 83M132 83Q140 76 148 83" fill="none" stroke="#452B29" strokeWidth="3.2" strokeLinecap="round"/>
      <ellipse cx="112" cy="93" rx="4.2" ry="5.7" fill="#342320"/><ellipse cx="140" cy="93" rx="4.2" ry="5.7" fill="#342320"/>
      <circle cx="113.5" cy="91" r="1.5" fill="#FFF5E9"/><circle cx="141.5" cy="91" r="1.5" fill="#FFF5E9"/>
      <path d="M121 98L118 105L123 106" fill="none" stroke="#8E503F" strokeWidth="2" strokeLinecap="round"/>
      <path d="M108 110Q125 128 144 108Q139 132 123 132Q111 129 108 110Z" fill="#713E39"/>
      <path d="M114 114Q127 121 139 112" fill="none" stroke="#FFF4E8" strokeWidth="3" strokeLinecap="round"/>
      <path d="M100 103Q94 106 96 111M151 103Q157 106 155 111" fill="none" stroke="#B97050" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M100 145L120 162L140 145" fill="none" stroke="#FFD17D" strokeWidth="4" strokeLinecap="round"/>
      <path d="M120 164V185" stroke="#B64B3D" strokeWidth="2.5" strokeLinecap="round"/><circle cx="120" cy="174" r="3" fill="#F6D58E"/>
    </g>;
    case 'prof.lia': return <g data-character-details="v18-prof.lia">
      <path d="M103 83L118 82M132 82L147 84" fill="none" stroke="#392820" strokeWidth="3.4" strokeLinecap="round"/>
      <path d="M105 92Q111 87 117 92M134 92Q140 87 146 92" fill="none" stroke="#211F22" strokeWidth="2.3" strokeLinecap="round"/>
      <ellipse cx="111" cy="94" rx="3" ry="4.6" fill="#211F22"/><ellipse cx="140" cy="94" rx="3" ry="4.6" fill="#211F22"/>
      <path d="M121 99L119 105L123 106" fill="none" stroke="#57342E" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M112 113Q121 116 131 112" fill="none" stroke="#57342E" strokeWidth="2.7" strokeLinecap="round"/>
      <path d="M102 96L97 99M148 97L153 100" stroke="#8C543E" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M104 145L120 160L136 145" fill="none" stroke="#D5E6DF" strokeWidth="4"/>
      <path d="M120 160V211" stroke="#1B6666" strokeWidth="2.5"/>
      <rect x="132" y="174" width="13" height="17" rx="2.5" fill="#F0BC51"/>
    </g>;
    case 'prof.davi': return <g data-character-details="v18-prof.davi">
      <path d="M101 86Q110 79 120 86M131 86Q141 79 151 86" fill="none" stroke="#2D201C" strokeWidth="4.8" strokeLinecap="round"/>
      <ellipse cx="112" cy="95" rx="4.2" ry="5" fill="#201C1B"/><ellipse cx="140" cy="95" rx="4.2" ry="5" fill="#201C1B"/>
      <circle cx="113" cy="93" r="1.4" fill="#FFF5E9"/><circle cx="141" cy="93" r="1.4" fill="#FFF5E9"/>
      <path d="M121 99L118 106L124 107" fill="none" stroke="#4B3027" strokeWidth="2.4" strokeLinecap="round"/>
      <path d="M94 103Q97 124 120 130Q144 124 147 103L143 119Q135 135 120 136Q105 135 98 119Z" fill="#4A2D23"/>
      <path d="M104 113Q120 121 137 113" fill="none" stroke="#D7A17E" strokeWidth="2.3" strokeLinecap="round"/>
      <path d="M88 151Q120 166 152 151" fill="none" stroke="#79A9D0" strokeWidth="4" strokeLinecap="round"/>
      <path d="M120 158V214" stroke="#244B69" strokeWidth="3"/>
      <path d="M101 181L112 189M139 181L128 189" stroke="#E5D8C6" strokeWidth="3" strokeLinecap="round"/>
    </g>;
    case 'prof.iara': return <g data-character-details="v18-prof.iara">
      <path d="M103 84Q111 78 119 83M132 83Q140 78 148 84" fill="none" stroke="#563B34" strokeWidth="2.8" strokeLinecap="round"/>
      <path d="M104 92Q112 86 119 92Q112 99 104 92ZM132 92Q140 86 147 92Q140 99 132 92Z" fill="#32231F"/>
      <circle cx="112" cy="92" r="2.5" fill="#FFF5E9"/><circle cx="140" cy="92" r="2.5" fill="#FFF5E9"/>
      <path d="M121 99L118 106L123 107" fill="none" stroke="#81513F" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M111 113Q122 120 135 112" fill="none" stroke="#6F4038" strokeWidth="2.8" strokeLinecap="round"/>
      <path d="M91 144L120 162L148 144" fill="none" stroke="#D6B1E9" strokeWidth="4" strokeLinecap="round"/>
      <path d="M120 161V220" stroke="#543B79" strokeWidth="2.5" strokeDasharray="4 6"/><circle cx="120" cy="181" r="4" fill="#E8BC6A"/>
    </g>;
    case 'prof.nina': return <g data-character-details="v18-prof.nina">
      <path d="M103 82Q109 77 117 81M133 81Q141 76 148 81" fill="none" stroke="#31324A" strokeWidth="3.2" strokeLinecap="round"/>
      <ellipse cx="111" cy="92" rx="3.7" ry="4.8" fill="#28263A"/><ellipse cx="140" cy="92" rx="3.7" ry="4.8" fill="#28263A"/>
      <circle cx="112" cy="90.5" r="1.3" fill="#FFF5E9"/><circle cx="141" cy="90.5" r="1.3" fill="#FFF5E9"/>
      <circle cx="111" cy="92" r="13.5" fill="none" stroke="#31324A" strokeWidth="3"/>
      <circle cx="140" cy="92" r="13.5" fill="none" stroke="#31324A" strokeWidth="3"/>
      <path d="M124 91Q126 88 127 91M153 90L158 88" fill="none" stroke="#31324A" strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M121 100L119 106L123 107" fill="none" stroke="#B88972" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M114 114Q120 109 127 114" fill="none" stroke="#8A5D55" strokeWidth="2.8" strokeLinecap="round"/>
      <path d="M99 146L120 162L141 146" fill="none" stroke="#D9CFB9" strokeWidth="4"/>
      <path d="M120 161V210" stroke="#C9A44C" strokeWidth="2.4"/><circle cx="120" cy="179" r="3.3" fill="#D9A94C"/>
    </g>;
    case 'prof.ravi': return <g data-character-details="v18-prof.ravi">
      <path d="M104 83Q111 78 119 83M132 83Q140 77 147 82" fill="none" stroke="#392924" strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="112" cy="91" rx="3.7" ry="5.2" fill="#251F1C"/><ellipse cx="140" cy="91" rx="3.7" ry="5.2" fill="#251F1C"/>
      <circle cx="113" cy="89" r="1.3" fill="#FFF5E9"/><circle cx="141" cy="89" r="1.3" fill="#FFF5E9"/>
      <path d="M121 98L119 104L124 105" fill="none" stroke="#815344" strokeWidth="2" strokeLinecap="round"/>
      <path d="M101 106Q120 132 143 106Q138 137 121 137Q105 134 101 106Z" fill="#29231F"/>
      <path d="M109 113Q124 127 139 112" fill="none" stroke="#D6A27F" strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M107 114Q120 120 134 114" fill="none" stroke="#FFF0E5" strokeWidth="2.4" strokeLinecap="round"/>
      <path d="M97 145L120 160L143 145" fill="none" stroke="#BCE0B8" strokeWidth="4" strokeLinecap="round"/>
      <path d="M120 160V194" stroke="#1F6E4A" strokeWidth="2.5"/>
      <path d="M91 210L103 215M149 210L137 215" stroke="#BCE0B8" strokeWidth="3" strokeLinecap="round"/>
    </g>;
    case 'prof.mateus': return <g data-character-details="v18-prof.mateus">
      <path d="M103 84Q110 80 118 84M133 84Q140 80 147 84" fill="none" stroke="#513A2F" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="111" cy="93" rx="3.5" ry="4.7" fill="#2A2421"/><ellipse cx="140" cy="93" rx="3.5" ry="4.7" fill="#2A2421"/>
      <circle cx="112" cy="91" r="1.3" fill="#FFF5E9"/><circle cx="141" cy="91" r="1.3" fill="#FFF5E9"/>
      <rect x="98" y="84" width="24" height="19" rx="6" fill="none" stroke="#6A5144" strokeWidth="2.1"/>
      <rect x="129" y="84" width="24" height="19" rx="6" fill="none" stroke="#6A5144" strokeWidth="2.1"/>
      <path d="M122 91Q125 88 128 91" fill="none" stroke="#6A5144" strokeWidth="2"/>
      <path d="M121 100L118 106L123 107" fill="none" stroke="#A77A5C" strokeWidth="2" strokeLinecap="round"/>
      <path d="M109 114Q121 122 135 113" fill="none" stroke="#75473A" strokeWidth="3" strokeLinecap="round"/>
      <path d="M95 146Q120 161 145 146" fill="none" stroke="#F1C38B" strokeWidth="4" strokeLinecap="round"/>
      <path d="M120 160V206" stroke="#A84F2A" strokeWidth="2.5"/><circle cx="120" cy="183" r="4" fill="#F5D179"/>
    </g>;
    case 'prof.marina': return <g data-character-details="v18-prof.marina">
      <path d="M104 84Q112 77 119 83M132 83Q140 77 147 84" fill="none" stroke="#4A2D29" strokeWidth="2.8" strokeLinecap="round"/>
      <path d="M104 92Q112 86 119 92M132 92Q140 86 147 92" fill="none" stroke="#211C1C" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="112" cy="93" rx="3.3" ry="4.5" fill="#211C1C"/><ellipse cx="140" cy="93" rx="3.3" ry="4.5" fill="#211C1C"/>
      <path d="M121 100L119 106L123 106" fill="none" stroke="#7F4D3D" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M111 113Q122 121 134 112" fill="none" stroke="#6E4038" strokeWidth="2.8" strokeLinecap="round"/>
      <circle cx="79" cy="119" r="4" fill="#E7BE6C"/><circle cx="160" cy="119" r="4" fill="#E7BE6C"/>
      <path d="M98 145L120 161L142 145" fill="none" stroke="#C3E2CB" strokeWidth="4" strokeLinecap="round"/>
      <path d="M120 160V221" stroke="#1A6D5D" strokeWidth="2.5"/><circle cx="120" cy="175" r="3" fill="#EEC66F"/>
    </g>;
    case 'prof.beatriz': return <g data-character-details="v18-prof.beatriz">
      <path d="M103 82L119 86M132 86L148 82" fill="none" stroke="#4B3029" strokeWidth="3.6" strokeLinecap="round"/>
      <path d="M104 93Q112 88 119 93M132 93Q140 88 147 93" fill="none" stroke="#302320" strokeWidth="2.4" strokeLinecap="round"/>
      <ellipse cx="112" cy="94" rx="3.2" ry="4.2" fill="#302320"/><ellipse cx="140" cy="94" rx="3.2" ry="4.2" fill="#302320"/>
      <path d="M121 100L118 106L123 106" fill="none" stroke="#8D5148" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M111 113Q121 116 132 112" fill="none" stroke="#7D4741" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M91 145L120 160L149 145" fill="none" stroke="#F0E6D8" strokeWidth="4"/>
      <path d="M105 140L120 159L135 140" fill="none" stroke="#D5B47D" strokeWidth="3"/>
      <rect x="137" y="179" width="12" height="19" rx="2" fill="#D9A94C"/>
    </g>;
    case 'prof.sofia': return <g data-character-details="v18-prof.sofia">
      <path d="M103 82Q111 76 119 82M132 82Q140 76 148 82" fill="none" stroke="#714339" strokeWidth="3.2" strokeLinecap="round"/>
      <ellipse cx="111" cy="91" rx="4.2" ry="5.5" fill="#32231F"/><ellipse cx="140" cy="91" rx="4.2" ry="5.5" fill="#32231F"/>
      <circle cx="112" cy="89" r="1.5" fill="#FFF5E9"/><circle cx="141" cy="89" r="1.5" fill="#FFF5E9"/>
      <circle cx="97" cy="105" r="2" fill="#C98270"/><circle cx="104" cy="109" r="2" fill="#C98270"/>
      <circle cx="145" cy="105" r="2" fill="#C98270"/><circle cx="151" cy="108" r="1.7" fill="#C98270"/>
      <path d="M106 108Q121 128 140 108Q134 133 120 132Q109 129 106 108Z" fill="#713D39"/>
      <path d="M113 113Q124 121 135 112" fill="none" stroke="#FFF5E8" strokeWidth="3" strokeLinecap="round"/>
      <path d="M97 145Q120 162 143 145" fill="none" stroke="#F0C46E" strokeWidth="5" strokeLinecap="round"/>
      <path d="M120 160V193" stroke="#B64E42" strokeWidth="2.5"/><circle cx="120" cy="181" r="3.2" fill="#F6D78B"/>
    </g>;
    case 'prof.helena': return <g data-character-details="v18-prof.helena">
      <path d="M102 83Q111 75 120 82M131 82Q140 75 150 83" fill="none" stroke="#3A2927" strokeWidth="3.6" strokeLinecap="round"/>
      <path d="M103 92Q112 84 120 92Q112 100 103 92ZM131 92Q140 84 149 92Q140 100 131 92Z" fill="#261D1C"/>
      <circle cx="112" cy="92" r="2.7" fill="#FFF5E9"/><circle cx="140" cy="92" r="2.7" fill="#FFF5E9"/>
      <path d="M121 99L117 106L123 107" fill="none" stroke="#70483B" strokeWidth="1.9" strokeLinecap="round"/>
      <path d="M106 110Q121 128 138 109Q133 134 120 134Q108 131 106 110Z" fill="#633E37"/>
      <path d="M112 115Q123 124 135 113" fill="none" stroke="#F6E9D9" strokeWidth="3" strokeLinecap="round"/>
      <path d="M94 147L120 164L146 147" fill="none" stroke="#D1AA68" strokeWidth="4" strokeLinecap="round"/>
      <path d="M120 164V220" stroke="#1D6975" strokeWidth="3"/><circle cx="120" cy="180" r="3.5" fill="#E5BD6B"/>
    </g>;
    case 'prof.augusto': return <g data-character-details="v18-prof.augusto">
      <path d="M104 82Q112 77 119 82M131 82Q138 77 145 82" fill="none" stroke="#B9ADA2" strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M105 92Q112 87 119 92M132 92Q139 87 145 92" fill="none" stroke="#2A2421" strokeWidth="2.4" strokeLinecap="round"/>
      <ellipse cx="112" cy="93" rx="3.3" ry="4.5" fill="#2A2421"/><ellipse cx="138" cy="93" rx="3.3" ry="4.5" fill="#2A2421"/>
      <path d="M121 99L118 105L122 106" fill="none" stroke="#97664F" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M108 108Q120 114 133 108Q130 117 120 117Q111 116 108 108Z" fill="#C9BEB1"/>
      <path d="M111 120Q120 124 130 120" fill="none" stroke="#5A3933" strokeWidth="2.4" strokeLinecap="round"/>
      <path d="M96 145L120 161L144 145" fill="none" stroke="#D4C4AA" strokeWidth="4" strokeLinecap="round"/>
      <path d="M119 161V211" stroke="#1F687B" strokeWidth="2.5"/><path d="M106 171L120 179L134 171" fill="none" stroke="#E5B95E" strokeWidth="3"/>
    </g>;
    case 'prof.caio': return <g data-character-details="v18-prof.caio">
      <path d="M103 82Q110 76 118 82M133 84Q141 81 148 86" fill="none" stroke="#392924" strokeWidth="3.2" strokeLinecap="round"/>
      <ellipse cx="111" cy="92" rx="3.8" ry="5.1" fill="#251F1C"/><ellipse cx="140" cy="93" rx="3.8" ry="5" fill="#251F1C"/>
      <circle cx="112" cy="90" r="1.3" fill="#FFF5E9"/><circle cx="141" cy="91" r="1.3" fill="#FFF5E9"/>
      <path d="M121 99L119 105L124 106" fill="none" stroke="#693D36" strokeWidth="1.9" strokeLinecap="round"/>
      <path d="M113 111Q121 119 137 108" fill="none" stroke="#693D36" strokeWidth="3" strokeLinecap="round"/>
      <path d="M95 146Q120 162 145 146" fill="none" stroke="#F3DEAC" strokeWidth="3" strokeLinecap="round"/>
      <path d="M111 154L109 180M130 154L132 180" stroke="#F3DEAC" strokeWidth="3" strokeLinecap="round"/>
      <rect x="135" y="177" width="16" height="14" rx="3" fill="none" stroke="#4E9E9C" strokeWidth="3"/>
    </g>;
    default: return null;
  }
}

function CharacterArt({ id }: { id: string }) {
  return <CharacterDetailsV18 id={id}/>;
}

export const TEACHER_SIGNATURE_POSES: Record<string, TeacherPose> = {
  'prof.clara': 'presenting',
  'prof.lia': 'hands-on-hips',
  'prof.davi': 'arms-crossed',
  'prof.iara': 'one-hand-up',
  'prof.nina': 'hand-on-chin',
  'prof.ravi': 'celebrating',
  'prof.mateus': 'arms-down',
  'prof.marina': 'greeting',
  'prof.beatriz': 'hands-forward',
  'prof.sofia': 'one-hand-up',
  'prof.helena': 'listening',
  'prof.augusto': 'pointing',
  'prof.caio': 'one-hand-up',
};

export function TeacherCharacter({
  teacher, pose, size = 160, className = '', portrait = false, silhouette = false,
}: {
  teacher: FictionalTeacher;
  pose?: TeacherPose;
  size?: number;
  className?: string;
  portrait?: boolean;
  /** Exibe apenas o contorno para auditoria de reconhecimento sem detalhes. */
  silhouette?: boolean;
}) {
  const characterPose = pose ?? TEACHER_SIGNATURE_POSES[teacher.id] ?? 'presenting';
  const style: CSSProperties = portrait
    ? { width: size, height: size }
    : { width: Math.round(size * .89), height: size };
  return (
    <svg
      viewBox={portrait ? '35 10 170 170' : '0 0 240 270'}
      width={style.width}
      height={style.height}
      className={'shrink-0 ' + (portrait ? 'rounded-full overflow-hidden ' : 'overflow-visible ') + className}
      style={style}
      role="img"
      aria-label={teacher.name + ', professor humano ilustrado do Pórtico'}
      data-character-style="portico-humans-v18"
      data-character-anatomy="human"
      data-character-id={teacher.id}
      data-character-silhouette={teacher.id}
      data-character-pose={characterPose}
      data-character-mode={silhouette ? 'silhouette' : 'color'}
      data-character-renderer="silhouette-v18"
      data-character-face-design={teacher.id}
      data-character-expression={TEACHER_FACE_EXPRESSIONS[teacher.id] ?? 'expressão neutra'}
      focusable="false"
    >
      {portrait && <circle cx="120" cy="98" r="90" fill={'rgb(var(--' + teacher.tone + '))'}/>}
      {!portrait && !silhouette && <ellipse cx="120" cy="262" rx="37" ry="4" fill="#263B45" opacity=".12"/>}
      {silhouette
        ? <SilhouetteArt id={teacher.id} monochrome/>
        : <g>
            <SilhouetteArt id={teacher.id}/>
            <CharacterArt id={teacher.id}/>
          </g>}
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
