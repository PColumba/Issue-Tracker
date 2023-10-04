
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Issues from './routes/Issues';
import EditIssue from './routes/EditIssue';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([{
    path: "/",
    element: <Issues />,
  }, {
    path: "/issues/:id",
    element: <EditIssue />
  }
]);


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);