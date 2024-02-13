import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from '@/pages/not-found-page/NotFoundPage';
import QuizPage from '@/pages/quiz/QuizPage';
import BlankLayout from '@/pages/blank-page/BlankPage';
import SignInPage from '@/pages/auth/signIn/SignInPage';
import SignUpPage from '@/pages/auth/signUp/SignUpPage';
import ProtectedRoutesLayout from './private/protectedLayout.route';
import ProfilePage from '@/pages/profile/ProfilePage';
import QuizSuccessPage from '@/pages/quiz/QuizSuccessPage';
import { loaderQuiz } from '@/pages/quiz/loader';

export const ROUTE_PATH = {
  HOME: '/',
  SIGN_IN: '/sign-in', //login
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  QUIZ_SUCCESS: '/quiz-success',
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoutesLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <QuizPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/quiz-success/:id',
        loader: loaderQuiz,
        element: <QuizSuccessPage />,
      },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      {
        path: ROUTE_PATH.SIGN_IN,
        element: <SignInPage />,
      },
      {
        path: ROUTE_PATH.SIGN_UP,
        element: <SignUpPage />,
      },
    ],
  },
]);

export default router;
