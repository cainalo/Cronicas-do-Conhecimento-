import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { FxProvider } from '@/app/fx';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { GrimoirePage, LibraryPage } from '@/pages/Library';
import { BookPage } from '@/pages/Book';
import { MissionPage } from '@/pages/Mission';
import { DownloadPage } from '@/pages/Download';
import { PracticePage } from '@/pages/Practice';
import { LearnPage } from '@/pages/Learn';
import { LessonPage } from '@/pages/Lesson';
import { ReviewPage } from '@/pages/Review';
import { ReviewSlidesPage } from '@/pages/ReviewSlides';
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
import { ScenarioListPage, ScenarioPage } from '@/pages/Scenarios';
import { SocialFeedPage } from '@/pages/SocialFeed';
import { TeachersRoomPage } from '@/pages/TeachersRoom';
import { TrailTeacherPostPage } from '@/pages/TrailTeacherPost';
import { WorldPage } from '@/pages/World';
import { ProgrammingLabPage } from '@/pages/ProgrammingLab';
import { TerminalLabPage } from '@/pages/TerminalLab';
import { CodeLabPage } from '@/pages/CodeLab';
import { NarratedPage } from '@/pages/Narrated';

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
        <Route path="missao/:id" element={<MissionPage />} />
        <Route path="download" element={<DownloadPage />} />
        <Route path="personalizar" element={<CustomizePage />} />
        <Route path="simulador" element={<ScenarioListPage />} />
        <Route path="simulador/:id" element={<ScenarioPage />} />
        <Route path="sala" element={<SocialFeedPage />} />
        <Route path="feed-aulas" element={<TeachersRoomPage />} />
        <Route path="trilha-post/:chapterId/:sectionId" element={<TrailTeacherPostPage />} />
        <Route path="escritorio" element={<WorldPage />} />
        <Route path="laboratorios" element={<TerminalLabPage />} />
        <Route path="laboratorio/:id" element={<TerminalLabPage />} />
        <Route path="laboratorio-codigo" element={<CodeLabPage />} />
        <Route path="laboratorio-programacao" element={<ProgrammingLabPage />} />
        <Route path="aula-narrada/:id" element={<NarratedPage />} />
        <Route path="pratica/:chapterId/:sectionId" element={<PracticePage />} />
        <Route path="licao/:id" element={<LessonPage />} />
        <Route path="revisao" element={<ReviewPage />} />
        <Route path="slides" element={<ReviewSlidesPage />} />
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
