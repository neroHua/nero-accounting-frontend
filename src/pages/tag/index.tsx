import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { tagGetByPageService } from '../../service/tag/tag.js';

interface TagProps {
  pageSize: number;
  pageNumber: number;
  keyword: string;
}

const TagPage: React.FC<TagProps> = props => {
  const { pageSize, pageNumber, keyword} = props;
  const [pagination , setPagination] = useState<any>({current: pageNumber || 1, pageSize: pageSize || 10});
  const [tagList , setTagList] = useState<any[]>([]);

  console.log(pageSize, pageNumber, pagination);

  const init = async () => {
    console.log(pageSize, pageNumber, pagination);
    const data = await tagGetByPageService({pageSize : 10, pageNumber : 1})
    setTagList(data.dataList);
  };

  useEffect(() => {
    init();
  }, [props]);

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
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
  ];

  return (
    <div>
      <Table dataSource={tagList} columns={columns} pagination={pagination}/>;
    </div>
  );
};

export default TagPage;
