import './index.less';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, Form, Space, FormInstance, Input, message, Modal, Row, Table, Select } from 'antd';
import { ResponseData } from '@/utils/request';
import { queryUserList, removeData, updateData as updateDataService } from './service';
import { PaginationConfig, TableListItem, IResponseData } from './data.d';

import { ColumnsType } from 'antd/lib/table';

// TODO: 1.用户修改，2.代码优化

function App() {
  // 获取数据
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<TableListItem[]>([]);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState<PaginationConfig>({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
  });
  const getList = async (params?: pagination): Promise<void> => {
    setLoading(true);

    const response: ResponseData<IResponseData> = await queryUserList({
      ...params,
      curPage: pagination.current,
      pageSize: 10,
    });
    const data = response.data || { list: [], total: 0 };
    setList(data || []);

    setLoading(false);
  };
  useEffect(() => {
    getList();
  }, []);

  // 删除
  const [deleteLoading, setDeleteLoading] = useState<number[]>([]);
  const deleteTableData = (id: number) => {
    Modal.confirm({
      title: '删除',
      content: '确定删除吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        setDeleteLoading([id]);
        await removeData(id);
        message.success('删除成功！');
        getList({curPage: pagination.current});
        setDeleteLoading([]);
      },
    });
  };

  // 编辑弹框 data - 详情
  const [updateSubmitLoading, setUpdateSubmitLoading] = useState<boolean>(false);
  const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<Partial<TableListItem>>({});
  const [detailData, setDetailData] = useState<DetailData>({})
  const [detailUpdateLoading, setDetailUpdateLoading] = useState<number[]>([]);
  const detailUpdateData = async (id: string) => {

    // const response = await queryUserDetail({ id });

    // setDetailData(response)
    setCreateFormVisible(true)
  };

  const updataFormCancel = async () => {
    setUpdateData({});
    setUpdateFormVisible(false);
  };

  const updateSubmit = async (values: TableListItem) => {
    setUpdateSubmitLoading(true);
    const { id, ...params } = values;
    await updateDataService(id, { ...params });
    updataFormCancel();
    message.success('编辑成功！');
    getList({current: pagination.current});

    setUpdateSubmitLoading(false);
  };

  // 新增
  const [createSubmitLoading, setCreateSubmitLoading] = useState<boolean>(false);
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);

  const USERTYPE = {
    'ADMIN': '管理员',
    'NORMAL': '普通用户'
  };
  const columns: ColumnsType<TableListItem> = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
      render: (_, record, index) => <>{(pagination.current - 1) * pagination.pageSize + index + 1}</>,
    },
    {
      title: '员工ID',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'loginName',
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      render: (val, record, index) => <>{USERTYPE[val]}</>,
    },
    {
      title: '电话',
      dataIndex: 'telephoneNumber',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedDate',
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <>
          <Button
            type='link'
            // loading={detailUpdateLoading.includes(record.id)}
            onClick={() => detailUpdateData(record.id)}
          >
            编辑
          </Button>
          <Button type='link' loading={deleteLoading.includes(record.id)} onClick={() => deleteTableData(record.id)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className='layout-main-cotnent'>
      <Card>
        <div className='search'>
          <Form form={form} name='advanced_search' className='search-form' onFinish={() => console.log(1)}>
            <Row gutter={24}>
              <Form.Item name='userName' label='用户名'>
                <Input placeholder='请输入' />
              </Form.Item>
              <Form.Item name='userType' label='用户类型'>
                <Select
                  placeholder='请选择'
                  allowClear
                  style={{ width: 160 }}
                  options={[
                    { value: 'ADMIN', label: '管理员' },
                  ]}
                />
              </Form.Item>
            </Row>
            <div style={{ textAlign: 'right' }}>
              <Space size='small'>
                <Button type='primary' htmlType='submit' onClick={() => {
                    const params = form.getFieldsValue()
                    getList(params)
                  }}>
                  查询
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                    getList()
                  }}
                >
                  重置
                </Button>
              </Space>
            </div>
          </Form>
        </div>
        <Table
          rowKey='id'
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            ...pagination,
            onChange: (page: number) => {
              getList({curPage: page});
            },
          }}
        />
      </Card>
    </div>
  );
}

export default App;
