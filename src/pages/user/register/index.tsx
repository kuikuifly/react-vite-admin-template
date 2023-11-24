import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Input, message } from 'antd';
import md5 from 'md5';
import { useRecoilValue } from 'recoil';

import IconSvg from '@/components/IconSvg';

import { RegisterParamsType } from './data.d';
import { accountReg } from './service';

import style from './index.module.less';

export default memo(() => {
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState<string>('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  // 注册
  const handleSubmit = async (values: RegisterParamsType) => {
    setSubmitLoading(true);
    // md5
    console.log(values, 'values')
    try {
      await accountReg({
        ...values,
        password: md5(values.password)
      });
      setLoginStatus('');
      message.success('注册成功，请登录');
      navigate('/user/login', { replace: true });
    } catch (error: any) {
      if (error.message && error.message === 'CustomError') {
        const { response } = error;
        const { data } = response;
        setLoginStatus(data.msg || 'error');
      }
      message.warning('验证不通过，请检查输入');
      console.log('error', error);
    }
    setSubmitLoading(false);
  };

  return (
    <div className={style.main}>
      <h1 className={style.title}>注册账户</h1>
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

        <Form.Item
          label=''
          name='telephoneNumber'
          rules={[
            {
              required: true,
              message: '请输入电话号码',
            },
          ]}
        >
          <Input
            placeholder='请输入电话号码'
            // prefix={<IconSvg name='pwd' />}
            autoComplete=''
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' className={style.submit} htmlType='submit' loading={false}>
            注册
          </Button>
          <div className={style['text-align-right']}>
            <Link to='/user/login'>已有账户？现在登录！</Link>
          </div>
        </Form.Item>
        {loginStatus !== '' && !submitLoading && <Alert message={loginStatus} type='error' showIcon />}
      </Form>
    </div>
  );
});
