import { createBrowserRouter } from 'react-router-dom';
import {AllKitty} from '../Pages/AllKitty';
import {FavKitty} from '../Pages/FavKitty';
import {Layout} from '../components/Layout';
import { Kittys } from '../Pages/Kittys';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Kittys />,
      },
      {
        path: '/fav',
        element: <Kittys />,
      },
    ],
  },
]);