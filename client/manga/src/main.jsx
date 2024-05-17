import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import HomePage from './pages/HomePage';
import MangaDetail from './pages/MangaDetailPage';
import RelatedMangaCard from './components/RelatedMangaCard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/manga/:id',
                element: <MangaDetail />
            },
            {
              path : '/about',
              element : <AboutPage/>
            },
            {
              path : '/contact',
              element : <ContactPage/>
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

