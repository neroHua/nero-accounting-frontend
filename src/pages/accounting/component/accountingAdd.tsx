import React, { useEffect } from 'react';
import { Drawer, Form, Input, InputNumber, Button, DatePicker, Select } from 'antd';
import { ValuableEnumeration } from '../../../enumeration/accounting/accounting';

interface AccountingAddProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
  values: any;
}

const AccountingAdd : React.FC<AccountingAddProps> = props => {
  const { visible, onCancel, onSubmit, values } = props;

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
    <Drawer
      title='新增账单'
      placement='right'
      onClose={onCancel}
      open={visible}
      forceRender={true}
    >
      <Form
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item
          label='账单发生时间'
          name='billCreateTime'
          rules={[
            {required: true, message: '请输入账单发生时间!'},
          ]}
        >
          <DatePicker
            showTime
            placeholder='请输入账单发生时间!'
          />
        </Form.Item>
        <Form.Item
          label='账单金额'
          name='billMoney'
          rules={[
            {required: true, message: '请输入账单金额!'},
          ]}
        >
          <InputNumber
            min={0.01}
            placeholder='请输入账单金额!'
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label='描述'
          name='description'
          rules={[
            {required: false, message: '请输入描述!'},
          ]}
        >
          <Input
            maxLength={64}
            placeholder='请输入描述!'
          />
        </Form.Item>
        <Form.Item
          label='复盘描述'
          name='reviewDescription'
          rules={[
            {required: false, message: '请输入复盘描述!'},
          ]}
        >
          <Input
            maxLength={64}
            placeholder='请输入复盘描述!'
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
          >
            提交
          </Button>
        </Form.Item>
      </Form>
  </Drawer>
  );
};

export default AccountingAdd;
