import { createBrowserRouter } from 'react-router-dom';
import {AllKitty} from '../Pages/AllKitty';
import {FavKitty} from '../Pages/FavKitty';
import {Layout} from '../components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <AllKitty />,
      },
      {
        path: '/fav',
        element: <FavKitty />,
      },
    ],
  },
]);