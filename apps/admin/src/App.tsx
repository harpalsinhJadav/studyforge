import { Routes, Route, Navigate } from 'react-router-dom';

// Admin panel routes (W02 — admin.studyforge.ai)
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<div>Admin Dashboard — TODO</div>} />
      <Route path="/users" element={<div>Users — TODO</div>} />
      <Route path="/materials" element={<div>Materials — TODO</div>} />
      <Route path="/quizzes" element={<div>Quizzes — TODO</div>} />
      <Route path="/ai-models" element={<div>AI Models — TODO</div>} />
      <Route path="/storage" element={<div>Storage — TODO</div>} />
      <Route path="/billing" element={<div>Billing — TODO</div>} />
      <Route path="/alerts" element={<div>Alerts — TODO</div>} />
      <Route path="/settings" element={<div>Settings — TODO</div>} />
      <Route path="/api-keys" element={<div>API Keys — TODO</div>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
