import React, { useEffect } from 'react';
import { Drawer } from 'antd';

interface TagUpdateProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
  values: any;
}

const TagUpdate : React.FC<TagUpdateProps> = props => {
  const { visible, onCancel, values } = props;

  useEffect(() => {
  }, [values]);

  return (
    <Drawer
      title="修改标签"
      placement="right"
      onClose={onCancel}
      open={visible}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
  </Drawer>
  );
};

export default TagUpdate;
