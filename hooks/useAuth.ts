import { useSelector } from 'react-redux';
import { selectJwtToken } from '../store/reducers/userSlice';

export const useAuth = () => {
  const jwtToken = useSelector(selectJwtToken);

  return {
    isLoggedIn: !!jwtToken,
    jwtToken,
  };
};