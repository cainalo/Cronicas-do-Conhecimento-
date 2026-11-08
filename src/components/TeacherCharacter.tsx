import type { CSSProperties, ReactNode } from 'react';
import type { FictionalTeacher } from '@/content/teachers';

/** Pórtico V26: anatomia das mãos, união dos punhos e estrutura dos calçados. */
export type TeacherPose =
  | 'greeting' | 'presenting' | 'thinking' | 'celebrating' | 'listening'
  | 'hands-on-hips' | 'arms-down' | 'shrug' | 'arms-crossed'
  | 'hand-on-chin' | 'hands-forward' | 'one-hand-on-hip' | 'pointing' | 'one-hand-up';

type BodyShape = 'balanced'|'slender'|'broad'|'pear'|'rounded'|'straight'|'athletic';
type Profile = {
  skin:string; hair:string; top:string; bottom:string; shoes:string; accent:string;
  shoulder:number; waist:number; hem:number; leg:number; headW:number; headH:number;
  hairstyle:string; bodyShape?:BodyShape; lower?:'pants'|'skirt'; glasses?:'round'|'square';
  beard?:'full'|'short'|'moustache'; freckles?:boolean; earrings?:boolean;
  eye?:'wide'|'narrow'|'almond'; mouth?:'smile'|'open'|'soft'|'firm'|'crooked';
};
const P:Record<string,Profile> = {
 'prof.clara':{skin:'#B97050',hair:'#38251F',top:'#E96B51',bottom:'#D89A42',shoes:'#31576A',accent:'#FFD17D',shoulder:42,waist:31,hem:43,leg:25,headW:27,headH:43,hairstyle:'clara',bodyShape:'balanced',mouth:'open'},
 'prof.lia':{skin:'#8C543E',hair:'#3D2922',top:'#087F7C',bottom:'#253A48',shoes:'#E8B85C',accent:'#D5E6DF',shoulder:35,waist:27,hem:34,leg:21,headW:25,headH:42,hairstyle:'lia',bodyShape:'slender',mouth:'firm',eye:'narrow'},
 'prof.davi':{skin:'#663F30',hair:'#4A2D23',top:'#3673B1',bottom:'#244B69',shoes:'#E9D4B3',accent:'#79A9D0',shoulder:58,waist:39,hem:51,leg:30,headW:31,headH:45,hairstyle:'davi',bodyShape:'broad',beard:'full',mouth:'soft'},
 'prof.iara':{skin:'#A7684B',hair:'#38241F',top:'#7650A2',bottom:'#315C56',shoes:'#E0AD62',accent:'#D6B1E9',shoulder:41,waist:30,hem:44,leg:24,headW:27,headH:43,hairstyle:'iara',bodyShape:'pear',lower:'skirt',earrings:true,eye:'almond',mouth:'soft'},
 'prof.nina':{skin:'#F0C7A9',hair:'#31324A',top:'#F4EDE2',bottom:'#3B415B',shoes:'#E9C66D',accent:'#8890B6',shoulder:43,waist:34,hem:46,leg:25,headW:27,headH:42,hairstyle:'nina',bodyShape:'rounded',glasses:'round',eye:'wide',mouth:'open'},
 'prof.ravi':{skin:'#B87956',hair:'#29231F',top:'#2D8C5D',bottom:'#273E4A',shoes:'#E6B84E',accent:'#BCE0B8',shoulder:46,waist:30,hem:40,leg:27,headW:26,headH:42,hairstyle:'ravi',bodyShape:'athletic',beard:'short',mouth:'open'},
 'prof.mateus':{skin:'#E5B993',hair:'#513A2F',top:'#D66C37',bottom:'#364F5E',shoes:'#E9C36B',accent:'#F1C38B',shoulder:39,waist:35,hem:48,leg:23,headW:29,headH:45,hairstyle:'mateus',bodyShape:'straight',glasses:'square',mouth:'soft'},
 'prof.marina':{skin:'#995E46',hair:'#241F25',top:'#24866D',bottom:'#33485A',shoes:'#E7BE6C',accent:'#C3E2CB',shoulder:47,waist:31,hem:53,leg:23,headW:28,headH:43,hairstyle:'marina',bodyShape:'pear',lower:'skirt',earrings:true,mouth:'soft'},
 'prof.beatriz':{skin:'#C58D6B',hair:'#4B3029',top:'#76509B',bottom:'#34394E',shoes:'#E8C16A',accent:'#F0E6D8',shoulder:42,waist:29,hem:40,leg:24,headW:25,headH:45,hairstyle:'beatriz',bodyShape:'slender',eye:'narrow',mouth:'firm'},
 'prof.sofia':{skin:'#F0C8A9',hair:'#A54F38',top:'#E86D57',bottom:'#315574',shoes:'#EAC46B',accent:'#F0C46E',shoulder:44,waist:30,hem:42,leg:24,headW:27,headH:43,hairstyle:'sofia',bodyShape:'athletic',freckles:true,mouth:'open'},
 'prof.helena':{skin:'#8F5945',hair:'#211F27',top:'#267F91',bottom:'#50415D',shoes:'#E6B85D',accent:'#D1AA68',shoulder:49,waist:36,hem:55,leg:25,headW:28,headH:44,hairstyle:'helena',bodyShape:'pear',lower:'skirt',earrings:true,eye:'almond',mouth:'open'},
 'prof.augusto':{skin:'#B97E5C',hair:'#C9BEB1',top:'#247D91',bottom:'#42424E',shoes:'#E5B95E',accent:'#D4C4AA',shoulder:43,waist:34,hem:45,leg:24,headW:26,headH:42,hairstyle:'augusto',bodyShape:'broad',beard:'moustache',mouth:'soft'},
 'prof.caio':{skin:'#AE7252',hair:'#28232A',top:'#D49A26',bottom:'#294B59',shoes:'#4E9E9C',accent:'#F3DEAC',shoulder:38,waist:29,hem:39,leg:23,headW:27,headH:43,hairstyle:'caio',bodyShape:'slender',eye:'wide',mouth:'crooked'},
};

const H:Record<string,{back:string;front:string}> = {
 clara:{back:'M91 78 C76 72 74 53 83 39 C92 22 108 17 124 19 C145 17 163 31 166 50 C169 68 160 83 151 91 L150 132 Q143 141 137 130 L137 78 Q120 67 103 79 L102 132 Q94 141 88 130Z',front:'M84 68 C78 51 85 31 102 24 C114 15 132 17 143 25 C158 31 164 47 157 65 C151 60 145 55 139 50 C132 64 118 67 105 60 C99 66 92 69 84 68Z'},
 lia:{back:'M91 64 C86 40 99 21 120 20 C145 19 159 37 157 64 L158 126 Q153 139 145 128 L143 76 Q120 65 99 78 L98 128 Q91 138 85 126Z',front:'M91 63 C88 41 101 25 120 24 C139 22 152 36 151 55 C140 49 131 45 120 49 C110 53 101 63 91 72Z'},
 davi:{back:'M84 75 C77 56 83 34 102 26 C117 17 139 19 153 31 C168 44 167 63 158 81 L151 91 Q120 68 91 91Z',front:'M84 69 C81 49 92 30 110 27 C128 20 148 29 157 45 C147 42 138 39 128 43 C111 48 99 51 91 74Z'},
 iara:{back:'M89 74 C82 49 94 25 117 21 C141 17 157 34 157 60 L158 130 Q153 139 145 130 L143 76 Q121 66 99 82 L98 127 Q90 139 84 126Z M151 75 C165 87 166 111 159 129 C155 142 160 153 169 160 Q176 169 168 177 Q157 183 151 169 L140 146 L144 112Z',front:'M89 69 C87 45 99 28 118 25 C139 22 151 37 151 55 C140 51 134 47 123 50 C109 53 101 64 89 69Z'},
 nina:{back:'M80 91 C68 66 71 37 91 20 C107 6 135 7 153 20 C174 35 176 65 161 91 L158 127 Q152 139 145 128 L145 81 Q120 63 95 82 L95 128 Q86 138 80 126Z',front:'M78 78 C73 51 85 25 108 17 C132 8 155 23 163 45 C145 41 134 43 120 49 C105 55 92 69 78 78Z'},
 ravi:{back:'M91 70 C84 51 91 31 109 25 C128 18 148 28 154 47 C159 62 152 76 145 83 L139 75 Q120 65 100 81Z',front:'M89 64 C89 43 103 28 120 27 C140 25 151 39 151 55 C137 48 128 47 118 50 C106 54 100 60 89 64Z'},
 mateus:{back:'M88 75 C82 52 91 29 111 22 C133 14 154 27 159 48 C162 64 156 80 147 87 L143 76 Q120 67 97 84Z',front:'M88 63 C91 39 109 25 128 26 C145 27 154 39 153 53 C142 47 133 43 121 47 C108 51 98 59 88 69Z'},
 marina:{back:'M88 76 C77 53 84 26 108 18 C132 9 157 23 163 47 C169 68 160 89 156 108 L158 131 Q151 141 143 129 L143 77 Q120 64 98 83 L97 129 Q88 140 81 128Z',front:'M87 68 C85 43 101 24 122 23 C145 21 157 38 155 57 C144 49 135 44 124 48 C108 53 99 63 87 68Z'},
 beatriz:{back:'M94 68 C88 49 96 29 114 22 C131 16 148 27 153 45 C157 60 149 72 143 81 L137 75 Q120 62 101 82Z',front:'M91 63 C92 42 104 26 123 24 C141 24 151 37 150 52 C139 46 132 43 121 47 C108 52 101 58 91 63Z'},
 sofia:{back:'M87 80 C71 60 71 31 93 15 C112 1 144 6 160 27 C177 48 166 79 160 104 L160 147 Q154 160 145 147 L145 78 Q120 62 96 83 L96 146 Q86 158 80 145 L77 101Z',front:'M83 66 C74 43 88 19 109 14 C132 5 155 19 163 42 C151 38 141 39 132 45 C118 53 103 63 83 66Z'},
 helena:{back:'M88 73 C77 48 86 22 110 16 C135 8 158 26 158 54 L160 158 Q156 171 148 158 L143 82 Q120 64 97 83 L94 157 Q86 170 80 157Z M91 83 Q78 105 83 137 L88 174 Q94 182 100 172 L100 96Z M145 80 Q161 96 158 132 L153 171 Q146 181 140 170 L140 95Z',front:'M88 66 C86 44 100 24 121 22 C140 21 153 35 153 53 C139 46 130 44 119 49 C107 55 98 62 88 66Z'},
 augusto:{back:'M94 66 C88 46 98 28 116 24 C135 20 151 34 151 53 L148 69 Q121 56 96 72Z',front:'M93 62 C96 43 108 29 125 29 C141 29 150 40 149 53 C137 47 129 44 119 47 C109 50 102 57 93 62Z'},
 caio:{back:'M88 69 L78 42 L101 51 L99 24 L116 45 L128 13 L140 44 L164 29 L155 56 L180 51 L158 81 Q121 62 91 82Z',front:'M87 61 L78 40 L101 50 L99 23 L117 43 L128 11 L140 43 L164 28 L155 55 L178 49 L158 72 Q121 53 87 72Z'},
};

type Arms={left:string;right:string;lh:string;rh:string;cross?:string};
const LDOWN='M84 144 C76 149 72 163 69 178 L64 198 Q63 205 69 208 Q75 210 78 202 L88 172 Q92 161 101 157Z';
const RDOWN='M156 144 C164 149 168 163 171 178 L176 198 Q177 205 171 208 Q165 210 162 202 L152 172 Q148 161 139 157Z';
const HL='M61 198 C57 197 54 199 53 203 L51 208 C50 211 52 214 55 214 L58 213 L58 219 C58 223 61 225 64 222 L67 218 L68 223 C69 226 72 226 74 223 Q76 220 73 216 L71 210 Q77 207 74 203 L70 199 Q67 195 63 197Z';
const HR='M179 198 C183 197 186 199 187 203 L189 208 C190 211 188 214 185 214 L182 213 L182 219 C182 223 179 225 176 222 L173 218 L172 223 C171 226 168 226 166 223 Q164 220 167 216 L169 210 Q163 207 166 203 L170 199 Q173 195 177 197Z';
function armsFor(pose:TeacherPose):Arms {
 const base={left:LDOWN,right:RDOWN,lh:HL,rh:HR};
 switch(pose){
  case 'hands-on-hips': case 'one-hand-on-hip':
   return {
    left:'M83 144 C74 149 71 163 77 175 L94 190 Q102 196 108 189 Q112 182 103 176 L91 159Z',
    right:'M157 144 C166 149 169 163 163 175 L146 190 Q138 196 132 189 Q128 182 137 176 L149 159Z',
    lh:'M98 181 C94 179 91 182 91 185 Q90 188 94 191 L98 196 Q101 199 105 197 L110 194 Q113 192 111 189 L107 188 L103 190 L102 184 Q101 181 98 181Z',
    rh:'M142 181 C146 179 149 182 149 185 Q150 188 146 191 L142 196 Q139 199 135 197 L130 194 Q127 192 129 189 L133 188 L137 190 L138 184 Q139 181 142 181Z'
   };
  case 'presenting':
   return {...base,
    right:'M158 143 C169 147 178 151 187 156 L201 161 Q207 164 203 171 L198 176 Q194 179 189 174 L175 168 L154 163Z',
    rh:'M198 160 C201 158 204 158 207 160 L218 162 Q222 163 221 166 Q220 169 216 168 L208 166 L220 170 Q224 172 222 175 Q220 178 216 176 L207 172 L216 179 Q219 182 216 185 Q213 187 210 184 L201 176 C196 172 194 168 196 164Z'
   };
  case 'one-hand-up': case 'greeting': case 'pointing':
   return {...base,
    right:'M158 143 C168 137 171 122 174 105 L178 86 Q181 77 188 80 Q195 83 192 93 L184 125 Q179 151 166 165Z',
    rh:'M181 95 C176 94 173 90 174 86 L176 82 L173 72 Q172 68 176 67 Q179 66 181 70 L184 79 L183 66 Q183 61 187 61 Q191 61 191 66 L192 79 L195 69 Q197 65 201 67 Q204 69 201 73 L197 86 L200 79 Q202 76 205 78 Q208 80 205 84 L198 96 C194 101 187 101 183 98Z'
   };
  case 'hand-on-chin': case 'thinking':
   return {...base,
    right:'M158 143 C169 151 169 165 160 174 L147 164 L139 137 Q137 125 145 119 Q153 116 159 128Z',
    rh:'M143 125 C139 123 137 119 139 115 L144 107 Q147 103 150 105 Q153 107 151 111 L148 117 L154 113 Q157 111 159 114 Q161 117 158 120 L151 128 Q147 131 143 128Z'
   };
  case 'celebrating':
   return {
    left:'M83 143 C72 136 70 120 67 103 L62 87 Q60 78 68 74 Q76 72 80 82 L85 112 Q90 138 101 156Z',
    right:'M157 143 C168 136 170 120 173 103 L178 87 Q180 78 172 74 Q164 72 160 82 L155 112 Q150 138 139 156Z',
    lh:'M59 91 C55 91 52 88 53 84 L55 78 Q57 73 61 75 L65 78 L65 73 Q66 69 70 71 L74 75 Q77 78 74 82 L68 91 Q64 95 60 93Z',
    rh:'M181 91 C185 91 188 88 187 84 L185 78 Q183 73 179 75 L175 78 L175 73 Q174 69 170 71 L166 75 Q163 78 166 82 L172 91 Q176 95 180 93Z'
   };
  case 'hands-forward':
   return {
    left:'M83 143 C71 148 68 162 77 175 L101 190 Q110 196 115 188 Q119 180 108 173 L94 154Z',
    right:'M157 143 C169 148 172 162 163 175 L139 190 Q130 196 125 188 Q121 180 132 173 L146 154Z',
    lh:'M106 184 C102 181 99 183 99 187 L101 191 L96 187 Q93 184 90 187 Q88 190 91 193 L102 203 C106 207 113 207 118 203 L122 199 Q125 195 121 192 L114 188 L112 184 Q110 181 106 184Z',
    rh:'M134 184 C138 181 141 183 141 187 L139 191 L144 187 Q147 184 150 187 Q152 190 149 193 L138 203 C134 207 127 207 122 203 L118 199 Q115 195 119 192 L126 188 L128 184 Q130 181 134 184Z'
   };
  case 'listening':
   return {...base,
    left:'M83 143 C72 138 68 124 67 108 L67 92 Q68 83 76 83 Q84 84 82 94 L84 119 Q91 139 101 157Z',
    lh:'M62 96 C57 95 53 92 52 87 L50 79 Q49 75 52 73 Q55 72 57 76 L60 83 L59 72 Q59 68 63 68 Q67 68 67 72 L68 83 L71 75 Q73 72 76 74 Q79 76 77 80 L73 91 Q69 98 62 98Z'
   };
  case 'shrug':
   return {
    left:'M83 143 C72 137 68 124 64 110 L58 96 Q54 88 62 83 Q70 80 75 89 L83 112 Q91 138 101 155Z',
    right:'M157 143 C168 137 172 124 176 110 L182 96 Q186 88 178 83 Q170 80 165 89 L157 112 Q149 138 139 155Z',
    lh:'M58 101 C54 101 51 98 51 94 L49 88 Q48 84 52 82 L60 82 L66 78 Q70 76 73 80 Q76 84 72 88 L68 96 Q64 102 58 101Z',
    rh:'M182 101 C186 101 189 98 189 94 L191 88 Q192 84 188 82 L180 82 L174 78 Q170 76 167 80 Q164 84 168 88 L172 96 Q176 102 182 101Z'
   };
  default:
   return {...base,cross:pose==='arms-crossed'?'M78 166 Q91 155 106 169 Q120 182 137 169 Q151 157 163 167 L157 184 Q139 199 120 190 Q101 201 83 184Z':undefined};
 }
}
function legSpread(p:Profile){
 return Math.max(16,Math.min(21,Math.round(p.leg*.68)));
}
function bodyDimensions(p:Profile){
 const shape=p.bodyShape??'balanced';
 let shoulder=p.shoulder,waist=p.waist,hip=p.hem;
 switch(shape){
  case 'slender': shoulder-=2; waist-=4; hip-=3; break;
  case 'broad': shoulder+=5; waist+=2; hip+=5; break;
  case 'pear': shoulder-=2; waist-=3; hip+=8; break;
  case 'rounded': shoulder+=1; waist+=6; hip+=6; break;
  case 'straight': shoulder-=2; waist+=1; hip+=2; break;
  case 'athletic': shoulder+=5; waist-=4; hip+=1; break;
 }
 return {shoulder,waist,hip,shape};
}
function torso(p:Profile){
 const {shoulder:s,waist:w,hip:h}=bodyDimensions(p);
 const left=120-s,right=120+s;
 return `M ${left} 145
 C ${left+4} 137 ${left+13} 134 108 142
 Q 113 149 120 150
 Q 127 149 132 142
 C ${right-13} 134 ${right-4} 137 ${right} 145
 C ${right-1} 153 ${right-4} 160 ${right-7} 168
 C ${120+w+3} 176 ${120+w+1} 183 ${120+w+4} 190
 Q ${120+w+5} 197 ${120+h} 202
 Q 120 211 ${120-h} 202
 Q ${120-w-5} 197 ${120-w-4} 190
 C ${120-w-1} 183 ${120-w-3} 176 ${left+7} 168
 C ${left+4} 160 ${left+1} 153 ${left} 145 Z`;
}
function lower(p:Profile){
 const {hip:h}=bodyDimensions(p);
 if(p.lower==='skirt') return `M ${120-h} 190
 C ${120-h+10} 197 ${120+h-10} 197 ${120+h} 190
 L ${120+h+9} 217 Q 120 229 ${120-h-9} 217 Z`;
 const spread=legSpread(p),left=120-spread,right=120+spread;
 return `M ${120-h} 197
 C ${120-h+11} 203 ${left-17} 206 ${left-16} 219
 L ${left-19} 250
 Q ${left-19} 260 ${left-7} 262
 Q ${left+5} 263 ${left+9} 252
 L ${left+10} 224
 C ${left+12} 228 114 231 120 231
 C 126 231 ${right-12} 228 ${right-10} 224
 L ${right-9} 252
 Q ${right-5} 263 ${right+7} 262
 Q ${right+19} 260 ${right+19} 250
 L ${right+16} 219
 C ${right+17} 206 ${120+h-11} 203 ${120+h} 197
 Q 120 210 ${120-h} 197 Z`;
}
function calves(p:Profile){
 const spread=legSpread(p),left=120-spread,right=120+spread;
 return [
  `M ${left-7} 211 Q ${left} 207 ${left+7} 211 L ${left+9} 253 Q ${left+8} 261 ${left} 262 Q ${left-8} 261 ${left-9} 253 Z`,
  `M ${right-7} 211 Q ${right} 207 ${right+7} 211 L ${right+9} 253 Q ${right+9} 261 ${right} 262 Q ${right-8} 261 ${right-9} 253 Z`
 ];
}
function shoes(p:Profile){
 const spread=legSpread(p),left=120-spread,right=120+spread;
 return [
  `M ${left-7} 249 C ${left-3} 248 ${left+2} 250 ${left+5} 254 L ${left+9} 257 L ${left+13} 258 Q ${left+17} 260 ${left+15} 264 Q ${left+13} 267 ${left+7} 266 L ${left-10} 265 Q ${left-16} 264 ${left-16} 259 Q ${left-15} 255 ${left-11} 252 L ${left-7} 249 Z`,
  `M ${right+7} 249 C ${right+3} 248 ${right-2} 250 ${right-5} 254 L ${right-9} 257 L ${right-13} 258 Q ${right-17} 260 ${right-15} 264 Q ${right-13} 267 ${right-7} 266 L ${right+10} 265 Q ${right+16} 264 ${right+16} 259 Q ${right+15} 255 ${right+11} 252 L ${right+7} 249 Z`
 ];
}
function shoeSoles(p:Profile){
 const spread=legSpread(p),left=120-spread,right=120+spread;
 return [
  `M ${left-16} 259 Q ${left-11} 262 ${left-5} 262 L ${left+10} 263 Q ${left+14} 263 ${left+16} 260 L ${left+15} 265 Q ${left+13} 268 ${left+7} 268 L ${left-10} 267 Q ${left-16} 266 ${left-16} 262 Z`,
  `M ${right+16} 259 Q ${right+11} 262 ${right+5} 262 L ${right-10} 263 Q ${right-14} 263 ${right-16} 260 L ${right-15} 265 Q ${right-13} 268 ${right-7} 268 L ${right+10} 267 Q ${right+16} 266 ${right+16} 262 Z`
 ];
}
function head(p:Profile){
 const w=p.headW,h=p.headH;
 return 'M '+(120-w)+' 75 C '+(120-w+1)+' '+(63-h*.35)+' 101 '+(82-h)+' 120 '+(82-h)+' C 139 '+(82-h)+' '+(120+w-1)+' '+(63-h*.35)+' '+(120+w)+' 75 L '+(120+w-2)+' 103 C '+(120+w-5)+' 119 130 '+(82+h)+' 120 '+(82+h)+' C 110 '+(82+h)+' '+(120-w+5)+' 119 '+(120-w+2)+' 103 Z';
}
function SilhouetteArt({id,monochrome=false,pose='arms-down'}:{id:string;monochrome?:boolean;pose?:TeacherPose}){
 const p=P[id]??P['prof.lia'], hair=H[p.hairstyle]??H.lia, a=armsFor(pose), sole=shoes(p), soles=shoeSoles(p);
 const {shoulder:shoulderWidth}=bodyDimensions(p);
 const armLeftX=Math.round(120-shoulderWidth*.86),armRightX=240-armLeftX;
 const f=(c:string)=>monochrome?'#1E2529':c, seam=monochrome?'#1E2529':'none';
 return <g data-silhouette-art={id} aria-hidden="true" stroke={seam} strokeWidth={monochrome?1.8:0} strokeLinejoin="round" strokeLinecap="round">
  <g data-head-group="v26" transform="translate(120 90) scale(.92 .90) translate(-120 -90)">
   <path d={hair.back} fill={f(p.hair)}/>
   <path d={head(p)} fill={f(p.skin)}/>
   <path d={hair.front} fill={f(p.hair)}/>
  </g>
  {p.lower==='skirt'&&calves(p).map((d,i)=><path key={'calf-'+i} d={d} fill={f(p.skin)}/>)}
  <path data-connected-lower-body="true" d={lower(p)} fill={f(p.bottom)}/>
  <g data-arm="left" data-wrist-join="v26" transform={`translate(${armLeftX-82} 0)`}><path d={a.left} fill={f(p.top)}/><path data-hand="left" data-hand-anatomy="v26" d={a.lh} fill={f(p.skin)}/></g>
  <g data-arm="right" data-wrist-join="v26" transform={`translate(${armRightX-158} 0)`}><path d={a.right} fill={f(p.top)}/><path data-hand="right" data-hand-anatomy="v25" d={a.rh} fill={f(p.skin)}/></g>
  <path data-neck="true" d="M110 111 Q120 117 130 111 L130 141 Q127 153 120 155 Q113 153 110 141Z" fill={f(p.skin)}/>
  <path data-connected-body="true" d={torso(p)} fill={f(p.top)}/>
  {sole.map((d,i)=><path key={i} data-footwear="true" data-shoe-shape="v26" d={d} fill={f(p.shoes)}/>)}
  {soles.map((d,i)=><path key={"sole-"+i} data-shoe-sole="v26" d={d} fill={f(monochrome?"#1E2529":"#263B45")}/>)}
  {a.cross&&<path d={a.cross} fill={f(p.top)}/>}
 </g>;
}

export const TEACHER_FACE_EXPRESSIONS:Record<string,string>={
 'prof.clara':'alegre e acolhedora','prof.lia':'atenta e concentrada','prof.davi':'confiante e caloroso',
 'prof.iara':'serena e observadora','prof.nina':'curiosa e questionadora','prof.ravi':'entusiasmado e colaborativo',
 'prof.mateus':'gentil e paciente','prof.marina':'tranquila e estratégica','prof.beatriz':'firme e criteriosa',
 'prof.sofia':'espontânea e animada','prof.helena':'expressiva e segura','prof.augusto':'sereno e experiente','prof.caio':'curioso e levemente cético'
};
const FACE:Record<string,{brow:string;mouth:string;eye?:'wide'|'narrow'|'almond'}>={
 'prof.clara':{brow:'M104 80 Q111 75 118 81 M132 81 Q140 75 148 80',mouth:'M111 111 Q121 123 134 111 Q131 123 121 123 Q114 121 111 111Z',eye:'wide'},
 'prof.lia':{brow:'M103 82 L118 81 M132 81 L147 83',mouth:'M112 117 Q121 120 131 116',eye:'narrow'},
 'prof.davi':{brow:'M100 84 Q110 77 120 84 M132 84 Q142 77 152 84',mouth:'M110 115 Q121 122 133 115',eye:'wide'},
 'prof.iara':{brow:'M103 82 Q111 77 119 82 M132 82 Q140 77 148 82',mouth:'M111 116 Q121 122 132 116',eye:'almond'},
 'prof.nina':{brow:'M102 78 Q110 72 118 78 M132 78 Q141 72 149 78',mouth:'M111 111 Q121 123 134 111 Q131 123 121 123 Q114 121 111 111Z',eye:'wide'},
 'prof.ravi':{brow:'M103 81 Q111 75 119 81 M132 81 Q140 75 148 81',mouth:'M109 110 Q121 124 136 110 Q132 124 121 124 Q112 122 109 110Z',eye:'wide'},
 'prof.mateus':{brow:'M103 82 Q110 77 118 82 M133 82 Q140 77 147 82',mouth:'M110 116 Q122 123 134 116',eye:'wide'},
 'prof.marina':{brow:'M104 82 Q112 76 119 82 M132 82 Q140 76 147 82',mouth:'M112 116 Q122 122 132 116',eye:'narrow'},
 'prof.beatriz':{brow:'M102 80 L119 83 M132 83 L149 80',mouth:'M112 117 Q121 120 132 117',eye:'narrow'},
 'prof.sofia':{brow:'M103 80 Q111 74 119 80 M132 80 Q140 74 148 80',mouth:'M109 110 Q121 124 136 110 Q132 124 121 124 Q112 122 109 110Z',eye:'wide'},
 'prof.helena':{brow:'M101 81 Q111 73 120 81 M131 81 Q141 73 150 81',mouth:'M109 109 Q121 124 137 109 Q133 124 120 124 Q112 122 109 109Z',eye:'almond'},
 'prof.augusto':{brow:'M104 82 Q112 77 119 82 M131 82 Q139 77 146 82',mouth:'M112 119 Q121 122 131 119',eye:'narrow'},
 'prof.caio':{brow:'M102 79 L118 83 M133 84 Q141 80 149 86',mouth:'M113 116 Q122 120 136 113',eye:'wide'}
};
function CharacterDetails({id}:{id:string}){
 const p=P[id]??P['prof.lia'],f=FACE[id]??FACE['prof.lia'];
 const open=f.mouth.includes('Z');
 return <g data-character-details={'v26-'+id}>
  <path d={f.brow} fill="none" stroke={p.hair} strokeWidth="3.1" strokeLinecap="round"/>
  {f.eye==='almond'
   ? <><path d="M104 91 Q112 84 119 91 Q112 99 104 91Z M132 91 Q140 84 147 91 Q140 99 132 91Z" fill="#2A211F"/><circle cx="112" cy="91" r="2" fill="#FFF5E9"/><circle cx="140" cy="91" r="2" fill="#FFF5E9"/></>
   : <><ellipse cx="112" cy="92" rx={f.eye==='wide'?4:3.1} ry={f.eye==='wide'?5.1:4.1} fill="#28211F"/><ellipse cx="140" cy="92" rx={f.eye==='wide'?4:3.1} ry={f.eye==='wide'?5.1:4.1} fill="#28211F"/><circle cx="113" cy="90" r="1.3" fill="#FFF5E9"/><circle cx="141" cy="90" r="1.3" fill="#FFF5E9"/></>}
  <path d="M121 98 L118 104 Q120 107 124 105" fill="none" stroke="#81513F" strokeWidth="1.8" strokeLinecap="round"/>
  {p.glasses==='round'&&<><circle cx="112" cy="92" r="13.5" fill="none" stroke={p.hair} strokeWidth="2.8"/><circle cx="140" cy="92" r="13.5" fill="none" stroke={p.hair} strokeWidth="2.8"/><path d="M125 91 Q126 88 127 91" fill="none" stroke={p.hair} strokeWidth="2.5"/></>}
  {p.glasses==='square'&&<><rect x="98" y="82" width="26" height="20" rx="5" fill="none" stroke="#6A5144" strokeWidth="2.2"/><rect x="129" y="82" width="26" height="20" rx="5" fill="none" stroke="#6A5144" strokeWidth="2.2"/><path d="M124 91 L129 91" stroke="#6A5144" strokeWidth="2.2"/></>}
  {p.freckles&&<g fill="#C98270"><circle cx="97" cy="104" r="1.9"/><circle cx="103" cy="108" r="1.8"/><circle cx="145" cy="104" r="1.9"/><circle cx="151" cy="108" r="1.8"/></g>}
  {p.beard==='full'&&<path d="M94 103 Q97 127 120 135 Q143 127 147 103 L143 122 Q134 139 120 140 Q105 139 98 122Z" fill={p.hair}/>}
  {p.beard==='short'&&<path d="M101 115 Q120 129 139 115 L135 127 Q120 137 105 127Z" fill={p.hair}/>}
  {p.beard==='moustache'&&<path d="M108 108 Q115 103 120 109 Q125 103 133 108 Q129 117 120 114 Q111 117 108 108Z" fill={p.hair}/>}
  {p.earrings&&<g fill={p.accent}><circle cx="91" cy="111" r="3.2"/><circle cx="151" cy="111" r="3.2"/></g>}
  {p.beard==='moustache'&&<path d="M111 121 Q120 125 130 121" fill="none" stroke="#5A3933" strokeWidth="2.1" strokeLinecap="round"/>}
  <path d={f.mouth} fill={open?'#713E39':'none'} stroke="#713E39" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round"/>
  {open&&<path d="M112 114 Q122 123 134 113" fill="none" stroke="#FFF4E8" strokeWidth="2.4" strokeLinecap="round"/>}
  <path d="M108 150 Q120 158 132 150" fill="none" stroke={p.accent} strokeWidth="3.4" strokeLinecap="round"/>
  <path d="M120 159 V194" fill="none" stroke={p.top} strokeWidth="2.4" strokeLinecap="round"/>
  <circle cx="120" cy="178" r="3" fill={p.accent}/>
 </g>;
}

export const TEACHER_SIGNATURE_POSES:Record<string,TeacherPose>={
 'prof.clara':'presenting','prof.lia':'hands-on-hips','prof.davi':'arms-crossed','prof.iara':'one-hand-up',
 'prof.nina':'hand-on-chin','prof.ravi':'celebrating','prof.mateus':'arms-down','prof.marina':'greeting',
 'prof.beatriz':'hands-forward','prof.sofia':'one-hand-up','prof.helena':'listening','prof.augusto':'pointing','prof.caio':'shrug'
};

export function TeacherCharacter({teacher,pose,size=160,className='',portrait=false,silhouette=false}:{
 teacher:FictionalTeacher;pose?:TeacherPose;size?:number;className?:string;portrait?:boolean;silhouette?:boolean;
}){
 const characterPose=pose??TEACHER_SIGNATURE_POSES[teacher.id]??'presenting';
 const style:CSSProperties=portrait?{width:size,height:size}:{width:Math.round(size*.89),height:size};
 return <svg viewBox={portrait?'35 10 170 170':'0 0 240 270'} width={style.width} height={style.height}
  className={'shrink-0 '+(portrait?'rounded-full overflow-hidden ':'overflow-visible ')+className} style={style}
  role="img" aria-label={teacher.name+', professor humano ilustrado do Pórtico'}
  data-character-style="portico-humans-v26" data-character-anatomy="human" data-character-id={teacher.id}
  data-character-silhouette={teacher.id} data-character-body-shape={P[teacher.id]?.bodyShape??"balanced"} data-character-pose={characterPose}
  data-character-mode={silhouette?'silhouette':'color'} data-character-renderer="organic-v26"
  data-character-face-design={teacher.id} data-character-expression={TEACHER_FACE_EXPRESSIONS[teacher.id]??'expressão neutra'} focusable="false">
  {portrait&&<circle cx="120" cy="98" r="90" fill={'rgb(var(--'+teacher.tone+'))'}/>}
  {!portrait&&!silhouette&&<ellipse cx="120" cy="263" rx="37" ry="4" fill="#263B45" opacity=".12"/>}
  <SilhouetteArt id={teacher.id} monochrome={silhouette} pose={characterPose}/>
  {!silhouette&&<g data-head-group="details" transform="translate(120 90) scale(.92 .90) translate(-120 -90)"><CharacterDetails id={teacher.id}/></g>}
 </svg>;
}

export function TeacherScene({teacher,pose,size=174,eyebrow='AULA COM SEU PROFESSOR',heading,message,className=''}:{
 teacher:FictionalTeacher;pose?:TeacherPose;size?:number;eyebrow?:string;heading:string;message:ReactNode;className?:string;
}){
 return <section className={'teacher-scene '+className} style={{'--teacher-tone':'rgb(var(--'+teacher.tone+'))'} as CSSProperties} aria-label={teacher.name+' explicando: '+heading}>
  <div className="teacher-scene__portrait"><TeacherCharacter teacher={teacher} pose={pose} size={size} className="teacher-scene__figure"/><span className="teacher-scene__name">{teacher.name}</span></div>
  <div className="teacher-scene__lesson"><p className="teacher-scene__eyebrow">{eyebrow} · {teacher.expertiseLabel}</p><h2 className="teacher-scene__heading">{heading}</h2><div className="teacher-scene__speech"><span className="teacher-scene__quote" aria-hidden="true">“</span><div>{message}</div></div></div>
 </section>;
}

export function TeacherCue({teacher,pose,size=98,children,compact=false,className=''}:{
 teacher:FictionalTeacher;pose?:TeacherPose;size?:number;children:ReactNode;compact?:boolean;className?:string;
}){
 return <div className={'teacher-cue flex items-center gap-2.5 rounded-2xl border px-3 py-2 '+(compact?'min-h-[4.5rem]':'min-h-[6rem]')+' '+className}
  style={{borderColor:'rgb(var(--'+teacher.tone+') / .28)',backgroundColor:'rgb(var(--'+teacher.tone+') / .07)'}} aria-label={'Professor '+teacher.name}>
  <TeacherCharacter teacher={teacher} pose={pose} size={size} portrait/>
  <div className="min-w-0 flex-1"><p className="text-[.68rem] font-bold uppercase tracking-[.11em] text-muted">{teacher.name} · {teacher.expertiseLabel}</p><div className="mt-1 text-sm leading-snug text-ink">{children}</div></div>
 </div>;
}
