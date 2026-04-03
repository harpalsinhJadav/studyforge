import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy-loaded pages (add per screen map S01–S22, W01)
// import { lazy, Suspense } from 'react';
// const DashboardPage = lazy(() => import('./pages/DashboardPage'));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      {/* Auth */}
      <Route path="/auth/signin" element={<div>Sign In — TODO</div>} />
      <Route path="/auth/signup" element={<div>Sign Up — TODO</div>} />
      <Route path="/auth/forgot" element={<div>Forgot Password — TODO</div>} />
      {/* App */}
      <Route path="/home" element={<div>Dashboard — TODO</div>} />
      <Route path="/library" element={<div>Library — TODO</div>} />
      <Route path="/upload" element={<div>Upload — TODO</div>} />
      <Route path="/upload/processing" element={<div>Processing — TODO</div>} />
      <Route path="/material/:id" element={<div>Material Detail — TODO</div>} />
      <Route path="/material/:id/chapter/:chapterId" element={<div>Chapter Reader — TODO</div>} />
      <Route path="/material/:id/ask" element={<div>Ask AI — TODO</div>} />
      <Route path="/quiz/setup" element={<div>Quiz Setup — TODO</div>} />
      <Route path="/quiz/topic" element={<div>Topic Mode — TODO</div>} />
      <Route path="/quiz/:quizId/play" element={<div>Quiz Active — TODO</div>} />
      <Route path="/quiz/:quizId/results" element={<div>Quiz Results — TODO</div>} />
      <Route path="/explore" element={<div>Explore — TODO</div>} />
      <Route path="/leaderboard" element={<div>Leaderboard — TODO</div>} />
      <Route path="/profile" element={<div>Profile — TODO</div>} />
      <Route path="/settings" element={<div>Settings — TODO</div>} />
      <Route path="/plans" element={<div>Plans / Paywall — TODO</div>} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
