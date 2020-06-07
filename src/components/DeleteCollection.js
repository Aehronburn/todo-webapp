import React from "react";
import { Modal } from "antd";

const DeleteCollection = ({ id, isDeleting, toggleDelete, eliminate }) => {
  const destroy = () => {
    eliminate(id);
  };
  return (
    <Modal
      title="Are you sure to delete collection?"
      visible={isDeleting}
      onCancel={toggleDelete}
      onOk={destroy}
    ></Modal>
  );
};

export default DeleteCollection;
