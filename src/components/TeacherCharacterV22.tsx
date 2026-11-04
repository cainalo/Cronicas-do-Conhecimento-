import type { CSSProperties, ReactNode } from 'react';
import type { FictionalTeacher } from '@/content/teachers';

/**
 * V22.9 — identidades faciais e capilares do elenco humano do Pórtico.
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
  shapeArchetype: string;
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
  legs?: string;
  leftHand: string;
  rightHand: string;
  leftArm: string;
  rightArm: string;
  eyes: [number, number, number];
  eyeSize: [number, number];
  eyeStyle: 'round' | 'almond' | 'soft' | 'wide' | 'narrow' | 'drooped' | 'upturned' | 'hooded' | 'half-lidded' | 'pill' | 'square-soft' | 'asymmetric' | 'small-round';
  pupilSize: number;
  headScale: [number, number];
  bodyScale: [number, number];
  nose: string;
  brow: string;
  mouth: string;
  glasses?: boolean;
  glassesStyle?: 'oval' | 'round' | 'rectangular' | 'soft-square';
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
    faceShape:'heart-cheeked',
    shapeArchetype:'pear',
    skin:'#D99568', hair:'#4B2C25',
    hairBack:'M49 85C36 67 39 39 58 24C76 8 111 11 129 34C142 51 139 77 129 100C125 111 127 139 137 158C128 168 113 165 108 151C103 137 103 119 108 104C95 121 81 130 67 128C53 126 49 111 49 85Z',
    hairFront:'M49 61C47 39 65 18 88 17C111 15 130 31 132 51C120 49 111 42 105 32C99 49 79 55 63 52C59 58 54 61 49 61Z M111 48C125 55 131 67 126 83C118 78 114 68 111 48Z',
    hairStrands:'M56 55Q63 38 78 31M112 37Q126 50 126 68M58 102Q57 118 65 131',
    face:'M55 52C58 32 74 24 92 27C112 28 128 43 127 64C128 84 117 105 98 114C91 118 84 116 77 112C61 103 52 85 51 67C50 60 52 55 55 52Z',
    silhouette:'M70 108C61 111 57 122 56 136L51 155C48 166 55 173 63 170C70 167 71 156 76 145C73 161 70 175 64 194C60 208 61 222 72 226L87 226C91 223 92 214 93 198C95 214 97 224 105 226L125 226C136 226 140 217 135 203C130 184 125 163 122 145L129 162C133 171 142 174 148 168C153 163 149 153 146 145L137 126C132 113 122 108 111 107C96 105 82 105 70 108Z',
    shirt:'#C45A36', bottomColor:'#EED5B3', torso:'M65 112C76 105 111 105 123 116C132 127 134 152 139 174C120 184 77 184 58 172C62 149 57 126 65 112Z',
    lower:'M51 163C72 178 119 179 143 162C146 179 140 194 133 207C130 213 131 219 126 226C121 226 108 226 103 223C99 216 97 202 95 190C93 204 91 216 86 223C81 226 67 226 62 223C57 218 59 212 56 206C50 193 47 179 51 163Z',
    leftHand:'M59 162C62 160 67 163 67 167C71 171 69 176 65 177C61 179 56 175 55 171C54 167 56 164 59 162Z', rightHand:'M137 161C140 159 145 162 145 166C149 170 147 175 143 176C139 178 134 174 133 170C132 166 134 163 137 161Z',
    leftArm:'M69 119C57 124 53 142 51 158C49 169 55 177 65 174C72 170 72 156 77 146Z',
    rightArm:'M120 119C132 123 139 142 141 159C142 169 136 176 128 171C121 166 124 149 114 142Z',
    eyes:[76,106,72], eyeSize:[7.4,8.8], eyeStyle:round, pupilSize:2.9, nose:'M88 81C90 78 94 78 97 81C96 85 92 87 89 85C87 84 87 82 88 81Z', brow:'M67 62Q76 55 86 61Q78 65 67 62ZM97 60Q108 55 116 61Q108 65 97 60Z',
    headScale:[1.12,1.08],
    bodyScale:[0.98,1],
    mouth:'M79 91C85 88 91 91 94 93C99 89 105 88 110 92C107 104 101 109 94 109C86 109 81 102 79 91Z',
    earrings:true, freckles:true, signature:'Curiosa e acolhedora',
    hairLabel:'Longo ondulado com franja lateral em onda', outfitLabel:'Blusa terracota e calça ampla creme',
    bodyLabel:'Pera suave, cintura leve e quadril amplo', toneLabel:'Quente e acessível',
  },
  'prof.lia': {
    artId:'lia',
    faceShape:'diamond-narrow',
    shapeArchetype:'slender-column',
    skin:'#B97554', hair:'#2C2325',
    hairBack:'M61 57C60 38 74 25 91 25C108 25 122 38 122 57L119 106C116 119 108 124 99 123L66 119C61 105 60 79 61 57Z M77 30C74 18 81 9 92 8C104 8 110 19 105 30C99 37 83 37 77 30Z',
    hairFront:'M60 57C60 38 73 25 91 25C108 25 121 37 122 54C112 50 105 44 100 35C91 48 76 54 60 57Z M66 52C74 43 81 37 89 35C84 46 76 51 66 52Z',
    hairStrands:'M62 49Q72 35 86 31M105 32Q119 42 123 57',
    face:'M67 39C76 27 89 26 98 30C111 35 118 51 115 70C112 91 103 109 92 117C80 108 69 92 65 73C61 56 62 46 67 39Z',
    silhouette:'M77 108C69 111 65 121 64 134L60 151C58 160 64 166 71 164C76 162 78 152 81 142C79 163 77 186 77 207L75 226L88 226L93 189C95 209 97 222 102 226L114 226L112 207C111 185 108 163 105 142L110 155C113 163 120 166 126 162C131 158 128 150 126 142L120 124C117 113 108 108 99 107C91 106 84 106 77 108Z',
    shirt:'#6D854B', bottomColor:'#E9D7B8', torso:'M68 106C81 99 107 101 119 111C128 124 127 149 130 170C110 181 75 181 55 169C60 147 59 119 68 106Z',
    lower:'M63 163C80 174 109 174 123 163C126 179 122 197 119 211C117 218 118 223 112 226C107 226 99 226 95 223C93 213 92 201 91 190C89 203 88 216 84 223C80 226 73 226 68 223C65 219 67 212 65 206C60 193 59 178 63 163Z',
    leftHand:'M67 157C70 155 75 158 75 162C79 166 77 171 73 172C69 174 64 170 63 166C62 162 64 159 67 157Z', rightHand:'M123 155C126 153 131 156 131 160C135 164 133 169 129 170C125 172 120 168 119 164C118 160 120 157 123 155Z',
    leftArm:'M69 115C58 122 57 144 58 159C58 170 65 174 73 168L80 140Z',
    rightArm:'M119 116C130 126 134 145 134 159C133 169 125 173 119 164L110 139Z',
    eyes:[80,103,71], eyeSize:[5.5,7.3], eyeStyle:narrow, pupilSize:2.1, nose:'M90 80C92 77 95 78 96 81L94 86L91 86L89 82Z', brow:'M71 59Q79 55 86 59L85 61Q77 60 71 59ZM99 59Q106 55 113 57L112 60Q105 59 99 59Z',
    headScale:[1.01,1.12],
    bodyScale:[0.82,1.1],
    mouth:'M86 94C90 92 97 92 101 94C99 98 96 100 93 100C90 99 88 97 86 94Z',
    glasses:true, glassesStyle:'oval', signature:'Metódica e investigativa',
    hairLabel:'Coque alto e franja diagonal precisa', outfitLabel:'Blusa verde-oliva e calça clara',
    bodyLabel:'Coluna estreita, braços próximos e pernas longas', toneLabel:'Prática e concentrada',
  },
  'prof.davi': {
    artId:'davi',
    faceShape:'square-soft-jaw',
    shapeArchetype:'broad-barrel',
    skin:'#8F533C', hair:'#241C1B',
    hairBack:'M51 62C43 54 46 41 56 37C51 27 62 17 74 23C80 10 96 11 102 23C114 13 131 22 128 37C139 47 136 62 127 69L125 103L56 106Z',
    hairFront:'M50 60C43 48 50 35 61 35C59 23 72 17 82 26C90 13 106 17 110 30C125 28 134 41 128 54C119 58 113 50 107 43C97 54 84 57 73 52C66 59 57 63 50 60Z',
    hairStrands:'M55 49Q62 34 75 29M92 25Q108 27 117 42',
    face:'M54 46C58 31 74 25 94 27C115 28 128 43 127 62L124 84C121 103 109 114 94 116C78 115 63 105 58 88L54 66C53 58 53 51 54 46Z',
    silhouette:'M58 107C46 110 41 122 39 137L34 158C31 172 41 180 52 176C61 173 62 159 67 145C63 164 60 181 57 199C55 214 60 226 74 226L87 226C91 223 92 210 93 190C95 211 97 223 105 226L127 226C140 226 145 217 140 201C135 181 130 162 126 145L135 162C140 174 151 178 158 170C163 164 158 152 154 143L144 123C138 111 129 107 117 106C99 102 76 103 58 107Z',
    shirt:'#477A48', bottomColor:'#34343C', torso:'M62 108C77 101 110 103 125 115C131 129 133 153 137 171C118 182 72 181 52 169C57 147 54 122 62 108Z',
    lower:'M37 162C65 179 122 180 149 161C153 179 145 197 136 211C133 218 135 223 128 226C121 226 105 226 100 223C97 213 96 201 94 188C92 202 90 216 85 223C79 226 63 226 57 223C53 218 55 211 52 206C44 193 36 178 37 162Z',
    leftHand:'M49 167C52 165 57 168 57 172C61 176 59 181 55 182C51 184 46 180 45 176C44 172 46 169 49 167Z', rightHand:'M147 162C150 160 155 163 155 167C159 171 157 176 153 177C149 179 144 175 143 171C142 167 144 164 147 162Z',
    leftArm:'M64 117C53 126 48 143 51 159C53 170 63 173 69 164L78 139Z',
    rightArm:'M123 117C136 125 142 142 140 157C139 170 129 174 123 163L113 139Z',
    eyes:[76,106,72], eyeSize:[7.7,7.3], eyeStyle:half-lidded, pupilSize:2.7, nose:'M85 81C88 78 98 78 101 82C100 88 96 90 91 88C87 87 85 84 85 81Z', brow:'M66 59Q77 53 87 59L87 62Q76 59 66 59ZM98 58Q109 53 117 58L116 61Q107 59 98 58Z',
    headScale:[1.13,1.05],
    bodyScale:[1.14,0.91],
    mouth:'M78 93C84 90 88 91 94 94C100 90 105 90 111 93C108 100 101 104 94 104C86 104 81 100 78 93Z',
    beard:'M65 83C69 101 81 112 94 113C108 112 119 101 123 82C117 109 107 122 93 123C78 121 68 107 65 83Z',
    signature:'Conversador e visual',
    hairLabel:'Cachos densos com laterais curtas', outfitLabel:'Moletom verde e calça carvão',
    bodyLabel:'Barril largo, ombros dominantes e braços robustos', toneLabel:'Energético e próximo',
  },
  'prof.iara': {
    artId:'iara',
    faceShape:'long-tapered',
    shapeArchetype:'flared-dress',
    skin:'#E4A27E', hair:'#342126',
    hairBack:'M43 80C38 49 55 21 85 18C116 15 139 38 138 69C137 98 130 126 139 155C128 167 115 159 112 144C109 124 114 98 117 82C102 103 79 111 60 105C50 102 45 93 43 80Z',
    hairFront:'M48 60C47 37 67 18 92 19C116 20 134 38 134 61C119 58 109 49 102 36C92 53 72 58 48 60Z M48 61C53 78 52 94 44 108C39 92 41 73 48 61Z',
    hairStrands:'M48 58Q57 39 72 32M105 31Q125 44 127 65M119 96Q127 111 122 128',
    face:'M61 42C68 29 81 25 94 28C110 31 120 47 119 68C118 91 107 110 93 119C78 109 65 91 60 70C57 58 57 49 61 42Z',
    silhouette:'M74 108C66 111 62 121 61 135L57 153C55 163 62 169 69 166C75 163 76 152 80 142C78 158 75 171 72 185L89 190L94 178L100 190L118 185C115 171 111 157 108 142L113 155C116 164 124 168 130 163C136 158 132 149 130 141L123 124C119 113 110 108 101 107C91 106 82 106 74 108Z',
    shirt:'#F1E8D3', bottomColor:'#687747', torso:'M65 109C79 102 108 103 120 114C128 130 128 153 133 174C112 184 74 184 54 172C59 149 57 125 65 109Z',
    lower:'M60 162C77 177 109 178 126 162C139 177 148 197 153 214C155 221 151 226 143 226L47 226C39 226 35 221 38 214C43 197 51 177 60 162Z',
    legs:'M75 202C79 206 86 206 90 202L88 224C86 226 80 227 76 225C73 222 74 210 75 202Z M99 202C103 206 111 206 115 202C117 211 118 222 114 225C110 227 103 226 101 224Z',
    leftHand:'M65 159C68 157 73 160 73 164C77 168 75 173 71 174C67 176 62 172 61 168C60 164 62 161 65 159Z', rightHand:'M126 156C129 154 134 157 134 161C138 165 136 170 132 171C128 173 123 169 122 165C121 161 123 158 126 156Z',
    leftArm:'M66 118C56 128 55 146 59 160C62 170 71 171 76 162L82 140Z',
    rightArm:'M119 117C132 127 135 143 137 158C138 169 128 175 121 164L113 142Z',
    eyes:[78,105,73], eyeSize:[6.1,8.4], eyeStyle:almond, pupilSize:2.3, nose:'M90 82C92 79 95 80 96 83L94 88C92 89 90 87 90 82Z', brow:'M69 63Q77 57 85 61L84 63Q77 61 69 63ZM98 61Q106 57 114 62L113 64Q105 61 98 61Z',
    headScale:[1.1,1.15],
    bodyScale:[1.06,1.03],
    mouth:'M86 94C91 92 97 92 102 94C100 99 97 102 94 102C90 101 87 98 86 94Z',
    earrings:true, signature:'Calma e criteriosa',
    hairLabel:'Cabelo longo e liso com mecha lateral', outfitLabel:'Blusa creme e saia verde',
    bodyLabel:'Parte superior delicada com saia ampla em A', toneLabel:'Serena e observadora',
  },
  'prof.nina': {
    artId:'nina',
    faceShape:'round-apple',
    shapeArchetype:'compact-orbit',
    skin:'#E7B08A', hair:'#242024',
    hairBack:'M48 71C44 47 60 24 88 22C117 20 136 42 134 71C133 91 129 107 135 119C129 130 115 130 110 119L108 108C98 118 82 122 69 116C57 111 50 95 48 71Z',
    hairFront:'M47 67C45 43 63 22 92 21C119 21 137 41 133 69C121 65 111 59 102 48C91 63 69 70 47 67Z M48 66C58 66 65 59 72 49C76 64 70 76 59 83Z',
    hairStrands:'M54 55Q66 36 82 31M102 31Q122 43 126 62',
    face:'M57 51C61 34 75 27 93 28C113 28 126 43 126 63C126 85 113 104 94 109C75 106 59 89 56 68C55 61 55 55 57 51Z',
    silhouette:'M67 108C57 112 52 123 52 137L48 153C46 163 53 170 62 168C69 166 71 155 75 145C72 163 69 180 68 194C67 210 72 224 83 226L91 226C94 222 94 213 94 199C96 214 99 224 107 226L119 226C130 224 134 213 130 197C126 178 122 160 119 144L126 158C130 167 139 170 145 164C151 158 146 148 143 140L134 123C128 112 119 108 108 107C92 104 79 105 67 108Z',
    shirt:'#79609B', bottomColor:'#393541', torso:'M66 103C79 96 110 99 121 111C129 125 132 149 137 169C119 180 74 180 55 169C60 148 58 119 66 103Z',
    lower:'M49 162C73 180 117 181 139 162C142 179 135 195 127 209C123 216 125 222 119 226C113 226 99 226 96 223C94 213 93 201 92 190C90 203 89 216 84 223C78 226 64 226 58 223C54 218 56 211 53 206C47 193 45 178 49 162Z',
    leftHand:'M58 161C61 159 66 162 66 166C70 170 68 175 64 176C60 178 55 174 54 170C53 166 55 163 58 161Z', rightHand:'M141 157C144 155 149 158 149 162C153 166 151 171 147 172C143 174 138 170 137 166C136 162 138 159 141 157Z',
    leftArm:'M67 112C56 120 52 141 55 156C58 169 67 171 73 161L80 138Z',
    rightArm:'M120 112C133 123 137 141 139 155C140 168 130 174 122 164L113 138Z',
    eyes:[77,105,72], eyeSize:[7.9,8.3], eyeStyle:wide, pupilSize:3, nose:'M88 82C90 79 95 79 97 82C97 86 93 88 90 86Z', brow:'M66 61Q76 54 86 61L85 64Q75 61 66 61ZM97 61Q108 54 117 61L116 64Q106 61 97 61Z',
    headScale:[1.19,1.13],
    bodyScale:[1.2,0.86],
    mouth:'M81 90C86 87 91 90 94 93C98 89 103 88 108 91C106 101 101 105 94 105C87 105 83 99 81 90Z',
    glasses:true, signature:'Investigativa e curiosa',
    hairLabel:'Bob arredondado com pontas viradas', outfitLabel:'Blusa ameixa e calça escura',
    bodyLabel:'Corpo compacto e arredondado, centro de massa baixo', toneLabel:'Perspicaz e expressiva',
  },
  'prof.ravi': {
    artId:'ravi',
    faceShape:'cheeked-triangle',
    shapeArchetype:'inverted-triangle',
    skin:'#A86443', hair:'#2A211F',
    hairBack:'M49 65C40 56 46 42 56 37C50 26 62 16 74 23C80 9 96 11 102 24C114 14 131 23 128 38C140 49 135 65 128 72L123 103L54 105Z',
    hairFront:'M47 58C42 46 50 33 62 34C60 21 75 15 84 25C92 12 109 18 112 31C128 32 135 45 128 57C117 59 111 52 106 44C97 54 83 57 73 52C65 60 55 64 47 58Z',
    hairStrands:'M52 49Q62 32 78 28M95 26Q115 29 125 48',
    face:'M55 45C61 30 77 27 94 29C113 31 127 47 124 68C122 89 110 107 94 117C78 107 63 91 57 73C53 61 52 52 55 45Z',
    silhouette:'M58 107C45 110 40 122 38 137L34 157C31 169 40 177 50 174C59 171 62 158 68 144C67 163 72 175 82 180C89 184 102 184 109 180C119 175 123 161 122 144L135 162C140 172 150 175 157 167C162 160 157 149 153 141L142 122C137 111 127 107 116 106C98 102 76 103 58 107Z',
    shirt:'#D6A34E', bottomColor:'#344B3A', torso:'M63 108C77 100 109 102 123 114C132 128 132 151 138 172C116 184 73 182 52 169C58 148 55 124 63 108Z',
    lower:'M67 168C82 178 108 178 121 168C124 183 120 199 117 212C115 219 116 224 110 226C105 226 97 226 94 223C92 213 91 201 90 191C88 204 87 216 83 223C79 226 72 226 68 223C65 218 67 212 65 206C61 193 63 181 67 168Z',
    leftHand:'M46 166C49 164 54 167 54 171C58 175 56 180 52 181C48 183 43 179 42 175C41 171 43 168 46 166Z', rightHand:'M149 160C152 158 157 161 157 165C161 169 159 174 155 175C151 177 146 173 145 169C144 165 146 162 149 160Z',
    leftArm:'M64 116C52 125 51 142 53 158C55 169 64 174 72 163L80 139Z',
    rightArm:'M123 116C135 124 142 142 140 158C139 170 128 174 121 163L113 139Z',
    eyes:[76,106,72], eyeSize:[7.4,8.1], eyeStyle:asymmetric, pupilSize:2.8, nose:'M86 83C90 79 97 79 100 83C98 88 94 90 90 88C87 87 86 85 86 83Z', brow:'M66 58Q77 50 87 58L86 62Q75 57 66 58ZM98 60Q109 51 118 57L117 61Q107 57 98 60Z',
    headScale:[1.14,1.07],
    bodyScale:[1.1,0.97],
    mouth:'M78 90C84 86 89 89 94 93C100 88 106 87 111 91C109 103 102 110 94 110C85 109 80 101 78 90Z',
    signature:'Prático e colaborativo',
    hairLabel:'Cachos altos com contorno irregular', outfitLabel:'Blusa mostarda e calça verde-escura',
    bodyLabel:'Ombros largos, cintura estreita e postura atlética', toneLabel:'Otimista e enérgico',
  },
  'prof.mateus': {
    artId:'mateus',
    faceShape:'oblong-square',
    shapeArchetype:'long-rectangle',
    skin:'#D89B75', hair:'#583A2A',
    hairBack:'M54 57C54 36 70 21 94 21C117 21 130 38 128 59L126 100L58 103Z',
    hairFront:'M54 56C51 39 65 22 85 19C107 16 128 29 131 48C120 47 112 41 105 33C98 44 82 50 66 48C62 52 58 55 54 56Z M103 34C113 39 121 45 130 48C122 52 112 49 103 34Z',
    hairStrands:'M56 49Q69 32 87 29M105 31Q119 40 124 55',
    face:'M62 39C69 28 81 25 96 27C113 28 122 42 122 63L120 84C118 105 106 116 93 117C78 114 65 101 62 82L60 57C59 49 59 43 62 39Z',
    silhouette:'M77 107C69 111 66 121 65 135L62 151C60 160 66 166 73 164C79 162 80 151 83 141C81 164 80 188 80 210L78 226L90 226L94 190C96 211 98 222 103 226L115 226L113 208C112 185 109 162 106 141L111 155C114 163 121 166 127 162C132 158 129 149 127 141L121 124C117 113 109 108 100 107C92 105 84 105 77 107Z',
    shirt:'#985B45', bottomColor:'#38343C', torso:'M66 107C80 101 110 103 122 114C130 127 131 151 136 171C116 183 76 183 55 170C60 148 58 125 66 107Z',
    lower:'M70 163C83 172 106 172 120 163C122 180 119 198 117 212C116 219 117 224 111 226C106 226 98 226 95 223C93 213 92 201 91 190C89 204 88 216 84 223C80 226 73 226 69 223C66 219 68 212 67 206C63 193 66 179 70 163Z',
    leftHand:'M69 157C72 155 77 158 77 162C81 166 79 171 75 172C71 174 66 170 65 166C64 162 66 159 69 157Z', rightHand:'M123 155C126 153 131 156 131 160C135 164 133 169 129 170C125 172 120 168 119 164C118 160 120 157 123 155Z',
    leftArm:'M67 116C56 124 53 141 56 157C58 170 67 174 74 164L81 140Z',
    rightArm:'M122 116C133 124 138 143 137 158C136 170 126 174 119 164L112 140Z',
    eyes:[81,105,71], eyeSize:[5.9,7.8], eyeStyle:hooded, pupilSize:2.2, nose:'M90 81C92 77 95 77 97 81L96 89C94 91 91 88 90 81Z', brow:'M70 60Q78 56 86 59L85 62Q78 60 70 60ZM99 59Q107 55 115 58L114 61Q106 59 99 59Z',
    headScale:[1.05,1.15],
    bodyScale:[0.82,1.15],
    mouth:'M86 96C91 94 97 94 102 96C100 100 97 101 94 101C90 101 88 99 86 96Z',
    glasses:true, glassesStyle:'rectangular', beard:'M66 82C71 102 80 111 94 112C108 110 118 99 122 81C119 109 107 121 94 122C79 120 69 106 66 82Z',
    signature:'Preciso e paciente',
    hairLabel:'Corte baixo repartido de lado com topete curto', outfitLabel:'Suéter terracota e calça carvão',
    bodyLabel:'Retângulo alto e estreito, pernas compridas', toneLabel:'Confiável e analítico',
  },
  'prof.marina': {
    artId:'marina',
    faceShape:'heart-pointed',
    shapeArchetype:'hourglass',
    skin:'#A96F53', hair:'#2E2525',
    hairBack:'M47 66C45 43 63 23 90 21C117 19 136 39 134 66C132 92 128 112 137 126C129 136 115 133 109 120L106 107C94 119 77 121 63 113C49 105 44 85 47 66Z',
    hairFront:'M48 64C44 42 62 21 88 20C115 19 134 36 135 61C122 60 112 53 105 43C94 55 72 59 48 64Z M47 65C54 76 56 91 51 104C42 92 41 76 47 65Z',
    hairStrands:'M54 59Q64 39 80 32M108 34Q126 46 128 66',
    face:'M56 47C61 31 77 25 94 27C113 28 126 42 125 63C124 84 110 104 94 117C77 104 59 84 56 63C54 56 54 51 56 47Z',
    silhouette:'M68 108C59 111 55 122 54 136L50 154C48 165 55 171 63 168C70 165 71 154 76 143C73 159 80 169 87 172C91 174 98 174 102 172C111 169 117 158 113 143L123 158C128 168 137 171 143 164C148 158 143 148 140 140L132 123C127 112 118 107 108 107C94 105 80 105 68 108Z',
    shirt:'#302E35', bottomColor:'#E9D9BE', torso:'M67 107C81 100 109 102 121 113C129 127 130 151 135 171C116 183 75 182 55 170C60 147 58 124 67 107Z',
    lower:'M53 163C75 178 114 179 135 163C141 180 142 198 140 212C139 219 139 224 132 226C124 226 108 226 103 223C100 213 98 201 96 190C93 204 91 216 86 223C80 226 65 226 59 223C55 218 57 211 54 206C48 193 48 179 53 163Z',
    leftHand:'M59 161C62 159 67 162 67 166C71 170 69 175 65 176C61 178 56 174 55 170C54 166 56 163 59 161Z', rightHand:'M139 157C142 155 147 158 147 162C151 166 149 171 145 172C141 174 136 170 135 166C134 162 136 159 139 157Z',
    leftArm:'M68 116C55 126 53 143 57 158C59 169 67 172 74 163L81 139Z',
    rightArm:'M121 116C135 125 140 143 139 159C138 171 128 175 121 164L112 139Z',
    eyes:[77,105,72], eyeSize:[7.1,8.3], eyeStyle:upturned, pupilSize:2.7, nose:'M88 82C91 79 95 79 98 82C97 87 93 89 90 86Z', brow:'M66 62Q77 53 86 60L85 63Q76 59 66 62ZM98 59Q108 52 117 59L116 62Q107 57 98 59Z',
    headScale:[1.17,1.12],
    bodyScale:[1.13,1.07],
    mouth:'M84 94C90 90 98 90 105 93C102 99 98 102 94 102C89 101 86 98 84 94Z',
    earrings:true, signature:'Organizada e estratégica',
    hairLabel:'Bob assimétrico com uma lateral mais comprida', outfitLabel:'Casaco grafite e calça creme',
    bodyLabel:'Cintura marcada entre ombros e quadris arredondados', toneLabel:'Organizada e segura',
  },
  'prof.beatriz': {
    artId:'beatriz',
    faceShape:'short-wide-square',
    shapeArchetype:'soft-pear',
    skin:'#C98764', hair:'#4B302A',
    hairBack:'M50 72C39 64 42 47 54 41C49 27 65 17 79 24C85 10 102 12 108 24C124 18 138 34 132 49C141 62 134 78 125 87L125 103L53 103Z',
    hairFront:'M48 60C42 47 53 33 65 33C64 20 80 17 88 27C100 17 116 26 113 39C128 40 135 53 127 65C116 61 108 54 103 45C91 56 76 59 62 53C58 58 53 61 48 60Z',
    hairStrands:'M54 48Q63 31 80 28M101 29Q121 38 126 56',
    face:'M54 49C59 32 74 25 94 27C114 29 128 44 126 66L123 83C119 101 107 111 93 112C75 111 60 99 56 82L53 64C52 58 52 53 54 49Z',
    silhouette:'M65 108C56 112 52 123 51 137L47 154C45 165 52 172 61 169C68 167 70 155 74 145C72 162 69 179 64 196C60 211 65 224 78 226L89 226C93 223 94 214 94 198C96 214 99 224 107 226L127 226C139 224 142 214 137 199C132 180 126 162 122 145L130 160C134 169 143 173 149 166C154 159 149 149 146 141L137 124C131 112 120 108 109 107C93 104 78 105 65 108Z',
    shirt:'#D65A36', bottomColor:'#EAD7BC', torso:'M66 107C80 101 109 103 121 114C129 127 132 151 136 171C116 182 76 183 55 170C60 148 58 124 66 107Z',
    lower:'M49 162C72 180 118 181 141 162C145 180 139 198 131 212C127 219 129 224 122 226C115 226 100 226 96 223C94 213 93 201 92 190C90 204 88 216 83 223C77 226 62 226 56 223C52 218 54 211 51 206C45 193 44 178 49 162Z',
    leftHand:'M57 162C60 160 65 163 65 167C69 171 67 176 63 177C59 179 54 175 53 171C52 167 54 164 57 162Z', rightHand:'M145 159C148 157 153 160 153 164C157 168 155 173 151 174C147 176 142 172 141 168C140 164 142 161 145 159Z',
    leftArm:'M67 115C56 124 52 144 56 159C59 171 68 174 74 164L81 140Z',
    rightArm:'M121 115C133 125 138 142 138 158C138 169 129 173 121 164L113 140Z',
    eyes:[76,105,72], eyeSize:[7.2,7.8], eyeStyle:pill, pupilSize:2.6, nose:'M88 82C91 79 95 79 98 82C97 87 93 89 90 87C88 86 87 84 88 82Z', brow:'M66 61Q76 55 86 61L85 64Q75 61 66 61ZM98 61Q108 55 117 61L116 64Q106 61 98 61Z',
    headScale:[1.2,1.09],
    bodyScale:[1.18,0.94],
    mouth:'M80 91C85 88 90 91 94 94C98 91 103 90 108 93C105 102 100 106 94 106C87 106 82 100 80 91Z',
    glasses:true, glassesStyle:'round', signature:'Clara e criteriosa',
    hairLabel:'Cachos largos em moldura arredondada', outfitLabel:'Blusa coral e calça clara',
    bodyLabel:'Pera arredondada, braços curtos e quadril generoso', toneLabel:'Direta e acessível',
  },
  'prof.sofia': {
    artId:'sofia',
    faceShape:'narrow-egg',
    shapeArchetype:'tapered-column',
    skin:'#E4A17B', hair:'#6B3424',
    hairBack:'M43 82C39 52 56 22 91 19C124 16 142 42 137 80L131 159C121 171 109 163 109 145L62 158C49 148 53 113 43 82Z',
    hairFront:'M45 61C43 37 64 18 92 18C117 18 138 36 137 65C123 62 113 52 106 40C98 54 77 59 60 57C55 61 50 63 45 61Z M48 57C57 46 69 39 81 37C72 49 61 56 48 57Z',
    hairStrands:'M47 59Q58 35 78 29M109 31Q131 48 130 70M119 107Q128 123 123 140',
    face:'M61 39C68 27 81 23 95 26C113 30 123 47 121 71C119 96 106 113 91 119C75 112 62 94 58 71C56 57 57 46 61 39Z',
    silhouette:'M74 107C66 111 62 121 61 135L57 153C55 162 62 168 69 165C75 162 77 151 80 141C78 165 77 189 77 210L75 226L89 226L94 190C96 211 98 222 103 226L116 226L113 209C112 185 109 162 106 141L111 155C114 163 121 166 127 162C132 158 129 149 127 141L120 124C116 113 108 108 99 107C90 105 81 105 74 107Z',
    shirt:'#CB557A', bottomColor:'#38343D', torso:'M65 110C78 102 110 103 121 115C129 129 130 151 135 172C116 184 75 184 54 171C59 149 57 124 65 110Z',
    lower:'M68 162C83 173 107 173 121 162C123 180 121 199 118 213C117 220 118 224 112 226C107 226 98 226 95 223C93 213 92 201 91 190C89 204 88 217 84 223C80 226 72 226 68 223C65 219 67 212 66 206C62 193 64 178 68 162Z',
    leftHand:'M65 158C68 156 73 159 73 163C77 167 75 172 71 173C67 175 62 171 61 167C60 163 62 160 65 158Z', rightHand:'M123 155C126 153 131 156 131 160C135 164 133 169 129 170C125 172 120 168 119 164C118 160 120 157 123 155Z',
    leftArm:'M66 118C55 127 53 144 57 159C59 170 67 173 74 163L81 141Z',
    rightArm:'M121 118C134 127 139 143 138 159C137 171 127 174 120 164L112 140Z',
    eyes:[78,104,70], eyeSize:[6.2,8.9], eyeStyle:drooped, pupilSize:2.4, nose:'M90 80C92 78 95 79 96 82L94 87L91 86Z', brow:'M68 59Q77 54 86 59L85 62Q76 59 68 59ZM97 59Q106 55 115 60L114 63Q105 60 97 59Z',
    headScale:[1.08,1.16],
    bodyScale:[0.88,1.13],
    mouth:'M85 96C90 93 97 93 103 96C100 100 97 102 94 102C90 102 87 100 85 96Z',
    earrings:true, signature:'Expressiva e acolhedora',
    hairLabel:'Cabelo longo com franja curva e mechas laterais', outfitLabel:'Blusa rosa antigo e calça escura',
    bodyLabel:'Coluna longa e fluida com linha inferior contínua', toneLabel:'Expressiva e calorosa',
  },
  'prof.helena': {
    artId:'helena',
    faceShape:'mature-rounded-rectangle',
    shapeArchetype:'soft-rectangle',
    skin:'#E3B18D', hair:'#A69B8D',
    hairBack:'M55 60C56 38 72 24 92 24C113 23 128 39 128 60L126 103L60 105Z M76 30C72 17 80 7 92 7C105 7 112 19 106 30C99 38 83 38 76 30Z',
    hairFront:'M57 54C59 34 73 24 92 24C110 24 125 36 128 54C115 49 108 42 102 33C94 45 77 51 57 54Z',
    hairStrands:'M62 47Q72 32 89 29M104 30Q121 42 123 57',
    face:'M60 43C65 29 79 25 94 27C111 29 121 42 120 63L118 82C116 101 105 112 93 114C77 111 64 100 61 82L59 60C58 53 58 47 60 43Z',
    silhouette:'M61 107C50 111 46 122 45 137L41 157C39 168 47 175 56 171C64 168 66 156 70 144C67 162 66 181 65 200C64 214 69 225 81 226L90 226L94 194C96 212 98 224 106 226L121 226C133 224 137 214 133 199C130 180 126 161 122 144L131 160C135 169 144 172 150 165C155 159 150 148 147 140L138 123C132 112 122 107 111 107C94 104 75 104 61 107Z',
    shirt:'#778B50', bottomColor:'#3C3940', torso:'M67 105C81 99 109 101 121 112C128 126 130 149 135 171C116 182 76 182 56 169C60 147 59 123 67 105Z',
    lower:'M48 162C73 178 116 178 139 162C142 180 137 199 131 213C128 220 130 224 123 226C116 226 102 226 98 223C96 213 95 201 94 190C92 204 90 217 85 223C79 226 65 226 59 223C55 219 57 211 54 206C48 193 46 178 48 162Z',
    leftHand:'M52 164C55 162 60 165 60 169C64 173 62 178 58 179C54 181 49 177 48 173C47 169 49 166 52 164Z', rightHand:'M146 158C149 156 154 159 154 163C158 167 156 172 152 173C148 175 143 171 142 167C141 163 143 160 146 158Z',
    leftArm:'M68 114C56 125 55 141 58 157C60 169 69 173 75 163L82 140Z',
    rightArm:'M121 114C134 124 139 143 139 158C138 170 128 173 121 164L113 140Z',
    eyes:[80,104,72], eyeSize:[6.1,7.4], eyeStyle:square-soft, pupilSize:2.2, nose:'M89 81C92 78 96 79 97 82C97 87 93 89 90 86Z', brow:'M69 61Q78 57 87 61L86 64Q77 61 69 61ZM98 61Q107 57 116 61L115 64Q106 61 98 61Z',
    headScale:[1.14,1.08],
    bodyScale:[1.12,0.93],
    mouth:'M86 96C91 94 97 94 102 96C99 100 97 101 94 101C90 101 88 99 86 96Z',
    glasses:true, glassesStyle:'soft-square', signature:'Expressiva e cuidadosa',
    hairLabel:'Coque alto grisalho e corte curto arredondado', outfitLabel:'Cardigã verde e saia escura',
    bodyLabel:'Retângulo macio, mangas amplas e base compacta', toneLabel:'Acolhedora e experiente',
  },
  'prof.augusto': {
    artId:'augusto',
    faceShape:'broad-long-square',
    shapeArchetype:'round-belly',
    skin:'#C58A69', hair:'#96928D',
    hairBack:'M51 58C52 37 68 21 94 21C117 22 132 39 130 61L126 100L57 103Z',
    hairFront:'M52 57C49 38 65 21 85 19C106 16 129 31 132 51C120 49 112 42 106 33C96 45 78 51 66 48C61 54 56 57 52 57Z',
    hairStrands:'M55 49Q67 31 84 29M105 31Q123 42 124 57',
    face:'M55 47C59 31 75 25 95 27C115 29 127 43 125 65L122 84C119 103 107 114 92 116C76 113 62 101 58 83L55 64C54 57 53 52 55 47Z',
    silhouette:'M62 107C50 111 46 123 45 137L41 156C39 168 47 176 56 172C64 169 67 157 71 145C67 164 65 180 62 197C59 213 66 226 79 226L90 226C94 222 94 211 94 193C96 212 99 223 107 226L129 226C141 224 144 214 139 198C134 179 130 161 126 145L134 160C139 170 148 174 154 166C159 159 153 148 150 139L140 122C134 111 124 107 113 106C96 103 78 103 62 107Z',
    shirt:'#344E42', bottomColor:'#B98958', torso:'M66 108C80 100 110 102 122 113C130 127 131 151 136 171C116 183 76 183 55 170C60 148 58 124 66 108Z',
    lower:'M45 162C72 179 119 180 144 162C148 180 140 199 132 213C129 220 131 224 124 226C117 226 102 226 98 223C96 213 95 201 93 189C91 204 89 217 84 223C78 226 63 226 57 223C53 219 55 211 52 206C46 193 43 178 45 162Z',
    leftHand:'M52 165C55 163 60 166 60 170C64 174 62 179 58 180C54 182 49 178 48 174C47 170 49 167 52 165Z', rightHand:'M150 159C153 157 158 160 158 164C162 168 160 173 156 174C152 176 147 172 146 168C145 164 147 161 150 159Z',
    leftArm:'M67 116C55 126 54 142 57 158C59 170 68 173 75 163L82 140Z',
    rightArm:'M122 116C134 125 139 143 138 158C137 170 127 174 120 164L112 140Z',
    eyes:[78,105,72], eyeSize:[6.7,7.5], eyeStyle:soft, pupilSize:2.4, nose:'M87 81C90 77 98 78 100 82C100 88 96 91 91 88C88 87 87 84 87 81Z', brow:'M67 60Q77 54 87 60L86 63Q76 60 67 60ZM98 59Q108 54 117 60L116 63Q106 60 98 59Z',
    headScale:[1.12,1.11],
    bodyScale:[1.16,0.98],
    mouth:'M88 99C92 97 97 97 101 99C99 103 96 105 94 105C91 104 89 102 88 99Z',
    mustache:'M80 94C84 88 90 89 94 93C98 89 104 88 108 94C105 100 100 100 94 97C89 101 84 100 80 94Z',
    signature:'Sereno e didático',
    hairLabel:'Cabelo grisalho com entradas e ondas laterais', outfitLabel:'Suéter verde-escuro e calça ocre',
    bodyLabel:'Centro de massa arredondado, tronco cheio e pernas firmes', toneLabel:'Sereno e ponderado',
  },
  'prof.caio': {
    artId:'caio',
    faceShape:'youthful-tapered',
    shapeArchetype:'oversized-hoodie',
    skin:'#D99A70', hair:'#3A2725',
    hairBack:'M54 62C51 42 66 23 92 21C117 19 133 37 131 61L125 100L57 103Z',
    hairFront:'M52 58C49 39 63 20 85 17C108 14 129 29 133 50C122 48 111 42 103 32C98 46 79 52 65 48C61 53 57 57 52 58Z M108 30C123 24 134 31 138 44C126 43 117 39 108 30Z',
    hairStrands:'M56 49Q68 32 86 28M105 29Q123 39 126 57',
    face:'M62 42C69 28 82 25 96 28C112 31 121 45 120 65C119 88 107 106 93 114C79 106 65 91 61 70C59 59 59 49 62 42Z',
    silhouette:'M66 107C55 111 50 123 49 138L45 157C43 168 51 175 60 171C68 168 70 156 74 144C71 164 71 182 72 198C73 214 79 222 91 223L105 223C117 222 123 214 123 198C123 181 119 163 116 144L124 158C128 168 137 171 143 164C148 157 143 147 140 139L132 122C126 111 116 106 105 106C91 103 77 104 66 107Z',
    shirt:'#356D80', bottomColor:'#34343E', torso:'M66 108C80 100 110 102 122 113C130 127 131 151 136 171C116 183 76 183 55 170C60 148 58 124 66 108Z',
    lower:'M57 163C77 175 112 175 132 163C135 180 130 199 125 213C123 220 124 224 117 226C111 226 99 226 95 223C93 213 92 201 91 191C89 204 88 216 83 223C78 226 67 226 62 223C58 219 60 211 58 206C53 193 53 178 57 163Z',
    leftHand:'M56 163C59 161 64 164 64 168C68 172 66 177 62 178C58 180 53 176 52 172C51 168 53 165 56 163Z', rightHand:'M139 157C142 155 147 158 147 162C151 166 149 171 145 172C141 174 136 170 135 166C134 162 136 159 139 157Z',
    leftArm:'M67 116C55 126 54 142 57 158C59 170 68 173 75 163L82 140Z',
    rightArm:'M122 116C134 125 139 143 138 158C137 170 127 174 120 164L112 140Z',
    eyes:[78,105,71], eyeSize:[6.9,8.6], eyeStyle:small-round, pupilSize:2.6, nose:'M89 81C92 78 96 79 98 82C97 86 94 88 91 86Z', brow:'M68 60Q78 53 87 60L86 63Q76 59 68 60ZM98 60Q107 54 116 59L115 62Q106 60 98 60Z',
    headScale:[1.09,1.08],
    bodyScale:[0.95,1.02],
    mouth:'M84 92C89 88 94 91 97 94C101 89 106 90 109 93C106 102 101 106 95 106C89 106 85 101 84 92Z',
    signature:'Objetivo e experimental',
    hairLabel:'Corte curto bagunçado com topete lateral', outfitLabel:'Moletom azul-petróleo e calça escura',
    bodyLabel:'Moletom amplo e arredondado com pernas afuniladas', toneLabel:'Curioso e inventivo',
  },
};

function Eyes({ design }: { design:CharacterDesign }) {
 const [left,right,y]=design.eyes; const [rx,ry]=design.eyeSize;
 const makeEye=(x:number,side:number)=>{
  const top=y-ry,base=y+ry*.9;let d:string;
  switch(design.eyeStyle){
   case 'almond':d=`M${x-rx} ${y}C${x-rx*.45} ${top} ${x+rx*.45} ${top} ${x+rx} ${y}C${x+rx*.45} ${base} ${x-rx*.45} ${base} ${x-rx} ${y}Z`;break;
   case 'narrow':d=`M${x-rx} ${y+1}Q${x-rx*.45} ${top+ry*.35} ${x} ${top+ry*.25}Q${x+rx*.55} ${top+ry*.2} ${x+rx} ${y-1}Q${x+rx*.5} ${base-ry*.2} ${x} ${base-ry*.15}Q${x-rx*.55} ${base-ry*.1} ${x-rx} ${y+1}Z`;break;
   case 'drooped':d=`M${x-rx} ${y-1}Q${x-rx*.1} ${top-1} ${x+rx} ${y+1}Q${x+rx*.2} ${base+1} ${x-rx} ${y-1}Z`;break;
   case 'upturned':d=`M${x-rx} ${y+1}Q${x-rx*.2} ${top-1} ${x+rx} ${y-1}Q${x+rx*.3} ${base} ${x-rx} ${y+1}Z`;break;
   case 'hooded':d=`M${x-rx} ${y}Q${x} ${top+ry*.35} ${x+rx} ${y}Q${x+rx*.6} ${base} ${x-rx} ${y}Z`;break;
   case 'half-lidded':d=`M${x-rx} ${y-1}Q${x} ${top-1} ${x+rx} ${y-1}Q${x+rx*.9} ${base} ${x-rx} ${y-1}Z`;break;
   case 'pill':d=`M${x-rx} ${y}C${x-rx} ${top+1} ${x-rx*.3} ${top} ${x} ${top}C${x+rx*.8} ${top} ${x+rx} ${top+1} ${x+rx} ${y}C${x+rx} ${base} ${x-rx} ${base} ${x-rx} ${y}Z`;break;
   case 'square-soft':d=`M${x-rx} ${y-ry*.35}Q${x-rx} ${top} ${x-rx*.3} ${top}L${x+rx*.35} ${top}Q${x+rx} ${top} ${x+rx} ${y-ry*.25}L${x+rx} ${y+ry*.25}Q${x+rx} ${base} ${x+rx*.25} ${base}L${x-rx*.3} ${base}Q${x-rx} ${base} ${x-rx} ${y+ry*.25}Z`;break;
   case 'asymmetric':d=side<0?`M${x-rx} ${y+1}Q${x-rx*.2} ${top-2} ${x+rx} ${y-1}Q${x+rx*.8} ${base} ${x-rx} ${y+1}Z`:`M${x-rx} ${y-1}Q${x+rx*.1} ${top-1} ${x+rx} ${y+1}Q${x+rx*.2} ${base+1} ${x-rx} ${y-1}Z`;break;
   case 'small-round':case 'round':d=`M${x-rx} ${y}C${x-rx} ${top} ${x+rx} ${top} ${x+rx} ${y}C${x+rx} ${base} ${x-rx} ${base} ${x-rx} ${y}Z`;break;
   case 'wide':d=`M${x-rx} ${y}C${x-rx*.95} ${top} ${x+rx*.95} ${top} ${x+rx} ${y}C${x+rx*.8} ${base} ${x-rx*.8} ${base} ${x-rx} ${y}Z`;break;
   case 'soft':default:d=`M${x-rx} ${y}C${x-rx} ${top+2} ${x-rx*.35} ${top} ${x} ${top}C${x+rx*.85} ${top} ${x+rx} ${y-2} ${x+rx} ${y}C${x+rx*.8} ${base} ${x-rx*.7} ${base+1} ${x-rx} ${y}Z`;
  }
  const p=design.pupilSize,px=x+side*.5,py=y+ry*.12;
  const iris=`M${px-p} ${py}C${px-p} ${py-p*1.4} ${px+p} ${py-p*1.4} ${px+p} ${py}C${px+p} ${py+p*1.5} ${px-p} ${py+p*1.5} ${px-p} ${py}Z`;
  const shiny=['round','wide','asymmetric'].includes(design.eyeStyle);
  const lid=design.eyeStyle==='half-lidded'||design.eyeStyle==='hooded'?`M${x-rx} ${y-1}Q${x} ${top+ry*.12} ${x+rx} ${y-1}L${x+rx*.8} ${y+ry*.12}Q${x} ${y+ry*.02} ${x-rx} ${y+ry*.12}Z`:null;
  return <g><path d={d} fill={PAPER}/><path d={iris} fill={INK}/>{shiny&&<path d={`M${px-p*.25} ${py-p*.65}Q${px} ${py-p} ${px+p*.45} ${py-p*.55}Q${px} ${py-p*.3} ${px-p*.25} ${py-p*.65}Z`} fill={PAPER}/ >}{lid&&<path d={lid} fill={design.skin}/>}</g>;
 };
 return <g><path d={design.brow} fill={INK}/>{makeEye(left,-1)}{makeEye(right,1)}<path d={design.nose} fill="#8C5A4B"/><path d={design.mouth} fill="#693A36"/></g>;
}

function Glasses({ style = 'round' }: { style?:'oval'|'round'|'rectangular'|'soft-square' }) {
 const paths={
  oval:"M65 73C65 65 70 62 77 62C85 62 89 66 89 73C89 81 84 85 77 85C69 85 65 81 65 73Z M69 73C69 68 72 66 77 66C82 66 85 68 85 73C85 78 82 81 77 81C72 81 69 78 69 73Z M95 73C95 65 100 62 107 62C115 62 119 66 119 73C119 81 114 85 107 85C99 85 95 81 95 73Z M99 73C99 68 102 66 107 66C112 66 115 68 115 73C115 78 112 81 107 81C102 81 99 78 99 73Z M88 71Q92 69 96 71L96 75Q92 73 88 75Z",
  round:"M64 73C64 63 70 59 78 59C87 59 91 65 91 73C91 83 86 88 78 88C69 88 64 82 64 73Z M69 73C69 66 72 64 78 64C83 64 86 67 86 73C86 79 83 83 78 83C72 83 69 79 69 73Z M93 73C93 63 99 59 107 59C116 59 121 65 121 73C121 83 116 88 107 88C99 88 93 82 93 73Z M98 73C98 66 101 64 107 64C113 64 116 67 116 73C116 79 113 83 107 83C101 83 98 79 98 73Z M90 71Q92 69 94 71L94 75Q92 73 90 75Z",
  rectangular:"M64 64Q64 61 68 61L86 61Q91 61 91 66L91 80Q91 85 86 85L69 85Q64 85 64 80Z M69 66L86 66L86 80L69 80Z M94 66Q94 61 99 61L116 61Q121 61 121 66L121 80Q121 85 116 85L99 85Q94 85 94 80Z M99 66L116 66L116 80L99 80Z M90 69Q92 67 94 69L94 73Q92 71 90 73Z",
  "soft-square":"M64 68Q64 60 72 60L82 60Q91 60 91 69L91 78Q91 86 82 86L72 86Q64 86 64 78Z M69 68Q69 65 73 65L81 65Q86 65 86 69L86 78Q86 81 81 81L73 81Q69 81 69 78Z M94 69Q94 60 103 60L113 60Q121 60 121 68L121 78Q121 86 113 86L103 86Q94 86 94 78Z M99 69Q99 65 104 65L112 65Q116 65 116 69L116 78Q116 81 112 81L104 81Q99 81 99 78Z M90 70Q92 68 94 70L94 74Q92 72 90 74Z"
 };
 return <path d={paths[style]} fill={INK} fillRule="evenodd"/>;
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
      {design.legs && <path d={design.legs} fill={design.skin}/>}
        <path d="M82 105Q91 112 101 105L102 122Q92 127 82 122Z" fill={design.skin}/>
        <path d={design.leftHand} fill={design.skin}/>
        <path d={design.rightHand} fill={design.skin}/>
      </g>
      <g transform={'translate(90 74) scale(' + design.headScale[0] + ' ' + design.headScale[1] + ') translate(-90 -74)'}>
        <path d={design.face} fill={design.skin}/>
        <Eyes design={design}/>
        {design.glasses && <Glasses style={design.glassesStyle ?? 'round'}/>}
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
      data-character-art-version="v22.9-face-identities"
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
      data-character-shape-archetype={design.shapeArchetype}
      data-character-hands="custom-joined"
      data-character-head-scale={design.headScale[0] + "x" + design.headScale[1]}
      data-character-body-scale={design.bodyScale[0] + "x" + design.bodyScale[1]}
      data-character-eyes={design.eyeStyle}
      data-character-eye-size={design.eyeSize[0] + "x" + design.eyeSize[1]}
      data-character-eye-style={design.eyeStyle}
      data-character-hair-silhouette={design.hairLabel}
      data-character-face-path={design.faceShape}
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
            <svg viewBox="0 0 180 200" width={compact ? 112 : 144} height={compact ? 124 : 158} role="img" aria-label={mascot.name + ', ' + mascot.role} data-mascot-id={mascot.id} data-character-outline="none" data-character-art-version="v22.8.2-silhouette-continuity">
              
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
