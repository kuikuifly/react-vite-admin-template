import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Input, message } from 'antd';

import IconSvg from '@/components/IconSvg';
import md5 from 'md5';
import { setToken, removeToken, setUserInfo } from '@/utils/localToken';
import { ResponseData } from '@/utils/request';
import { LoginParamsType } from './data.d';
import { accountLogin } from './service';

import style from './index.module.less';

export default memo(() => {
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState<string>('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  // 登录
  const handleSubmit = async (values: LoginParamsType) => {
    removeToken() // 测试
    setSubmitLoading(true);
    try {
      const { token, loginName, userType, returnSuccess, returnErrMsg }: ResponseData = await accountLogin({
        ...values,
        password: md5(values.password)
      });
      // 后期用户信息里应该返回更多的字段

      if (returnSuccess) {
        setUserInfo({ loginName, userType })
        setToken(token || '');
        setLoginStatus('ok');
        message.success('登录成功');
        navigate('/', { replace: true });
      } else {
        message.error(returnErrMsg || '登录失败');
      }
    } catch (error: any) {
      if (error.message && error.message === 'CustomError') {
        setLoginStatus('error');
      }
      message.warning('验证不通过，请检查输入');
    }
    setSubmitLoading(false);
  };

  return (
    <div className={style.main}>
      <h1 className={style.title}>账户登录</h1>
      <Form name='basic' onFinish={handleSubmit}>
        <Form.Item
          label=''
          name='loginName'
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        >
          <Input placeholder='用户名' prefix={<IconSvg name='user' />} />
        </Form.Item>
        <Form.Item
          label=''
          name='password'
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input.Password
            placeholder='密码'
            prefix={<IconSvg name='pwd' />}
            autoComplete=''
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' className={style.submit} htmlType='submit' loading={false}>
            登录
          </Button>
          <div className={style['text-align-right']}>
            <Link to='/user/register'>还没有账户？现在注册！</Link>
          </div>
        </Form.Item>

        {loginStatus === 'error' && !submitLoading && (
          <Alert message='用户名或密码错误！' type='error' showIcon />
        )}
      </Form>
    </div>
  );
});
