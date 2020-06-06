import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import HeaderTitle from "./HeaderTitle";
import { Layout, Card, Form, Input, Button, Alert, Space } from "antd";
import image from "../res/Waihou.png";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { TokenContext } from "../contexts/TokenContext";
import { UserContext } from "../contexts/UserContext";

const { Header, Content } = Layout;

const RegistrationPage = ({ authenticated }) => {
  const { username, password } = useContext(UserContext);
  const [usernameValue, setUsernameValue] = username;
  const [passwordValue, setPasswordValue] = password;
  const [token, setToken] = useContext(TokenContext);
  const [error, setError] = useState(false);
  const [authenticate, setAuthenticate] = authenticated;

  const updateError = () => {
    setError(!error);
  };

  const updateUsername = (e) => {
    setUsernameValue(e.target.value);
  };

  const updatePassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const submit = async (e) => {
    let username = usernameValue;
    let password = passwordValue;
    const response = await fetch(
      "https://366q1oq2q5.execute-api.eu-south-1.amazonaws.com/dev/api/login",
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }
    );
    if (response.ok) {
      console.log("ok");
      const data = await response.json();
      setToken(data.token);
      setAuthenticate(true);
    } else {
      console.log("error");
      updateError();
    }
  };

  return (
    <Layout>
      {authenticate ? <Redirect to="/home" /> : ""}
      <Header style={styles.header}>
        <HeaderTitle title="Login" />
      </Header>
      <Layout>
        <Content style={styles.content}>
          <Card title="Login" style={styles.card}>
            <Form onFinish={submit}>
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
                <Space direction="vertical">
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                  {error ? (
                    <Alert
                      showIcon
                      closable
                      type="error"
                      message="wrong input"
                    />
                  ) : (
                    ""
                  )}
                </Space>
              </Form.Item>
              <Link to="/register">Register</Link>
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
  card: {
    maxWidth: "320px",
    margin: "auto",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
    textAlign: "center",
  },
};

export default RegistrationPage;
