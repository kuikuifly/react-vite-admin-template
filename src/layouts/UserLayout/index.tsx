import { memo, useMemo } from 'react';
import { /* Outlet, */ useLocation } from 'react-router-dom';

import useTitle from '@/hooks/useTitle';

import { formatRoutes } from '@/utils/router';

import layoutRotes from './routes';

import './css/index.less';

export interface UserLayoutProps {
  children: React.ReactNode;
}

export default memo(({ children }: UserLayoutProps) => {
  const location = useLocation();
  // 框架所有菜单路由 与 patch key格式的所有菜单路由
  const routerPathKeyRouter = useMemo(() => formatRoutes(layoutRotes), []);

  // 当前路由item
  const routeItem = useMemo(() => routerPathKeyRouter.pathKeyRouter[location.pathname], [location]);

  // 设置title
  useTitle(routeItem?.meta?.title || '');

  return (
    <div className='user-layout'>
      {/* <div className='lang'>
        <SelectLang />
      </div> */}
      {/* <Outlet /> */}
      {children}
    </div>
  );
});
