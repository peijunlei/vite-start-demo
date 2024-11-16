


import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Demo1 from './pages/demo1';
import Demo2 from './pages/demo2';
import Demo3 from './pages/demo3';
import Demo4 from './pages/demo4';
import Demo5 from './pages/demo5';



export function Router() {
  const router = createHashRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/demo1',
      element: <Demo1 />
    },
    {
      path: '/demo2',
      element: <Demo2 />
    },
    {
      path: '/demo3',
      element: <Demo3 />
    },
    {
      path: '/demo4',
      element: <Demo4 />
    },
    {
      path: '/demo5',
      element: <Demo5 />
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}