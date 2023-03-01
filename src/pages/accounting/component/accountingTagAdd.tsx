import React, { useEffect, useState } from 'react';
import { Drawer, Form, Button, Select } from 'antd';
import { tagGetByPageService } from '../../../service/tag/tag.js';

interface AccountingTagAddProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
  values: any;
}

const AccountingTagAdd : React.FC<AccountingTagAddProps> = props => {
  const { visible, onCancel, onSubmit, values } = props;

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
          <Select
            showSearch
            allowClear
            placeholder='请输入标签名称'
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
          >
            提交
          </Button>
        </Form.Item>
      </Form>
  </Drawer>
  );
};

export default AccountingTagAdd;
