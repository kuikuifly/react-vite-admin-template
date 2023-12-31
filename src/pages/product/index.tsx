import { useEffect, useState } from 'react';
import { Button, Card, Divider, FormInstance, Input, message, Modal, Radio, Table, Tag } from 'antd';
import { ResponseData } from '@/utils/request';
import { createData, detailData, queryList, removeData, updateData as updateDataService } from './service';
import { PaginationConfig, TableListItem, IResponseData } from './data.d';

import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { ColumnsType } from 'antd/lib/table';

function App() {
  // 获取数据
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<TableListItem[]>([]);
  const [pagination, setPagination] = useState<PaginationConfig>({
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
  });
  const getList = async (current: number): Promise<void> => {
    setLoading(true);

    const response: ResponseData<IResponseData> = await queryList({
      page: current,
      per: 10,
    });
    const data = response.data || { list: [], total: 0 };
    setList(data.list || []);
    setPagination({
      ...pagination,
      current,
      total: data.total || 0,
    });

    setLoading(false);
  };
  useEffect(() => {
    getList(1);
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
        getList(pagination.current);

        setDeleteLoading([]);
      },
    });
  };

  // 编辑弹框 data - 详情
  const [updateSubmitLoading, setUpdateSubmitLoading] = useState<boolean>(false);
  const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<Partial<TableListItem>>({});
  const [detailUpdateLoading, setDetailUpdateLoading] = useState<number[]>([]);
  const detailUpdateData = async (id: number) => {
    setDetailUpdateLoading([id]);

    const response: ResponseData<TableListItem> = await detailData(id);
    const { data } = response;
    setUpdateData({
      ...data,
    });
    setUpdateFormVisible(true);

    setDetailUpdateLoading([]);
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
    getList(pagination.current);

    setUpdateSubmitLoading(false);
  };

  // 新增
  const [createSubmitLoading, setCreateSubmitLoading] = useState<boolean>(false);
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const createSubmit = async (values: Omit<TableListItem, 'id'>, form: FormInstance) => {
    setCreateSubmitLoading(true);

    await createData(values);
    form.resetFields();
    setCreateFormVisible(false);
    message.success('新增成功！');
    getList(1);

    setCreateSubmitLoading(false);
  };

  const columns: ColumnsType<TableListItem> = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
      render: (_, record, index) => <>{(pagination.current - 1) * pagination.pageSize + index + 1}</>,
    },
    {
      title: '名称',
      dataIndex: 'name',
      render: (_, record) => (
        <a href={record.href} target='_blank' rel='noreferrer'>
          {record.name}
        </a>
      ),
    },
    {
      title: '备注',
      dataIndex: 'desc',
    },
    {
      title: '创建时间',
      dataIndex: 'type',
      render: (_, record) => (record.type === 'header' ? <Tag color='green'>2023-10-27 20:30:05</Tag> : <Tag color='cyan'>2023-10-27 20:30:05</Tag>),
    },
    {
      title: '操作',
      key: 'action',
      width: 240,
      render: (_, record) => (
        <>
          <Button
            type='link'
            loading={detailUpdateLoading.includes(record.id)}
            onClick={() => detailUpdateData(record.id)}
          >
            详情
          </Button>
          <Button
            type='link'
            loading={detailUpdateLoading.includes(record.id)}
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
      <Card
        bordered={false}
        title={
          <Button type='primary' onClick={() => setCreateFormVisible(true)}>
            新增
          </Button>
        }
        extra={
          <div>
            <Radio.Group defaultValue='all'>
              <Radio.Button value='all'>全部</Radio.Button>
              <Radio.Button value='header'>2023-10-27 20:30:05</Radio.Button>
              <Radio.Button value='footer'>2023-10-27 20:30:05</Radio.Button>
            </Radio.Group>
            <Input.Search placeholder='请输入' style={{ width: '270px', marginLeft: '16px' }} onSearch={() => ({})} />
          </div>
        }
      >
        <Table
          rowKey='id'
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            ...pagination,
            onChange: (page: number) => {
              getList(page);
            },
          }}
        />
      </Card>

      <CreateForm
        onCancel={() => setCreateFormVisible(false)}
        visible={createFormVisible}
        onSubmit={createSubmit}
        onSubmitLoading={createSubmitLoading}
      />

      {updateFormVisible && Object.keys(updateData).length > 0 ? (
        <UpdateForm
          values={updateData}
          onCancel={() => updataFormCancel()}
          visible={updateFormVisible}
          onSubmit={updateSubmit}
          onSubmitLoading={updateSubmitLoading}
        />
      ) : null}
    </div>
  );
}

export default App;
