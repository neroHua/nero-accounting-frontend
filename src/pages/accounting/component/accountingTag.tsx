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
      <div>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddShow({});
          }}
        >
          新增
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 1});
          }}
        >
          食物
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 2});
          }}
        >
          娱乐
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 3});
          }}
        >
          衣物
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 4});
          }}
        >
          居住
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 5});
          }}
        >
          交通
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 6});
          }}
        >
          医疗
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 7});
          }}
        >
          社交
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 8});
          }}
        >
          次坞打面
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 9});
          }}
        >
          午餐
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 10});
          }}
        >
          饮料
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 11});
          }}
        >
          地铁
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 12});
          }}
        >
          川菜
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 13});
          }}
        >
          奶茶
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 14});
          }}
        >
          汉堡
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 15});
          }}
        >
          肉蟹煲
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 16});
          }}
        >
          家用网络
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 17});
          }}
        >
          大排面
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 18});
          }}
        >
          公交
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 19});
          }}
        >
          晚餐
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 20});
          }}
        >
          卷膜
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 21});
          }}
        >
          高铁
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 22});
          }}
        >
          麻辣烫
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 23});
          }}
        >
          水果
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 24});
          }}
        >
          水
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 25});
          }}
        >
          打车
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 26});
          }}
        >
          烤鱼
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 27});
          }}
        >
          洗浴
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 28});
          }}
        >
          共享单车
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 29});
          }}
        >
          南昌拌粉
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 30});
          }}
        >
          话费
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 31});
          }}
        >
          早餐
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 32});
          }}
        >
          洗衣服
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 33});
          }}
        >
          洗头
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 34});
          }}
        >
          刀削面
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 35});
          }}
        >
          礼物
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 36});
          }}
        >
          日用
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 37});
          }}
        >
          冷饮
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 38});
          }}
        >
          方便面
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 39});
          }}
        >
          理发
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 40});
          }}
        >
          租房
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 41});
          }}
        >
          鞋子
        </Button>
        <Button
          type='primary'
          onClick={(e) => {
            accountingTagAddSubmit({ tagId: 42});
          }}
        >
          帽子
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
