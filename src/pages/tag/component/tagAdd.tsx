import React, { useEffect } from 'react';
import { Drawer, Form, Input, InputNumber, Button } from 'antd';

interface TagAddProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
  values: any;
}

const TagAdd : React.FC<TagAddProps> = props => {
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
      title='新增标签'
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
          label='编码'
          name='code'
          rules={[
            {required: true, message: '请输入编码!'},
          ]}
        >
          <Input
            maxLength={32}
            placeholder='请输入编码!'
          />
        </Form.Item>
        <Form.Item
          label='名称'
          name='name'
          rules={[
            {required: true, message: '请输入名称!'},
          ]}
        >
          <Input
            maxLength={32}
            placeholder='请输入名称!'
          />
        </Form.Item>
        <Form.Item
          label='描述'
          name='description'
          rules={[
            {required: true, message: '请输入描述!'},
          ]}
        >
          <Input
            maxLength={64}
            placeholder='请输入描述!'
          />
        </Form.Item>
        <Form.Item
          label='父标签id'
          name='parentId'
          rules={[
            {required: false, message: '请输入父标签id!'},
          ]}
        >
          <InputNumber
            min={1}
            placeholder='请输入父标签id!'
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

export default TagAdd;
