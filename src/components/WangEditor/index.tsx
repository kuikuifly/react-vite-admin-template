/**
 * @description React wangEditor usage
 * @author wangfupeng
 */

import React, { useState, useEffect } from 'react';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { getToken } from '@/utils/localToken';
const baseUrl = import.meta.env.VITE_APP_APIHOST
function MyEditor(props) {
  const { value, onChange, visible } = props;
  const [editor, setEditor] = useState(null); // 存储 editor 实例

  const toolbarConfig = {};
  const editorConfig = {
    MENU_CONF: {
      uploadImage: {
        server: `${baseUrl}/file`,
        // form-data fieldName ，默认值 'wangeditor-uploaded-image'
        fieldName: 'file',

        // 单个文件的最大体积限制，默认为 2M
        maxFileSize: 1 * 1024 * 1024, // 1M

        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 10,

        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ['image/*'],

        // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
        meta: {
          // token: getToken()
        },

        // 将 meta 拼接到 url 参数中，默认 false
        metaWithUrl: false,

        // 自定义增加 http  header
        headers: {
          Accept: '*/*',
          Origin: 'http://47.108.30.24:18080',
          token: getToken()
        },

        // 跨域是否传递 cookie ，默认为 false
        withCredentials: false,

        // 超时时间，默认为 10 秒
        timeout: 5 * 1000, // 5 秒
        // 上传之前触发
        onBeforeUpload(file: File) {
          // TS 语法
          // onBeforeUpload(file) {    // JS 语法
          // file 选中的文件，格式如 { key: file }
          return file;

          // 可以 return
          // 1. return file 或者 new 一个 file ，接下来将上传
          // 2. return false ，不上传这个 file
        },

        // 上传进度的回调函数
        onProgress(progress: number) {
          // TS 语法
          // onProgress(progress) {       // JS 语法
          // progress 是 0-100 的数字
          console.log('progress', progress);
        },

        // 单个文件上传成功之后
        onSuccess(file: File, res: any) {
          // TS 语法
          // onSuccess(file, res) {          // JS 语法
          console.log(res, 'res222')
          console.log(`${file.name} 上传成功`, res);
        },

        // 单个文件上传失败
        onFailed(file: File, res: any) {
          // TS 语法
          // onFailed(file, res) {           // JS 语法
          console.log(`${file.name} 上传失败`, res);
        },

        // 上传错误，或者触发 timeout 超时
        onError(file: File, err: any, res: any) {
          // TS 语法
          // onError(file, err, res) {               // JS 语法
          console.log(`${file.name} 上传出错`, err, res);
        },
      },
      uploadVideo: {
        server: '/api/upload',
        // form-data fieldName ，默认值 'wangeditor-uploaded-video'
        fieldName: 'your-custom-name',

        // 单个文件的最大体积限制，默认为 10M
        maxFileSize: 50 * 1024 * 1024, // 50M

        // 最多可上传几个文件，默认为 5
        maxNumberOfFiles: 3,

        // 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ['video/*'],

        // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
        meta: {
          token: getToken(),
        },

        // 将 meta 拼接到 url 参数中，默认 false
        metaWithUrl: false,

        // 自定义增加 http  header
        headers: {
          Accept: 'text/x-json',
          otherKey: 'xxx',
        },

        // 跨域是否传递 cookie ，默认为 false
        withCredentials: true,

        // 超时时间，默认为 30 秒
        timeout: 15 * 1000, // 15 秒
        // 上传之前触发
        onBeforeUpload(file: File) {
          // TS 语法
          // onBeforeUpload(file) {      // JS 语法
          // file 选中的文件，格式如 { key: file }
          return file;

          // 可以 return
          // 1. return file 或者 new 一个 file ，接下来将上传
          // 2. return false ，不上传这个 file
        },

        // 上传进度的回调函数
        onProgress(progress: number) {
          // TS 语法
          // onProgress(progress) {       // JS 语法
          // progress 是 0-100 的数字
          console.log('progress', progress);
        },

        // 单个文件上传成功之后
        onSuccess(file: File, res: any) {
          // TS 语法
          // onSuccess(file, res) {          // JS 语法
          console.log(`${file.name} 上传成功`, res);
        },

        // 单个文件上传失败
        onFailed(file: File, res: any) {
          // TS 语法
          // onFailed(file, res) {          // JS 语法
          console.log(`${file.name} 上传失败`, res);
        },

        // 上传错误，或者触发 timeout 超时
        onError(file: File, err: any, res: any) {
          // TS 语法
          // onError(file, err, res) {               // JS 语法
          console.log(`${file.name} 上传出错`, err, res);
        },
      },
    },
    placeholder: '请输入内容...',
  };

  // 及时销毁 editor
  useEffect(() => {
    return () => {
      setEditor(null);
      // if (editor == null) return;
      // // editor.destroy();
      // // setEditor(null);
    };
  }, [editor, visible]);

  function insertText() {
    if (editor == null) return;
    editor.insertText(' hello ');
  }

  function printHtml() {
    if (editor == null) return;
    console.log(editor.getHtml());
  }
  // html
  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode='default'
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={value}
          onCreated={setEditor}
          onChange={onChange}
          mode='default'
          style={{ height: '350px' }}
        />
      </div>
    </>
  );
}

export default MyEditor;
