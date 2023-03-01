import React, { useEffect } from 'react';
import { Form, InputNumber, Button, DatePicker, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ValuableEnumeration } from '../../../enumeration/accounting/accounting';

interface AccountingSearchProps {
  onSubmit: (values: any) => Promise<void>;
  values: any;
}

const AccountingSearch : React.FC<AccountingSearchProps> = props => {
  const { onSubmit, values } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...values,
    });
    return () => {
      form.resetFields();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      layout='inline'
    >
      <Form.Item
        label='账单发生时间小'
        name='billCreateTimeMin'
        rules={[
          {required: false, message: '请输入账单发生时间小!'},
        ]}
      >
        <DatePicker
          showTime
          placeholder='请输入账单发生时间小!'
        />
      </Form.Item>
      <Form.Item
        label='账单发生时间大'
        name='billCreateTimeMax'
        rules={[
          {required: false, message: '请输入账单发生时间大!'},
        ]}
      >
        <DatePicker
          showTime
          placeholder='请输入账单发生时间大!'
        />
      </Form.Item>
      <Form.Item
        label='账单金额小'
        name='billMoneyMin'
        rules={[
          {required: false, message: '请输入账单金额小!'},
        ]}
      >
        <InputNumber
          min={0.01}
          placeholder='请输入账单金额小!'
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        label='账单金额大'
        name='billMoneyMax'
        rules={[
          {required: false, message: '请输入账单金额大!'},
        ]}
      >
        <InputNumber
          min={0.01}
          placeholder='请输入账单金额大!'
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
          label='是否值得'
          name='valuable'
          rules={[
            {required: false, message: '请选择是否值得!'},
          ]}
        >
          <Select
            options={ValuableEnumeration}
            style={{ width: '100%' }}
          />
        </Form.Item>
      <Form.Item>
        <Button 
          type='primary'
          htmlType='submit'
          icon={<SearchOutlined/>}
        >
          搜索
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountingSearch;
