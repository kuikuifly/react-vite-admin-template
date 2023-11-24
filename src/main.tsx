import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { /* BrowserRouter */ HashRouter } from 'react-router-dom';
/**
  BrowserRouter模式需要服务器配置来处理不同路径的请求。服务器需要返回正确的内容，
  以使应用程序的路由能够正常工作。一般来说，服务器会配置一个捕获所有路径的路由，并将
  它们重定向到index.html，以便应用程序可以正确解析和处理路径。这样，无论用户访问哪
  个路径，都会返回相同的index.html文件，并由客户端的JavaScript来处理路由逻辑。

  后台管理系统不涉及seo，使用BrowserRouter
*/

import 'virtual:svg-icons-register';
// 全局css
import '@/assets/css/index.less';
// App
import App from './App';

// 挂载
ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <HashRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </HashRouter>,
);
