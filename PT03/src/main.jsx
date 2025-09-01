import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Sample from './Sample';
import Patch from './Patch';
import GetUser from './GetUser';
import DeleteUser from './delete';

// Define the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Sample />,
  },
  {
    path: "/Patch",
    element: <Patch />,
  },
  {
    path: "/GetUser/:code",
    element: <GetUser />,
  },
  {
    path: "/DeleteUser",
    element: <DeleteUser />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);