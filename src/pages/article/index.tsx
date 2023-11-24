import './index.less';
import { useEffect, useState } from 'react';
import { Button, Card, Form, Space, FormInstance, Input, message, Modal, Row, Table, Select } from 'antd';
import { ResponseData } from '@/utils/request';
import { createArticle, queryArticleDetail, queryArticleList, removeData, updateData as updateDataService } from './service';
import { PaginationConfig, TableListItem, IResponseData } from './data.d';
import ArticleForm from './components/ArticleForm';
import { ColumnsType } from 'antd/lib/table';

// TODO: 1.文章详情，2.代码优化


function App() {
  // 获取数据
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<TableListItem[]>([]);
  const [form] = Form.useForm();
  // 弹框类型

  const [formType, setFormType] = useState<'add' | 'detail' | 'edit'>('add');
  const [rowInfo, setRowInfo] = useState<string>('')
  const [pagination, setPagination] = useState<PaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const getList = async (params?: PaginationConfig): Promise<void> => {
    setLoading(true);
    const response: ResponseData<IResponseData> = await queryArticleList({
      curPage: pagination.current,
      pageSize: pagination.pageSize,
      ...params,
    });
    const { data, curPage, pageSize, totalRows } = response || {}
    setList(data || []);
    setPagination({
      curPage,
      pageSize,
      total: totalRows,
    })
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
  // const [updateData, setUpdateData] = useState<Partial<TableListItem>>({});
  const [detailData, setDetailData] = useState<DetailData>({})
  const [detailUpdateLoading, setDetailUpdateLoading] = useState<number[]>([]);

  const updataFormCancel = async () => {
    // setUpdateData({});
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
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const onSubmit = async (values: Omit<TableListItem, 'id'>, form: FormInstance) => {
    const params = values
    if (formType === 'edit') {
      params['id'] = rowInfo
    }
    const api = {
      'add': createArticle,
      'edit': updateDataService
    }

    setCreateSubmitLoading(true);
    await api[formType](values);
    form.resetFields();
    setFormVisible(false);
    message.success('操作成功！');
    getList({current: 1});
    setCreateSubmitLoading(false);
  };

  const ARTICLETYPE = {
    PUBLIC_3: '公开',
  };

  const columns: ColumnsType<TableListItem> = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedDate',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '文章类型',
      dataIndex: 'articleType',
      render: (val, record, index) => <>{ARTICLETYPE[val]}</>,
    },
    {
      title: '操作',
      key: 'action',
      width: 240,
      render: (_, record) => (
        <>
          <Button
            type='link'
            onClick={() => openArticleForm('detail', record.id)}
          >
            详情
          </Button>
          <Button
            type='link'
            // loading={detailUpdateLoading.includes(record.id)}
            onClick={() => openArticleForm('edit', record.id)}
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

  const detailUpdateData = async (id: string) => {
    const response = await queryArticleDetail({ id });
    setDetailData(response)
    setFormVisible(true)
  };
  const openArticleForm = (type: 'add' | 'edit' | 'detail', id?: string) => {
    if (id) {
      setRowInfo(id)
      detailUpdateData(id)
    } else {
      setDetailData({})
      setFormVisible(true)
    }
    setFormType(type)
  }

  const onCloseModal = () => {
    setFormVisible(false);
    setDetailData({})
  }

  return (
    <div className='layout-main-content'>
      <Card>
        <div className='search'>
          <Form form={form} name='advanced_search' className='search-form' onFinish={() => console.log(1)}>
            <Row gutter={24}>
              <Form.Item name='author' label='作者'>
                <Input placeholder='请输入' />
              </Form.Item>
              <Form.Item name='title' label='标题'>
                <Input placeholder='请输入' />
              </Form.Item>
              <Form.Item name='articleType' label='文章类型'>
                <Select
                  placeholder='请选择'
                  allowClear
                  style={{ width: 160 }}
                  options={[
                    { value: 'PUBLIC_3', label: '公开' },
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
          <Button type='primary' onClick={() => openArticleForm('add')}>
            新增
          </Button>
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

      <ArticleForm
        formType={formType}
        detailData={detailData}
        onCancel={onCloseModal}
        visible={formVisible}
        onSubmit={onSubmit}
        onSubmitLoading={createSubmitLoading}
      />
    </div>
  );
}

export default App;
