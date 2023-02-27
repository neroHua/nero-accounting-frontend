import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { tagGetByPageService, tagAddService, tagUpdateService } from '../../service/tag/tag.js';
import { useLocation } from 'react-router-dom';
import querystring from "query-string";
import moment from 'moment';
// @ts-ignore
import TagUpdate from './component/tagUpdate.tsx'
// @ts-ignore
import TagAdd from './component/tagAdd.tsx'

const TagPage: React.FC<any> = () => {
  let location = useLocation();

  const [pagination , setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    total: 0,
    pageSizeOptions: [10, 20, 30, 50, 100]
  });
  const [tagList , setTagList] = useState<any[]>([]);

  const getTagList = async (request : any) => {
    const data = await tagGetByPageService({...request})

    setTagList(data?.dataList || []);
    setPagination({
      ...pagination,
      current: request.pageNumber,
      pageSize: request.pageSize,
      total: data.totalCount,
    });
  };

  const [tagAdd , setTagAdd] = useState<any>({
    visible: false,
    values: {},
  });

  const tagAddShow = (record : any) => {
    setTagAdd({
      visible : true,
      values: {
        ...record,
      }
    });
  }

  const tagAddSubmit = async (values : any) => {
    const data = await tagAddService({...values});
    if (data?.success) {
      return;
    }

    setTagAdd({
      visible : false,
      values: {}
    });
    getTagList({...pagination, pageNumber: pagination.current});
  }

  const [tagUpdate , setTagUpdate] = useState<any>({
    visible: false,
    values: {},
  });

  const tagUpdateShow = (record : any) => {
    setTagUpdate({
      visible : true,
      values: {
        ...record,
        createTime: moment(record.createTime),
        updateTime: moment(record.updateTime),
      }
    });
  }

  const tagUpdateSubmit = async (values : any) => {
    const data = await tagUpdateService({...values});
    if (data?.success) {
      return;
    }

    setTagUpdate({
      visible : false,
      values: {}
    });
    getTagList({...pagination, pageNumber: pagination.current});
  }

  useEffect(() => {
    const {pageNumber = 1, pageSize = 10} = querystring.parse(location.search);
    getTagList({pageNumber, pageSize});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (text, record, index) => {
        return moment(record.createTime).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
      },
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      render: (text, record, index) => {
        return moment(record.updateTime).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
      },
    },
    {
      title: '创建者id',
      dataIndex: 'createUserId',
    },
    {
      title: '更新者id',
      dataIndex: 'updateUserId',
    },
    {
      title: '编码',
      dataIndex: 'code',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '父标签id',
      dataIndex: 'parentId',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (<div>
          <Button
            type="primary"
            onClick={(e) => {
              tagUpdateShow(record);
            }}
          >
            修改
          </Button>
          <Button
            type="primary"
            danger
          >
            删除
          </Button>
        </div>);
      },
    },
  ];

  return (
    <div>
      <div>
        <Button
          type='primary'
          onClick={(e) => {
            tagAddShow({});
          }}
        >
          新增
        </Button>
      </div>
      <Table
        dataSource={tagList}
        rowKey={'id'}
        columns={columns}
        pagination={pagination}
        onChange={(pagination) => {
          getTagList({
            pageSize: pagination.pageSize,
            pageNumber: pagination.current
          });
        }}
      />;

      <TagAdd
        visible={tagAdd.visible}
        onCancel={() => {
          setTagAdd({...tagAdd, visible: false});
        }}
        onSubmit={tagAddSubmit}
        values={tagAdd.values}
      >
      </TagAdd>

      <TagUpdate
        visible={tagUpdate.visible}
        onCancel={() => {
          setTagUpdate({...tagUpdate, visible: false});
        }}
        onSubmit={tagUpdateSubmit}
        values={tagUpdate.values}
      >
      </TagUpdate>
    </div>
  );
};

export default TagPage;
