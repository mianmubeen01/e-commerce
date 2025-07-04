import { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem('token'); //  Clear token
    
    window.location.href = '/login';
  }, []);

  return null;
};

export default Logout;