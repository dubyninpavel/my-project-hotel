import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useDispatch } from 'react-redux';
import { addUser } from './store/reducer/usersReducer';
import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './pages/PageNotFound';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import styles from './styles/styles.module.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [localStorageUsers, setLocalStorageUsers] = useLocalStorage(
    'Project Hotels Users',
    [],
  );
  const [currentUser, setCurrentUser] = useLocalStorage(
    'Project Hotels Current User',
    {},
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.email) {
      const { email, password } = currentUser;
      dispatch(addUser({ email, password }));
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [currentUser]);

  return (
    <div className={styles.app}>
      <Routes>
        <Route
          path='/signin'
          element={
            <ProtectedRoute isLoggedIn={!isLoggedIn} navigateTo='/'>
              <LoginPage
                setLoggedIn={setLoggedIn}
                localStorageUsers={localStorageUsers}
                setLocalStorageUsers={setLocalStorageUsers}
                setCurrentUser={setCurrentUser}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path='/'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} navigateTo='/signin'>
              <MainPage
                setCurrentUser={setCurrentUser}
              />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
