import React from "react";
import { Card, Typography, Input, Divider } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

const { Text } = Typography;

const CreateCollection = () => {
  return (
    <Card
      style={styles.card}
      hoverable
      actions={[<CloseOutlined />, <CheckOutlined />]}
    >
      <Text style={styles.text} strong>
        Create new
      </Text>
      <Divider />
      <Input placeholder="name" />
    </Card>
  );
};

const styles = {
  card: {
    textAlign: "center",
  },
  text: {
    color: "rgb(33,148,255)",
  },
};

export default CreateCollection;
