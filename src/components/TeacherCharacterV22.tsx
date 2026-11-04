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
  skin: string;
  hair: string;
  hairBack: string;
  hairFront: string;
  face: string;
  shirt: string;
  torso: string;
  lower: string;
  leftArm: string;
  rightArm: string;
  eyes: [number, number, number];
  brow: string;
  mouth: string;
  glasses?: boolean;
  earrings?: boolean;
  freckles?: boolean;
  beard?: string;
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
    skin:'#D99568', hair:'#4B2C25',
    hairBack:'M46 88C35 62 44 31 69 22C91 11 122 21 134 47C142 65 139 91 128 112L138 166C124 174 111 164 109 150L66 160C53 146 54 120 46 88Z',
    hairFront:'M48 64C44 43 57 24 78 19C102 12 125 27 131 49C120 46 113 40 107 31C98 46 82 48 67 47C62 58 57 63 48 64Z M51 55C54 40 62 31 73 29C69 40 63 47 51 55Z',
    face:'M57 52C61 34 78 30 94 32C113 34 124 48 123 69C122 94 112 112 94 116C74 115 58 99 55 77C53 68 54 59 57 52Z',
    shirt:'#C45A36', torso:'M65 112C76 105 111 105 123 116C132 127 134 152 139 174C120 184 77 184 58 172C62 149 57 126 65 112Z',
    lower:'M60 168C81 176 119 176 139 168C142 185 137 204 132 223L108 223L100 187L91 223L66 223C61 204 56 185 60 168Z',
    leftArm:'M69 119C57 124 53 142 51 158C49 169 55 177 65 174C72 170 72 156 77 146Z',
    rightArm:'M120 119C132 123 139 142 141 159C142 169 136 176 128 171C121 166 124 149 114 142Z',
    eyes:[78,103,75], brow:'M68 66Q77 60 85 65M96 64Q105 59 112 65',
    mouth:'M82 91Q94 101 106 90Q102 105 92 105Q85 103 82 91Z',
    earrings:true, freckles:true, signature:'Curiosa e acolhedora',
    hairLabel:'Cabelo longo, ondulado e volumoso', outfitLabel:'Blusa terracota e calça ampla creme',
    bodyLabel:'Silhueta leve, cabelo como forma principal', toneLabel:'Quente e acessível',
  },
  'prof.lia': {
    skin:'#B97554', hair:'#2C2325',
    hairBack:'M57 57C56 34 73 22 91 22C113 22 128 38 128 59L126 107L116 123L65 116Z',
    hairFront:'M57 59C57 38 70 24 92 23C111 22 127 36 128 54C113 49 105 39 101 34C93 47 78 55 57 59Z M62 53C69 43 77 37 86 34C81 44 74 51 62 53Z',
    face:'M62 51C67 35 79 31 94 32C110 33 121 45 121 63C121 86 110 106 93 109C75 107 61 90 60 69C60 62 60 56 62 51Z',
    shirt:'#6D854B', torso:'M68 106C81 99 107 101 119 111C128 124 127 149 130 170C110 181 75 181 55 169C60 147 59 119 68 106Z',
    lower:'M59 166C78 173 111 173 132 165C136 183 132 202 130 223L104 223L99 187L88 223L63 223C60 202 56 182 59 166Z',
    leftArm:'M69 115C58 122 57 144 58 159C58 170 65 174 73 168L80 140Z',
    rightArm:'M119 116C130 126 134 145 134 159C133 169 125 173 119 164L110 139Z',
    eyes:[80,103,72], brow:'M70 61Q79 57 87 61M97 60Q106 56 113 61',
    mouth:'M85 88Q94 94 103 87Q100 98 93 98Q87 97 85 88Z',
    glasses:true, signature:'Metódica e investigativa',
    hairLabel:'Coque alto e franja lateral', outfitLabel:'Blusa verde-oliva e calça clara',
    bodyLabel:'Silhueta compacta com coque alto', toneLabel:'Prática e concentrada',
  },
  'prof.davi': {
    skin:'#8F533C', hair:'#241C1B',
    hairBack:'M52 63C49 42 62 22 84 20C106 15 128 32 130 55L126 105L57 108Z',
    hairFront:'M51 59C45 43 58 22 76 20C89 12 107 21 114 28C127 32 133 47 127 63C118 58 112 51 107 42C99 52 87 55 76 51C69 59 61 62 51 59Z',
    face:'M58 49C64 32 78 29 94 31C111 33 122 47 121 68C120 90 107 107 91 109C74 107 60 91 57 71C56 62 56 55 58 49Z',
    shirt:'#477A48', torso:'M62 108C77 101 110 103 125 115C131 129 133 153 137 171C118 182 72 181 52 169C57 147 54 122 62 108Z',
    lower:'M54 166C73 174 116 174 137 166C138 185 135 202 131 223L107 223L100 188L90 223L66 223C60 202 55 184 54 166Z',
    leftArm:'M64 117C53 126 48 143 51 159C53 170 63 173 69 164L78 139Z',
    rightArm:'M123 117C136 125 142 142 140 157C139 170 129 174 123 163L113 139Z',
    eyes:[79,103,72], brow:'M67 61Q77 55 86 60M97 60Q107 54 115 60',
    mouth:'M83 87Q94 98 107 87Q105 103 94 104Q86 101 83 87Z',
    beard:'M65 83C69 101 81 112 94 113C108 112 119 101 123 82C117 109 107 122 93 123C78 121 68 107 65 83Z',
    signature:'Conversador e visual',
    hairLabel:'Cachos curtos e densos', outfitLabel:'Moletom verde e calça carvão',
    bodyLabel:'Ombros largos e cabelo crespo', toneLabel:'Energético e próximo',
  },
  'prof.iara': {
    skin:'#E4A27E', hair:'#342126',
    hairBack:'M42 82C39 48 58 22 91 20C122 20 139 47 135 79L131 161C121 176 108 167 111 146L64 157C52 145 53 111 42 82Z',
    hairFront:'M47 62C49 34 71 20 93 22C118 23 132 40 132 64C117 55 109 43 103 34C91 51 76 57 59 58L47 62Z',
    face:'M57 48C64 32 79 29 94 31C112 34 122 49 120 71C118 94 107 111 91 114C73 111 58 94 56 72C55 63 55 54 57 48Z',
    shirt:'#F1E8D3', torso:'M65 109C79 102 108 103 120 114C128 130 128 153 133 174C112 184 74 184 54 172C59 149 57 125 65 109Z',
    lower:'M56 167C76 175 112 176 133 167C140 185 138 204 133 223L107 223L99 187L88 223L64 223C60 202 55 184 56 167Z',
    leftArm:'M66 118C56 128 55 146 59 160C62 170 71 171 76 162L82 140Z',
    rightArm:'M119 117C132 127 135 143 137 158C138 169 128 175 121 164L113 142Z',
    eyes:[78,103,72], brow:'M68 65Q77 59 86 63M96 63Q105 59 113 64',
    mouth:'M83 90Q93 96 104 89Q101 100 94 101Q86 100 83 90Z',
    earrings:true, signature:'Calma e criteriosa',
    hairLabel:'Cabelo longo, liso e lateral', outfitLabel:'Blusa creme e saia verde',
    bodyLabel:'Silhueta alongada com cabelo longo', toneLabel:'Serena e observadora',
  },
  'prof.nina': {
    skin:'#E7B08A', hair:'#242024',
    hairBack:'M47 69C45 42 61 23 91 22C122 22 136 45 133 76L127 104C121 123 108 131 94 130C73 128 55 112 48 91Z',
    hairFront:'M47 69C46 42 64 23 91 22C119 21 135 43 133 70C118 68 108 59 101 49C88 62 70 69 47 69Z M48 71C57 68 64 60 69 51C72 68 67 79 59 85Z',
    face:'M61 51C68 35 80 32 94 33C111 34 120 47 120 65C120 84 110 100 94 104C76 102 62 88 60 69C59 62 59 56 61 51Z',
    shirt:'#79609B', torso:'M66 103C79 96 110 99 121 111C129 125 132 149 137 169C119 180 74 180 55 169C60 148 58 119 66 103Z',
    lower:'M57 166C76 174 114 174 136 166C137 184 135 204 132 223L108 223L100 188L89 223L65 223C60 203 56 183 57 166Z',
    leftArm:'M67 112C56 120 52 141 55 156C58 169 67 171 73 161L80 138Z',
    rightArm:'M120 112C133 123 137 141 139 155C140 168 130 174 122 164L113 138Z',
    eyes:[79,103,72], brow:'M68 65Q78 58 87 64M97 63Q106 58 114 64',
    mouth:'M84 88Q94 92 104 86Q102 98 94 99Q87 98 84 88Z',
    glasses:true, signature:'Investigativa e curiosa',
    hairLabel:'Bob curto com franja lateral', outfitLabel:'Blusa ameixa e calça escura',
    bodyLabel:'Silhueta curta com corte arredondado', toneLabel:'Perspicaz e expressiva',
  },
  'prof.ravi': {
    skin:'#A86443', hair:'#2A211F',
    hairBack:'M48 62C48 37 66 20 91 19C118 19 135 38 132 64L126 103L54 105Z',
    hairFront:'M47 57C44 37 61 19 81 18C102 12 125 27 132 46C135 58 127 66 119 65C111 55 109 44 104 39C96 50 85 54 76 49C68 57 58 61 47 57Z',
    face:'M58 48C63 32 79 29 94 31C111 33 122 47 121 69C119 92 107 108 91 111C74 108 59 92 57 70C56 61 56 53 58 48Z',
    shirt:'#D6A34E', torso:'M63 108C77 100 109 102 123 114C132 128 132 151 138 172C116 184 73 182 52 169C58 148 55 124 63 108Z',
    lower:'M54 166C73 175 116 174 138 166C139 183 135 203 131 223L107 223L100 188L89 223L65 223C60 203 55 184 54 166Z',
    leftArm:'M64 116C52 125 51 142 53 158C55 169 64 174 72 163L80 139Z',
    rightArm:'M123 116C135 124 142 142 140 158C139 170 128 174 121 163L113 139Z',
    eyes:[79,103,72], brow:'M68 61Q78 54 87 60M97 60Q107 54 116 60',
    mouth:'M83 87Q94 98 107 87Q105 103 94 104Q86 101 83 87Z',
    signature:'Prático e colaborativo',
    hairLabel:'Cachos curtos e arredondados', outfitLabel:'Blusa mostarda e calça verde-escura',
    bodyLabel:'Silhueta atlética e compacta', toneLabel:'Otimista e enérgico',
  },
  'prof.mateus': {
    skin:'#D89B75', hair:'#583A2A',
    hairBack:'M51 58C51 34 70 20 94 21C117 22 131 39 129 62L125 100L57 103Z',
    hairFront:'M51 59C47 39 63 20 84 19C105 16 125 29 130 48C118 46 110 41 104 34C95 47 78 51 64 49C60 55 56 58 51 59Z',
    face:'M60 48C66 33 80 30 95 32C111 33 121 47 120 67C119 88 108 105 93 109C76 106 62 91 59 71C58 61 58 54 60 48Z',
    shirt:'#985B45', torso:'M66 107C80 101 110 103 122 114C130 127 131 151 136 171C116 183 76 183 55 170C60 148 58 125 66 107Z',
    lower:'M56 166C77 174 114 174 136 166C138 185 134 204 131 223L107 223L100 188L89 223L65 223C60 204 56 184 56 166Z',
    leftArm:'M67 116C56 124 53 141 56 157C58 170 67 174 74 164L81 140Z',
    rightArm:'M122 116C133 124 138 143 137 158C136 170 126 174 119 164L112 140Z',
    eyes:[79,103,72], brow:'M68 62Q78 56 86 62M97 61Q106 56 114 62',
    mouth:'M84 88Q94 95 104 87Q102 98 94 100Q87 98 84 88Z',
    glasses:true, beard:'M66 82C71 102 80 111 94 112C108 110 118 99 122 81C119 109 107 121 94 122C79 120 69 106 66 82Z',
    signature:'Preciso e paciente',
    hairLabel:'Corte curto lateral e barba discreta', outfitLabel:'Suéter terracota e calça carvão',
    bodyLabel:'Silhueta reta com óculos', toneLabel:'Confiável e analítico',
  },
  'prof.marina': {
    skin:'#A96F53', hair:'#2E2525',
    hairBack:'M48 64C48 39 66 22 93 22C119 22 136 41 133 69L130 108C122 127 109 132 92 130C70 127 52 110 48 87Z',
    hairFront:'M48 65C44 42 62 22 88 21C114 20 133 36 134 60C123 58 114 52 107 43C94 55 72 59 48 65Z M49 63C54 76 55 91 49 99C43 87 43 75 49 63Z',
    face:'M60 50C66 34 80 31 94 32C111 34 121 48 120 68C119 90 107 107 92 110C75 107 61 92 59 71C58 63 58 56 60 50Z',
    shirt:'#302E35', torso:'M67 107C81 100 109 102 121 113C129 127 130 151 135 171C116 183 75 182 55 170C60 147 58 124 67 107Z',
    lower:'M57 166C77 174 112 174 134 166C140 185 138 203 133 223L108 223L100 188L88 223L64 223C60 203 56 185 57 166Z',
    leftArm:'M68 116C55 126 53 143 57 158C59 169 67 172 74 163L81 139Z',
    rightArm:'M121 116C135 125 140 143 139 159C138 171 128 175 121 164L112 139Z',
    eyes:[79,103,72], brow:'M68 63Q77 57 86 62M97 62Q106 57 114 62',
    mouth:'M83 89Q94 96 105 88Q102 100 94 101Q86 100 83 89Z',
    earrings:true, signature:'Organizada e estratégica',
    hairLabel:'Cabelo médio reto com pontas curvas', outfitLabel:'Casaco grafite e calça creme',
    bodyLabel:'Silhueta média e equilibrada', toneLabel:'Organizada e segura',
  },
  'prof.beatriz': {
    skin:'#C98764', hair:'#4B302A',
    hairBack:'M50 58C48 35 65 21 91 21C116 21 131 37 130 61L126 102L54 104Z',
    hairFront:'M50 60C45 39 61 20 85 18C108 17 128 33 131 53C120 51 112 43 105 34C97 46 81 51 66 49C61 55 56 59 50 60Z',
    face:'M60 49C66 33 80 30 94 31C111 33 121 47 120 67C119 88 108 105 93 108C76 106 62 91 59 70C58 61 58 54 60 49Z',
    shirt:'#D65A36', torso:'M66 107C80 101 109 103 121 114C129 127 132 151 136 171C116 182 76 183 55 170C60 148 58 124 66 107Z',
    lower:'M56 166C77 174 114 174 136 166C138 184 134 203 130 223L106 223L100 188L89 223L65 223C60 203 56 184 56 166Z',
    leftArm:'M67 115C56 124 52 144 56 159C59 171 68 174 74 164L81 140Z',
    rightArm:'M121 115C133 125 138 142 138 158C138 169 129 173 121 164L113 140Z',
    eyes:[79,103,72], brow:'M68 63Q77 58 86 63M97 63Q106 58 114 63',
    mouth:'M84 89Q94 98 104 88Q101 102 94 103Q87 102 84 89Z',
    glasses:true, signature:'Clara e criteriosa',
    hairLabel:'Cachos médios com faixa discreta', outfitLabel:'Blusa coral e calça clara',
    bodyLabel:'Silhueta compacta com cachos marcantes', toneLabel:'Direta e acessível',
  },
  'prof.sofia': {
    skin:'#E4A17B', hair:'#6B3424',
    hairBack:'M42 84C39 51 56 22 91 20C124 18 141 45 136 82L130 166C118 174 108 163 110 145L61 158C49 148 53 112 42 84Z',
    hairFront:'M45 62C43 36 63 19 91 20C116 20 137 38 136 66C123 62 113 52 107 40C98 54 76 58 60 57C55 61 50 63 45 62Z',
    face:'M57 49C64 32 79 29 94 31C112 33 122 48 121 71C119 94 107 111 91 114C73 111 58 94 56 71C55 62 55 54 57 49Z',
    shirt:'#CB557A', torso:'M65 110C78 102 110 103 121 115C129 129 130 151 135 172C116 184 75 184 54 171C59 149 57 124 65 110Z',
    lower:'M56 166C76 175 114 175 136 166C141 184 137 203 132 223L107 223L100 188L89 223L64 223C59 203 55 184 56 166Z',
    leftArm:'M66 118C55 127 53 144 57 159C59 170 67 173 74 163L81 141Z',
    rightArm:'M121 118C134 127 139 143 138 159C137 171 127 174 120 164L112 140Z',
    eyes:[79,103,72], brow:'M67 63Q77 57 86 62M97 62Q107 57 115 62',
    mouth:'M83 89Q94 100 106 88Q103 104 94 104Q86 102 83 89Z',
    earrings:true, signature:'Expressiva e acolhedora',
    hairLabel:'Cabelo longo e ondulado', outfitLabel:'Blusa rosa antigo e calça escura',
    bodyLabel:'Silhueta fluida com cabelo longo', toneLabel:'Expressiva e calorosa',
  },
  'prof.helena': {
    skin:'#E3B18D', hair:'#A69B8D',
    hairBack:'M55 59C56 37 72 23 92 24C113 23 128 39 128 60L124 103L60 103Z',
    hairFront:'M58 54C60 34 73 24 91 24C109 24 125 37 127 53C116 49 108 43 102 34C94 47 77 51 58 54Z',
    face:'M62 51C68 36 80 32 94 33C110 34 119 47 119 66C119 86 108 103 93 106C77 104 63 89 61 69C60 62 60 56 62 51Z',
    shirt:'#778B50', torso:'M67 105C81 99 109 101 121 112C128 126 130 149 135 171C116 182 76 182 56 169C60 147 59 123 67 105Z',
    lower:'M57 166C78 174 112 174 134 166C140 185 137 203 132 223L107 223L100 188L89 223L65 223C60 202 56 185 57 166Z',
    leftArm:'M68 114C56 125 55 141 58 157C60 169 69 173 75 163L82 140Z',
    rightArm:'M121 114C134 124 139 143 139 158C138 170 128 173 121 164L113 140Z',
    eyes:[80,103,72], brow:'M69 64Q78 58 87 63M98 63Q107 58 115 63',
    mouth:'M84 89Q94 96 104 88Q101 99 94 100Q87 99 84 89Z',
    glasses:true, signature:'Expressiva e cuidadosa',
    hairLabel:'Coque grisalho com mechas suaves', outfitLabel:'Cardigã verde e saia escura',
    bodyLabel:'Silhueta média com coque alto', toneLabel:'Acolhedora e experiente',
  },
  'prof.augusto': {
    skin:'#C58A69', hair:'#96928D',
    hairBack:'M50 57C51 34 68 21 93 21C118 22 132 40 130 62L125 100L55 103Z',
    hairFront:'M51 58C48 38 64 22 84 19C107 16 129 31 132 51C120 49 112 42 106 33C96 45 79 51 65 48C60 54 56 57 51 58Z',
    face:'M60 49C66 33 80 30 95 32C111 33 121 47 120 67C119 88 108 105 93 108C76 106 62 91 59 70C58 62 58 54 60 49Z',
    shirt:'#344E42', torso:'M66 108C80 100 110 102 122 113C130 127 131 151 136 171C116 183 76 183 55 170C60 148 58 124 66 108Z',
    lower:'M56 166C77 174 114 174 136 166C138 185 134 204 131 223L107 223L100 188L89 223L65 223C60 204 56 184 56 166Z',
    leftArm:'M67 116C55 126 54 142 57 158C59 170 68 173 75 163L82 140Z',
    rightArm:'M122 116C134 125 139 143 138 158C137 170 127 174 120 164L112 140Z',
    eyes:[79,103,72], brow:'M68 62Q78 56 87 61M97 61Q106 56 115 61',
    mouth:'M84 88Q94 95 105 87Q102 98 94 100Q87 98 84 88Z',
    beard:'M67 82C72 100 82 109 94 110C107 109 117 98 121 81C118 105 107 118 94 119C80 118 70 104 67 82Z',
    signature:'Sereno e didático',
    hairLabel:'Cabelo grisalho ondulado e bigode curto', outfitLabel:'Suéter verde-escuro e calça ocre',
    bodyLabel:'Silhueta madura de ombros retos', toneLabel:'Sereno e ponderado',
  },
  'prof.caio': {
    skin:'#D99A70', hair:'#3A2725',
    hairBack:'M51 59C50 36 67 20 93 20C118 21 132 39 130 62L125 100L56 103Z',
    hairFront:'M51 59C48 39 62 21 84 18C107 15 129 30 132 50C119 47 110 41 104 32C95 45 79 50 65 49C61 55 56 58 51 59Z',
    face:'M60 48C66 33 80 30 95 32C111 33 121 47 120 67C119 88 108 105 93 108C76 106 62 91 59 70C58 62 58 54 60 48Z',
    shirt:'#356D80', torso:'M66 108C80 100 110 102 122 113C130 127 131 151 136 171C116 183 76 183 55 170C60 148 58 124 66 108Z',
    lower:'M56 166C77 174 114 174 136 166C138 185 134 204 131 223L107 223L100 188L89 223L65 223C60 204 56 184 56 166Z',
    leftArm:'M67 116C55 126 54 142 57 158C59 170 68 173 75 163L82 140Z',
    rightArm:'M122 116C134 125 139 143 138 158C137 170 127 174 120 164L112 140Z',
    eyes:[79,103,72], brow:'M68 62Q78 56 87 61M97 61Q106 56 115 61',
    mouth:'M84 88Q94 97 105 87Q102 101 94 102Q87 100 84 88Z',
    signature:'Objetivo e experimental',
    hairLabel:'Corte curto com topete lateral', outfitLabel:'Moletom azul-petróleo e calça escura',
    bodyLabel:'Silhueta compacta de cabelo curto', toneLabel:'Curioso e inventivo',
  },
};

function Eyes({ design }: { design:CharacterDesign }) {
  const [left, right, y] = design.eyes;
  return (
    <g>
      <path d={design.brow} fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round"/>
      <path d={'M' + (left - 4) + ' ' + (y - 1) + ' C' + (left - 6) + ' ' + (y - 10) + ' ' + (left + 6) + ' ' + (y - 10) + ' ' + (left + 5) + ' ' + y + ' C' + (left + 4) + ' ' + (y + 7) + ' ' + (left - 4) + ' ' + (y + 7) + ' ' + (left - 4) + ' ' + (y - 1) + 'Z'} fill={PAPER}/>
      <path d={'M' + (right - 5) + ' ' + (y - 1) + ' C' + (right - 6) + ' ' + (y - 10) + ' ' + (right + 6) + ' ' + (y - 10) + ' ' + (right + 5) + ' ' + y + ' C' + (right + 4) + ' ' + (y + 7) + ' ' + (right - 4) + ' ' + (y + 7) + ' ' + (right - 5) + ' ' + (y - 1) + 'Z'} fill={PAPER}/>
      <path d={'M' + (left - 1) + ' ' + y + ' C' + (left - 1) + ' ' + (y - 5) + ' ' + (left + 3) + ' ' + (y - 5) + ' ' + (left + 3) + ' ' + y + ' C' + (left + 3) + ' ' + (y + 3) + ' ' + (left - 1) + ' ' + (y + 3) + ' ' + (left - 1) + ' ' + y + 'Z'} fill={INK}/>
      <path d={'M' + (right - 2) + ' ' + y + ' C' + (right - 2) + ' ' + (y - 5) + ' ' + (right + 2) + ' ' + (y - 5) + ' ' + (right + 2) + ' ' + y + ' C' + (right + 2) + ' ' + (y + 3) + ' ' + (right - 2) + ' ' + (y + 3) + ' ' + (right - 2) + ' ' + y + 'Z'} fill={INK}/>
      <path d="M92 84Q90 90 94 91" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" opacity=".55"/>
      <path d={design.mouth} fill={INK}/>
    </g>
  );
}

function Glasses() {
  return (
    <g fill="none" stroke={INK} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M66 72C66 66 70 64 77 64C85 64 88 67 88 73C88 80 84 84 77 84C70 84 66 80 66 72Z"/>
      <path d="M96 72C96 66 100 64 107 64C115 64 119 67 119 73C119 80 115 84 108 84C100 84 96 80 96 72Z"/>
      <path d="M88 72Q92 69 96 72M65 70L60 69M119 70L123 68"/>
    </g>
  );
}

function HumanArt({ design }: { design:CharacterDesign }) {
  return (
    <g stroke={INK} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d={design.hairBack} fill={design.hair}/>
      <path d="M78 101Q91 111 104 101L106 119Q91 126 76 118Z" fill={design.skin}/>
      <path d={design.lower} fill={design.shirt}/>
      <path d={design.torso} fill={design.shirt}/>
      <path d={design.leftArm} fill={design.shirt}/>
      <path d={design.rightArm} fill={design.shirt}/>
      <path d="M68 129Q62 142 66 154Q71 159 76 153L78 139Z" fill={design.skin}/>
      <path d="M128 129Q135 141 131 154Q126 160 121 153L119 139Z" fill={design.skin}/>
      <path d="M66 218Q78 221 91 217L91 226Q76 230 62 226Q59 222 66 218Z" fill={INK}/>
      <path d="M108 217Q120 220 132 216L138 225Q123 230 107 226Q103 222 108 217Z" fill={INK}/>
      <path d="M70 171Q91 177 129 169" fill="none" stroke={INK} strokeWidth="1.5" opacity=".28"/>
      <path d={design.face} fill={design.skin}/>
      {design.freckles && <path d="M68 84l1 1M73 88l1 1M111 84l1 1M116 88l1 1" stroke={INK} strokeWidth="1.3" opacity=".55"/>}
      <Eyes design={design}/>
      {design.glasses && <Glasses/>}
      {design.earrings && <path d="M57 84Q52 91 59 96M124 83Q130 91 123 96" fill="none" stroke="#D9A33F" strokeWidth="3"/>}
      {design.beard && <path d={design.beard} fill={design.hair} stroke="none"/>}
      <path d={design.hairFront} fill={design.hair}/>
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
      data-character-species="human"
      data-character-body={design.bodyLabel}
      data-character-hair={design.hairLabel}
      data-character-outfit={design.outfitLabel}
      data-character-tone={design.toneLabel}
      data-character-signature={design.signature}
      data-character-stage="static-design"
      focusable="false"
      preserveAspectRatio="xMidYMax meet"
    >
      {portrait && <circle cx="90" cy="90" r="65" fill={tone}/>}
      {!portrait && <ellipse cx="90" cy="230" rx="44" ry="4" fill={INK} opacity=".08" stroke="none"/>}
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
      return <g stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M46 113C29 121 24 147 40 154C51 160 60 148 56 137C51 126 41 128 40 137" fill="none" stroke="#E98B35" strokeWidth="9"/>
        <path d="M50 125C47 104 54 82 76 75C95 65 120 79 126 101C133 122 120 146 94 151C68 152 53 141 50 125Z" fill="#E98B35"/>
        <path d="M58 91L55 67Q71 70 78 85M106 83Q116 67 130 71L123 96" fill="#E98B35"/>
        <path d="M65 104Q75 97 84 104M99 103Q108 96 117 103" fill="none" stroke={INK} strokeWidth="3"/>
        <path d="M81 116Q88 123 95 116Q93 128 88 128Q83 127 81 116Z" fill={INK}/>
        <path d="M72 133Q89 145 106 132" fill="none" stroke={INK} strokeWidth="2.5"/>
        <path d="M65 150Q59 162 68 166L80 165L85 151M98 151L103 165L116 165Q122 159 114 149" fill="#E98B35"/>
        <path d="M79 166L78 171M108 166L109 171" stroke={INK} strokeWidth="3"/>
      </g>;
    case 'teco':
      return <g stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M45 141C39 105 48 70 88 62C127 56 143 91 134 133C129 160 111 174 89 174C65 174 49 160 45 141Z" fill="#986044"/>
        <path d="M48 83L45 57Q64 62 74 76M111 74Q123 58 137 58L130 87" fill="#986044"/>
        <path d="M58 109Q66 82 86 91Q91 108 77 121Q64 125 58 109ZM91 94Q113 80 125 106Q121 123 104 122Q91 115 91 94Z" fill="#F6E6CE"/>
        <path d="M84 114L91 123L99 114L94 137L88 137Z" fill="#D99D36"/>
        <path d="M70 148Q90 158 111 147" fill="none" stroke="#F6E6CE" strokeWidth="4"/>
        <path d="M60 161L52 174M117 161L126 174" stroke="#D99D36" strokeWidth="5"/>
      </g>;
    case 'bento':
      return <g stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M42 139C40 108 56 81 88 80C117 78 138 103 134 136C130 163 111 177 87 177C61 176 44 161 42 139Z" fill="#B86D43"/>
        <path d="M51 103Q44 87 60 77Q73 78 76 91M105 89Q115 75 130 85Q138 98 124 107" fill="#B86D43"/>
        <path d="M71 115Q80 107 88 116M99 116Q108 108 116 116" fill="none" stroke={INK} strokeWidth="3"/>
        <path d="M79 131Q92 137 105 130" fill="none" stroke={INK} strokeWidth="2.5"/>
        <path d="M86 133L85 145L92 149L99 144L98 132" fill="#F7E6CF"/>
        <path d="M48 151Q36 158 32 169M127 151Q143 154 152 169" fill="none" stroke="#B86D43" strokeWidth="10"/>
        <path d="M128 140C148 137 160 148 156 164C152 178 132 179 120 164" fill="#76503B"/>
        <path d="M60 173L54 183M108 174L115 183" stroke={INK} strokeWidth="4"/>
      </g>;
    default:
      return <g stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 139C39 105 55 88 88 86C122 84 139 106 136 140C133 166 113 178 88 178C62 178 43 165 40 139Z" fill="#7FA64E"/>
        <path d="M50 96Q46 75 65 75Q81 74 83 94M93 94Q97 72 115 75Q132 78 126 100" fill="#7FA64E"/>
        <path d="M63 111C65 99 82 99 84 112C85 125 66 127 63 111ZM96 111C98 99 115 99 117 112C118 125 99 127 96 111Z" fill="#FFF3D8"/>
        <path d="M70 111C70 104 80 104 80 112C80 118 70 118 70 111ZM104 111C104 104 113 104 113 112C113 118 104 118 104 111Z" fill={INK}/>
        <path d="M79 137Q89 143 101 137" fill="none" stroke={INK} strokeWidth="2.7"/>
        <path d="M54 153Q42 163 49 177M122 153Q136 164 128 177" fill="none" stroke="#7FA64E" strokeWidth="11"/>
        <path d="M69 174Q66 184 78 185L87 180M104 174Q111 185 122 181" fill="none" stroke="#7FA64E" strokeWidth="8"/>
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
            <svg viewBox="0 0 180 200" width={compact ? 112 : 144} height={compact ? 124 : 158} role="img" aria-label={mascot.name + ', ' + mascot.role} data-mascot-id={mascot.id}>
              <ellipse cx="90" cy="181" rx="43" ry="4" fill={INK} opacity=".08"/>
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
