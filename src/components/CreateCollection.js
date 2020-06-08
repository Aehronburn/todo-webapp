import React, { useState } from "react";
import { Card, Typography, Input, Divider } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

const { Text } = Typography;

const CreateCollection = ({ createNew }) => {
  const [name, setName] = useState("");

  const updateName = (e) => {
    setName(e.target.value);
  };

  const cancel = (e) => {
    e.preventDefault();
    setName("");
  };

  const submit = (e) => {
    e.preventDefault();
    createNew(name);
  };

  return (
    <Card
      style={styles.card}
      hoverable
      actions={[
        <CloseOutlined onClick={cancel} />,
        <CheckOutlined onClick={submit} />,
      ]}
    >
      <Text style={styles.text} strong>
        Create new
      </Text>
      <Divider />
      <Input placeholder="name" required onChange={updateName} value={name} />
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
