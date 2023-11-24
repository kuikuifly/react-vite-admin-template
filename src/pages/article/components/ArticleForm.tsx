import './index.less'
import React, { useEffect } from 'react';
import { FormInstance } from 'antd/lib/form';
import { Modal, Form, Input, Button, message, Select } from 'antd';
import WangEditor from '@/components/WangEditor'

import { TableListItem } from '../data.d';

interface CreateFormProps {
  detailData?: {
    content?: string
    // au
    // a
  }
  visible: boolean;
  values?: Partial<TableListItem>;
  formType?: string
  onSubmitLoading: boolean;
  onSubmit: (values: Omit<TableListItem, 'id'>, form: FormInstance) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { visible, detailData, values, onSubmit, onSubmitLoading, onCancel, formType } = props;
  const [form] = Form.useForm();
  
  useEffect(() => {
    form.setFieldsValue(detailData)
    return () => {
      form.resetFields()
    }
  }, [detailData])

  const onChangeContent = (txt) => {
    form.setFieldValue('content', txt.getHtml())
  }

  const onFinish = async () => {
    try {
      const fieldsValue = await form.validateFields();
      onSubmit(fieldsValue, form);
    } catch (error) {
      message.warning('验证错误');
    }
  };


  return (
    <Modal
      width={1000}
      className="modal-form"
      destroyOnClose
      maskClosable={false}
      title='新增'
      centered={true}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key='back' onClick={onCancel}>
          取消
        </Button>,
        <Button key='submit' type='primary' htmlType='submit' loading={onSubmitLoading} onClick={() => onFinish()}>
          提交
        </Button>,
      ]}
    >
      <Form
        disabled={formType === 'detail'}
        form={form}
        name='createform'
        labelCol={{ span: 4 }}        
      >
        <Form.Item
          label='文章类型'
          name='articleType'
          rules={[
            {
              required: true,
              message: '请选择',
            },
          ]}
        >
          <Select allowClear>
            <Select.Option value='PUBLIC_3'>公开</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='作者'
          name='author'
          rules={[
            {
              required: true,
              validator: async (rule, value) => {
                if (value === '' || !value) {
                  throw new Error('请输入作者');
                } else if (value.length > 15) {
                  throw new Error('长度不能大于15个字');
                }
              },
            },
          ]}
        >
          <Input placeholder='请输入作者' />
        </Form.Item>
        <Form.Item
          label='标题'
          name='title'
          rules={[
            {
              required: true,
              validator: async (rule, value) => {
                if (value === '' || !value) {
                  throw new Error('请输入标题');
                }
              },
            },
          ]}
        >
          <Input placeholder='请输入标题' />
        </Form.Item>

        <Form.Item label='内容' name='content'>
          {formType === 'detail' ? <div className="content" dangerouslySetInnerHTML={{ __html: detailData?.content }} /> :
            // <CKEditor value={form.getFieldValue('content')} onChange={onChangeContent} />}
            <WangEditor visible={ visible } value={'<p>本地服务图片，没有问题</p><p><img src=\"http://localhost:8800/uploads/8f3086b19c471778b40bb6d162f14886.jpg\" alt=\"\" data-href=\"\" style=\"width: 538.99px;height: 538.99px;\"/></p>'} onChange={onChangeContent} />}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
