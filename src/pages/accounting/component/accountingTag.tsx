import React, { useEffect, useState } from 'react';
import { Table, Button, Drawer } from 'antd';
import {
  accountingTagAddService,
  accountingTagDeleteService,
  accountingTagListService
} from '../../../service/accounting/accounting.js';
// @ts-ignore
import AccountingTagAdd from './accountingTagAdd.tsx'

interface AccountingTagProps {
  visible: boolean;
  onCancel: () => void;
  id: string;
}

const AccountingTag : React.FC<AccountingTagProps> = props => {
  const { visible, onCancel, id } = props;

  // const [id , setId] = useState<number>(0);
  const [accountingTagList , setAccountingTagList] = useState<any[]>([]);

  const getAccountingTagList = async (id : any) => {
    const data = await accountingTagListService(id);

    setAccountingTagList(data || []);
    // setId(id);
  };

  const [accountingTagAdd , setAccountingTagAdd] = useState<any>({
    visible: false,
    values: {},
  });

  const accountingTagAddShow = (record : any) => {
    setAccountingTagAdd({
      visible : true,
      values: {
        ...record,
      }
    });
  }

  const accountingTagAddSubmit = async (values : any) => {
    console.log(id);
    const data = await accountingTagAddService({accountingId : id, tagId: values.tagId});
    if (data?.success) {
      return;
    }

    setAccountingTagAdd({
      visible : false,
      values: {}
    });
    getAccountingTagList({ id });
  }

  const accountingTagDelete = async (record : any) => {
    const data = await accountingTagDeleteService({accountingId : id, tagId: record.id});
    if (data?.success) {
      return;
    }
    getAccountingTagList({ id });
  }

  useEffect(() => {
    console.log(id);
    getAccountingTagList({ id });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
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
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (<div>
          <Button
            type="primary"
            danger
            onClick={(e) => {
              accountingTagDelete(record);
            }}
          >
            删除
          </Button>
        </div>);
      },
    },
  ];

  return (
    <Drawer
      title='账单标签'
      placement='right'
      onClose={onCancel}
      open={visible}
      forceRender={true}
      width={800}
    >
      <div style={{display: 'flex'}}>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddShow({});
          }}
        >
          新增
        </Button>
      </div>

      <Table
        dataSource={accountingTagList}
        rowKey={'id'}
        columns={columns}
        pagination={false}
      />

      <AccountingTagAdd
        visible={accountingTagAdd.visible}
        onCancel={() => {
          setAccountingTagAdd({...accountingTagAdd, visible: false});
        }}
        onSubmit={accountingTagAddSubmit}
        values={accountingTagAdd.values}
      >
      </AccountingTagAdd>
    </Drawer>
  );
};

export default AccountingTag;
