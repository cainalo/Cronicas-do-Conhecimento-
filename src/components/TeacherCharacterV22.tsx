import type { CSSProperties, ReactNode } from 'react';
import type { FictionalTeacher } from '@/content/teachers';

/**
 * V22 — elenco humano do Pórtico.
 * Arte estática: silhueta, rosto, cabelo e roupa. Movimento e poses ficam para outra etapa.
 */
export type TeacherPose =
  | 'greeting' | 'presenting' | 'thinking' | 'celebrating' | 'listening'
  | 'hands-on-hips' | 'arms-down' | 'shrug' | 'arms-crossed' | 'hand-on-chin'
  | 'hands-forward' | 'one-hand-on-hip' | 'pointing' | 'one-hand-up';

export const TEACHER_SIGNATURE_POSES: Record<string, TeacherPose> = {
  'prof.clara':'presenting', 'prof.lia':'presenting', 'prof.davi':'presenting',
  'prof.iara':'presenting', 'prof.nina':'presenting', 'prof.ravi':'presenting',
  'prof.mateus':'presenting', 'prof.marina':'presenting', 'prof.beatriz':'presenting',
  'prof.sofia':'presenting', 'prof.helena':'presenting', 'prof.augusto':'presenting',
  'prof.caio':'presenting',
};

type CharacterDesign = {
  artId: string;
  faceShape: string;
  skin: string;
  hair: string;
  hairBack: string;
  hairFront: string;
  hairStrands?: string;
  face: string;
  silhouette: string;
  shirt: string;
  bottomColor: string;
  torso: string;
  lower: string;
  leftArm: string;
  rightArm: string;
  eyes: [number, number, number];
  eyeSize: [number, number];
  eyeStyle: 'round' | 'almond' | 'soft' | 'wide';
  pupilSize: number;
  headScale: [number, number];
  bodyScale: [number, number];
  nose: string;
  brow: string;
  mouth: string;
  glasses?: boolean;
  earrings?: boolean;
  freckles?: boolean;
  beard?: string;
  mustache?: string;
  signature: string;
  hairLabel: string;
  outfitLabel: string;
  bodyLabel: string;
  toneLabel: string;
};

const INK = '#49352F';
const PAPER = '#FFF8EA';
const DESIGNS: Record<string, CharacterDesign> = {
  'prof.clara': {
    artId:'clara',
    faceShape:'full-soft',
    skin:'#D99568', hair:'#4B2C25',
    hairBack:'M46 88C35 62 44 31 69 22C91 11 122 21 134 47C142 65 139 91 128 112L138 166C124 174 111 164 109 150L66 160C53 146 54 120 46 88Z',
    hairFront:'M48 64C44 43 57 24 78 19C102 12 125 27 131 49C120 46 113 40 107 31C98 46 82 48 67 47C62 58 57 63 48 64Z M51 55C54 40 62 31 73 29C69 40 63 47 51 55Z',
    hairStrands:'M56 55Q63 38 78 31M112 37Q126 50 126 68M58 102Q57 118 65 131',
    face:'M55 53C59 32 78 27 94 31C115 34 127 51 124 74C122 96 109 113 93 117C74 116 57 101 54 78C52 67 52 59 55 53Z',
    silhouette:'M66 110C57 113 54 123 53 135L48 157C46 166 50 173 57 174C63 175 67 169 69 160L73 145C69 168 63 191 62 225L87 225L94 184L101 225L137 225C136 191 132 168 128 145L133 161C136 171 143 175 149 171C154 167 151 159 148 151L138 127C134 115 123 109 112 108C96 105 80 106 66 110Z',
    shirt:'#C45A36', bottomColor:'#EED5B3', torso:'M65 112C76 105 111 105 123 116C132 127 134 152 139 174C120 184 77 184 58 172C62 149 57 126 65 112Z',
    lower:'M60 168C81 176 119 176 139 168C142 185 137 204 132 223L108 223L100 187L91 223L66 223C61 204 56 185 60 168Z',
    leftArm:'M69 119C57 124 53 142 51 158C49 169 55 177 65 174C72 170 72 156 77 146Z',
    rightArm:'M120 119C132 123 139 142 141 159C142 169 136 176 128 171C121 166 124 149 114 142Z',
    eyes:[76,105,74], eyeSize:[6.6,9.2], eyeStyle:'round', pupilSize:2.7, nose:'M88 83Q92 87 96 83', brow:'M68 66Q77 60 85 65M96 64Q105 59 112 65',
    headScale:[1.14,1.11],
    bodyScale:[0.98,0.95],
    mouth:'M80 89Q94 103 108 88Q105 107 94 108Q83 106 80 89Z',
    earrings:true, freckles:true, signature:'Curiosa e acolhedora',
    hairLabel:'Cabelo longo, ondulado e volumoso', outfitLabel:'Blusa terracota e calça ampla creme',
    bodyLabel:'Silhueta leve, cabelo como forma principal', toneLabel:'Quente e acessível',
  },
  'prof.lia': {
    artId:'lia',
    faceShape:'narrow-oval',
    skin:'#B97554', hair:'#2C2325',
    hairBack:'M57 57C56 34 73 22 91 22C113 22 128 38 128 59L126 107L116 123L65 116Z',
    hairFront:'M57 59C57 38 70 24 92 23C111 22 127 36 128 54C113 49 105 39 101 34C93 47 78 55 57 59Z M62 53C69 43 77 37 86 34C81 44 74 51 62 53Z',
    hairStrands:'M62 49Q72 35 86 31M105 32Q119 42 123 57',
    face:'M64 48C71 32 84 29 95 31C110 33 118 47 117 66C116 89 106 108 93 112C79 108 66 93 63 71C61 62 61 54 64 48Z',
    silhouette:'M68 108C59 111 55 122 55 135L52 153C50 162 54 169 60 170C66 171 69 166 71 158L75 143C71 167 70 194 70 225L91 225L94 184L99 225L124 225C125 194 122 166 119 143L124 158C127 167 134 171 140 167C146 163 143 155 140 147L132 126C128 114 119 108 109 107C95 105 80 105 68 108Z',
    shirt:'#6D854B', bottomColor:'#E9D7B8', torso:'M68 106C81 99 107 101 119 111C128 124 127 149 130 170C110 181 75 181 55 169C60 147 59 119 68 106Z',
    lower:'M59 166C78 173 111 173 132 165C136 183 132 202 130 223L104 223L99 187L88 223L63 223C60 202 56 182 59 166Z',
    leftArm:'M69 115C58 122 57 144 58 159C58 170 65 174 73 168L80 140Z',
    rightArm:'M119 116C130 126 134 145 134 159C133 169 125 173 119 164L110 139Z',
    eyes:[80,101,73], eyeSize:[6.1,8.8], eyeStyle:'almond', pupilSize:2.25, nose:'M89 82Q92 86 95 83', brow:'M70 61Q78 57 86 61M98 60Q105 56 112 60',
    headScale:[1.14,1.16],
    bodyScale:[0.92,0.96],
    mouth:'M86 91Q94 96 102 90Q100 99 94 99Q88 98 86 91Z',
    glasses:true, signature:'Metódica e investigativa',
    hairLabel:'Coque alto e franja lateral', outfitLabel:'Blusa verde-oliva e calça clara',
    bodyLabel:'Silhueta compacta com coque alto', toneLabel:'Prática e concentrada',
  },
  'prof.davi': {
    artId:'davi',
    faceShape:'broad-jaw',
    skin:'#8F533C', hair:'#241C1B',
    hairBack:'M52 64C44 56 49 43 57 39C52 27 63 18 75 24C80 11 96 13 101 24C113 14 129 25 125 38C138 47 135 61 127 68L126 105L57 108Z',
    hairFront:'M51 61C43 50 49 38 59 37C57 24 72 17 81 27C88 15 105 18 108 32C123 29 133 42 126 55C119 55 113 48 108 42C100 53 88 54 77 50C69 59 60 63 51 61Z',
    hairStrands:'M55 49Q62 34 75 29M92 25Q108 27 117 42',
    face:'M56 49C61 32 77 28 94 30C113 32 126 46 125 66L122 86C118 103 106 113 92 114C77 113 64 103 59 86L56 66C55 59 55 53 56 49Z',
    silhouette:'M61 108C50 112 47 124 45 138L42 157C41 167 47 174 55 174C63 174 66 167 68 157L73 143C67 167 65 195 64 225L89 225L94 184L100 225L137 225C136 195 132 168 127 143L132 158C135 169 143 174 151 171C158 168 156 160 153 151L145 128C141 115 130 108 119 107C98 103 78 104 61 108Z',
    shirt:'#477A48', bottomColor:'#34343C', torso:'M62 108C77 101 110 103 125 115C131 129 133 153 137 171C118 182 72 181 52 169C57 147 54 122 62 108Z',
    lower:'M54 166C73 174 116 174 137 166C138 185 135 202 131 223L107 223L100 188L90 223L66 223C60 202 55 184 54 166Z',
    leftArm:'M64 117C53 126 48 143 51 159C53 170 63 173 69 164L78 139Z',
    rightArm:'M123 117C136 125 142 142 140 157C139 170 129 174 123 163L113 139Z',
    eyes:[75,106,73], eyeSize:[7,9.3], eyeStyle:'round', pupilSize:2.7, nose:'M88 83Q92 88 97 83', brow:'M67 61Q77 55 86 60M97 60Q107 54 115 60',
    headScale:[1.15,1.12],
    bodyScale:[1.05,0.95],
    mouth:'M79 88Q94 103 109 87Q106 108 94 109Q82 107 79 88Z',
    beard:'M65 83C69 101 81 112 94 113C108 112 119 101 123 82C117 109 107 122 93 123C78 121 68 107 65 83Z',
    signature:'Conversador e visual',
    hairLabel:'Cachos curtos e densos', outfitLabel:'Moletom verde e calça carvão',
    bodyLabel:'Ombros largos e cabelo crespo', toneLabel:'Energético e próximo',
  },
  'prof.iara': {
    artId:'iara',
    faceShape:'heart-oval',
    skin:'#E4A27E', hair:'#342126',
    hairBack:'M42 82C39 48 58 22 91 20C122 20 139 47 135 79L131 161C121 176 108 167 111 146L64 157C52 145 53 111 42 82Z',
    hairFront:'M47 62C49 34 71 20 93 22C118 23 132 40 132 64C117 55 109 43 103 34C91 51 76 57 59 58L47 62Z',
    hairStrands:'M48 58Q57 39 72 32M105 31Q125 44 127 65M119 96Q127 111 122 128',
    face:'M59 49C66 32 81 28 94 31C111 33 122 48 120 68C119 89 108 110 92 117C77 109 63 91 58 70C56 61 56 54 59 49Z',
    silhouette:'M67 109C59 112 56 124 56 137L51 156C49 165 54 172 61 172C67 172 71 166 73 157L77 143C73 166 69 188 68 222L112 222C110 196 105 179 101 166C111 180 124 191 137 222L148 222C143 193 135 170 128 145L134 160C137 170 144 173 150 169C155 165 152 157 149 149L140 126C135 114 125 108 113 108C96 106 80 106 67 109Z',
    shirt:'#F1E8D3', bottomColor:'#687747', torso:'M65 109C79 102 108 103 120 114C128 130 128 153 133 174C112 184 74 184 54 172C59 149 57 125 65 109Z',
    lower:'M56 167C76 175 112 176 133 167C140 185 144 204 148 223L44 223C48 203 52 184 56 167Z',
    leftArm:'M66 118C56 128 55 146 59 160C62 170 71 171 76 162L82 140Z',
    rightArm:'M119 117C132 127 135 143 137 158C138 169 128 175 121 164L113 142Z',
    eyes:[79,103,74], eyeSize:[6.2,9.5], eyeStyle:'almond', pupilSize:2.35, nose:'M88 84Q92 88 96 84', brow:'M68 65Q77 59 86 63M96 63Q105 59 113 64',
    headScale:[1.15,1.17],
    bodyScale:[0.96,1.05],
    mouth:'M85 94Q94 99 103 93Q100 100 94 101Q88 100 85 94Z',
    earrings:true, signature:'Calma e criteriosa',
    hairLabel:'Cabelo longo, liso e lateral', outfitLabel:'Blusa creme e saia verde',
    bodyLabel:'Silhueta alongada com cabelo longo', toneLabel:'Serena e observadora',
  },
  'prof.nina': {
    artId:'nina',
    faceShape:'compact-oval',
    skin:'#E7B08A', hair:'#242024',
    hairBack:'M47 69C45 42 61 23 91 22C122 22 136 45 133 76L127 104C121 123 108 131 94 130C73 128 55 112 48 91Z',
    hairFront:'M47 69C46 42 64 23 91 22C119 21 135 43 133 70C118 68 108 59 101 49C88 62 70 69 47 69Z M48 71C57 68 64 60 69 51C72 68 67 79 59 85Z',
    hairStrands:'M54 55Q66 36 82 31M102 31Q122 43 126 62',
    face:'M64 50C70 34 81 30 94 31C110 33 118 46 118 63C118 82 108 99 94 104C79 100 65 86 62 68C61 61 61 55 64 50Z',
    silhouette:'M69 105C60 109 57 120 56 133L52 151C50 160 55 167 62 167C68 167 71 162 73 153L77 139C73 163 71 190 70 224L90 224L94 184L99 224L126 224C126 192 122 164 119 139L124 154C127 163 134 168 140 164C146 160 143 152 140 144L133 122C129 110 119 104 109 103C95 101 80 102 69 105Z',
    shirt:'#79609B', bottomColor:'#393541', torso:'M66 103C79 96 110 99 121 111C129 125 132 149 137 169C119 180 74 180 55 169C60 148 58 119 66 103Z',
    lower:'M57 166C76 174 114 174 136 166C137 184 135 204 132 223L108 223L100 188L89 223L65 223C60 203 56 183 57 166Z',
    leftArm:'M67 112C56 120 52 141 55 156C58 169 67 171 73 161L80 138Z',
    rightArm:'M120 112C133 123 137 141 139 155C140 168 130 174 122 164L113 138Z',
    eyes:[79,102,72], eyeSize:[6.6,8.7], eyeStyle:'almond', pupilSize:2.5, nose:'M89 82Q92 86 95 82', brow:'M68 65Q78 58 87 64M97 63Q106 58 114 64',
    headScale:[1.16,1.10],
    bodyScale:[0.94,0.94],
    mouth:'M86 91Q93 94 102 89Q99 98 94 98Q88 97 86 91Z',
    glasses:true, signature:'Investigativa e curiosa',
    hairLabel:'Bob curto com franja lateral', outfitLabel:'Blusa ameixa e calça escura',
    bodyLabel:'Silhueta curta com corte arredondado', toneLabel:'Perspicaz e expressiva',
  },
  'prof.ravi': {
    artId:'ravi',
    faceShape:'round-cheeked',
    skin:'#A86443', hair:'#2A211F',
    hairBack:'M48 65C41 55 48 42 56 38C51 27 61 17 73 24C79 10 95 12 101 24C112 14 130 23 127 37C139 48 135 62 130 68L126 103L54 105Z',
    hairFront:'M47 59C42 48 49 35 61 34C59 21 74 16 83 26C91 13 107 18 111 31C126 31 134 43 128 56C120 59 113 51 108 43C100 54 89 56 78 51C70 60 57 64 47 59Z',
    hairStrands:'M52 49Q62 32 78 28M95 26Q115 29 125 48',
    face:'M56 50C61 31 78 28 94 30C114 32 126 47 124 69C122 92 108 110 92 114C74 111 59 95 56 72C54 63 54 56 56 50Z',
    silhouette:'M61 108C50 112 47 124 46 138L43 158C42 169 48 176 56 176C64 176 68 169 70 158L75 142C69 168 65 194 65 225L90 225L94 184L100 225L137 225C135 194 131 167 126 142L132 158C135 169 143 175 151 171C157 167 155 159 152 150L144 127C139 114 128 108 117 107C97 104 77 104 61 108Z',
    shirt:'#D6A34E', bottomColor:'#344B3A', torso:'M63 108C77 100 109 102 123 114C132 128 132 151 138 172C116 184 73 182 52 169C58 148 55 124 63 108Z',
    lower:'M54 166C73 175 116 174 138 166C139 183 135 203 131 223L107 223L100 188L89 223L65 223C60 203 55 184 54 166Z',
    leftArm:'M64 116C52 125 51 142 53 158C55 169 64 174 72 163L80 139Z',
    rightArm:'M123 116C135 124 142 142 140 158C139 170 128 174 121 163L113 139Z',
    eyes:[76,105,73], eyeSize:[6.8,9.2], eyeStyle:'wide', pupilSize:2.8, nose:'M88 84Q92 88 97 84', brow:'M68 61Q78 54 87 60M97 60Q107 54 116 60',
    headScale:[1.16,1.14],
    bodyScale:[1.04,0.95],
    mouth:'M79 88Q94 103 109 87Q106 109 94 110Q82 108 79 88Z',
    signature:'Prático e colaborativo',
    hairLabel:'Cachos curtos e arredondados', outfitLabel:'Blusa mostarda e calça verde-escura',
    bodyLabel:'Silhueta atlética e compacta', toneLabel:'Otimista e enérgico',
  },
  'prof.mateus': {
    artId:'mateus',
    faceShape:'long-rect',
    skin:'#D89B75', hair:'#583A2A',
    hairBack:'M51 58C51 34 70 20 94 21C117 22 131 39 129 62L125 100L57 103Z',
    hairFront:'M51 59C47 39 63 20 84 19C105 16 125 29 130 48C118 46 110 41 104 34C95 47 78 51 64 49C60 55 56 58 51 59Z',
    hairStrands:'M56 49Q69 32 87 29M105 31Q119 40 124 55',
    face:'M62 48C68 33 80 30 95 31C111 32 120 45 120 65C120 88 108 107 93 111C77 108 63 93 60 70C59 61 59 53 62 48Z',
    silhouette:'M67 109C58 113 55 124 54 137L50 157C48 166 53 173 60 173C66 173 70 167 72 158L76 143C72 167 70 194 69 225L90 225L94 184L99 225L124 225C125 194 122 167 119 143L124 157C127 166 134 171 140 167C146 163 143 155 140 147L132 126C128 114 119 108 108 107C94 105 79 106 67 109Z',
    shirt:'#985B45', bottomColor:'#38343C', torso:'M66 107C80 101 110 103 122 114C130 127 131 151 136 171C116 183 76 183 55 170C60 148 58 125 66 107Z',
    lower:'M56 166C77 174 114 174 136 166C138 185 134 204 131 223L107 223L100 188L89 223L65 223C60 204 56 184 56 166Z',
    leftArm:'M67 116C56 124 53 141 56 157C58 170 67 174 74 164L81 140Z',
    rightArm:'M122 116C133 124 138 143 137 158C136 170 126 174 119 164L112 140Z',
    eyes:[80,102,73], eyeSize:[6.3,8.9], eyeStyle:'soft', pupilSize:2.4, nose:'M89 82Q92 86 95 82', brow:'M68 62Q78 56 86 62M97 61Q106 56 114 62',
    headScale:[1.17,1.12],
    bodyScale:[0.98,0.96],
    mouth:'M87 92Q94 96 102 91Q100 98 94 99Q89 98 87 92Z',
    glasses:true, beard:'M66 82C71 102 80 111 94 112C108 110 118 99 122 81C119 109 107 121 94 122C79 120 69 106 66 82Z',
    signature:'Preciso e paciente',
    hairLabel:'Corte curto lateral e barba discreta', outfitLabel:'Suéter terracota e calça carvão',
    bodyLabel:'Silhueta reta com óculos', toneLabel:'Confiável e analítico',
  },
  'prof.marina': {
    artId:'marina',
    faceShape:'soft-oval',
    skin:'#A96F53', hair:'#2E2525',
    hairBack:'M48 64C48 39 66 22 93 22C119 22 136 41 133 69L130 108C122 127 109 132 92 130C70 127 52 110 48 87Z',
    hairFront:'M48 65C44 42 62 22 88 21C114 20 133 36 134 60C123 58 114 52 107 43C94 55 72 59 48 65Z M49 63C54 76 55 91 49 99C43 87 43 75 49 63Z',
    hairStrands:'M54 59Q64 39 80 32M108 34Q126 46 128 66',
    face:'M58 50C64 33 80 29 94 31C112 33 123 47 121 68C119 90 107 108 92 112C75 109 60 93 57 72C56 63 56 55 58 50Z',
    silhouette:'M66 108C57 112 54 123 54 136L50 155C48 164 53 171 60 172C66 172 70 166 72 157L76 143C72 167 69 193 68 225L91 225L94 184L99 225L126 225C127 193 123 166 120 143L125 157C128 167 135 172 141 168C147 164 144 156 141 148L133 126C129 114 120 108 109 107C95 105 79 106 66 108Z',
    shirt:'#302E35', bottomColor:'#E9D9BE', torso:'M67 107C81 100 109 102 121 113C129 127 130 151 135 171C116 183 75 182 55 170C60 147 58 124 67 107Z',
    lower:'M57 166C77 174 112 174 134 166C140 185 138 203 133 223L108 223L100 188L88 223L64 223C60 203 56 185 57 166Z',
    leftArm:'M68 116C55 126 53 143 57 158C59 169 67 172 74 163L81 139Z',
    rightArm:'M121 116C135 125 140 143 139 159C138 171 128 175 121 164L112 139Z',
    eyes:[78,104,73], eyeSize:[6.5,9.1], eyeStyle:'almond', pupilSize:2.35, nose:'M88 83Q92 87 96 83', brow:'M68 63Q77 57 86 62M97 62Q106 57 114 62',
    headScale:[1.17,1.16],
    bodyScale:[0.98,1.02],
    mouth:'M84 93Q94 99 105 92Q102 101 94 102Q87 101 84 93Z',
    earrings:true, signature:'Organizada e estratégica',
    hairLabel:'Cabelo médio reto com pontas curvas', outfitLabel:'Casaco grafite e calça creme',
    bodyLabel:'Silhueta média e equilibrada', toneLabel:'Organizada e segura',
  },
  'prof.beatriz': {
    artId:'beatriz',
    faceShape:'rounded-heart',
    skin:'#C98764', hair:'#4B302A',
    hairBack:'M52 72C40 65 44 47 55 42C49 27 67 18 79 25C83 12 102 13 108 25C126 20 138 38 129 52C140 65 131 83 124 93L126 102L54 104Z',
    hairFront:'M49 60C43 47 53 34 63 33C62 20 78 17 87 26C99 16 115 26 113 38C128 39 134 52 126 64C113 59 105 52 101 43C89 53 74 57 62 52C58 57 53 60 49 60Z',
    hairStrands:'M54 48Q63 31 80 28M101 29Q121 38 126 56',
    face:'M59 47C66 31 81 27 95 30C113 32 124 47 122 67C120 91 108 107 93 109C77 107 63 94 59 72C57 61 57 53 59 47Z',
    silhouette:'M68 108C59 111 56 121 55 134L51 153C49 162 54 169 61 169C67 169 70 164 72 155L76 141C72 164 70 191 69 224L91 224L94 184L99 224L125 224C125 191 122 164 119 141L124 155C127 164 134 168 140 164C145 160 143 153 140 145L133 125C129 113 120 107 109 106C95 104 80 105 68 108Z',
    shirt:'#D65A36', bottomColor:'#EAD7BC', torso:'M66 107C80 101 109 103 121 114C129 127 132 151 136 171C116 182 76 183 55 170C60 148 58 124 66 107Z',
    lower:'M56 166C77 174 114 174 136 166C138 184 134 203 130 223L106 223L100 188L89 223L65 223C60 203 56 184 56 166Z',
    leftArm:'M67 115C56 124 52 144 56 159C59 171 68 174 74 164L81 140Z',
    rightArm:'M121 115C133 125 138 142 138 158C138 169 129 173 121 164L113 140Z',
    eyes:[77,104,73], eyeSize:[6.7,8.9], eyeStyle:'round', pupilSize:2.6, nose:'M88 83Q92 87 96 83', brow:'M68 63Q77 58 86 63M97 63Q106 58 114 63',
    headScale:[1.18,1.11],
    bodyScale:[0.97,0.94],
    mouth:'M81 90Q94 103 107 89Q104 106 94 107Q83 105 81 90Z',
    glasses:true, signature:'Clara e criteriosa',
    hairLabel:'Cachos médios com faixa discreta', outfitLabel:'Blusa coral e calça clara',
    bodyLabel:'Silhueta compacta com cachos marcantes', toneLabel:'Direta e acessível',
  },
  'prof.sofia': {
    artId:'sofia',
    faceShape:'long-oval',
    skin:'#E4A17B', hair:'#6B3424',
    hairBack:'M42 84C39 51 56 22 91 20C124 18 141 45 136 82L130 166C118 174 108 163 110 145L61 158C49 148 53 112 42 84Z',
    hairFront:'M45 62C43 36 63 19 91 20C116 20 137 38 136 66C123 62 113 52 107 40C98 54 76 58 60 57C55 61 50 63 45 62Z',
    hairStrands:'M47 59Q58 35 78 29M109 31Q131 48 130 70M119 107Q128 123 123 140',
    face:'M58 46C64 29 80 27 95 30C114 33 124 50 121 75C119 99 107 113 91 117C74 113 60 96 57 72C56 60 56 52 58 46Z',
    silhouette:'M65 109C56 112 53 123 52 136L48 157C46 166 51 173 58 174C65 174 68 167 70 157L75 142C70 168 66 194 65 225L89 225L94 184L100 225L137 225C136 194 132 167 127 142L132 157C135 168 143 173 150 169C156 165 153 157 150 149L140 126C135 114 125 108 113 108C96 105 79 106 65 109Z',
    shirt:'#CB557A', bottomColor:'#38343D', torso:'M65 110C78 102 110 103 121 115C129 129 130 151 135 172C116 184 75 184 54 171C59 149 57 124 65 110Z',
    lower:'M56 166C76 175 114 175 136 166C141 184 137 203 132 223L107 223L100 188L89 223L64 223C59 203 55 184 56 166Z',
    leftArm:'M66 118C55 127 53 144 57 159C59 170 67 173 74 163L81 141Z',
    rightArm:'M121 118C134 127 139 143 138 159C137 171 127 174 120 164L112 140Z',
    eyes:[76,105,72], eyeSize:[6.6,9.4], eyeStyle:'wide', pupilSize:2.7, nose:'M88 84Q92 88 96 84', brow:'M67 63Q77 57 86 62M97 62Q107 57 115 62',
    headScale:[1.18,1.15],
    bodyScale:[1.0,0.99],
    mouth:'M79 90Q94 104 109 89Q105 108 94 109Q82 107 79 90Z',
    earrings:true, signature:'Expressiva e acolhedora',
    hairLabel:'Cabelo longo e ondulado', outfitLabel:'Blusa rosa antigo e calça escura',
    bodyLabel:'Silhueta fluida com cabelo longo', toneLabel:'Expressiva e calorosa',
  },
  'prof.helena': {
    artId:'helena',
    faceShape:'mature-soft',
    skin:'#E3B18D', hair:'#A69B8D',
    hairBack:'M55 59C56 37 72 23 92 24C113 23 128 39 128 60L124 103L60 103Z M73 32C70 19 78 9 91 8C104 8 111 20 105 30C97 38 80 39 73 32Z',
    hairFront:'M58 54C60 34 73 24 91 24C109 24 125 37 127 53C116 49 108 43 102 34C94 47 77 51 58 54Z',
    hairStrands:'M62 47Q72 32 89 29M104 30Q121 42 123 57',
    face:'M62 49C68 34 80 31 94 32C110 34 119 47 118 66C117 86 107 103 93 107C77 104 63 91 61 70C60 61 60 54 62 49Z',
    silhouette:'M65 106C56 110 53 121 52 134L48 153C46 162 51 169 58 170C64 170 68 164 70 155L74 141C70 164 68 192 66 222L114 222C112 195 107 172 102 155C112 174 124 194 134 222L149 222C143 193 135 168 128 142L134 157C137 167 144 171 150 167C156 163 153 155 150 147L140 124C135 112 124 106 113 105C96 103 78 103 65 106Z',
    shirt:'#778B50', bottomColor:'#3C3940', torso:'M67 105C81 99 109 101 121 112C128 126 130 149 135 171C116 182 76 182 56 169C60 147 59 123 67 105Z',
    lower:'M57 166C78 174 112 174 134 166C141 185 144 204 147 223L45 223C49 204 53 185 57 166Z',
    leftArm:'M68 114C56 125 55 141 58 157C60 169 69 173 75 163L82 140Z',
    rightArm:'M121 114C134 124 139 143 139 158C138 170 128 173 121 164L113 140Z',
    eyes:[80,102,73], eyeSize:[6.2,9.1], eyeStyle:'soft', pupilSize:2.3, nose:'M89 82Q92 86 95 82', brow:'M69 64Q78 58 87 63M98 63Q107 58 115 63',
    headScale:[1.19,1.13],
    bodyScale:[0.98,1.03],
    mouth:'M86 94Q94 98 102 93Q99 100 94 100Q88 100 86 94Z',
    glasses:true, signature:'Expressiva e cuidadosa',
    hairLabel:'Coque grisalho com mechas suaves', outfitLabel:'Cardigã verde e saia escura',
    bodyLabel:'Silhueta média com coque alto', toneLabel:'Acolhedora e experiente',
  },
  'prof.augusto': {
    artId:'augusto',
    faceShape:'mature-broad',
    skin:'#C58A69', hair:'#96928D',
    hairBack:'M50 57C51 34 68 21 93 21C118 22 132 40 130 62L125 100L55 103Z',
    hairFront:'M51 58C48 38 64 22 84 19C107 16 129 31 132 51C120 49 112 42 106 33C96 45 79 51 65 48C60 54 56 57 51 58Z',
    hairStrands:'M55 49Q67 31 84 29M105 31Q123 42 124 57',
    face:'M58 50C63 32 79 28 95 30C114 32 125 46 123 67C121 90 108 107 92 111C75 109 60 93 57 72C55 62 55 55 58 50Z',
    silhouette:'M63 108C53 112 50 123 49 137L45 157C43 166 49 173 57 173C63 173 67 167 69 157L74 142C69 168 66 194 65 225L89 225L94 184L100 225L137 225C136 194 131 167 126 142L132 157C135 168 143 173 151 169C157 165 154 157 151 149L142 127C137 114 126 108 115 107C96 104 78 104 63 108Z',
    shirt:'#344E42', bottomColor:'#B98958', torso:'M66 108C80 100 110 102 122 113C130 127 131 151 136 171C116 183 76 183 55 170C60 148 58 124 66 108Z',
    lower:'M56 166C77 174 114 174 136 166C138 185 134 204 131 223L107 223L100 188L89 223L65 223C60 204 56 184 56 166Z',
    leftArm:'M67 116C55 126 54 142 57 158C59 170 68 173 75 163L82 140Z',
    rightArm:'M122 116C134 125 139 143 138 158C137 170 127 174 120 164L112 140Z',
    eyes:[79,104,74], eyeSize:[6.7,9.1], eyeStyle:'soft', pupilSize:2.3, nose:'M89 82Q93 86 96 82', brow:'M68 62Q78 56 87 61M97 61Q106 56 115 61',
    headScale:[1.19,1.17],
    bodyScale:[1.05,0.99],
    mouth:'M87 101Q94 105 102 101Q99 108 94 109Q89 108 87 101Z',
    mustache:'M80 94C84 88 90 89 94 93C98 89 104 88 108 94C105 100 100 100 94 97C89 101 84 100 80 94Z',
    signature:'Sereno e didático',
    hairLabel:'Cabelo grisalho ondulado e bigode curto', outfitLabel:'Suéter verde-escuro e calça ocre',
    bodyLabel:'Silhueta madura de ombros retos', toneLabel:'Sereno e ponderado',
  },
  'prof.caio': {
    artId:'caio',
    faceShape:'youthful-oval',
    skin:'#D99A70', hair:'#3A2725',
    hairBack:'M51 59C50 36 67 20 93 20C118 21 132 39 130 62L125 100L56 103Z',
    hairFront:'M51 59C48 39 62 21 84 18C107 15 129 30 132 50C119 47 110 41 104 32C95 45 79 50 65 49C61 55 56 58 51 59Z',
    hairStrands:'M56 49Q68 32 86 28M105 29Q123 39 126 57',
    face:'M62 47C68 31 81 29 95 31C111 33 120 45 120 64C120 84 108 102 93 107C77 104 64 91 61 70C60 61 60 53 62 47Z',
    silhouette:'M68 108C59 111 56 122 55 135L51 154C49 163 54 170 61 170C67 170 70 164 72 155L76 141C72 165 70 192 69 225L91 225L94 184L99 225L125 225C125 192 122 165 119 141L124 155C127 164 134 169 140 165C146 161 143 153 140 145L133 125C129 113 120 107 109 106C95 104 80 105 68 108Z',
    shirt:'#356D80', bottomColor:'#34343E', torso:'M66 108C80 100 110 102 122 113C130 127 131 151 136 171C116 183 76 183 55 170C60 148 58 124 66 108Z',
    lower:'M56 166C77 174 114 174 136 166C138 185 134 204 131 223L107 223L100 188L89 223L65 223C60 204 56 184 56 166Z',
    leftArm:'M67 116C55 126 54 142 57 158C59 170 68 173 75 163L82 140Z',
    rightArm:'M122 116C134 125 139 143 138 158C137 170 127 174 120 164L112 140Z',
    eyes:[78,104,72], eyeSize:[6.4,8.9], eyeStyle:'round', pupilSize:2.6, nose:'M89 82Q93 86 97 82', brow:'M68 62Q78 56 87 61M97 61Q106 56 115 61',
    headScale:[1.20,1.12],
    bodyScale:[0.92,0.98],
    mouth:'M84 90Q94 100 106 89Q102 104 94 105Q87 103 84 90Z',
    signature:'Objetivo e experimental',
    hairLabel:'Corte curto com topete lateral', outfitLabel:'Moletom azul-petróleo e calça escura',
    bodyLabel:'Silhueta compacta de cabelo curto', toneLabel:'Curioso e inventivo',
  },
};

function Eyes({ design }: { design:CharacterDesign }) {
  const [left, right, y] = design.eyes;
  const [rx, ry] = design.eyeSize;
  const makeEye = (x:number, lean:number) => {
    const almond = design.eyeStyle === 'almond';
    const wide = design.eyeStyle === 'wide';
    const soft = design.eyeStyle === 'soft';
    const top = y - ry;
    const bottom = y + ry * .88;
    const eyePath = almond
      ? 'M' + (x-rx) + ' ' + y + ' Q' + (x-rx*.6) + ' ' + top + ' ' + x + ' ' + top + ' Q' + (x+rx*.7) + ' ' + top + ' ' + (x+rx) + ' ' + y + ' Q' + x + ' ' + bottom + ' ' + (x-rx) + ' ' + y + 'Z'
      : 'M' + (x-rx) + ' ' + y + ' C' + (x-rx) + ' ' + (top+2) + ' ' + (x-rx*.35) + ' ' + top + ' ' + x + ' ' + top + ' C' + (x+rx*.85) + ' ' + top + ' ' + (x+rx) + ' ' + (y-2) + ' ' + (x+rx) + ' ' + y + ' C' + (x+rx*.8) + ' ' + bottom + ' ' + (x-rx*.7) + ' ' + (bottom+1) + ' ' + (x-rx) + ' ' + y + 'Z';
    const irisX = x + (lean * .55);
    const pupil = design.pupilSize;
    const iris = 'M' + (irisX-pupil) + ' ' + (y+1)
      + ' C' + (irisX-pupil*1.2) + ' ' + (y-2) + ' ' + (irisX-pupil*.6) + ' ' + (y-4) + ' ' + irisX + ' ' + (y-4)
      + ' C' + (irisX+pupil*1.2) + ' ' + (y-4) + ' ' + (irisX+pupil) + ' ' + (y-1) + ' ' + (irisX+pupil) + ' ' + (y+1)
      + ' C' + (irisX+pupil) + ' ' + (y+4) + ' ' + (irisX-pupil) + ' ' + (y+4) + ' ' + (irisX-pupil) + ' ' + (y+1) + 'Z';
    return (
      <g>
        <path d={eyePath} fill={PAPER}/>
        <path d={iris} fill={INK}/>
        <path d={'M' + (irisX-pupil*.38) + ' ' + (y-2) + ' Q' + (irisX-pupil*.1) + ' ' + (y-3.3) + ' ' + (irisX+pupil*.2) + ' ' + (y-2) + 'Z'} fill={PAPER}/>
        {(wide || soft) && <path d={'M' + (x-rx*.8) + ' ' + (y-ry*.65) + ' Q' + x + ' ' + (y-ry*1.15) + ' ' + (x+rx*.8) + ' ' + (y-ry*.65) + 'Z'} fill={INK} opacity=".82"/>}
      </g>
    );
  };
  return (
    <g>
      <path d={design.brow} fill={INK}/>
      {makeEye(left, -0.3)}
      {makeEye(right, 0.3)}
      <path d={design.nose} fill="#8C5A4B"/>
      <path d={design.mouth} fill="#693A36"/>
      <path d="M89 98Q94 101 100 97Q98 103 94 103Q91 102 89 98Z" fill="#E89A98"/>
    </g>
  );
}

function Glasses() {
  return (
    <path
      d="M64 72C64 63 69 60 77 60C86 60 90 65 90 73C90 82 85 87 77 87C68 87 64 82 64 72Z
         M69 72C69 66 72 65 77 65C82 65 85 68 85 73C85 79 82 82 77 82C72 82 69 79 69 72Z
         M94 72C94 63 100 60 107 60C116 60 120 65 120 73C120 82 115 87 107 87C99 87 94 82 94 72Z
         M99 72C99 66 102 65 107 65C112 65 115 68 115 73C115 79 112 82 107 82C102 82 99 79 99 72Z
         M88 72Q92 69 96 72L96 75Q92 73 88 75Z
         M64 68L59 67L59 70L65 72Z M119 68L124 67L123 70L119 72Z"
      fill={INK}
      fillRule="evenodd"
    />
  );
}

function HumanArt({ design }: { design:CharacterDesign }) {
  return (
    <g>
      <g transform={'translate(90 74) scale(' + design.headScale[0] + ' ' + design.headScale[1] + ') translate(-90 -74)'}>
        <path d={design.hairBack} fill={design.hair}/>
      </g>
      <g transform={'translate(90 178) scale(' + design.bodyScale[0] + ' ' + design.bodyScale[1] + ') translate(-90 -178)'}>
        {/* Uma única massa vetorial forma ombros, braços, tronco e pernas. */}
        <path d={design.silhouette} fill={design.shirt}/>
        <path d={design.lower} fill={design.bottomColor}/>
        <path d="M82 105Q91 112 101 105L102 122Q92 127 82 122Z" fill={design.skin}/>
        <path d="M50 158C47 161 47 166 50 169C53 172 56 170 57 167Q59 172 62 169L60 160Q56 155 50 158Z" fill={design.skin}/>
        <path d="M133 158C138 159 142 164 140 169C138 173 133 172 131 168Q128 172 126 168L128 160Q130 157 133 158Z" fill={design.skin}/>
        <path d="M60 217C68 218 80 218 90 215C94 218 94 225 88 227C79 230 66 229 60 226C57 223 57 219 60 217Z" fill={INK}/>
        <path d="M109 215C119 218 129 217 136 215C141 218 141 224 137 227C128 230 115 229 108 226C104 223 105 218 109 215Z" fill={INK}/>
      </g>
      <g transform={'translate(90 74) scale(' + design.headScale[0] + ' ' + design.headScale[1] + ') translate(-90 -74)'}>
        <path d={design.face} fill={design.skin}/>
        <Eyes design={design}/>
        {design.glasses && <Glasses/>}
        {design.beard && <path d={design.beard} fill={design.hair}/>}
        {design.mustache && <path d={design.mustache} fill={design.hair}/>}
        <path d={design.hairFront} fill={design.hair}/>
      </g>
    </g>
  );
}

export function TeacherCharacter({
  teacher, size = 160, className = '', portrait = false,
}: {
  teacher:FictionalTeacher; pose?:TeacherPose; size?:number; className?:string; portrait?:boolean;
}) {
  const design = DESIGNS[teacher.id] ?? DESIGNS['prof.lia'];
  const width = portrait ? size : Math.round(size * .75);
  const height = portrait ? size : size;
  const tone = 'rgb(var(--' + teacher.tone + '))';
  return (
    <svg
      viewBox={portrait ? '24 18 132 132' : '0 0 180 240'}
      width={width}
      height={height}
      className={'shrink-0 ' + (portrait ? 'rounded-full overflow-hidden ' : 'overflow-visible ') + className}
      style={{ width, height } as CSSProperties}
      role="img"
      aria-label={teacher.name + ', professora ou professor humano do Pórtico'}
      data-character-style="portico-friends-v22"
      data-character-art-version="v22.7-flat-color"
      data-character-outline="none"
      data-character-species="human"
      data-character-body={design.bodyLabel}
      data-character-hair={design.hairLabel}
      data-character-outfit={design.outfitLabel}
      data-character-tone={design.toneLabel}
      data-character-signature={design.signature}
      data-character-stage="static-design"
      data-character-id={design.artId}
      data-character-face-shape={design.faceShape}
      data-character-silhouette="bespoke-connected-body"
      data-character-head-scale={design.headScale[0] + "x" + design.headScale[1]}
      data-character-body-scale={design.bodyScale[0] + "x" + design.bodyScale[1]}
      data-character-eyes={design.eyeStyle}
      data-character-eye-size={design.eyeSize[0] + "x" + design.eyeSize[1]}
      focusable="false"
      preserveAspectRatio="xMidYMax meet"
    >
      {portrait && <circle cx="90" cy="90" r="65" fill={tone}/>}
      <HumanArt design={design}/>
    </svg>
  );
}

/* Animais são companheiros do estudante, não professores. */
type Mascot = { id:string; name:string; role:string; tone:string };
export const companionMascots: Mascot[] = [
  { id:'miau', name:'Miau', role:'Gato curioso', tone:'ember' },
  { id:'teco', name:'Teco', role:'Coruja conselheira', tone:'gold' },
  { id:'bento', name:'Bento', role:'Castor inventor', tone:'azure' },
  { id:'zeca', name:'Zeca', role:'Sapo companheiro', tone:'leaf' },
];

function MascotArt({ id }: { id:string }) {
  switch(id) {
    case 'miau':
      return <g>
        <path d="M54 137C39 146 32 158 39 166C48 176 65 165 63 153C61 145 53 143 49 150C48 155 53 158 57 155C63 148 56 139 54 137Z" fill="#D8782E"/>
        <path d="M48 113C45 96 53 77 72 70L77 48Q80 43 87 54L94 66C112 62 130 73 137 92C146 116 133 143 108 151L105 177Q99 185 90 178L84 155C65 151 51 136 48 113Z" fill="#E98B35"/>
        <path d="M67 119Q91 130 119 117L115 148Q91 159 69 143Z" fill="#F6D9B4"/>
        <path d="M79 115Q85 122 91 115Q89 127 85 127Q80 126 79 115Z" fill={INK}/>
        <path d="M82 133Q92 139 103 132Q99 145 92 145Q85 143 82 133Z" fill="#8C4540"/>
        <path d="M52 148Q46 161 55 166L72 167L77 151M105 151L110 167L127 165Q134 159 126 146Z" fill="#E98B35"/>
        <path d="M57 166Q65 173 77 169L79 178Q65 183 54 175Z M108 169Q118 174 129 167L131 175Q118 184 106 178Z" fill="#D8782E"/>
      </g>;
    case 'teco':
      return <g>
        <path d="M43 142C39 111 45 80 63 69L58 48Q65 46 78 63C88 59 101 60 110 64Q126 45 136 51L130 78C141 103 137 145 119 164C104 180 76 181 58 166C50 160 46 152 43 142Z" fill="#956044"/>
        <path d="M55 131C53 106 63 83 89 82C114 81 129 102 124 132C120 154 106 165 90 165C72 164 59 151 55 131Z" fill="#F5E7D0"/>
        <path d="M63 108C67 93 82 90 89 105C91 120 79 130 68 125C63 121 61 115 63 108Z M94 105C102 90 117 93 121 109C123 120 116 128 105 126C95 123 91 114 94 105Z" fill={PAPER}/>
        <path d="M84 119Q90 126 97 119L93 137Q90 141 87 137Z" fill="#D99D36"/>
        <path d="M65 160Q90 170 115 160L111 172Q89 181 68 171Z" fill="#956044"/>
      </g>;
    case 'bento':
      return <g>
        <path d="M44 137C23 141 17 158 25 170C35 183 57 177 67 162L76 154Z" fill="#76503B"/>
        <path d="M44 136C41 107 57 82 84 77C114 70 138 96 137 129C136 157 114 177 86 177C60 176 46 160 44 136Z" fill="#B86D43"/>
        <path d="M56 101Q47 83 62 76Q76 75 82 91M108 88Q119 71 134 83Q141 96 128 106Z" fill="#B86D43"/>
        <path d="M76 140Q91 147 107 139Q102 154 91 154Q81 153 76 140Z" fill="#7B4434"/>
        <path d="M85 142L85 155Q91 160 97 155L97 141Z" fill="#F8E8D4"/>
        <path d="M126 133C149 130 164 144 158 162C153 178 132 181 117 165L113 151Z" fill="#76503B"/>
        <path d="M57 164Q48 174 59 181L79 181L83 167M104 167L109 181L131 180Q140 172 130 161Z" fill="#B86D43"/>
      </g>;
    default:
      return <g>
        <path d="M40 133C38 105 54 85 88 82C123 80 141 103 137 136C134 161 113 178 88 178C62 178 43 161 40 133Z" fill="#7FA64E"/>
        <path d="M51 91C48 72 58 67 73 71Q85 74 85 91M94 91Q97 69 115 70Q133 72 126 97L117 104L59 103Z" fill="#7FA64E"/>
        <path d="M61 112C63 98 82 97 86 112C88 125 68 129 62 118Z M96 112C99 98 117 99 119 113C120 126 101 129 96 118Z" fill={PAPER}/>
        <path d="M68 111Q74 105 79 113Q79 120 72 120Q67 118 68 111Z M103 112Q109 105 114 113Q114 120 107 120Q102 118 103 112Z" fill={INK}/>
        <path d="M78 141Q89 147 101 141Q98 153 89 153Q82 152 78 141Z" fill="#557C3D"/>
        <path d="M49 150Q38 159 47 175Q55 183 67 176L76 160M126 150Q140 159 131 175Q124 183 111 176L101 160Z" fill="#7FA64E"/>
        <path d="M63 174Q62 185 76 186L88 179M103 179Q115 187 128 181L121 172Z" fill="#7FA64E"/>
      </g>;
  }
}

export function CompanionMascots({ compact = false }: { compact?:boolean }) {
  return (
    <section className="space-y-3" aria-label="Mascotes companheiros do Pórtico">
      <header>
        <p className="text-xs font-extrabold uppercase tracking-[.14em] text-muted">Companheiros do Pórtico</p>
        <h2 className="font-title text-xl font-bold">Os animais não são professores</h2>
        <p className="max-w-2xl text-sm text-muted">Eles acompanham o estudante, aparecem em pequenas descobertas e dão personalidade ao universo sem ocupar o lugar dos educadores humanos.</p>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {companionMascots.map((mascot) => (
          <article key={mascot.id} className="flex flex-col items-center rounded-2xl border border-line/70 bg-surface px-3 py-3 text-center">
            <svg viewBox="0 0 180 200" width={compact ? 112 : 144} height={compact ? 124 : 158} role="img" aria-label={mascot.name + ', ' + mascot.role} data-mascot-id={mascot.id} data-character-outline="none" data-character-art-version="v22.7-flat-color">
              
              <MascotArt id={mascot.id}/>
            </svg>
            <h3 className="text-sm font-extrabold">{mascot.name}</h3>
            <p className="text-xs text-muted">{mascot.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TeacherScene({
  teacher, size = 174, eyebrow = 'AULA COM SEU PROFESSOR', heading, message, className = '',
}: {
  teacher:FictionalTeacher; pose?:TeacherPose; size?:number; eyebrow?:string;
  heading:string; message:ReactNode; className?:string;
}) {
  return (
    <section className={'teacher-scene ' + className} style={{ '--teacher-tone':'rgb(var(--' + teacher.tone + '))' } as CSSProperties}
      aria-label={teacher.name + ' explicando: ' + heading}>
      <div className="teacher-scene__portrait">
        <TeacherCharacter teacher={teacher} size={size} className="teacher-scene__figure"/>
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
  teacher, size = 98, children, compact = false, className = '',
}: {
  teacher:FictionalTeacher; pose?:TeacherPose; size?:number; children:ReactNode;
  compact?:boolean; className?:string;
}) {
  return (
    <div className={'teacher-cue flex items-center gap-2.5 rounded-2xl border px-3 py-2 ' + (compact ? 'min-h-[4.5rem]' : 'min-h-[6rem]') + ' ' + className}
      style={{ borderColor:'rgb(var(--' + teacher.tone + ') / .28)', backgroundColor:'rgb(var(--' + teacher.tone + ') / .07)' }}
      aria-label={'Professor ' + teacher.name}>
      <TeacherCharacter teacher={teacher} size={size} portrait/>
      <div className="min-w-0 flex-1">
        <p className="text-[.68rem] font-bold uppercase tracking-[.11em] text-muted">{teacher.name} · {teacher.expertiseLabel}</p>
        <div className="mt-1 text-sm leading-snug text-ink">{children}</div>
      </div>
    </div>
  );
}
