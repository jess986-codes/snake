import { Home } from './pages/Home/Home.tsx';
import { Register } from './pages/Register/Register.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Account } from './pages/Account/Account.tsx';
import { Leaderboard } from './pages/Leaderboard/Leaderboard.tsx';
import NotFound from './pages/Error/NotFound.tsx';
import AuthCallback from './pages/AuthCallback.tsx';
import { Navbar } from './components/Navbar/Navbar.tsx';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import './App.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <main className="main-content">
          <Outlet />
        </main>
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'account', element: <Account /> },
      { path: 'leaderboard', element: <Leaderboard /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: '/auth/callback', element: <AuthCallback /> },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
