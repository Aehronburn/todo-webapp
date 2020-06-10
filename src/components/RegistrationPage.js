import React, { useContext, useState } from "react";
import HeaderTitle from "./HeaderTitle";
import { Link, Redirect } from "react-router-dom";
import { Layout, Card, Form, Input, Button, Space, Alert } from "antd";
import image from "../res/Mataura.png";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { UserContext } from "../contexts/UserContext";
import { TokenContext } from "../contexts/TokenContext";

const { Header, Content } = Layout;

const RegistrationPage = ({ authenticated }) => {
	const { username, password } = useContext(UserContext);
	const [usernameValue, setUsernameValue] = username;
	const [passwordValue, setPasswordValue] = password;
	const [token, setToken] = useContext(TokenContext);
	const [error, setError] = useState(false);
	const [authenticate, setAuthenticate] = authenticated;
	const [isLoading, setIsLoading] = useState(false);

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
		setIsLoading(true);
		let username = usernameValue;
		let password = passwordValue;
		const response = await fetch(
			"https://366q1oq2q5.execute-api.eu-south-1.amazonaws.com/dev/api/register",
			{
				method: "POST",
				body: JSON.stringify({ username, password }),
			}
		);
		if (response.ok) {
			const loginResponse = await fetch(
				"https://366q1oq2q5.execute-api.eu-south-1.amazonaws.com/dev/api/login",
				{
					method: "POST",
					body: JSON.stringify({ username, password }),
				}
			);
			let data = await loginResponse.json();
			setToken(data.token);
			setAuthenticate(true);
		} else {
			console.log("error");
			updateError();
		}
		setIsLoading(false);
	};

	return (
		<Layout>
			{authenticate ? <Redirect to="/home" /> : ""}
			<Header style={styles.header}>
				<HeaderTitle title="Registration" isTodo={false} />
			</Header>
			<Layout>
				<Content style={styles.content}>
					<Card title="Registration" style={styles.card}>
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
									<Button type="primary" htmlType="submit" loading={isLoading}>
										Register
									</Button>
									{error ? (
										<Alert
											showIcon
											closable
											type="warning"
											message="username already taken"
										/>
									) : (
										""
									)}
								</Space>
							</Form.Item>
							<Link to="/">login</Link>
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

export default RegistrationPage;
