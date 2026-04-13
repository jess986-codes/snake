import { Home } from './pages/Home/Home.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Account } from './pages/Account/Account.tsx';
import { Leaderboard } from './pages/Leaderboard/Leaderboard.tsx';
import NotFound from './pages/Error/NotFound.tsx';
import { Navbar } from './components/Navbar/Navbar.tsx';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';
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
      { path: 'login', element: <Login /> },
      { path: 'account', element: <Account /> },
      { path: 'leaderboard', element: <Leaderboard /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
