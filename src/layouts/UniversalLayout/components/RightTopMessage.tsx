import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';

import { useRecoilValue } from 'recoil';
import { userMessageState } from '@/store/user';

import IconSvg from '@/components/IconSvg';

export default memo(() => {
  // const userMessage = useRecoilValue(userMessageState);
  const userMessage = '29' // 后期展示用户信息或者 新增订单数量
  return (
    <Link to={'/'} className='universallayout-top-message'>
      <IconSvg name='message' />
      <Badge className='universallayout-top-message-badge' count={userMessage} size='small' />
    </Link>
  );
});
