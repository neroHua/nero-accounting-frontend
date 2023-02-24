import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { tagGetByPageService } from '../../service/tag/tag.js';
import { useLocation } from 'react-router-dom';
import querystring from "query-string";

const TagPage: React.FC<any> = () => {
  let location = useLocation();

  const [pagination , setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [tagList , setTagList] = useState<any[]>([]);

  const getTagList = async (request : any) => {
    const data = await tagGetByPageService({...request})

    setTagList(data?.dataList || []);
    setPagination({
      ...pagination,
      current: request.pageNumber,
      total: data?.totalCount
    });
  };

  useEffect(() => {
    const {pageNumber = 1, pageSize = 10} = querystring.parse(location.search);
    getTagList({pageNumber, pageSize});
  }, [location]);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',      
    },
    {
      title: '创建者id',
      dataIndex: 'createUserId',
      key: 'createUserId',      
    },
    {
      title: '更新者id',
      dataIndex: 'updateUserId',
      key: 'updateUserId',
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '父标签id',
      dataIndex: 'parentId',
      key: 'parentId',
    },
  ];

  return (
    <div>
      <Table dataSource={tagList} columns={columns} pagination={pagination}/>;
    </div>
  );
};

export default TagPage;
