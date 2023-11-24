import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

export default memo(() => (
  <Result
    status='404'
    title='404'
    subTitle='对不起，这个页面我没有找到！'
    extra={
      <Link to='/'>
        <Button type='primary'>去首页</Button>
      </Link>
    }
  />
));
