import { memo, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useRecoilState } from 'recoil';

import { userState, CurrentUser } from '@/store/user';

import PageLoading from '@/components/PageLoading';

import { ResponseData } from '@/utils/request';
import { queryCurrent } from '@/services/user';
import settings from '@/config/settings';

export interface SecurityLayoutProps {
  children: React.ReactNode;
}

export default memo(({ children }: SecurityLayoutProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const isLogin = useMemo(() => !!user.roles.length, [user]);

  const getUser = useCallback(() => {

    if (localStorage.getItem(settings.siteTokenKey)) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
      setUser({
        loginName: userInfo.loginName,
        roles: [userInfo.userType]
      });
    } else {
      navigate('/user/login', { replace: true });
    }
  }, [user, setUser]);

  useEffect(() => {
    getUser();
  }, []);
  return <>{isLogin ? children : <PageLoading />}</>;
});
