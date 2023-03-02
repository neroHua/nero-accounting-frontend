import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import {
  accountingGetByPageService,
  accountingAddService,
  accountingUpdateService,
  accountingDeleteService,
} from '../../service/accounting/accounting.js';
import { ValuableEnumeration } from '../../enumeration/accounting/accounting';
import { useLocation } from 'react-router-dom';
import querystring from "query-string";
import moment from 'moment';
// @ts-ignore
import AccountingUpdate from './component/accountingUpdate.tsx'
// @ts-ignore
import AccountingAdd from './component/accountingAdd.tsx'
// @ts-ignore
import AccountingSearch from './component/accountingSearch.tsx'
// @ts-ignore
import AccountingTag from './component/accountingTag.tsx'

const AccountingPage: React.FC<any> = () => {
  let location = useLocation();

  const [pagination , setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    total: 0,
    pageSizeOptions: [10, 20, 30, 50, 100],
  });
  const [accountingSearch , setAccountingSearch] = useState<any>({
    values: {},
  });
  const [accountingList , setAccountingList] = useState<any[]>([]);

  const getAccountingList = async (request : any) => {
    const data = await accountingGetByPageService({
      ...request,
      billCreateTimeMin: request.billCreateTimeMin ? request.billCreateTimeMin : null,
      billCreateTimeMax: request.billCreateTimeMax ? request.billCreateTimeMax : null,
      billMoneyMin: request.billMoneyMin ? request.billMoneyMin : null,
      billMoneyMax: request.billMoneyMax ? request.billMoneyMax : null,
      valuable: request.valuable ? request.valuable : null,
    })

    setAccountingList(data?.dataList || []);

    setPagination({
      ...pagination,
      current: request.pageNumber,
      pageSize: request.pageSize,
      total: data.totalCount,
    });
    setAccountingSearch({
      values: {
        billCreateTimeMin: request.billCreateTimeMin,
        billCreateTimeMax: request.billCreateTimeMax,
        billMoneyMin: request.billMoneyMin,
        billMoneyMax: request.billMoneyMax,
        valuable: request.valuable,
      }
    });
  };

  const [accountingAdd , setAccountingAdd] = useState<any>({
    visible: false,
    values: {},
  });

  const accountingAddShow = (record : any) => {
    setAccountingAdd({
      visible : true,
      values: {
        ...record,
        billCreateTime: moment(),
      }
    });
  }

  const accountingAddSubmit = async (values : any) => {
    const data = await accountingAddService({...values});
    if (data?.success) {
      return;
    }

    setAccountingAdd({
      visible : false,
      values: {}
    });
    getAccountingList({pageNumber: pagination.current, pageSize: pagination.pageSize, ...accountingSearch.values});
  }

  const accountingDelete = async (record : any) => {
    const data = await accountingDeleteService(record.id);
    if (data?.success) {
      return;
    }
    getAccountingList({pageNumber: pagination.current, pageSize: pagination.pageSize, ...accountingSearch.values});
  }

  const [accountingUpdate , setAccountingUpdate] = useState<any>({
    visible: false,
    values: {},
  });

  const accountingUpdateShow = (record : any) => {
    setAccountingUpdate({
      visible : true,
      values: {
        ...record,
        createTime: moment(record.createTime),
        updateTime: moment(record.updateTime),
        billCreateTime: moment(record.billCreateTime),
      }
    });
  }

  const accountingUpdateSubmit = async (values : any) => {
    const data = await accountingUpdateService({...values});
    if (data?.success) {
      return;
    }

    setAccountingUpdate({
      visible : false,
      values: {}
    });
    getAccountingList({pageNumber: pagination.current, pageSize: pagination.pageSize, ...accountingSearch.values});
  }

  const [accountingTag , setAccountingTag] = useState<any>({
    visible: false,
    id: {},
  });

  const accountingTagShow = (record : any) => {
    setAccountingTag({
      visible : true,
      id: record?.id,
    });
  }

  useEffect(() => {
    const {pageNumber = 1, pageSize = 10, billCreateTimeMin, billCreateTimeMax, billMoneyMin, billMoneyMax, valuable } = querystring.parse(location.search);
    getAccountingList({pageNumber, pageSize, billCreateTimeMin, billCreateTimeMax, billMoneyMin, billMoneyMax, valuable });
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
      title: '账单用户',
      dataIndex: 'userId',
    },
    {
      title: '账单创建时间',
      dataIndex: 'billCreateTime',
      render: (text, record, index) => {
        return moment(record.billCreateTime).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
      },
    },
    {
      title: '账单金额',
      dataIndex: 'billMoney',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '复盘描述',
      dataIndex: 'reviewDescription',
    },
    {
      title: '是否值得',
      dataIndex: 'valuable',
      render: (text, record, index) => {
        const valuable = ValuableEnumeration.filter((item : any) => {
          return item.value === record.valuable;
        });
        return valuable[0]?.label || '-';
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (<div>
          <Button
            type="primary"
            onClick={(e) => {
              accountingUpdateShow(record);
            }}
          >
            修改
          </Button>
          <Button
            type="primary"
            danger
            onClick={(e) => {
              accountingDelete(record);
            }}
          >
            删除
          </Button>
          <Button
            type="primary"
            onClick={(e) => {
              accountingTagShow(record);
            }}
          >
            标签
          </Button>
        </div>);
      },
    },
  ];

  return (
    <div>
      <div style={{display: 'flex'}}>
        <AccountingSearch
          onSubmit={(values) => {
            getAccountingList({...values, pageNumber: pagination.current, pageSize: pagination.pageSize});
          }}
          values={accountingSearch.values}
        >
        </AccountingSearch>
        <Button
          type='primary'
          onClick={(e) => {
            accountingAddShow({});
          }}
        >
          新增
        </Button>
      </div>

      <Table
        dataSource={accountingList}
        rowKey={'id'}
        columns={columns}
        pagination={pagination}
        onChange={(pagination) => {
          getAccountingList({
            pageSize: pagination.pageSize,
            pageNumber: pagination.current
          });
        }}
      />;

      <AccountingAdd
        visible={accountingAdd.visible}
        onCancel={() => {
          setAccountingAdd({...accountingAdd, visible: false});
        }}
        onSubmit={accountingAddSubmit}
        values={accountingAdd.values}
      >
      </AccountingAdd>

      <AccountingUpdate
        visible={accountingUpdate.visible}
        onCancel={() => {
          setAccountingUpdate({...accountingUpdate, visible: false});
        }}
        onSubmit={accountingUpdateSubmit}
        values={accountingUpdate.values}
      >
      </AccountingUpdate>

      <AccountingTag
        visible={accountingTag.visible}
        onCancel={() => {
          setAccountingTag({...accountingTag, visible: false});
        }}
        id={accountingTag.id}
      >
      </AccountingTag>
    </div>
  );
};

export default AccountingPage;
