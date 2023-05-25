import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'antd';
import { ValuableEnumeration } from '../../../enumeration/accounting/accounting';
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
    var fileReader = new FileReader();
    let data : any = null;
    fileReader.onload = function(ev) {
      data = ev?.target?.result;
      const workbook : WorkBook = XLSX.read(data, {type: 'binary'});
      const sheetNames : string[] = workbook.SheetNames;
      const worksheet : WorkSheet = workbook.Sheets[sheetNames[0]];
      const ref : string = worksheet['!ref'] || '';
      const maxString : string = ref.replace('A1:L', '')
      const max = Number.parseInt(maxString, 10);

      console.log(worksheet.A26, worksheet.A27, worksheet.B26, worksheet.B27, max);
      const accountingListTemp : any[] = [];
      for (let i = 26; i <= max; i++) {
        const accountingTemp = {
          id: i,
          billCreateTime: moment(((worksheet['A' + i].v - 70 * 365 - 19) * 86400 - 8 * 3600) * 1000),
          billMoney: worksheet['G' + i].v,
          description: worksheet['C' + i].v,
        }
        accountingListTemp.push(accountingTemp);
      }
      console.log(accountingListTemp);
      setAccountingList(accountingListTemp);
      // const excelData = XLSX.utils.sheet_to_json(worksheet);
      // console.log(excelData[21], excelData[22]);
    };
    fileReader.readAsText(files[0], 'GB2312');
    // fileReader.readAsBinaryString(files[0]);
  }

  useEffect(() => {
  }, []);

  const columns = [
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
              // accountingUpdateShow(record);
            }}
          >
            修改
          </Button>
          <Button
            type="primary"
            danger
            onClick={(e) => {
              // accountingDelete(record);
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
      title='导入账单'
      onOk={onSubmit}
      onCancel={onCancel}
      open={visible}
      forceRender={true}
    >
      <div style={{display: 'flex'}}>
        <input type="file" id="excel-file" onChange={(e) => importAccountListFromFile(e)}/>
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
