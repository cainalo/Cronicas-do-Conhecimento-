import type { CSSProperties, ReactNode } from 'react';
import type { FictionalTeacher } from '@/content/teachers';

/**
 * Direção de arte Pórtico V15 — personagens humanos originais.
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
 * V16 — contornos específicos por docente.
 * As peças são independentes para preservar vazios entre braços, tronco e pernas.
 * Esta prancha é o teste de verdade: se a pessoa não se distingue em preto,
 * a silhueta ainda não está resolvida.
 */
type SilhouetteParts = {
  skin: string; hairColor: string; topColor: string; bottomColor: string; shoeColor: string;
  head: string; hair: string; neck: string; body: string; arms: string[]; lower: string; shoes: string;
};
const SILHOUETTES: Record<string, SilhouetteParts> = {
  'prof.clara': {
    skin:'#B97050', hairColor:'#38251F', topColor:'#EE684F', bottomColor:'#E6A34A', shoeColor:'#F3D6B6',
    head:'M91 58C91 39 104 30 121 30C141 30 154 44 154 65L151 105C146 126 134 135 119 134C103 132 91 118 88 99Z',
    hair:'M84 83C68 68 74 46 91 43C88 26 107 19 119 30C130 16 149 24 151 41C170 42 175 61 161 76L153 91L146 68C130 78 111 73 98 65L91 92Z',
    neck:'M105 122Q120 135 136 122L143 151Q120 163 97 151Z',
    body:'M85 141C95 132 105 137 120 151C135 137 146 132 157 141L174 181C160 196 143 201 120 201C97 201 79 196 65 181Z',
    arms:['M88 145C73 137 65 124 56 110C50 101 40 108 44 119C50 139 61 157 76 170L93 166Z','M152 145C167 137 176 124 185 110C191 101 201 108 197 119C191 139 180 157 165 170L147 166Z'],
    lower:'M91 188Q120 204 149 188L166 234Q120 251 74 234Z M101 231L98 255Q107 262 116 257L120 237 M129 237L135 257Q145 262 153 255L140 231',
    shoes:'M98 253Q108 249 119 255L118 264Q104 269 91 262ZM136 255Q148 249 157 254Q165 259 158 264Q145 269 133 263Z',
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
    head:'M83 62Q89 39 119 38Q151 37 158 64L154 106Q145 131 119 132Q92 129 84 105Z',
    hair:'M75 76Q63 52 80 37Q87 20 105 28Q116 13 134 27Q153 21 163 43Q177 53 164 79L153 89L150 67Q119 77 91 66L86 91Z',
    neck:'M99 123Q120 135 141 123L151 150L120 165L89 150Z',
    body:'M57 143Q81 124 105 137L120 161L135 137Q159 124 183 143L205 204Q164 229 120 226Q76 229 35 204Z',
    arms:['M60 150Q39 157 31 177Q24 192 42 199Q68 204 93 185L109 168L94 153Z','M180 150Q201 157 209 177Q216 192 198 199Q172 204 147 185L131 168L146 153Z'],
    lower:'M76 207Q120 225 164 207L169 247Q150 259 125 253L120 228L115 253Q90 259 71 247Z',
    shoes:'M75 246Q95 244 115 252L115 266Q91 272 71 262ZM128 252Q148 244 168 247L174 262Q153 272 129 266Z',
  },
  'prof.iara': {
    skin:'#A7684B', hairColor:'#38241F', topColor:'#7650A2', bottomColor:'#315C56', shoeColor:'#E0AD62',
    head:'M99 53Q108 36 122 37Q144 38 150 57L146 101Q140 120 121 122Q102 120 96 101Z',
    hair:'M94 70Q86 45 107 29Q126 14 146 31Q161 43 155 74L150 97L141 68Q119 59 100 80Z M92 62Q78 75 83 112L87 156Q91 166 99 155L102 83Z M151 61Q166 73 162 113L158 156Q154 166 146 155L143 83Z',
    neck:'M105 117Q120 128 136 117L144 146L120 158L96 146Z',
    body:'M82 140Q101 125 120 139Q139 125 158 140L181 194Q152 216 120 216Q88 216 59 194Z',
    arms:['M83 146Q68 158 55 182L45 198Q49 210 62 202L99 171Z','M157 146Q172 158 185 182L195 198Q191 210 178 202L141 171Z'],
    lower:'M88 199Q120 216 152 199L164 244Q146 254 126 247L120 223L114 247Q94 254 76 244Z',
    shoes:'M78 244Q96 240 114 249L114 263Q95 270 76 260ZM127 249Q145 240 163 244L166 260Q147 270 127 263Z',
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
    head:'M96 55Q104 38 121 38Q144 37 151 57L148 101Q140 121 120 124Q100 121 94 101Z',
    hair:'M88 69Q79 45 98 30Q109 19 123 24Q139 19 153 36Q165 51 155 72L148 80Q136 60 120 64Q102 61 92 80Z',
    neck:'M106 119L137 119L143 145L120 157L97 145Z',
    body:'M66 143Q90 124 108 138L120 159L132 138Q150 124 174 143L184 204Q120 229 56 204Z',
    arms:['M69 150Q49 156 42 177Q39 193 58 198L91 188L110 167L95 151Z','M171 150Q191 156 198 177Q201 193 182 198L149 188L130 167L145 151Z'],
    lower:'M83 207Q120 226 157 207L159 246L140 254L120 225L100 254L81 246Z',
    shoes:'M82 246Q99 243 116 252L117 265Q97 271 78 261ZM124 252Q141 243 158 246L164 261Q145 271 125 265Z',
  },
  'prof.mateus': {
    skin:'#E5B993', hairColor:'#513A2F', topColor:'#D66C37', bottomColor:'#364F5E', shoeColor:'#E9C36B',
    head:'M91 57Q99 36 121 36Q145 36 152 58L149 102Q141 125 120 127Q99 125 92 102Z',
    hair:'M84 70Q77 44 98 27Q118 12 141 29Q162 39 163 68L153 82Q141 65 123 66Q100 63 91 84Z',
    neck:'M106 121L136 121L142 143L120 154L98 143Z',
    body:'M79 144Q95 130 120 136Q145 130 161 144Q183 169 180 204Q175 226 120 231Q65 226 60 204Q57 169 79 144Z',
    arms:['M79 151Q64 164 66 184L80 200Q93 200 98 186L100 163Z','M161 151Q176 164 174 184L160 200Q147 200 142 186L140 163Z'],
    lower:'M88 211Q120 227 152 211L146 246L129 248L120 229L111 248L94 246Z',
    shoes:'M93 245Q108 242 120 250L120 262Q106 268 90 260ZM130 250Q142 242 157 245L161 260Q145 268 131 262Z',
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
    head:'M95 55Q102 36 121 36Q144 36 151 58L148 101Q140 122 120 124Q99 121 92 101Z',
    hair:'M87 76Q67 51 84 29Q98 10 124 18Q150 12 166 36Q184 59 163 91L157 125Q151 140 140 126L149 78Q132 59 119 65Q101 62 91 88L100 128Q88 140 80 125L78 91Z',
    neck:'M104 121L139 121L145 144L120 156L96 144Z',
    body:'M87 143Q103 130 120 142Q137 130 154 143L174 205Q120 228 66 205Z',
    arms:['M86 148Q67 135 52 119Q42 109 38 119Q35 131 54 151L83 176Z','M154 148Q173 135 188 119Q198 109 202 119Q205 131 186 151L157 176Z'],
    lower:'M83 199Q120 216 157 199L160 247L139 252L120 224L101 252L80 247Z',
    shoes:'M81 246Q99 242 116 251L116 264Q97 270 77 261ZM125 251Q142 242 159 246L164 261Q145 270 126 264Z',
  },
  'prof.helena': {
    skin:'#8F5945', hairColor:'#211F27', topColor:'#267F91', bottomColor:'#50415D', shoeColor:'#E6B85D',
    head:'M94 53Q102 36 121 36Q145 36 152 56L148 101Q141 123 120 125Q99 122 92 101Z',
    hair:'M83 71Q68 44 91 23Q112 7 135 22Q164 19 169 50Q178 76 161 94L158 131Q151 143 143 130L148 74Q128 66 115 68Q96 69 89 93L99 131Q92 143 84 130L78 96Z M81 57Q68 75 75 112L83 151Q91 159 95 146L88 84Z M158 58Q173 75 166 112L158 151Q150 159 146 146L153 84Z',
    neck:'M104 120L139 120L145 146L120 157L96 146Z',
    body:'M80 143Q101 127 120 141Q139 127 160 143L180 220Q120 241 60 220Z',
    arms:['M82 151Q65 164 68 190L88 207Q101 202 98 184L94 161Z','M158 151Q175 164 172 190L152 207Q139 202 142 184L146 161Z'],
    lower:'M70 213Q120 232 170 213L164 249L140 254L120 229L100 254L76 249Z',
    shoes:'M77 247Q98 243 117 252L117 266Q95 271 72 262ZM127 252Q146 243 166 247L170 262Q148 271 127 266Z',
  },
  'prof.augusto': {
    skin:'#B97E5C', hairColor:'#C9BEB1', topColor:'#247D91', bottomColor:'#42424E', shoeColor:'#E5B95E',
    head:'M95 57Q102 38 121 38Q143 38 151 59L147 101Q140 121 120 123Q100 120 93 100Z',
    hair:'M83 69Q74 45 93 29Q108 14 124 24Q140 13 156 31Q171 47 160 73L151 80Q137 61 120 64Q101 61 89 83Z',
    neck:'M106 119L137 119L143 143L120 155L97 143Z',
    body:'M79 144Q97 130 110 139L120 156L132 139Q146 130 163 144L177 207Q120 227 63 207Z',
    arms:['M82 153Q68 165 73 186L92 198Q104 192 98 177L92 159Z','M158 153Q172 165 167 186L148 198Q136 192 142 177L148 159Z'],
    lower:'M82 202Q120 218 158 202L156 240L135 246L120 221L105 246L84 240Z',
    shoes:'M86 239Q103 236 119 245L119 260Q102 267 83 258ZM131 245Q147 236 164 239L167 258Q148 267 131 260Z',
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
    <path d={p.body} fill={c ?? p.topColor}/>
    {p.arms.map((d, i) => <path key={i} d={d} fill={c ?? p.topColor}/>)}
    <path d={p.neck} fill={c ?? p.skin}/>
    <path d={p.head} fill={c ?? p.skin}/>
    <path d={p.hair} fill={c ?? p.hairColor}/>
    <path d={p.shoes} fill={c ?? p.shoeColor}/>
  </g>;
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

function Clara() {
  return <g>
    {/* silhouette: cabelo cheio, cintura marcada e saia ampla */}
    <path d="M82 103Q63 118 69 146L57 178Q54 189 66 193L81 177L77 216Q77 228 91 228L99 219L105 251Q120 259 133 251L141 218L151 228Q165 228 164 215L160 177L174 193Q186 189 180 176L167 140Q174 100 156 83Z" fill="#D95E4E"/>
    <path d="M96 208Q120 218 145 208L161 237Q143 245 120 244Q97 245 79 237Z" fill="#E7A34A"/>
    <path d="M102 236L101 257Q111 263 117 257L120 238M128 238L132 257Q142 263 149 257L140 236" fill="#344D78"/>
    <path d="M99 251Q107 249 118 254L117 263Q103 267 91 261Q91 255 99 251ZM132 254Q144 249 151 254Q160 258 155 263Q143 268 131 263Z" fill="#F3D6B6"/>
    <path d="M91 126Q76 108 82 82Q75 48 102 34Q122 18 147 34Q173 45 166 83Q176 112 156 133L144 108L101 108Z" fill="#38251F"/>
    <path d="M92 72Q94 48 121 45Q151 44 157 72L154 105Q147 130 122 131Q97 128 91 104Z" fill="#B97050"/>
    <path d="M82 69Q84 40 109 31Q135 19 157 38Q169 49 167 74Q151 62 139 57Q119 69 93 63Z" fill="#38251F"/>
    <g fill="#38251F">
      <circle cx="88" cy="48" r="13"/><circle cx="101" cy="32" r="14"/><circle cx="119" cy="27" r="13"/>
      <circle cx="139" cy="31" r="14"/><circle cx="156" cy="45" r="13"/><circle cx="164" cy="63" r="12"/>
    </g>
    <path d="M89 58Q120 75 158 56" fill="none" stroke="#E9A34F" strokeWidth="7" strokeLinecap="round"/>
    <path d="M106 85Q113 81 118 85M135 85Q141 81 147 85" fill="none" stroke="#452B29" strokeWidth="3.8" strokeLinecap="round"/>
    <ellipse cx="112" cy="94" rx="4.1" ry="6" fill="#342320"/><ellipse cx="141" cy="94" rx="4.1" ry="6" fill="#342320"/>
    <circle cx="113" cy="92" r="1.6" fill="#FFF5E9"/><circle cx="142" cy="92" r="1.6" fill="#FFF5E9"/>
    <path d="M118 111Q130 124 143 109Q138 128 125 127Q117 124 118 111Z" fill="#713E39"/>
    <path d="M120 113Q131 119 139 112" fill="none" stroke="#FFF4E8" strokeWidth="3" strokeLinecap="round"/>
    <path d="M105 132Q120 141 137 132L145 151Q120 163 96 151Z" fill="#E6AF80"/>
    <path d="M83 145Q92 132 105 136L120 153L135 136Q151 132 159 145L174 184Q147 201 120 197Q92 201 66 184Z" fill="#EE684F"/>
    <path d="M105 139L120 154L136 139" fill="none" stroke="#FFD17D" strokeWidth="5" strokeLinecap="round"/>
    <path d="M76 168Q62 151 53 135Q48 127 42 132Q34 139 46 157L71 190" fill="#B97050"/>
    <path d="M164 166Q178 153 185 137Q190 129 197 135Q203 142 192 159L176 188" fill="#B97050"/>
    <path d="M40 130Q39 120 47 119Q54 119 58 129L55 139Q45 143 40 130ZM190 132Q193 120 202 123Q210 128 204 139Q195 146 190 132Z" fill="#B97050"/>
    <path d="M87 179Q120 193 154 179L164 215Q120 236 77 215Z" fill="#E6A34A"/>
    <path d="M95 189Q120 201 146 189" fill="none" stroke="#F7D28B" strokeWidth="3" strokeLinecap="round"/>
    <path d="M113 150L120 160L127 150" fill="none" stroke="#FFF0DB" strokeWidth="3"/>
    <circle cx="120" cy="166" r="3.5" fill="#F5D88C"/>
  </g>;
}

function Lia() {
  return <g>
    {/* silhouette: figura alta e estreita, coque alto, jaqueta técnica */}
    <path d="M96 111Q82 125 79 153L68 187Q66 198 80 201L94 174L91 221Q92 234 107 234L115 221L118 254Q130 259 139 252L141 221L151 234Q164 234 164 220L158 175L172 199Q185 197 179 184L164 145Q160 120 143 111Z" fill="#087F7C"/>
    <path d="M107 220L106 255Q115 263 122 256L125 225M137 224L143 255Q153 262 160 255L151 218" fill="#253A48"/>
    <path d="M102 250Q114 247 123 254L122 263Q108 268 97 262ZM145 253Q158 249 165 256L163 263Q150 267 141 262Z" fill="#F0B95C"/>
    <path d="M92 56Q91 24 122 22Q154 23 158 55Q166 88 150 112Q120 133 92 111Q79 89 92 56Z" fill="#3D2922"/>
    <circle cx="126" cy="24" r="20" fill="#3D2922"/>
    <path d="M99 65Q99 47 122 43Q146 43 151 67L148 103Q139 122 120 122Q101 117 96 99Z" fill="#8C543E"/>
    <path d="M92 72Q100 47 125 48Q144 48 155 66L151 78Q132 67 115 71Q103 76 96 88Z" fill="#3D2922"/>
    <path d="M104 83Q110 79 116 82M132 82Q140 78 146 83" fill="none" stroke="#392820" strokeWidth="3.2" strokeLinecap="round"/>
    <ellipse cx="111" cy="91" rx="3.4" ry="5.5" fill="#211F22"/><ellipse cx="139" cy="91" rx="3.4" ry="5.5" fill="#211F22"/>
    <circle cx="112" cy="89" r="1.4" fill="white"/><circle cx="140" cy="89" r="1.4" fill="white"/>
    <path d="M121 101Q128 105 134 100" fill="none" stroke="#57342E" strokeWidth="3" strokeLinecap="round"/>
    <path d="M105 119L135 119L141 137L120 149L99 137Z" fill="#8C543E"/>
    <path d="M82 143Q102 128 120 143Q142 128 159 143L157 206Q120 225 83 206Z" fill="#087F7C"/>
    <path d="M105 140L120 160L136 140L146 205L120 218L95 205Z" fill="#D5E6DF"/>
    <path d="M120 159V211" stroke="#1B6666" strokeWidth="3"/>
    <rect x="132" y="173" width="15" height="19" rx="3" fill="#F0BC51"/>
    <path d="M88 147Q75 158 75 177L84 191Q95 193 98 182L104 161" fill="#087F7C"/>
    <path d="M153 148Q171 158 169 181L158 194Q148 192 146 182L141 160" fill="#087F7C"/>
    <path d="M80 187Q88 183 94 191L91 202Q84 207 77 200Z M157 190Q165 182 173 189L176 200Q168 208 159 202Z" fill="#8C543E"/>
    <path d="M92 207L148 207L144 223Q120 231 96 223Z" fill="#086C6B"/>
    <path d="M106 225L106 255M139 225L146 255" stroke="#253A48" strokeWidth="10" strokeLinecap="round"/>
    <path d="M100 258Q111 252 121 258L120 264H98ZM144 258Q156 251 165 258L164 264H142Z" fill="#E9D8BC"/>
    <path d="M83 87Q68 93 76 109" fill="none" stroke="#E2B762" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="77" cy="111" r="4" fill="#E2B762"/>
  </g>;
}

function Davi() {
  return <g>
    {/* silhouette: ombros muito largos, braços volumosos e tórax poderoso */}
    <path d="M86 104Q61 103 48 126L31 164Q25 184 44 191L64 169L59 220Q61 237 79 238L91 222L93 255Q120 265 147 255L149 222L162 238Q180 237 181 219L176 168L196 191Q215 183 205 163L187 126Q175 103 151 104Z" fill="#3269A2"/>
    <path d="M91 221L87 256Q101 265 114 259L120 224M149 222L154 257Q166 264 179 256L166 220" fill="#263C52"/>
    <path d="M85 253Q103 249 116 258L116 265Q96 271 80 263ZM154 258Q169 249 185 256L189 264Q169 271 153 265Z" fill="#E5AC4E"/>
    <path d="M88 65Q86 29 120 27Q158 26 165 66L159 112Q146 137 120 137Q91 133 81 108Z" fill="#4A2D23"/>
    <g fill="#4A2D23"><circle cx="86" cy="51" r="17"/><circle cx="101" cy="33" r="17"/><circle cx="121" cy="27" r="17"/><circle cx="143" cy="32" r="18"/><circle cx="160" cy="49" r="17"/><circle cx="168" cy="69" r="16"/></g>
    <path d="M91 71Q94 48 121 45Q148 45 154 72L150 106Q143 128 120 130Q96 128 89 105Z" fill="#663F30"/>
    <path d="M91 75Q111 62 126 68Q144 60 157 76L151 88Q129 80 111 88Q100 85 91 92Z" fill="#4A2D23"/>
    <path d="M103 87Q112 81 119 86M132 86Q141 81 148 87" fill="none" stroke="#2D201C" strokeWidth="4.5" strokeLinecap="round"/>
    <ellipse cx="112" cy="96" rx="4.6" ry="5.7" fill="#201C1B"/><ellipse cx="140" cy="96" rx="4.6" ry="5.7" fill="#201C1B"/>
    <circle cx="113" cy="94" r="1.6" fill="white"/><circle cx="141" cy="94" r="1.6" fill="white"/>
    <path d="M104 110Q120 124 138 110Q133 128 120 129Q109 126 104 110Z" fill="#32201E"/>
    <path d="M113 115Q122 119 132 114" fill="none" stroke="#F4E8D9" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M102 129Q120 139 139 128L145 147L120 162L96 147Z" fill="#663F30"/>
    <path d="M58 145Q82 119 106 132L120 150L134 132Q163 119 183 145L197 205Q164 226 120 222Q75 226 42 205Z" fill="#3673B1"/>
    <path d="M83 137L105 149L120 170L135 149L158 137L146 207Q120 223 94 207Z" fill="#E5A849"/>
    <path d="M105 151L120 169L136 151" fill="none" stroke="#F5D18A" strokeWidth="5" strokeLinecap="round"/>
    <path d="M53 150Q31 166 53 188L81 196Q101 190 96 176Q78 178 68 163Z" fill="#663F30"/>
    <path d="M187 150Q210 166 188 188L160 196Q140 190 145 176Q163 178 173 163Z" fill="#663F30"/>
    <path d="M65 181Q94 196 120 186Q146 196 175 181" fill="none" stroke="#1E4E80" strokeWidth="8" strokeLinecap="round"/>
    <path d="M87 186Q121 204 153 186" fill="none" stroke="#E8B36A" strokeWidth="4" strokeLinecap="round"/>
    <path d="M79 203Q120 222 161 203L167 229Q120 243 73 229Z" fill="#244B69"/>
    <path d="M96 229L92 256M145 229L151 256" stroke="#263C52" strokeWidth="16" strokeLinecap="round"/>
    <path d="M82 258Q100 252 116 260L116 266Q96 272 79 265ZM151 260Q168 252 185 258L188 265Q168 272 151 266Z" fill="#E9D4B3"/>
  </g>;
}

function Iara() {
  return <g>
    {/* silhouette: tranças longas, capa curta e calças largas */}
    <path d="M79 89Q65 108 73 144L59 184Q57 196 72 198L87 175L84 222Q86 236 102 235L112 220L110 254Q122 261 134 254L135 220L146 235Q163 236 165 221L159 174L174 197Q188 192 180 180L164 140Q174 104 154 83Z" fill="#7650A2"/>
    <path d="M94 220L88 256Q100 264 115 257L120 224M145 220L151 257Q164 263 176 255L162 219" fill="#315C56"/>
    <path d="M86 254Q102 250 116 258L116 265Q98 270 82 263ZM153 258Q169 250 183 257L186 265Q168 270 151 264Z" fill="#E0AD62"/>
    <path d="M91 55Q92 23 122 22Q154 23 160 56L153 104Q143 127 120 128Q97 124 88 102Z" fill="#38241F"/>
    <path d="M92 61Q78 53 80 79L84 145Q86 161 98 154L101 88Z M150 59Q166 54 165 80L161 145Q158 161 147 154L143 87Z" fill="#38241F"/>
    <path d="M98 62Q102 43 122 42Q145 42 151 64L148 101Q140 119 121 120Q101 117 95 100Z" fill="#A7684B"/>
    <path d="M93 67Q102 41 125 42Q144 43 156 65L151 76Q136 60 120 66Q106 72 96 81Z" fill="#38241F"/>
    <g fill="none" stroke="#5A372B" strokeWidth="4" strokeLinecap="round"><path d="M108 82Q114 78 119 82M132 82Q139 78 145 83"/></g>
    <ellipse cx="113" cy="91" rx="3.8" ry="5.4" fill="#2B1C19"/><ellipse cx="139" cy="91" rx="3.8" ry="5.4" fill="#2B1C19"/>
    <circle cx="114" cy="89" r="1.4" fill="white"/><circle cx="140" cy="89" r="1.4" fill="white"/>
    <path d="M118 105Q131 115 143 104" fill="none" stroke="#683B35" strokeWidth="3.4" strokeLinecap="round"/>
    <path d="M102 118L139 118L145 140L120 153L96 140Z" fill="#A7684B"/>
    <path d="M83 139Q102 124 120 138Q139 124 158 139L175 193Q152 217 120 213Q87 218 65 193Z" fill="#7650A2"/>
    <path d="M120 143L137 161L120 188L103 161Z" fill="#E7B55D"/>
    <path d="M99 153Q120 167 141 153" fill="none" stroke="#D9B2E6" strokeWidth="5" strokeLinecap="round"/>
    <path d="M71 157Q62 171 53 185L45 198Q53 207 65 197L91 170" fill="#A7684B"/>
    <path d="M169 156Q181 170 190 184L198 197Q190 207 178 198L151 170" fill="#A7684B"/>
    <path d="M43 198Q50 192 58 198L61 208Q53 217 44 209Z M191 198Q199 192 205 198L205 209Q196 217 188 209Z" fill="#A7684B"/>
    <path d="M87 195Q120 211 153 195L165 221Q120 241 75 221Z" fill="#315C56"/>
    <path d="M91 211Q120 224 149 211" fill="none" stroke="#D6A76C" strokeWidth="3" strokeDasharray="4 5"/>
    <circle cx="120" cy="164" r="6" fill="#F4D68A"/>
  </g>;
}

function Nina() {
  return <g>
    {/* silhouette: bob angular, proporções compactas, jaleco de gola marcada */}
    <path d="M91 105Q75 117 79 151L69 188Q71 201 84 197L96 175L92 221Q94 232 107 231L115 218L117 252Q128 258 138 252L141 218L152 232Q165 232 166 220L157 174L171 198Q184 197 179 183L164 145Q167 116 149 104Z" fill="#F3E9D8"/>
    <path d="M106 220L103 254Q116 261 123 254L126 220M139 220L144 254Q155 261 164 254L151 219" fill="#3B415B"/>
    <path d="M98 252Q111 249 123 256L122 264Q108 268 96 263ZM145 255Q157 249 168 256L169 264Q153 269 142 263Z" fill="#E9C66D"/>
    <path d="M76 80Q69 35 119 28Q167 29 169 79L166 129Q154 148 143 132L147 91Q140 70 120 70Q96 70 91 93L96 132Q82 146 70 128Z" fill="#31324A"/>
    <path d="M91 58Q101 42 122 42Q146 42 153 64L149 101Q141 122 120 123Q99 121 91 101Z" fill="#F0C7A9"/>
    <path d="M75 76Q85 36 122 34Q160 38 168 75Q151 66 139 63Q117 68 92 61Z" fill="#31324A"/>
    <path d="M99 82Q110 77 117 82M132 82Q141 77 148 83" fill="none" stroke="#443A43" strokeWidth="3.4" strokeLinecap="round"/>
    <ellipse cx="110" cy="91" rx="4" ry="5.5" fill="#282632"/><ellipse cx="139" cy="91" rx="4" ry="5.5" fill="#282632"/>
    <circle cx="111" cy="89" r="1.4" fill="white"/><circle cx="140" cy="89" r="1.4" fill="white"/>
    <path d="M118 103Q131 106 139 99" fill="none" stroke="#9E615A" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="120" cy="109" r="2.5" fill="#D69B83"/>
    <path d="M100 122L141 122L145 143L120 153L96 143Z" fill="#F0C7A9"/>
    <path d="M84 143L106 133L120 156L135 133L157 143L171 205Q120 224 69 205Z" fill="#F4EDE2"/>
    <path d="M106 136L120 155L134 136L145 208L120 219L95 208Z" fill="#D4D9DC"/>
    <path d="M107 139L120 154L133 139" fill="none" stroke="#59617A" strokeWidth="4"/>
    <path d="M88 157L105 172L99 198L81 188ZM152 157L135 172L141 198L159 188Z" fill="#F4EDE2"/>
    <rect x="137" y="177" width="17" height="21" rx="3" fill="#D9A53E"/>
    <path d="M79 176Q70 184 76 196L90 200L98 185" fill="#F0C7A9"/>
    <path d="M161 176Q171 185 165 197L151 200L143 185" fill="#F0C7A9"/>
    <path d="M75 195Q83 190 90 199L88 208Q77 212 72 203ZM165 195Q157 190 150 199L152 208Q163 212 168 203Z" fill="#F0C7A9"/>
    <path d="M94 207Q120 217 146 207" fill="none" stroke="#C4C9CB" strokeWidth="3"/>
    <path d="M120 157L125 166L120 175L115 166Z" fill="#E8B64E"/>
  </g>;
}

function Ravi() {
  return <g>
    {/* silhouette: postura atlética, ombros marcados e moletom amplo */}
    <path d="M87 103Q66 105 54 128L39 166Q34 184 51 190L69 168L65 218Q67 235 84 235L96 220L98 255Q120 263 143 255L145 220L157 235Q176 235 177 217L172 168L190 190Q207 183 198 165L184 127Q172 104 151 103Z" fill="#2D8C5D"/>
    <path d="M96 222L91 256Q104 264 117 258L121 223M145 222L151 257Q163 263 176 256L162 220" fill="#273E4A"/>
    <path d="M86 255Q103 249 118 258L118 265Q99 271 82 264ZM153 257Q168 250 181 257L185 265Q167 271 151 264Z" fill="#E6B84E"/>
    <path d="M91 65Q90 28 121 26Q157 27 162 66L156 109Q146 130 120 132Q94 128 86 106Z" fill="#B87956"/>
    <path d="M87 64Q90 32 120 25Q150 23 163 59L151 70Q135 59 120 64Q100 60 88 75Z" fill="#29231F"/>
    <g fill="#29231F"><circle cx="95" cy="41" r="10"/><circle cx="109" cy="29" r="10"/><circle cx="124" cy="27" r="10"/><circle cx="141" cy="32" r="10"/><circle cx="154" cy="46" r="10"/></g>
    <path d="M94 68Q101 46 122 45Q145 45 151 68L148 103Q140 122 120 123Q100 119 94 101Z" fill="#B87956"/>
    <path d="M102 84Q112 78 119 83M132 83Q140 78 147 84" fill="none" stroke="#372923" strokeWidth="4" strokeLinecap="round"/>
    <ellipse cx="111" cy="92" rx="4.2" ry="6" fill="#29211D"/><ellipse cx="140" cy="92" rx="4.2" ry="6" fill="#29211D"/>
    <circle cx="112" cy="90" r="1.5" fill="white"/><circle cx="141" cy="90" r="1.5" fill="white"/>
    <path d="M104 105Q120 114 138 103Q133 121 120 122Q108 119 104 105Z" fill="#35221F"/>
    <path d="M110 109Q121 115 132 108" fill="none" stroke="#F4E5D4" strokeWidth="3.3" strokeLinecap="round"/>
    <path d="M104 121L137 121L143 144L120 157L97 144Z" fill="#B87956"/>
    <path d="M66 144Q91 124 108 138L120 158L133 138Q152 124 174 144L181 205Q120 225 59 205Z" fill="#2D8C5D"/>
    <path d="M93 139Q120 157 147 139L139 170Q120 184 101 170Z" fill="#256F4F"/>
    <path d="M110 153L105 183M130 153L135 183" stroke="#E7C77B" strokeWidth="3.2" strokeLinecap="round"/>
    <path d="M51 151Q40 163 50 181L78 193Q95 188 89 174L68 159Z M188 151Q200 163 190 181L162 193Q145 188 151 174L172 159Z" fill="#B87956"/>
    <path d="M47 182Q58 176 68 187L65 200Q53 207 44 196ZM193 182Q182 176 172 187L175 200Q187 207 196 196Z" fill="#B87956"/>
    <path d="M82 203Q120 220 158 203L160 226Q120 240 80 226Z" fill="#236D4B"/>
    <path d="M117 171Q120 179 123 171" fill="none" stroke="#F1D18A" strokeWidth="2.5"/>
  </g>;
}

function Mateus() {
  return <g>
    {/* silhouette: tronco macio e arredondado, pernas curtas e retas */}
    <path d="M89 110Q69 120 72 151L62 183Q61 197 76 199L91 176L91 220Q94 233 108 232L116 218L117 250Q128 258 139 250L141 218L152 232Q167 231 168 218L159 174L174 197Q188 192 179 177L163 143Q167 119 148 109Z" fill="#D66C37"/>
    <path d="M97 221L97 254Q109 261 120 254L123 221M140 221L145 254Q156 260 167 253L154 219" fill="#364F5E"/>
    <path d="M92 252Q106 247 121 255L121 263Q104 269 89 263ZM146 253Q160 247 173 254L175 263Q158 269 143 263Z" fill="#E9C36B"/>
    <path d="M84 61Q83 25 120 24Q160 24 166 64L159 111Q145 138 120 139Q92 134 82 108Z" fill="#513A2F"/>
    <path d="M94 65Q98 43 122 42Q146 42 153 65L150 104Q141 126 120 126Q99 123 92 102Z" fill="#E5B993"/>
    <path d="M84 71Q82 42 101 31Q125 17 147 32Q166 42 166 72Q145 60 131 62Q112 49 94 80Z" fill="#513A2F"/>
    <path d="M94 78Q103 62 121 63Q143 63 153 80" fill="none" stroke="#513A2F" strokeWidth="8" strokeLinecap="round"/>
    <path d="M103 82Q111 78 118 82M132 82Q140 78 147 82" fill="none" stroke="#574238" strokeWidth="3.5" strokeLinecap="round"/>
    <ellipse cx="111" cy="91" rx="3.8" ry="5.4" fill="#302723"/><ellipse cx="139" cy="91" rx="3.8" ry="5.4" fill="#302723"/>
    <circle cx="112" cy="89" r="1.4" fill="white"/><circle cx="140" cy="89" r="1.4" fill="white"/>
    <path d="M115 104Q128 110 140 102" fill="none" stroke="#86584C" strokeWidth="3.3" strokeLinecap="round"/>
    <path d="M102 124L139 124L143 145L120 157L97 145Z" fill="#E5B993"/>
    <path d="M75 146Q91 129 120 135Q149 129 165 146L180 198Q175 217 120 220Q65 217 60 198Z" fill="#D66C37"/>
    <path d="M88 144Q120 165 152 144" fill="none" stroke="#F1C38B" strokeWidth="7" strokeLinecap="round"/>
    <path d="M120 153L128 162L120 171L112 162Z" fill="#F5D179"/>
    <path d="M71 159Q61 167 62 185L81 196Q98 193 93 179L84 160Z M169 159Q179 167 178 185L159 196Q142 193 147 179L156 160Z" fill="#E5B993"/>
    <path d="M62 186Q69 181 77 187L78 198Q69 205 59 198ZM178 186Q171 181 163 187L162 198Q171 205 181 198Z" fill="#E5B993"/>
    <path d="M78 196Q120 216 162 196L159 222Q120 236 81 222Z" fill="#C65D31"/>
    <path d="M97 170Q120 180 143 170" fill="none" stroke="#F6D5A5" strokeWidth="2.5" strokeLinecap="round"/>
  </g>;
}

function Marina() {
  return <g>
    {/* silhouette: vestido em A, cabelo ondulado e postura tranquila */}
    <path d="M91 104Q73 116 77 151L64 186Q62 198 77 199L91 176L89 220Q91 233 105 233L114 220L116 253Q128 260 140 253L142 220L152 233Q168 232 169 219L158 176L174 198Q188 194 181 180L165 145Q165 117 147 104Z" fill="#24866D"/>
    <path d="M99 222L97 255Q109 262 121 255L124 222M142 222L148 255Q160 262 171 254L156 221" fill="#33485A"/>
    <path d="M92 253Q108 249 122 257L121 264Q104 270 89 263ZM149 256Q164 249 178 256L179 264Q161 270 146 263Z" fill="#E7BE6C"/>
    <path d="M83 62Q81 25 119 23Q159 22 166 62Q171 93 153 117Q120 143 87 113Q73 91 83 62Z" fill="#241F25"/>
    <path d="M91 61Q98 42 121 41Q146 40 153 64L150 101Q142 122 120 123Q98 121 91 100Z" fill="#995E46"/>
    <path d="M79 77Q76 43 103 30Q128 16 151 31Q170 43 169 79Q155 70 148 57Q133 69 113 63Q96 60 84 89Z" fill="#241F25"/>
    <path d="M84 65Q68 87 85 120M157 64Q177 86 160 122" fill="none" stroke="#241F25" strokeWidth="10" strokeLinecap="round"/>
    <path d="M104 83Q112 80 118 84M132 84Q139 80 146 84" fill="none" stroke="#4A2D29" strokeWidth="3.5" strokeLinecap="round"/>
    <ellipse cx="111" cy="92" rx="3.8" ry="5.7" fill="#211C1C"/><ellipse cx="140" cy="92" rx="3.8" ry="5.7" fill="#211C1C"/>
    <circle cx="112" cy="90" r="1.5" fill="white"/><circle cx="141" cy="90" r="1.5" fill="white"/>
    <path d="M110 108Q120 116 132 108" fill="none" stroke="#6E4038" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M101 120L140 120L145 142L120 154L96 142Z" fill="#995E46"/>
    <path d="M83 145Q100 129 120 142Q140 129 157 145L174 214Q120 239 66 214Z" fill="#24866D"/>
    <path d="M98 144L120 160L142 144" fill="none" stroke="#C3E2CB" strokeWidth="5" strokeLinecap="round"/>
    <path d="M120 159V221" stroke="#1A6D5D" strokeWidth="3"/>
    <circle cx="120" cy="175" r="3.2" fill="#EEC66F"/><circle cx="120" cy="193" r="3.2" fill="#EEC66F"/>
    <path d="M79 155Q68 169 72 190L90 200Q102 193 94 179L91 161Z M161 155Q174 167 169 188L151 200Q139 193 147 179L149 161Z" fill="#995E46"/>
    <path d="M70 189Q80 184 88 193L86 204Q75 209 67 201ZM170 188Q160 184 152 193L154 204Q165 209 173 201Z" fill="#995E46"/>
    <path d="M80 213Q120 232 160 213" fill="none" stroke="#F0CF86" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="76" cy="111" r="4" fill="#F1CB75"/><circle cx="164" cy="111" r="4" fill="#F1CB75"/>
  </g>;
}

function Beatriz() {
  return <g>
    {/* silhouette: linha vertical elegante, casaco reto e corte pixie */}
    <path d="M98 105Q82 117 84 151L73 189Q73 202 87 199L99 177L98 225Q100 238 114 235L119 222L121 255Q132 260 142 254L143 222L154 236Q168 235 168 220L158 174L172 198Q186 194 179 180L164 143Q164 117 143 105Z" fill="#76509B"/>
    <path d="M107 224L106 256Q118 263 128 256L130 224M143 223L149 255Q160 262 170 254L156 220" fill="#34394E"/>
    <path d="M101 254Q114 250 128 258L128 265Q112 270 97 263ZM150 255Q162 249 176 256L177 264Q162 270 148 263Z" fill="#E8C16A"/>
    <path d="M88 60Q91 28 121 27Q155 27 160 61L154 104Q143 127 119 129Q96 126 87 101Z" fill="#4B3029"/>
    <path d="M95 64Q100 44 121 42Q145 42 151 64L148 100Q141 119 120 121Q100 117 94 99Z" fill="#C58D6B"/>
    <path d="M84 69Q83 41 102 30Q128 16 150 34Q163 44 160 67Q142 58 126 59Q104 61 91 79Z" fill="#4B3029"/>
    <path d="M102 83Q111 79 118 83M132 83Q140 78 147 83" fill="none" stroke="#49302C" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M100 91Q111 86 119 90M130 90Q140 86 149 91" fill="none" stroke="#4B3029" strokeWidth="2.6" strokeLinecap="round"/>
    <ellipse cx="111" cy="94" rx="3.7" ry="5.2" fill="#302320"/><ellipse cx="140" cy="94" rx="3.7" ry="5.2" fill="#302320"/>
    <path d="M117 106Q128 111 138 105" fill="none" stroke="#8D5148" strokeWidth="3" strokeLinecap="round"/>
    <path d="M102 119L139 119L143 142L120 154L97 142Z" fill="#C58D6B"/>
    <path d="M87 143L107 134L120 154L134 134L154 143L171 213Q120 231 69 213Z" fill="#76509B"/>
    <path d="M105 136L120 155L135 136L144 213L120 223L96 213Z" fill="#F0E6D8"/>
    <path d="M105 139L120 158L135 139" fill="none" stroke="#D5B47D" strokeWidth="4"/>
    <path d="M91 155L108 172L98 193L79 187ZM149 155L132 172L142 193L161 187Z" fill="#76509B"/>
    <path d="M79 180Q69 184 75 198L91 202L100 188" fill="#C58D6B"/>
    <path d="M161 180Q171 184 165 198L149 202L140 188" fill="#C58D6B"/>
    <path d="M73 195Q84 190 91 200L88 210Q78 214 70 205ZM167 195Q156 190 149 200L152 210Q162 214 170 205Z" fill="#C58D6B"/>
    <path d="M89 210H151" stroke="#593C78" strokeWidth="4"/>
    <path d="M120 160L128 168L120 176L112 168Z" fill="#E4B956"/>
    <rect x="137" y="179" width="12" height="19" rx="2" fill="#D9A94C"/>
  </g>;
}

function Sofia() {
  return <g>
    {/* silhouette: cabelo longo em movimento, lenço e base mais leve */}
    <path d="M86 100Q70 111 71 145L60 186Q59 200 74 200L89 174L86 220Q88 233 103 232L112 220L114 255Q126 262 139 255L141 220L153 233Q168 232 169 218L159 174L176 198Q189 193 181 180L164 143Q173 108 151 91Z" fill="#E86D57"/>
    <path d="M98 220L95 254Q108 263 120 254L123 222M141 220L148 255Q161 262 173 254L156 218" fill="#315574"/>
    <path d="M89 253Q107 249 122 257L121 265Q103 270 86 263ZM151 257Q167 249 181 256L183 264Q165 271 149 264Z" fill="#EAC46B"/>
    <path d="M72 61Q70 26 118 20Q164 22 172 61Q180 106 151 133Q120 155 88 130Q59 101 72 61Z" fill="#A54F38"/>
    <path d="M91 61Q99 39 122 40Q148 39 154 65L150 102Q142 122 120 123Q98 121 91 101Z" fill="#F0C8A9"/>
    <path d="M73 69Q81 31 119 27Q156 26 168 64Q151 55 142 59Q128 70 111 61Q92 58 80 88Z" fill="#A54F38"/>
    <path d="M81 61Q62 91 80 130M157 58Q180 78 161 122" fill="none" stroke="#A54F38" strokeWidth="13" strokeLinecap="round"/>
    <path d="M78 46Q103 20 132 31Q149 35 163 53" fill="none" stroke="#E9A14B" strokeWidth="6" strokeLinecap="round"/>
    <path d="M104 82Q112 77 118 82M132 82Q140 77 147 82" fill="none" stroke="#714339" strokeWidth="3.3" strokeLinecap="round"/>
    <ellipse cx="111" cy="91" rx="4" ry="5.8" fill="#32231F"/><ellipse cx="140" cy="91" rx="4" ry="5.8" fill="#32231F"/>
    <circle cx="112" cy="89" r="1.5" fill="white"/><circle cx="141" cy="89" r="1.5" fill="white"/>
    <circle cx="95" cy="106" r="2.2" fill="#C98270"/><circle cx="101" cy="109" r="2" fill="#C98270"/>
    <path d="M105 108Q120 124 139 106Q133 129 119 127Q108 124 105 108Z" fill="#713D39"/>
    <path d="M111 111Q123 118 134 110" fill="none" stroke="#FFF5E8" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M103 122L139 122L144 144L120 154L96 144Z" fill="#F0C8A9"/>
    <path d="M83 145Q101 130 120 143Q141 130 159 145L176 203Q120 226 64 203Z" fill="#E86D57"/>
    <path d="M95 142Q120 157 145 142L139 168Q120 182 101 168Z" fill="#315574"/>
    <path d="M91 150Q120 168 149 150" fill="none" stroke="#F0C46E" strokeWidth="8" strokeLinecap="round"/>
    <path d="M138 151L151 158L146 193L132 181Z" fill="#F0C46E"/>
    <path d="M74 157Q63 144 51 136Q43 131 39 140Q37 150 55 165L79 186" fill="#F0C8A9"/>
    <path d="M165 157Q178 144 190 136Q198 131 202 140Q204 150 186 165L161 186" fill="#F0C8A9"/>
    <path d="M39 139Q45 131 53 138L58 150Q49 159 40 150Z M187 138Q195 131 202 139L201 150Q192 159 183 150Z" fill="#F0C8A9"/>
    <path d="M86 199Q120 215 154 199L158 223Q120 238 82 223Z" fill="#315574"/>
  </g>;
}

function Helena() {
  return <g>
    {/* silhouette: presença ampla, locs assimétricos e túnica longa */}
    <path d="M83 97Q64 114 71 148L55 190Q54 204 70 204L89 176L84 224Q86 238 103 237L112 221L113 253Q127 262 141 253L143 220L155 237Q172 237 173 221L160 174L179 200Q193 194 184 180L165 143Q172 108 151 95Z" fill="#267F91"/>
    <path d="M96 224L92 255Q106 263 120 256L123 224M143 223L149 255Q163 263 177 255L160 221" fill="#50415D"/>
    <path d="M85 254Q104 248 121 258L120 266Q100 272 82 264ZM151 257Q168 249 184 257L187 265Q167 272 149 264Z" fill="#E6B85D"/>
    <path d="M77 59Q78 21 120 21Q162 22 165 63Q170 98 148 122Q119 140 90 119Q69 93 77 59Z" fill="#211F27"/>
    <path d="M91 59Q100 39 122 39Q147 39 153 63L149 101Q141 122 120 123Q98 119 91 99Z" fill="#8F5945"/>
    <path d="M79 57Q83 27 111 23Q140 15 159 39Q171 55 164 82L155 91L151 61Q131 72 113 62Q95 68 86 91Z" fill="#211F27"/>
    <g fill="#211F27">
      <path d="M81 54Q64 75 76 98L88 122Q96 129 99 117L91 83Z"/>
      <path d="M97 47Q80 70 91 105L102 132Q110 137 114 126L107 77Z"/>
      <path d="M143 43Q164 63 155 98L148 131Q140 137 136 126L141 75Z"/>
      <path d="M159 55Q178 78 163 110L157 129Q149 133 147 123L153 82Z"/>
    </g>
    <path d="M103 83Q111 79 118 83M132 83Q140 79 147 83" fill="none" stroke="#3A2927" strokeWidth="3.5" strokeLinecap="round"/>
    <ellipse cx="111" cy="92" rx="4" ry="5.5" fill="#261D1C"/><ellipse cx="140" cy="92" rx="4" ry="5.5" fill="#261D1C"/>
    <circle cx="112" cy="90" r="1.5" fill="white"/><circle cx="141" cy="90" r="1.5" fill="white"/>
    <path d="M108 108Q120 119 134 108" fill="none" stroke="#603C34" strokeWidth="3.4" strokeLinecap="round"/>
    <path d="M102 120L139 120L145 145L120 156L96 145Z" fill="#8F5945"/>
    <path d="M83 146Q102 129 120 143Q140 129 157 146L173 219Q120 238 66 219Z" fill="#267F91"/>
    <path d="M102 146L120 162L138 146" fill="none" stroke="#E0B66F" strokeWidth="5" strokeLinecap="round"/>
    <path d="M86 184Q120 199 154 184M82 199Q120 214 158 199" fill="none" stroke="#E3B76A" strokeWidth="3" strokeDasharray="3 5"/>
    <path d="M77 158Q63 173 69 193L91 202Q101 194 94 178L90 160Z M163 158Q177 173 171 193L149 202Q139 194 146 178L150 160Z" fill="#8F5945"/>
    <path d="M68 190Q80 185 89 195L86 207Q74 213 65 202ZM172 190Q160 185 151 195L154 207Q166 213 175 202Z" fill="#8F5945"/>
    <circle cx="80" cy="116" r="5" fill="#E5BD6B"/><circle cx="160" cy="116" r="5" fill="#E5BD6B"/>
  </g>;
}

function Augusto() {
  return <g>
    {/* silhouette: professor mais velho, baixo e sólido, blazer aberto */}
    <path d="M91 105Q73 116 76 150L64 185Q63 199 78 200L92 177L91 219Q93 233 108 233L116 220L118 252Q131 260 143 252L145 219L155 233Q169 233 169 218L159 174L176 199Q189 194 181 180L164 143Q165 117 146 105Z" fill="#247D91"/>
    <path d="M101 220L98 254Q112 262 125 255L128 222M145 220L151 255Q163 261 174 254L158 219" fill="#42424E"/>
    <path d="M92 253Q110 248 126 257L125 265Q107 270 90 264ZM153 256Q168 249 183 256L185 264Q168 270 151 264Z" fill="#E5B95E"/>
    <path d="M83 60Q81 23 120 22Q162 22 168 61L160 109Q145 134 120 136Q91 132 82 105Z" fill="#C9BEB1"/>
    <g fill="#C9BEB1"><circle cx="89" cy="43" r="12"/><circle cx="105" cy="28" r="12"/><circle cx="123" cy="25" r="12"/><circle cx="144" cy="31" r="13"/><circle cx="160" cy="47" r="12"/></g>
    <path d="M94 65Q102 43 122 42Q145 42 152 66L149 101Q141 122 120 123Q98 120 92 99Z" fill="#B97E5C"/>
    <path d="M91 70Q99 49 120 47Q142 46 155 69L148 78Q132 64 119 68Q103 64 94 83Z" fill="#C9BEB1"/>
    <path d="M102 82Q111 78 118 82M132 82Q141 78 148 83" fill="none" stroke="#51423A" strokeWidth="3.2" strokeLinecap="round"/>
    <ellipse cx="111" cy="91" rx="3.8" ry="5.5" fill="#2A2421"/><ellipse cx="140" cy="91" rx="3.8" ry="5.5" fill="#2A2421"/>
    <circle cx="112" cy="89" r="1.4" fill="white"/><circle cx="141" cy="89" r="1.4" fill="white"/>
    <path d="M105 107Q120 119 137 107Q132 126 120 126Q109 124 105 107Z" fill="#C9BEB1"/>
    <path d="M111 111Q120 115 130 110" fill="none" stroke="#5A3933" strokeWidth="3.2" strokeLinecap="round"/>
    <path d="M101 121L140 121L145 145L120 157L96 145Z" fill="#B97E5C"/>
    <path d="M79 145Q96 130 109 139L120 155L132 139Q147 130 162 145L176 206Q120 226 65 206Z" fill="#247D91"/>
    <path d="M98 139L120 160L142 139L136 212L120 221L104 212Z" fill="#F2E9D8"/>
    <path d="M102 140L120 160L138 140" fill="none" stroke="#D4C4AA" strokeWidth="4"/>
    <path d="M118 160L120 183L122 160Z" fill="#E5B95E"/>
    <path d="M78 155Q65 167 72 188L94 198Q105 192 97 177L90 160Z M162 155Q175 167 168 188L146 198Q135 192 143 177L150 160Z" fill="#B97E5C"/>
    <path d="M70 185Q81 180 91 190L88 201Q77 207 68 197ZM170 185Q159 180 149 190L152 201Q163 207 172 197Z" fill="#B97E5C"/>
    <path d="M84 205Q120 219 156 205L157 226Q120 240 83 226Z" fill="#1F687B"/>
    <rect x="135" y="177" width="16" height="19" rx="2.5" fill="#F1D18B"/>
  </g>;
}

function Caio() {
  return <g>
    {/* silhouette: jovem, leve e diagonal, moletom curto e calça afunilada */}
    <path d="M91 102Q75 113 78 150L65 186Q64 199 79 200L95 175L91 220Q93 232 107 232L115 218L118 255Q130 261 141 253L143 219L154 233Q168 233 168 218L158 173L175 198Q188 193 180 179L164 141Q164 112 144 102Z" fill="#D49A26"/>
    <path d="M105 220L102 255Q114 263 126 255L129 220M142 219L149 255Q160 262 171 253L156 218" fill="#294B59"/>
    <path d="M96 254Q111 249 126 257L125 265Q109 270 94 264ZM151 256Q165 249 178 256L180 264Q164 270 149 263Z" fill="#4E9E9C"/>
    <path d="M83 60Q81 24 120 22Q160 23 167 62L158 108Q145 133 120 134Q92 130 82 105Z" fill="#AE7252"/>
    <path d="M90 63Q97 41 121 41Q145 41 153 65L149 101Q141 122 120 123Q99 120 92 100Z" fill="#AE7252"/>
    <path d="M82 66L73 43L96 51L94 26L113 45L126 18L138 46L161 31L154 57L174 52L165 80Q146 62 121 65Q99 62 82 81Z" fill="#28232A"/>
    <g fill="#28232A"><path d="M77 67Q65 50 79 38L91 58Z"/><path d="M154 54Q171 39 176 56L162 72Z"/></g>
    <path d="M103 82Q111 77 118 82M132 82Q140 77 147 82" fill="none" stroke="#392924" strokeWidth="3.4" strokeLinecap="round"/>
    <ellipse cx="111" cy="91" rx="4" ry="5.6" fill="#251F1C"/><ellipse cx="140" cy="91" rx="4" ry="5.6" fill="#251F1C"/>
    <circle cx="112" cy="89" r="1.5" fill="white"/><circle cx="141" cy="89" r="1.5" fill="white"/>
    <path d="M111 106Q126 111 140 101" fill="none" stroke="#693D36" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M102 121L139 121L145 143L120 155L96 143Z" fill="#AE7252"/>
    <path d="M83 144Q101 130 120 142Q139 130 157 144L173 204Q120 222 67 204Z" fill="#D49A26"/>
    <path d="M95 146Q120 167 145 146L139 170Q120 184 101 170Z" fill="#294B59"/>
    <path d="M111 154L109 180M130 154L132 180" stroke="#F3DEAC" strokeWidth="3" strokeLinecap="round"/>
    <rect x="135" y="177" width="16" height="14" rx="3" fill="none" stroke="#4E9E9C" strokeWidth="3"/>
    <path d="M79 155Q66 168 73 187L93 197Q105 192 97 177L89 160Z M161 155Q174 168 167 187L147 197Q135 192 143 177L151 160Z" fill="#AE7252"/>
    <path d="M72 186Q82 181 91 191L89 201Q78 207 69 198ZM168 186Q158 181 149 191L151 201Q162 207 171 198Z" fill="#AE7252"/>
    <path d="M85 202Q120 217 155 202L151 226Q120 237 89 226Z" fill="#B27D20"/>
    <path d="M120 160L126 167L120 174L114 167Z" fill="#F4D27B"/>
  </g>;
}

function CharacterArt({ id }: { id: string }) {
  switch (id) {
    case 'prof.clara': return <Clara/>;
    case 'prof.lia': return <Lia/>;
    case 'prof.davi': return <Davi/>;
    case 'prof.iara': return <Iara/>;
    case 'prof.nina': return <Nina/>;
    case 'prof.ravi': return <Ravi/>;
    case 'prof.mateus': return <Mateus/>;
    case 'prof.marina': return <Marina/>;
    case 'prof.beatriz': return <Beatriz/>;
    case 'prof.sofia': return <Sofia/>;
    case 'prof.helena': return <Helena/>;
    case 'prof.augusto': return <Augusto/>;
    case 'prof.caio': return <Caio/>;
    default: return <Lia/>;
  }
}

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
      data-character-style="portico-humans-v16"
      data-character-anatomy="human"
      data-character-id={teacher.id}
      data-character-silhouette={teacher.id}
      data-character-pose={characterPose}
      data-character-mode={silhouette ? 'silhouette' : 'color'}
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
