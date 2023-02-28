import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface TagSearchProps {
  onSubmit: (values: any) => Promise<void>;
  values: any;
}

const TagSearch : React.FC<TagSearchProps> = props => {
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
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      layout='inline'
    >
      <Form.Item
        label='编码'
        name='codeEqual'
        rules={[
          {required: false, message: '请输入编码!'},
        ]}
      >
        <Input
          maxLength={32}
          allowClear={true}
          placeholder='请输入编码!'
        />
      </Form.Item>
      <Form.Item
        label='名称'
        name='nameEqual'
        rules={[
          {required: false, message: '请输入名称!'},
        ]}
      >
        <Input
          maxLength={32}
          allowClear={true}
          placeholder='请输入名称!'
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
          icon={<SearchOutlined/>}
        >
          搜索
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TagSearch;
