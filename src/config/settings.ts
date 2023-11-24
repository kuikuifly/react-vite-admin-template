/**
 * 站点配置
 * 
 */
import { SettingsType } from '@/@types/settings.d';

const settings: SettingsType = {
  siteTitle: 'ADMIN',

  siteTokenKey: 'admin_antd_react_token',
  userType: 'user',
  ajaxHeadersTokenKey: 'token',
  ajaxResponseNoVerifyUrl: [
    // '/user/login', // 用户登录
    // '/user/info', // 获取用户信息
    // '/article'
  ],

  /* 以下是针对所有 Layout 扩展字段 */
  headFixed: true,
  theme: 'light',
  leftSiderFixed: true,

  /* 以下是针对 UniversalLayout 扩展字段 */
  tabNavEnable: true,
  tabNavHomePath: '/home/workplace',
  navMode: 'inline',
};

export default settings;
