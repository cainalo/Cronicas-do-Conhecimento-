import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { FxProvider } from '@/app/fx';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { GrimoirePage, LibraryPage } from '@/pages/Library';
import { ReaderPage } from '@/pages/Reader';
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

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="biblioteca" element={<LibraryPage />} />
        <Route path="grimorio/:id" element={<GrimoirePage />} />
        <Route path="capitulo/:id" element={<ReaderPage />} />
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
        <Route path="simulado" element={<ExamPage />} />
        <Route path="simulado/:id" element={<ExamResultPage />} />
        <Route path="discursiva" element={<EssayListPage />} />
        <Route path="discursiva/:id" element={<EssayPage />} />
        <Route path="*" element={<p>Página não encontrada.</p>} />
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
