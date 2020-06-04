import React, { useState, useContext } from "react";
import { Layout, Typography, Card, Form, Input, Button } from "antd";
import { TokenContext } from "../contexts/TokenContext";
import image from "../res/Mataura.png";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title } = Typography;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useContext(TokenContext);

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://366q1oq2q5.execute-api.eu-south-1.amazonaws.com/dev/api/login",
      {
        method: "POST",

        body: JSON.stringify({ username, password }),
      }
    );
    const data = await response.json();
    setToken(data.token);
    console.log(token);
  };

  return (
    <Layout>
      <Header style={styles.header}>
        <Title style={styles.title} level={3}>
          Todo
        </Title>
      </Header>
      <Layout>
        <Content style={styles.content}>
          <Card title="Login" style={styles.card}>
            <Form>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "enter your username" }]}
                onChange={updateUsername}
              >
                <Input placeholder="username" prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "enter your password" }]}
                onChange={updatePassword}
              >
                <Input.Password
                  placeholder="password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={submit}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

const styles = {
  header: {
    backgroundColor: "white",
    minHeight: "8vh",
    textAlign: "center",
  },
  content: {
    height: "92vh",
    backgroundImage: "url(" + image + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "rgb(240, 242, 245)",
  },
  title: {
    marginTop: "16px",
  },
  card: {
    maxWidth: "320px",
    margin: "auto",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
    textAlign: "center",
  },
};

export default LoginPage;
