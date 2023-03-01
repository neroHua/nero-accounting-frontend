import React, { useEffect } from 'react';
import { Drawer, Form, Input, InputNumber, Button } from 'antd';

interface AccountingTagAddProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
  values: any;
}

const AccountingTagAdd : React.FC<AccountingTagAddProps> = props => {
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
      title='新增账单标签'
      placement='right'
      onClose={onCancel}
      open={visible}
      forceRender={true}
    >
      <Form
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item
          label='标签id'
          name='tagId'
          rules={[
            {required: true, message: '请输入标签id!'},
          ]}
        >
          <InputNumber
            min={1}
            placeholder='请输入标签id!'
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

export default AccountingTagAdd;
