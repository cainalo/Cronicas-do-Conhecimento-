import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { FxProvider } from '@/app/fx';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { GrimoirePage, LibraryPage } from '@/pages/Library';
import { BookPage } from '@/pages/Book';
const MissionPage = lazy(() => import('@/pages/Mission').then((m) => ({ default: m.MissionPage })));
import { DownloadPage } from '@/pages/Download';
import { PracticePage } from '@/pages/Practice';
import { LearnPage } from '@/pages/Learn';
import { LessonPage } from '@/pages/Lesson';
import { ReviewPage } from '@/pages/Review';
const ReviewSlidesPage = lazy(() => import('@/pages/ReviewSlides').then((m) => ({ default: m.ReviewSlidesPage })));
import { HistoryPage } from '@/pages/History';
import { ProgressPage } from '@/pages/Progress';
import { EditalPage } from '@/pages/Edital';
import { AccessPage } from '@/pages/settings/Access';
import { SyncPage } from '@/pages/settings/Sync';
import { AppearancePage } from '@/pages/settings/Appearance';
import { SoundsPage } from '@/pages/settings/Sounds';
import { DataPage } from '@/pages/settings/Data';
import { AboutPage } from '@/pages/settings/About';
import { ScreenPage } from '@/pages/settings/Screen';
import { AccountPage } from '@/pages/Account';
import { TrainingPage } from '@/pages/Training';
import { FlashcardsPage } from '@/pages/Flashcards';
import { ExamPage, ExamResultPage } from '@/pages/Exam';
import { EssayListPage, EssayPage } from '@/pages/Essay';
import { PlanPage } from '@/pages/Plan';
import { BlitzPage } from '@/pages/Blitz';
import { StudiesPage } from '@/pages/Studies';
import { NotFoundPage } from '@/pages/NotFound';
import { TrailPage } from '@/pages/Trail';
import { TrailVideoPage } from '@/pages/TrailVideo';
import { CustomizePage } from '@/pages/Customize';
const ScenarioListPage = lazy(() => import('@/pages/Scenarios').then((m) => ({ default: m.ScenarioListPage })));
const ScenarioPage = lazy(() => import('@/pages/Scenarios').then((m) => ({ default: m.ScenarioPage })));
const TeachersRoomPage = lazy(() => import('@/pages/TeachersRoom').then((m) => ({ default: m.TeachersRoomPage })));
const WorldPage = lazy(() => import('@/pages/World').then((m) => ({ default: m.WorldPage })));
const NarratedPage = lazy(() => import('@/pages/Narrated').then((m) => ({ default: m.NarratedPage })));


/**
 * Carregamento sob demanda para telas pesadas e secundárias.
 * Mantém rotas, estado global e layout intactos; só adia o download do código
 * até a rota ser aberta. O layout externo continua visível durante a carga.
 */
function DeferredPage({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="biblioteca" element={<LibraryPage />} />
        <Route path="estudos" element={<StudiesPage />} />
        <Route path="trilha" element={<TrailPage />} />
        <Route path="video/:id" element={<TrailVideoPage />} />
        <Route path="explorar" element={<StudiesPage />} />
        <Route path="revisar" element={<TrainingPage />} />
        <Route path="grimorio/:id" element={<GrimoirePage />} />
        <Route path="capitulo/:id" element={<BookPage />} />
        <Route path="aprender/:chapterId/:sectionId" element={<LearnPage />} />
        <Route path="aprender/:chapterId/:sectionId/:aula" element={<LearnPage />} />
        <Route path="missao/:id" element={<DeferredPage><MissionPage /></DeferredPage>} />
        <Route path="download" element={<DownloadPage />} />
        <Route path="personalizar" element={<CustomizePage />} />
        <Route path="simulador" element={<DeferredPage><ScenarioListPage /></DeferredPage>} />
        <Route path="simulador/:id" element={<DeferredPage><ScenarioPage /></DeferredPage>} />
        <Route path="sala" element={<DeferredPage><TeachersRoomPage /></DeferredPage>} />
        <Route path="escritorio" element={<DeferredPage><WorldPage /></DeferredPage>} />
        <Route path="aula-narrada/:id" element={<DeferredPage><NarratedPage /></DeferredPage>} />
        <Route path="pratica/:chapterId/:sectionId" element={<PracticePage />} />
        <Route path="licao/:id" element={<LessonPage />} />
        <Route path="revisao" element={<ReviewPage />} />
        <Route path="slides" element={<DeferredPage><ReviewSlidesPage /></DeferredPage>} />
        <Route path="historico" element={<HistoryPage />} />
        <Route path="progresso" element={<ProgressPage />} />
        <Route path="edital" element={<EditalPage />} />
        <Route path="conta" element={<AccountPage />} />
        <Route path="conta/acesso" element={<AccessPage />} />
        <Route path="conta/sincronizacao" element={<SyncPage />} />
        <Route path="conta/aparencia" element={<AppearancePage />} />
        <Route path="conta/sons" element={<SoundsPage />} />
        <Route path="conta/dados" element={<DataPage />} />
        <Route path="conta/sobre" element={<AboutPage />} />
        <Route path="conta/tela" element={<ScreenPage />} />
        <Route path="treino" element={<TrainingPage />} />
        <Route path="plano" element={<PlanPage />} />
        <Route path="reino" element={<Navigate to="/progresso" replace />} />
        <Route path="personagem" element={<Navigate to="/progresso" replace />} />
        <Route path="flashcards" element={<FlashcardsPage />} />
        <Route path="relampago" element={<BlitzPage />} />
        <Route path="diario" element={<Navigate to="/progresso" replace />} />
        <Route path="simulado" element={<ExamPage />} />
        <Route path="simulado/:id" element={<ExamResultPage />} />
        <Route path="discursiva" element={<EssayListPage />} />
        <Route path="discursiva/:id" element={<EssayPage />} />
        <Route path="*" element={<NotFoundPage />} />
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
