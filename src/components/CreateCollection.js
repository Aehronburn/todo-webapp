import React from "react";
import { Card, Typography, Input, Form, Divider } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

const { Text } = Typography;

const CreateCollection = () => {
  return (
    <Card
      style={styles.card}
      hoverable
      actions={[<CloseOutlined />, <CheckOutlined />]}
    >
      <Text strong>Create new</Text>
      <Divider />
      <Input placeholder="name" />
    </Card>
  );
};

const styles = {
  card: {
    textAlign: "center",
  },
};

export default CreateCollection;
