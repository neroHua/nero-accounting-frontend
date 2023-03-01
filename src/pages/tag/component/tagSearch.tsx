import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { tagGetByPageService } from '../../../service/tag/tag.js';

interface TagSearchProps {
  onSubmit: (values: any) => Promise<void>;
  values: any;
}

const TagSearch : React.FC<TagSearchProps> = props => {
  const { onSubmit, values } = props;

  const [form] = Form.useForm();

  const [tagList , setTagList] = useState<any[]>([]);

  const searchTagList = async (values : any) => {
    const data = await tagGetByPageService({
      pageNumber: 1,
      pageSize: 10,
      nameLike: values ? values : null,
    })

    const tagListTemp: any[] = [];
    data?.dataList?.forEach((item) => {
      tagListTemp.push({label : item.name + '  ' + item.code, value: item.id});
    });

    setTagList(tagListTemp);
  };

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
        style={{width: '220px'}}
        rules={[
          {required: false, message: '请输入父标签id!'},
        ]}
      >
        <Select
          showSearch
          allowClear
          placeholder='请输入父标签名称'
          showArrow={false}
          filterOption={false}
          onSearch={searchTagList}
          options={tagList}
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
