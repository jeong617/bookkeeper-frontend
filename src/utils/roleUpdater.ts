import { useEffect } from 'react';
import { useRoleStore } from '../store/store.tsx';

const RoleUpdater = () => {
  const getRole = useRoleStore((state) => state.getRole);

  useEffect(() => {
    getRole();

    const interval = setInterval(() => {
      getRole();
    }, 300000);

    return () => clearInterval(interval); // 언마운트 시 인터벌 해제
  }, [getRole]);
  return null;
};

export default RoleUpdater;