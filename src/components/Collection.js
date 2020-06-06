import React, { useState } from "react";
import { Card, Typography, Divider } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Collection = ({ id, name, count }) => {
  const [cardId, setCardId] = useState(id);
  const [cardTitle, setCardTitle] = useState(name);
  const [cardCount, setCardCount] = useState(count);

  const editTitle = (e) => {
    console.log("edit");
  };

  const deleteCard = () => {
    console.log("delete");
  };

  return (
    <Card
      style={styles.card}
      hoverable
      actions={[
        <EditOutlined onClick={editTitle} />,
        <DeleteOutlined onClick={deleteCard} />,
      ]}
    >
      <Text strong>{cardTitle}</Text>
      <Divider />
      <Text type="secondary">{cardCount}</Text>
    </Card>
  );
};

const styles = {
  card: {
    textAlign: "center",
  },
};

export default Collection;
