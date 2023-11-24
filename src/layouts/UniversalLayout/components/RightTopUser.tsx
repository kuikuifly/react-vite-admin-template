import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';

import { useRecoilState, useRecoilValue } from 'recoil';
import { accountLogout } from '@/pages/user/login/service'
import { userState, initialState } from '@/store/user';

import { removeToken } from '@/utils/localToken';

import IconSvg from '@/components/IconSvg';

export default memo(() => {
  const [user, setUser] = useRecoilState(userState);
  console.log(user, 'useruseruser')
  const navigate = useNavigate();

  const onMenuClick = useCallback(
    ({ key }: { key: string }) => {
      if (key === 'logout') {
        accountLogout({}).then(res => {
          removeToken();
          navigate('/user/login', {
            replace: true,
          });
        })        
      } else if (key === 'update') {
        navigate('/roles/update', {
          replace: true,
        });
      }
    },
    [user, setUser],
  );
  return (
    <Dropdown
      overlay={
        <Menu
          onClick={onMenuClick}
          items={[
            {
              key: 'update',
              label: <>修改信息</>,
            },
            {
              key: 'logout',
              label: <>退出登录</>,
            },
          ]}
        />
      }
    >
      <a className='universallayout-top-usermenu ant-dropdown-link' onClick={(e) => e.preventDefault()}>
        {/* {'user.name'} */}
        <span className="user-name">{ user.loginName }</span>
        <IconSvg name='arrow-down' />
      </a>
    </Dropdown>
  );
});
