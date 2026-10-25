import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { HistoryPage } from '@/pages/History';
import { ProgressPage } from '@/pages/Progress';
import { EditalPage } from '@/pages/Edital';
import { AccountPage } from '@/pages/Account';
import { TrainingPage } from '@/pages/Training';
import { FlashcardsPage } from '@/pages/Flashcards';
import { ExamPage, ExamResultPage } from '@/pages/Exam';
import { EssayListPage, EssayPage } from '@/pages/Essay';
import { PlanPage } from '@/pages/Plan';
import { RealmPage } from '@/pages/Realm';
import { CharacterPage } from '@/pages/Character';
import { BlitzPage } from '@/pages/Blitz';
import { DiaryPage } from '@/pages/Diary';
import { StudiesPage } from '@/pages/Studies';
import { NotFoundPage } from '@/pages/NotFound';
import { TrailPage } from '@/pages/Trail';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="biblioteca" element={<LibraryPage />} />
        <Route path="estudos" element={<StudiesPage />} />
        <Route path="trilha" element={<TrailPage />} />
        <Route path="explorar" element={<StudiesPage />} />
        <Route path="revisar" element={<TrainingPage />} />
        <Route path="grimorio/:id" element={<GrimoirePage />} />
        <Route path="capitulo/:id" element={<BookPage />} />
        <Route path="aprender/:chapterId/:sectionId" element={<LearnPage />} />
        <Route path="missao/:id" element={<MissionPage />} />
        <Route path="download" element={<DownloadPage />} />
        <Route path="pratica/:chapterId/:sectionId" element={<PracticePage />} />
        <Route path="licao/:id" element={<LessonPage />} />
        <Route path="revisao" element={<ReviewPage />} />
        <Route path="historico" element={<HistoryPage />} />
        <Route path="progresso" element={<ProgressPage />} />
        <Route path="edital" element={<EditalPage />} />
        <Route path="conta" element={<AccountPage />} />
        <Route path="treino" element={<TrainingPage />} />
        <Route path="plano" element={<PlanPage />} />
        <Route path="reino" element={<RealmPage />} />
        <Route path="personagem" element={<CharacterPage />} />
        <Route path="flashcards" element={<FlashcardsPage />} />
        <Route path="relampago" element={<BlitzPage />} />
        <Route path="diario" element={<DiaryPage />} />
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
