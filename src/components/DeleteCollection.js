import React from "react";
import { Modal, Typography } from "antd";

const { Text } = Typography;

const DeleteCollection = ({ id, isDeleting, toggleDelete, eliminate }) => {
  const destroy = () => {
    eliminate(id);
  };
  return (
    <Modal
      title="Delete collection"
      visible={isDeleting}
      onCancel={toggleDelete}
      onOk={destroy}
    >
      <Text>Are you sure?</Text>
    </Modal>
  );
};

export default DeleteCollection;
