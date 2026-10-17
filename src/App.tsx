import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
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
        <Route path="*" element={<p>Página não encontrada.</p>} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <PrefsProvider>
      <StudyProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <AppRoutes />
        </BrowserRouter>
      </StudyProvider>
    </PrefsProvider>
  );
}
