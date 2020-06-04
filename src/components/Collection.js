import React from "react";
import { Card, Typography, Divider } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Collection = (props) => {
  const { title, number } = props;
  return (
    <Card
      style={styles.card}
      hoverable
      actions={[<EditOutlined />, <DeleteOutlined />]}
    >
      <Text strong>{title}</Text>
      <Divider />
      <Text type="secondary">{number}</Text>
    </Card>
  );
};

const styles = {
  card: {
    textAlign: "center",
  },
};

export default Collection;
