import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'antd';
import moment from 'moment';
import XLSX, { WorkBook, WorkSheet } from 'xlsx';

interface AccountingImportProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
}

const AccountingImport : React.FC<AccountingImportProps> = props => {
  const { visible, onCancel, onSubmit } = props;

  const [accountingList , setAccountingList] = useState<any[]>([]);

  const importAccountListFromFile = (e : any) => {
    const files = e.target.files;
    const fileReader = new FileReader();
    fileReader.onload = function(ev) {
      const data = ev?.target?.result;
      const workbook : WorkBook = XLSX.read(data, {type: 'binary'});
      const sheetNames : string[] = workbook.SheetNames;
      const worksheet : WorkSheet = workbook.Sheets[sheetNames[0]];
      const ref : string = worksheet['!ref'] || '';
      const maxString : string = ref.replace('A1:L', '')
      const max = Number.parseInt(maxString, 10);

      const accountingListTemp : any[] = [];
      for (let i = 26; i <= max; i++) {
        const accountingTemp = {
          id: i - 26,
          billCreateTime: moment(((worksheet['A' + i].v - 70 * 365 - 19) * 86400 - 8 * 3600) * 1000),
          billMoney: worksheet['G' + i].v,
          description: worksheet['B' + i].v?.replaceAll(' ', '') + worksheet['C' + i].v?.replaceAll(' ', '') + worksheet['E' + i].v?.replaceAll(' ', ''),
          type: worksheet['F' + i].v?.replaceAll(' ', ''),
        }
        accountingListTemp.push(accountingTemp);
      }
      setAccountingList(accountingListTemp);
    };
    fileReader.readAsText(files[0], 'GB2312');
  }

  const handleDelete = (record : any) => {
    const newAccountingList = accountingList.filter(item => item.id !== record.id);
    setAccountingList(newAccountingList);
  };

  useEffect(() => {
  }, []);

  const columns = [
    {
      title: '账单创建时间',
      dataIndex: 'billCreateTime',
      width: 200,
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
      title: '类型',
      dataIndex: 'type',
      width: 100,
      editable: true,
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
              handleDelete(record);
            }}
          >
            删除
          </Button>
        </div>);
      },
    },
  ];

  return (
    <Modal
      title='导入支付宝账单'
      onOk={(e) => {
        onSubmit(accountingList);
      }}
      onCancel={onCancel}
      open={visible}
      forceRender={true}
      width={1080}
    >
      <div style={{display: 'flex'}}>
        <input
          type="file"
          onChange={ (e) => importAccountListFromFile(e)}
        />
      </div>
      <Table
        dataSource={accountingList}
        rowKey={'id'}
        columns={columns}
      />;
  </Modal>
  );
};

export default AccountingImport;
