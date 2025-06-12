import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import React from 'react';
import Root from './components/Root';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route index element={<Root />}></Route>
    <Route path="login" element={<LoginPage />} />
  </Route>
));

const App : React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App;