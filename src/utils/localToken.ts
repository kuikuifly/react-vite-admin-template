/**
 * 自定义 token 操作
 * 
 */
import settings from '@/config/settings';

/**
 * 获取本地Token
 */
export const getToken = () => localStorage.getItem(settings.siteTokenKey);

/**
 * 设置存储本地Token
 */
export const setToken = (token: string) => {
  localStorage.setItem(settings.siteTokenKey, token);
};

export const setUserInfo = (userInfo: {
  loginName: string | undefined
  userType: string | undefined
}) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

/**
 * 移除本地Token
 */
export const removeToken = () => {
  localStorage.removeItem(settings.siteTokenKey);
};
