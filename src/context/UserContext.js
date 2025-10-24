import { createContext, useEffect, useState} from 'react';
import { setAuthToken } from '../api/api';
import toast from 'react-hot-toast';

export const userContext = createContext(null);

const  USER_STORAGE_KEY = 'appUser';

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      toast.error('Error in reading data from local storage');
      return null;
    }
  });

  useEffect(() => {
    if(user && user.token) {
      setAuthToken(user.token);
    } else {
      setAuthToken(null);
    }
  }, [user]);

  const loginUser = (userData) => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
    } catch (error) {
      toast.error('Error in saving to local storage');
    }
    setUser(userData)
  };


  const logoutUser = () => {
    try {
      localStorage.getItem(USER_STORAGE_KEY);
    } catch (error) {
      toast.error('Error removing local storage');
    }
    setUser(null);
  };

  return (
    <userContext.Provider
      value={{ user, loginUser, logoutUser }}
    >
        {children}
    </userContext.Provider>
  );
};

export default UserProvider;