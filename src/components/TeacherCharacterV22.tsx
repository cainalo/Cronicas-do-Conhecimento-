
    artId:'caio',
    artId:'augusto',
    artId:'helena',
    artId:'sofia',
    artId:'beatriz',
    artId:'marina',
    artId:'mateus',
    artId:'ravi',
    artId:'nina',
    artId:'iara',
    artId:'davi',
    artId:'lia',
    artId:'clara',import type { CSSProperties, ReactNode } from 'react';
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
  nose: string;
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
    hairStrands:'M56 55Q63 38 78 31M112 37Q126 50 126 68M58 102Q57 118 65 131',
    face:'M57 52C61 34 78 30 94 32C113 34 124 48 123 69C122 94 112 112 94 116C74 115 58 99 55 77C53 68 54 59 57 52Z',
    silhouette:'M66 110C57 113 54 123 53 135L48 157C46 166 50 173 57 174C63 175 67 169 69 160L73 145C69 168 63 191 62 225L87 225L94 184L101 225L137 225C136 191 132 168 128 145L133 161C136 171 143 175 149 171C154 167 151 159 148 151L138 127C134 115 123 109 112 108C96 105 80 106 66 110Z',
    shirt:'#C45A36', bottomColor:'#EED5B3', torso:'M65 112C76 105 111 105 123 116C132 127 134 152 139 174C120 184 77 184 58 172C62 149 57 126 65 112Z',
    lower:'M60 168C81 176 119 176 139 168C142 185 137 204 132 223L108 223L100 187L91 223L66 223C61 204 56 185 60 168Z',
    leftArm:'M69 119C57 124 53 142 51 158C49 169 55 177 65 174C72 170 72 156 77 146Z',
    rightArm:'M120 119C132 123 139 142 141 159C142 169 136 176 128 171C121 166 124 149 114 142Z',
    eyes:[78,103,75], eyeSize:[5.8,8.2], eyeStyle:'round', pupilSize:2.7, nose:'M88 83Q92 87 96 83', brow:'M68 66Q77 60 85 65M96 64Q105 59 112 65',
    mouth:'M82 91Q94 101 106 90Q102 105 92 105Q85 103 82 91Z',
    earrings:true, freckles:true, signature:'Curiosa e acolhedora',
    hairLabel:'Cabelo longo, ondulado e volumoso', outfitLabel:'Blusa terracota e calça ampla creme',
    bodyLabel:'Silhueta leve, cabelo como forma principal', toneLabel:'Quente e acessível',
  },
  'prof.lia': {
    skin:'#B97554', hair:'#2C2325',
    hairBack:'M57 57C56 34 73 22 91 22C113 22 128 38 128 59L126 107L116 123L65 116Z',
    hairFront:'M57 59C57 38 70 24 92 23C111 22 127 36 128 54C113 49 105 39 101 34C93 47 78 55 57 59Z M62 53C69 43 77 37 86 34C81 44 74 51 62 53Z',
    hairStrands:'M62 49Q72 35 86 31M105 32Q119 42 123 57',
    face:'M62 51C67 35 79 31 94 32C110 33 121 45 121 63C121 86 110 106 93 109C75 107 61 90 60 69C60 62 60 56 62 51Z',
    silhouette:'M68 108C59 111 55 122 55 135L52 153C50 162 54 169 60 170C66 171 69 166 71 158L75 143C71 167 70 194 70 225L91 225L94 184L99 225L124 225C125 194 122 166 119 143L124 158C127 167 134 171 140 167C146 163 143 155 140 147L132 126C128 114 119 108 109 107C95 105 80 105 68 108Z',
    shirt:'#6D854B', bottomColor:'#E9D7B8', torso:'M68 106C81 99 107 101 119 111C128 124 127 149 130 170C110 181 75 181 55 169C60 147 59 119 68 106Z',
    lower:'M59 166C78 173 111 173 132 165C136 183 132 202 130 223L104 223L99 187L88 223L63 223C60 202 56 182 59 166Z',
    leftArm:'M69 115C58 122 57 144 58 159C58 170 65 174 73 168L80 140Z',
    rightArm:'M119 116C130 126 134 145 134 159C133 169 125 173 119 164L110 139Z',
    eyes:[80,103,72], eyeSize:[5.2,7.5], eyeStyle:'almond', pupilSize:2.25, nose:'M89 82Q92 86 95 83', brow:'M70 61Q78 57 86 61M98 60Q105 56 112 60',
    mouth:'M85 88Q94 94 103 87Q100 98 93 98Q87 97 85 88Z',
    glasses:true, signature:'Metódica e investigativa',
    hairLabel:'Coque alto e franja lateral', outfitLabel:'Blusa verde-oliva e calça clara',
    bodyLabel:'Silhueta compacta com coque alto', toneLabel:'Prática e concentrada',
  },
  'prof.davi': {
    skin:'#8F533C', hair:'#241C1B',
    hairBack:'M52 63C49 42 62 22 84 20C106 15 128 32 130 55L126 105L57 108Z',
    hairFront:'M51 59C45 43 58 22 76 20C89 12 107 21 114 28C127 32 133 47 127 63C118 58 112 51 107 42C99 52 87 55 76 51C69 59 61 62 51 59Z',
    hairStrands:'M55 49Q62 34 75 29M92 25Q108 27 117 42',
    face:'M58 49C64 32 78 29 94 31C111 33 122 47 121 68C120 90 107 107 91 109C74 107 60 91 57 71C56 62 56 55 58 49Z',
    silhouette:'M61 108C50 112 47 124 45 138L42 157C41 167 47 174 55 174C63 174 66 167 68 157L73 143C67 167 65 195 64 225L89 225L94 184L100 225L137 225C136 195 132 168 127 143L132 158C135 169 143 174 151 171C158 168 156 160 153 151L145 128C141 115 130 108 119 107C98 103 78 104 61 108Z',
    shirt:'#477A48', bottomColor:'#34343C', torso:'M62 108C77 101 110 103 125 115C131 129 133 153 137 171C118 182 72 181 52 169C57 147 54 122 62 108Z',
    lower:'M54 166C73 174 116 174 137 166C138 185 135 202 131 223L107 223L100 188L90 223L66 223C60 202 55 184 54 166Z',
    leftArm:'M64 117C53 126 48 143 51 159C53 170 63 173 69 164L78 139Z',
    rightArm:'M123 117C136 125 142 142 140 157C139 170 129 174 123 163L113 139Z',
    eyes:[79,103,72], eyeSize:[6.2,8.4], eyeStyle:'round', pupilSize:2.7, nose:'M88 83Q92 88 97 83', brow:'M67 61Q77 55 86 60M97 60Q107 54 115 60',
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
    hairStrands:'M48 58Q57 39 72 32M105 31Q125 44 127 65M119 96Q127 111 122 128',
    face:'M57 48C64 32 79 29 94 31C112 34 122 49 120 71C118 94 107 111 91 114C73 111 58 94 56 72C55 63 55 54 57 48Z',
    silhouette:'M67 109C59 112 56 124 56 137L51 156C49 165 54 172 61 172C67 172 71 166 73 157L77 143C73 166 69 188 68 222L112 222C110 196 105 179 101 166C111 180 124 191 137 222L148 222C143 193 135 170 128 145L134 160C137 170 144 173 150 169C155 165 152 157 149 149L140 126C135 114 125 108 113 108C96 106 80 106 67 109Z',
    shirt:'#F1E8D3', bottomColor:'#687747', torso:'M65 109C79 102 108 103 120 114C128 130 128 153 133 174C112 184 74 184 54 172C59 149 57 125 65 109Z',
    lower:'M56 167C76 175 112 176 133 167C140 185 144 204 148 223L44 223C48 203 52 184 56 167Z',
    leftArm:'M66 118C56 128 55 146 59 160C62 170 71 171 76 162L82 140Z',
    rightArm:'M119 117C132 127 135 143 137 158C138 169 128 175 121 164L113 142Z',
    eyes:[78,103,72], eyeSize:[5.4,8.8], eyeStyle:'almond', pupilSize:2.35, nose:'M88 84Q92 88 96 84', brow:'M68 65Q77 59 86 63M96 63Q105 59 113 64',
    mouth:'M83 90Q93 96 104 89Q101 100 94 101Q86 100 83 90Z',
    earrings:true, signature:'Calma e criteriosa',
    hairLabel:'Cabelo longo, liso e lateral', outfitLabel:'Blusa creme e saia verde',
    bodyLabel:'Silhueta alongada com cabelo longo', toneLabel:'Serena e observadora',
  },
  'prof.nina': {
    skin:'#E7B08A', hair:'#242024',
    hairBack:'M47 69C45 42 61 23 91 22C122 22 136 45 133 76L127 104C121 123 108 131 94 130C73 128 55 112 48 91Z',
    hairFront:'M47 69C46 42 64 23 91 22C119 21 135 43 133 70C118 68 108 59 101 49C88 62 70 69 47 69Z M48 71C57 68 64 60 69 51C72 68 67 79 59 85Z',
    hairStrands:'M54 55Q66 36 82 31M102 31Q122 43 126 62',
    face:'M61 51C68 35 80 32 94 33C111 34 120 47 120 65C120 84 110 100 94 104C76 102 62 88 60 69C59 62 59 56 61 51Z',
    silhouette:'M69 105C60 109 57 120 56 133L52 151C50 160 55 167 62 167C68 167 71 162 73 153L77 139C73 163 71 190 70 224L90 224L94 184L99 224L126 224C126 192 122 164 119 139L124 154C127 163 134 168 140 164C146 160 143 152 140 144L133 122C129 110 119 104 109 103C95 101 80 102 69 105Z',
    shirt:'#79609B', bottomColor:'#393541', torso:'M66 103C79 96 110 99 121 111C129 125 132 149 137 169C119 180 74 180 55 169C60 148 58 119 66 103Z',
    lower:'M57 166C76 174 114 174 136 166C137 184 135 204 132 223L108 223L100 188L89 223L65 223C60 203 56 183 57 166Z',
    leftArm:'M67 112C56 120 52 141 55 156C58 169 67 171 73 161L80 138Z',
    rightArm:'M120 112C133 123 137 141 139 155C140 168 130 174 122 164L113 138Z',
    eyes:[79,103,72], eyeSize:[5.4,7.6], eyeStyle:'almond', pupilSize:2.5, nose:'M89 82Q92 86 95 82', brow:'M68 65Q78 58 87 64M97 63Q106 58 114 64',
    mouth:'M84 88Q94 92 104 86Q102 98 94 99Q87 98 84 88Z',
    glasses:true, signature:'Investigativa e curiosa',
    hairLabel:'Bob curto com franja lateral', outfitLabel:'Blusa ameixa e calça escura',
    bodyLabel:'Silhueta curta com corte arredondado', toneLabel:'Perspicaz e expressiva',
  },
  'prof.ravi': {
    skin:'#A86443', hair:'#2A211F',
    hairBack:'M48 62C48 37 66 20 91 19C118 19 135 38 132 64L126 103L54 105Z',
    hairFront:'M47 57C44 37 61 19 81 18C102 12 125 27 132 46C135 58 127 66 119 65C111 55 109 44 104 39C96 50 85 54 76 49C68 57 58 61 47 57Z',
    hairStrands:'M52 49Q62 32 78 28M95 26Q115 29 125 48',
    face:'M58 48C63 32 79 29 94 31C111 33 122 47 121 69C119 92 107 108 91 111C74 108 59 92 57 70C56 61 56 53 58 48Z',
    silhouette:'M61 108C50 112 47 124 46 138L43 158C42 169 48 176 56 176C64 176 68 169 70 158L75 142C69 168 65 194 65 225L90 225L94 184L100 225L137 225C135 194 131 167 126 142L132 158C135 169 143 175 151 171C157 167 155 159 152 150L144 127C139 114 128 108 117 107C97 104 77 104 61 108Z',
    shirt:'#D6A34E', bottomColor:'#344B3A', torso:'M63 108C77 100 109 102 123 114C132 128 132 151 138 172C116 184 73 182 52 169C58 148 55 124 63 108Z',
    lower:'M54 166C73 175 116 174 138 166C139 183 135 203 131 223L107 223L100 188L89 223L65 223C60 203 55 184 54 166Z',
    leftArm:'M64 116C52 125 51 142 53 158C55 169 64 174 72 163L80 139Z',
    rightArm:'M123 116C135 124 142 142 140 158C139 170 128 174 121 163L113 139Z',
    eyes:[79,103,72], eyeSize:[6.2,8.5], eyeStyle:'wide', pupilSize:2.8, nose:'M88 84Q92 88 97 84', brow:'M68 61Q78 54 87 60M97 60Q107 54 116 60',
    mouth:'M83 87Q94 98 107 87Q105 103 94 104Q86 101 83 87Z',
    signature:'Prático e colaborativo',
    hairLabel:'Cachos curtos e arredondados', outfitLabel:'Blusa mostarda e calça verde-escura',
    bodyLabel:'Silhueta atlética e compacta', toneLabel:'Otimista e enérgico',
  },
  'prof.mateus': {
    skin:'#D89B75', hair:'#583A2A',
    hairBack:'M51 58C51 34 70 20 94 21C117 22 131 39 129 62L125 100L57 103Z',
    hairFront:'M51 59C47 39 63 20 84 19C105 16 125 29 130 48C118 46 110 41 104 34C95 47 78 51 64 49C60 55 56 58 51 59Z',
    hairStrands:'M56 49Q69 32 87 29M105 31Q119 40 124 55',
    face:'M60 48C66 33 80 30 95 32C111 33 121 47 120 67C119 88 108 105 93 109C76 106 62 91 59 71C58 61 58 54 60 48Z',
    silhouette:'M67 109C58 113 55 124 54 137L50 157C48 166 53 173 60 173C66 173 70 167 72 158L76 143C72 167 70 194 69 225L90 225L94 184L99 225L124 225C125 194 122 167 119 143L124 157C127 166 134 171 140 167C146 163 143 155 140 147L132 126C128 114 119 108 108 107C94 105 79 106 67 109Z',
    shirt:'#985B45', bottomColor:'#38343C', torso:'M66 107C80 101 110 103 122 114C130 127 131 151 136 171C116 183 76 183 55 170C60 148 58 125 66 107Z',
    lower:'M56 166C77 174 114 174 136 166C138 185 134 204 131 223L107 223L100 188L89 223L65 223C60 204 56 184 56 166Z',
    leftArm:'M67 116C56 124 53 141 56 157C58 170 67 174 74 164L81 140Z',
    rightArm:'M122 116C133 124 138 143 137 158C136 170 126 174 119 164L112 140Z',
    eyes:[79,103,72], eyeSize:[5.6,7.6], eyeStyle:'soft', pupilSize:2.4, nose:'M89 82Q92 86 95 82', brow:'M68 62Q78 56 86 62M97 61Q106 56 114 62',
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
    hairStrands:'M54 59Q64 39 80 32M108 34Q126 46 128 66',
    face:'M60 50C66 34 80 31 94 32C111 34 121 48 120 68C119 90 107 107 92 110C75 107 61 92 59 71C58 63 58 56 60 50Z',
    silhouette:'M66 108C57 112 54 123 54 136L50 155C48 164 53 171 60 172C66 172 70 166 72 157L76 143C72 167 69 193 68 225L91 225L94 184L99 225L126 225C127 193 123 166 120 143L125 157C128 167 135 172 141 168C147 164 144 156 141 148L133 126C129 114 120 108 109 107C95 105 79 106 66 108Z',
    shirt:'#302E35', bottomColor:'#E9D9BE', torso:'M67 107C81 100 109 102 121 113C129 127 130 151 135 171C116 183 75 182 55 170C60 147 58 124 67 107Z',
    lower:'M57 166C77 174 112 174 134 166C140 185 138 203 133 223L108 223L100 188L88 223L64 223C60 203 56 185 57 166Z',
    leftArm:'M68 116C55 126 53 143 57 158C59 169 67 172 74 163L81 139Z',
    rightArm:'M121 116C135 125 140 143 139 159C138 171 128 175 121 164L112 139Z',
    eyes:[79,103,72], eyeSize:[5.5,8.2], eyeStyle:'almond', pupilSize:2.35, nose:'M88 83Q92 87 96 83', brow:'M68 63Q77 57 86 62M97 62Q106 57 114 62',
    mouth:'M83 89Q94 96 105 88Q102 100 94 101Q86 100 83 89Z',
    earrings:true, signature:'Organizada e estratégica',
    hairLabel:'Cabelo médio reto com pontas curvas', outfitLabel:'Casaco grafite e calça creme',
    bodyLabel:'Silhueta média e equilibrada', toneLabel:'Organizada e segura',
  },
  'prof.beatriz': {
    skin:'#C98764', hair:'#4B302A',
    hairBack:'M52 72C40 65 44 47 55 42C49 27 67 18 79 25C83 12 102 13 108 25C126 20 138 38 129 52C140 65 131 83 124 93L126 102L54 104Z',
    hairFront:'M49 60C43 47 53 34 63 33C62 20 78 17 87 26C99 16 115 26 113 38C128 39 134 52 126 64C113 59 105 52 101 43C89 53 74 57 62 52C58 57 53 60 49 60Z',
    hairStrands:'M54 48Q63 31 80 28M101 29Q121 38 126 56',
    face:'M60 49C66 33 80 30 94 31C111 33 121 47 120 67C119 88 108 105 93 108C76 106 62 91 59 70C58 61 58 54 60 49Z',
    silhouette:'M68 108C59 111 56 121 55 134L51 153C49 162 54 169 61 169C67 169 70 164 72 155L76 141C72 164 70 191 69 224L91 224L94 184L99 224L125 224C125 191 122 164 119 141L124 155C127 164 134 168 140 164C145 160 143 153 140 145L133 125C129 113 120 107 109 106C95 104 80 105 68 108Z',
    shirt:'#D65A36', bottomColor:'#EAD7BC', torso:'M66 107C80 101 109 103 121 114C129 127 132 151 136 171C116 182 76 183 55 170C60 148 58 124 66 107Z',
    lower:'M56 166C77 174 114 174 136 166C138 184 134 203 130 223L106 223L100 188L89 223L65 223C60 203 56 184 56 166Z',
    leftArm:'M67 115C56 124 52 144 56 159C59 171 68 174 74 164L81 140Z',
    rightArm:'M121 115C133 125 138 142 138 158C138 169 129 173 121 164L113 140Z',
    eyes:[79,103,72], eyeSize:[5.9,8], eyeStyle:'round', pupilSize:2.6, nose:'M88 83Q92 87 96 83', brow:'M68 63Q77 58 86 63M97 63Q106 58 114 63',
    mouth:'M84 89Q94 98 104 88Q101 102 94 103Q87 102 84 89Z',
    glasses:true, signature:'Clara e criteriosa',
    hairLabel:'Cachos médios com faixa discreta', outfitLabel:'Blusa coral e calça clara',
    bodyLabel:'Silhueta compacta com cachos marcantes', toneLabel:'Direta e acessível',
  },
  'prof.sofia': {
    skin:'#E4A17B', hair:'#6B3424',
    hairBack:'M42 84C39 51 56 22 91 20C124 18 141 45 136 82L130 166C118 174 108 163 110 145L61 158C49 148 53 112 42 84Z',
    hairFront:'M45 62C43 36 63 19 91 20C116 20 137 38 136 66C123 62 113 52 107 40C98 54 76 58 60 57C55 61 50 63 45 62Z',
    hairStrands:'M47 59Q58 35 78 29M109 31Q131 48 130 70M119 107Q128 123 123 140',
    face:'M57 49C64 32 79 29 94 31C112 33 122 48 121 71C119 94 107 111 91 114C73 111 58 94 56 71C55 62 55 54 57 49Z',
    silhouette:'M65 109C56 112 53 123 52 136L48 157C46 166 51 173 58 174C65 174 68 167 70 157L75 142C70 168 66 194 65 225L89 225L94 184L100 225L137 225C136 194 132 167 127 142L132 157C135 168 143 173 150 169C156 165 153 157 150 149L140 126C135 114 125 108 113 108C96 105 79 106 65 109Z',
    shirt:'#CB557A', bottomColor:'#38343D', torso:'M65 110C78 102 110 103 121 115C129 129 130 151 135 172C116 184 75 184 54 171C59 149 57 124 65 110Z',
    lower:'M56 166C76 175 114 175 136 166C141 184 137 203 132 223L107 223L100 188L89 223L64 223C59 203 55 184 56 166Z',
    leftArm:'M66 118C55 127 53 144 57 159C59 170 67 173 74 163L81 141Z',
    rightArm:'M121 118C134 127 139 143 138 159C137 171 127 174 120 164L112 140Z',
    eyes:[79,103,72], eyeSize:[6,8.9], eyeStyle:'wide', pupilSize:2.7, nose:'M88 84Q92 88 96 84', brow:'M67 63Q77 57 86 62M97 62Q107 57 115 62',
    mouth:'M83 89Q94 100 106 88Q103 104 94 104Q86 102 83 89Z',
    earrings:true, signature:'Expressiva e acolhedora',
    hairLabel:'Cabelo longo e ondulado', outfitLabel:'Blusa rosa antigo e calça escura',
    bodyLabel:'Silhueta fluida com cabelo longo', toneLabel:'Expressiva e calorosa',
  },
  'prof.helena': {
    skin:'#E3B18D', hair:'#A69B8D',
    hairBack:'M55 59C56 37 72 23 92 24C113 23 128 39 128 60L124 103L60 103Z M73 32C70 19 78 9 91 8C104 8 111 20 105 30C97 38 80 39 73 32Z',
    hairFront:'M58 54C60 34 73 24 91 24C109 24 125 37 127 53C116 49 108 43 102 34C94 47 77 51 58 54Z',
    hairStrands:'M62 47Q72 32 89 29M104 30Q121 42 123 57',
    face:'M62 51C68 36 80 32 94 33C110 34 119 47 119 66C119 86 108 103 93 106C77 104 63 89 61 69C60 62 60 56 62 51Z',
    silhouette:'M65 106C56 110 53 121 52 134L48 153C46 162 51 169 58 170C64 170 68 164 70 155L74 141C70 164 68 192 66 222L114 222C112 195 107 172 102 155C112 174 124 194 134 222L149 222C143 193 135 168 128 142L134 157C137 167 144 171 150 167C156 163 153 155 150 147L140 124C135 112 124 106 113 105C96 103 78 103 65 106Z',
    shirt:'#778B50', bottomColor:'#3C3940', torso:'M67 105C81 99 109 101 121 112C128 126 130 149 135 171C116 182 76 182 56 169C60 147 59 123 67 105Z',
    lower:'M57 166C78 174 112 174 134 166C141 185 144 204 147 223L45 223C49 204 53 185 57 166Z',
    leftArm:'M68 114C56 125 55 141 58 157C60 169 69 173 75 163L82 140Z',
    rightArm:'M121 114C134 124 139 143 139 158C138 170 128 173 121 164L113 140Z',
    eyes:[80,103,72], eyeSize:[5.5,7.7], eyeStyle:'soft', pupilSize:2.3, nose:'M89 82Q92 86 95 82', brow:'M69 64Q78 58 87 63M98 63Q107 58 115 63',
    mouth:'M84 89Q94 96 104 88Q101 99 94 100Q87 99 84 89Z',
    glasses:true, signature:'Expressiva e cuidadosa',
    hairLabel:'Coque grisalho com mechas suaves', outfitLabel:'Cardigã verde e saia escura',
    bodyLabel:'Silhueta média com coque alto', toneLabel:'Acolhedora e experiente',
  },
  'prof.augusto': {
    skin:'#C58A69', hair:'#96928D',
    hairBack:'M50 57C51 34 68 21 93 21C118 22 132 40 130 62L125 100L55 103Z',
    hairFront:'M51 58C48 38 64 22 84 19C107 16 129 31 132 51C120 49 112 42 106 33C96 45 79 51 65 48C60 54 56 57 51 58Z',
    hairStrands:'M55 49Q67 31 84 29M105 31Q123 42 124 57',
    face:'M60 49C66 33 80 30 95 32C111 33 121 47 120 67C119 88 108 105 93 108C76 106 62 91 59 70C58 62 58 54 60 49Z',
    silhouette:'M63 108C53 112 50 123 49 137L45 157C43 166 49 173 57 173C63 173 67 167 69 157L74 142C69 168 66 194 65 225L89 225L94 184L100 225L137 225C136 194 131 167 126 142L132 157C135 168 143 173 151 169C157 165 154 157 151 149L142 127C137 114 126 108 115 107C96 104 78 104 63 108Z',
    shirt:'#344E42', bottomColor:'#B98958', torso:'M66 108C80 100 110 102 122 113C130 127 131 151 136 171C116 183 76 183 55 170C60 148 58 124 66 108Z',
    lower:'M56 166C77 174 114 174 136 166C138 185 134 204 131 223L107 223L100 188L89 223L65 223C60 204 56 184 56 166Z',
    leftArm:'M67 116C55 126 54 142 57 158C59 170 68 173 75 163L82 140Z',
    rightArm:'M122 116C134 125 139 143 138 158C137 170 127 174 120 164L112 140Z',
    eyes:[79,103,72], eyeSize:[5.7,7.4], eyeStyle:'soft', pupilSize:2.3, nose:'M89 82Q93 86 96 82', brow:'M68 62Q78 56 87 61M97 61Q106 56 115 61',
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
    hairStrands:'M56 49Q68 32 86 28M105 29Q123 39 126 57',
    face:'M60 48C66 33 80 30 95 32C111 33 121 47 120 67C119 88 108 105 93 108C76 106 62 91 59 70C58 62 58 54 60 48Z',
    silhouette:'M68 108C59 111 56 122 55 135L51 154C49 163 54 170 61 170C67 170 70 164 72 155L76 141C72 165 70 192 69 225L91 225L94 184L99 225L125 225C125 192 122 165 119 141L124 155C127 164 134 169 140 165C146 161 143 153 140 145L133 125C129 113 120 107 109 106C95 104 80 105 68 108Z',
    shirt:'#356D80', bottomColor:'#34343E', torso:'M66 108C80 100 110 102 122 113C130 127 131 151 136 171C116 183 76 183 55 170C60 148 58 124 66 108Z',
    lower:'M56 166C77 174 114 174 136 166C138 185 134 204 131 223L107 223L100 188L89 223L65 223C60 204 56 184 56 166Z',
    leftArm:'M67 116C55 126 54 142 57 158C59 170 68 173 75 163L82 140Z',
    rightArm:'M122 116C134 125 139 143 138 158C137 170 127 174 120 164L112 140Z',
    eyes:[79,103,72], eyeSize:[5.8,7.8], eyeStyle:'round', pupilSize:2.6, nose:'M89 82Q93 86 97 82', brow:'M68 62Q78 56 87 61M97 61Q106 56 115 61',
    mouth:'M84 88Q94 97 105 87Q102 101 94 102Q87 100 84 88Z',
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
    return (
      <g>
        <path d={eyePath} fill={PAPER}/>
        <path d={'M'+(irisX-pupil)+' '+(y+1)+' C'+(irisX-pupil*1.2)+' '+(y-2)+' '+(irisX-pupil*.6)+' '+(y-4)+' '+irisX+' '+(y-4)+' C'+(irisX+pupil*1.2)+' '+(y-4)+' '+(irisX+pupil)+' '+(y-1)+' '+(irisX+pupil)+' '+(y+1)+' C'+(irisX+pupil)+' '+(y+4)+' '+(irisX-pupil)+' '+(y+4)+' '+(irisX-pupil)+' '+(y+1)+'Z'} fill={INK}/>
        <path d={'M'+(irisX-pupil*.38)+' '+(y-2)+' Q'+(irisX-pupil*.1)+' '+(y-3.3)+' '+(irisX+pupil*.2)+' '+(y-2)} fill="none" stroke={PAPER} strokeWidth="1.25" strokeLinecap="round"/>
        {(wide || soft) && <path d={'M'+(x-rx*.8)+' '+(y-ry*.65)+' Q'+x+' '+(y-ry*1.15)+' '+(x+rx*.8)+' '+(y-ry*.65)} fill="none" stroke={INK} strokeWidth={soft?1.45:1.8} strokeLinecap="round" opacity=".7"/>}
      </g>
    );
  };
  return (
    <g>
      <path d={design.brow} fill="none" stroke={INK} strokeWidth="2.05" strokeLinecap="round"/>
      {makeEye(left, -0.3)}
      {makeEye(right, 0.3)}
      <path d={design.nose} fill="none" stroke="#8C5A4B" strokeWidth="1.45" strokeLinecap="round" opacity=".72"/>
      <g transform="translate(94 95) scale(.78 .78) translate(-94 -95)">
        <path d={design.mouth} fill="#7E3D38" stroke="none"/>
        <path d="M88 95Q94 98 100 94" fill="none" stroke="#F4BFB2" strokeWidth="1.8" strokeLinecap="round"/>
      </g>
    </g>
  );
}

function Glasses() {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M66 72C66 66 70 64 77 64C85 64 88 67 88 73C88 80 84 84 77 84C70 84 66 80 66 72Z"/>
      <path d="M96 72C96 66 100 64 107 64C115 64 119 67 119 73C119 80 115 84 108 84C100 84 96 80 96 72Z"/>
      <path d="M88 72Q92 69 96 72M65 70L60 69M119 70L123 68"/>
    </g>
  );
}

function HumanArt({ design }: { design:CharacterDesign }) {
  return (
    <g>
      <path d={design.hairBack} fill={design.hair} stroke={INK} strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Silhueta contínua: ombros, braços, tronco e pernas pertencem ao mesmo corpo. */}
      <path d={design.silhouette} fill={design.shirt} stroke={INK} strokeWidth="1.55" strokeLinejoin="round"/>
      <path d={design.lower} fill={design.bottomColor} stroke="none"/>
      <path d={design.torso} fill={design.shirt} stroke="none"/>
      <path d={design.leftArm} fill={design.shirt} stroke="none"/>
      <path d={design.rightArm} fill={design.shirt} stroke="none"/>
      <path d="M50 158C47 161 47 166 50 169C53 172 56 170 57 167Q59 172 62 169L60 160Q56 155 50 158Z" fill={design.skin} stroke="none"/>
      <path d="M133 158C138 159 142 164 140 169C138 173 133 172 131 168Q128 172 126 168L128 160Q130 157 133 158Z" fill={design.skin} stroke="none"/>
      <path d="M60 217C68 218 80 218 90 215C94 218 94 225 88 227C79 230 66 229 60 226C57 223 57 219 60 217Z" fill={INK} stroke="none"/>
      <path d="M109 215C119 218 129 217 136 215C141 218 141 224 137 227C128 230 115 229 108 226C104 223 105 218 109 215Z" fill={INK} stroke="none"/>
      <path d="M74 171Q91 176 128 170" fill="none" stroke="#765A48" strokeWidth="1.3" opacity=".25" strokeLinecap="round"/>
      <path d={design.face} fill={design.skin} stroke={INK} strokeWidth="1.55" strokeLinejoin="round"/>
      {design.freckles && <path d="M68 84l1 1M73 88l1 1M111 84l1 1M116 88l1 1" stroke={INK} strokeWidth="1.15" opacity=".48"/>}
      <path d="M67 91Q72 94 78 91M107 91Q113 94 118 91" fill="none" stroke="#D56F72" strokeWidth="3" opacity=".22" strokeLinecap="round"/>
      <Eyes design={design}/>
      <g className="p-character__garment-signature">
        {design.artId === 'clara' && <path d="M68 120Q78 132 89 136M112 119Q105 131 94 136" fill="none" stroke="#F0B38B" strokeWidth="2" opacity=".8" strokeLinecap="round"/>}
        {design.artId === 'lia' && <path d="M79 111L91 124L103 111M91 124L91 145" fill="none" stroke="#49643C" strokeWidth="2" strokeLinecap="round"/>}
        {design.artId === 'davi' && <path d="M72 115Q90 130 111 115M72 148Q94 156 117 148" fill="none" stroke="#A8C084" strokeWidth="2" opacity=".5" strokeLinecap="round"/>}
        {design.artId === 'iara' && <path d="M70 116Q91 127 112 116" fill="none" stroke="#D8CDB6" strokeWidth="2" strokeLinecap="round"/>}
        {design.artId === 'nina' && <path d="M77 108L91 121L105 108" fill="none" stroke="#A493B8" strokeWidth="2" strokeLinecap="round"/>}
        {design.artId === 'ravi' && <path d="M76 112Q91 126 107 112M83 112L83 131M99 112L99 131" fill="none" stroke="#F1D28E" strokeWidth="2" strokeLinecap="round"/>}
        {design.artId === 'mateus' && <path d="M77 110L91 126L105 110M91 126L91 144" fill="none" stroke="#D8BCA7" strokeWidth="2" strokeLinecap="round"/>}
        {design.artId === 'marina' && <path d="M68 112L82 123L91 116L100 123L115 112" fill="none" stroke="#77717A" strokeWidth="2" strokeLinecap="round"/>}
        {design.artId === 'beatriz' && <path d="M74 111Q91 128 108 111" fill="none" stroke="#F0BFA9" strokeWidth="2" strokeLinecap="round"/>}
        {design.artId === 'sofia' && <path d="M71 117Q91 132 111 117" fill="none" stroke="#F1B3C2" strokeWidth="2" strokeLinecap="round"/>}
        {design.artId === 'helena' && <path d="M74 111L91 127L108 111M91 127L91 148" fill="none" stroke="#D5CDAA" strokeWidth="2" strokeLinecap="round"/>}
        {design.artId === 'augusto' && <path d="M76 111L91 127L106 111" fill="none" stroke="#A2B6A7" strokeWidth="2" strokeLinecap="round"/>}
        {design.artId === 'caio' && <path d="M76 111Q91 128 106 111M83 112L83 132M99 112L99 132" fill="none" stroke="#85B2BE" strokeWidth="2" strokeLinecap="round"/>}
      </g>
      {design.glasses && <Glasses/>}
      {design.earrings && <path d="M57 84Q52 91 59 96M124 83Q130 91 123 96" fill="none" stroke="#D9A33F" strokeWidth="2.2"/>}
      {design.beard && <path d={design.beard} fill={design.hair} stroke="none"/>}
      <path d={design.hairFront} fill={design.hair} stroke={INK} strokeWidth="1.5" strokeLinejoin="round"/>
      {design.hairStrands && <path d={design.hairStrands} fill="none" stroke="#E9C4A1" strokeWidth="2.3" opacity=".26" strokeLinecap="round"/>}
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
      data-character-id={design.artId}
      data-character-silhouette="bespoke-connected-body"
      data-character-eyes={design.eyeStyle}
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
