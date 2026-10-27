import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { FxProvider } from '@/app/fx';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { GrimoirePage, LibraryPage } from '@/pages/Library';
import { BookPage } from '@/pages/Book';
const MissionPage = lazy(() => import('@/pages/Mission').then((m) => ({ default: m.MissionPage })));
const DownloadPage = lazy(() => import('@/pages/Download').then((m) => ({ default: m.DownloadPage })));
import { PracticePage } from '@/pages/Practice';
import { LearnPage } from '@/pages/Learn';
import { LessonPage } from '@/pages/Lesson';
import { ReviewPage } from '@/pages/Review';
const ReviewSlidesPage = lazy(() => import('@/pages/ReviewSlides').then((m) => ({ default: m.ReviewSlidesPage })));
const HistoryPage = lazy(() => import('@/pages/History').then((m) => ({ default: m.HistoryPage })));
const ProgressPage = lazy(() => import('@/pages/Progress').then((m) => ({ default: m.ProgressPage })));
const EditalPage = lazy(() => import('@/pages/Edital').then((m) => ({ default: m.EditalPage })));
const AccessPage = lazy(() => import('@/pages/settings/Access').then((m) => ({ default: m.AccessPage })));
const SyncPage = lazy(() => import('@/pages/settings/Sync').then((m) => ({ default: m.SyncPage })));
const AppearancePage = lazy(() => import('@/pages/settings/Appearance').then((m) => ({ default: m.AppearancePage })));
const SoundsPage = lazy(() => import('@/pages/settings/Sounds').then((m) => ({ default: m.SoundsPage })));
const DataPage = lazy(() => import('@/pages/settings/Data').then((m) => ({ default: m.DataPage })));
const AboutPage = lazy(() => import('@/pages/settings/About').then((m) => ({ default: m.AboutPage })));
const ScreenPage = lazy(() => import('@/pages/settings/Screen').then((m) => ({ default: m.ScreenPage })));
const AccountPage = lazy(() => import('@/pages/Account').then((m) => ({ default: m.AccountPage })));
import { TrainingPage } from '@/pages/Training';
const FlashcardsPage = lazy(() => import('@/pages/Flashcards').then((m) => ({ default: m.FlashcardsPage })));
const ExamPage = lazy(() => import('@/pages/Exam').then((m) => ({ default: m.ExamPage })));
const ExamResultPage = lazy(() => import('@/pages/Exam').then((m) => ({ default: m.ExamResultPage })));
const EssayListPage = lazy(() => import('@/pages/Essay').then((m) => ({ default: m.EssayListPage })));
const EssayPage = lazy(() => import('@/pages/Essay').then((m) => ({ default: m.EssayPage })));
const PlanPage = lazy(() => import('@/pages/Plan').then((m) => ({ default: m.PlanPage })));
const BlitzPage = lazy(() => import('@/pages/Blitz').then((m) => ({ default: m.BlitzPage })));
import { StudiesPage } from '@/pages/Studies';
const NotFoundPage = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFoundPage })));
import { TrailPage } from '@/pages/Trail';
const TrailVideoPage = lazy(() => import('@/pages/TrailVideo').then((m) => ({ default: m.TrailVideoPage })));
const CustomizePage = lazy(() => import('@/pages/Customize').then((m) => ({ default: m.CustomizePage })));
const ScenarioListPage = lazy(() => import('@/pages/Scenarios').then((m) => ({ default: m.ScenarioListPage })));
const ScenarioPage = lazy(() => import('@/pages/Scenarios').then((m) => ({ default: m.ScenarioPage })));
const TeachersRoomPage = lazy(() => import('@/pages/TeachersRoom').then((m) => ({ default: m.TeachersRoomPage })));
const NarratedPage = lazy(() => import('@/pages/Narrated').then((m) => ({ default: m.NarratedPage })));


/**
 * Carregamento sob demanda para telas pesadas e secundárias.
 * Mantém rotas, estado global e layout intactos; só adia o download do código
 * até a rota ser aberta. O layout externo continua visível durante a carga.
 */
function DeferredPage({ children }: { children: ReactNode }) {
  return <Suspense fallback={<p role="status" className="sr-only">Carregando esta área…</p>}>{children}</Suspense>;
}

function LegacyGrimoireRedirect() {
  const { id = '' } = useParams();
  return <Navigate to={`/materia/${id}`} replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="biblioteca" element={<LibraryPage />} />
        <Route path="estudos" element={<StudiesPage />} />
        <Route path="trilha" element={<TrailPage />} />
        <Route path="video/:id" element={<DeferredPage><TrailVideoPage /></DeferredPage>} />
        <Route path="explorar" element={<StudiesPage />} />
        <Route path="revisar" element={<TrainingPage />} />
        <Route path="materia/:id" element={<GrimoirePage />} />
        <Route path="grimorio/:id" element={<LegacyGrimoireRedirect />} />
        <Route path="capitulo/:id" element={<BookPage />} />
        <Route path="aprender/:chapterId/:sectionId" element={<LearnPage />} />
        <Route path="aprender/:chapterId/:sectionId/:aula" element={<LearnPage />} />
        <Route path="missao/:id" element={<DeferredPage><MissionPage /></DeferredPage>} />
        <Route path="download" element={<DeferredPage><DownloadPage /></DeferredPage>} />
        <Route path="personalizar" element={<DeferredPage><CustomizePage /></DeferredPage>} />
        <Route path="simulador" element={<DeferredPage><ScenarioListPage /></DeferredPage>} />
        <Route path="simulador/:id" element={<DeferredPage><ScenarioPage /></DeferredPage>} />
        <Route path="sala" element={<DeferredPage><TeachersRoomPage /></DeferredPage>} />
        <Route path="escritorio" element={<Navigate to="/estudos" replace />} />
        <Route path="aula-narrada/:id" element={<DeferredPage><NarratedPage /></DeferredPage>} />
        <Route path="pratica/:chapterId/:sectionId" element={<PracticePage />} />
        <Route path="licao/:id" element={<LessonPage />} />
        <Route path="revisao" element={<ReviewPage />} />
        <Route path="slides" element={<DeferredPage><ReviewSlidesPage /></DeferredPage>} />
        <Route path="historico" element={<DeferredPage><HistoryPage /></DeferredPage>} />
        <Route path="progresso" element={<DeferredPage><ProgressPage /></DeferredPage>} />
        <Route path="edital" element={<DeferredPage><EditalPage /></DeferredPage>} />
        <Route path="conta" element={<DeferredPage><AccountPage /></DeferredPage>} />
        <Route path="conta/acesso" element={<DeferredPage><AccessPage /></DeferredPage>} />
        <Route path="conta/sincronizacao" element={<DeferredPage><SyncPage /></DeferredPage>} />
        <Route path="conta/aparencia" element={<DeferredPage><AppearancePage /></DeferredPage>} />
        <Route path="conta/sons" element={<DeferredPage><SoundsPage /></DeferredPage>} />
        <Route path="conta/dados" element={<DeferredPage><DataPage /></DeferredPage>} />
        <Route path="conta/sobre" element={<DeferredPage><AboutPage /></DeferredPage>} />
        <Route path="conta/tela" element={<DeferredPage><ScreenPage /></DeferredPage>} />
        <Route path="treino" element={<TrainingPage />} />
        <Route path="plano" element={<DeferredPage><PlanPage /></DeferredPage>} />
        <Route path="reino" element={<Navigate to="/progresso" replace />} />
        <Route path="personagem" element={<Navigate to="/progresso" replace />} />
        <Route path="flashcards" element={<DeferredPage><FlashcardsPage /></DeferredPage>} />
        <Route path="relampago" element={<DeferredPage><BlitzPage /></DeferredPage>} />
        <Route path="diario" element={<Navigate to="/progresso" replace />} />
        <Route path="simulado" element={<DeferredPage><ExamPage /></DeferredPage>} />
        <Route path="simulado/:id" element={<DeferredPage><ExamResultPage /></DeferredPage>} />
        <Route path="discursiva" element={<DeferredPage><EssayListPage /></DeferredPage>} />
        <Route path="discursiva/:id" element={<DeferredPage><EssayPage /></DeferredPage>} />
        <Route path="*" element={<DeferredPage><NotFoundPage /></DeferredPage>} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <PrefsProvider>
      <FxProvider>
        <StudyProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <AppRoutes />
          </BrowserRouter>
        </StudyProvider>
      </FxProvider>
    </PrefsProvider>
  );
}
