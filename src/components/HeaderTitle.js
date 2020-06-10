import React, { useState } from "react";
import { PageHeader, Typography, Avatar, Menu, Dropdown, Space } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";

const { Text } = Typography;

const HeaderTitle = ({ title, username, isTodo, logout }) => {
	const [isClicked, setIsClicked] = useState(false);

	const menu = (
		<Menu>
			<Menu.Item danger>
				<a onClick={() => logout()}>Logout</a>
			</Menu.Item>
		</Menu>
	);

	return (
		<>
			{isClicked ? <Redirect to="/home" /> : ""}
			<PageHeader
				backIcon={isTodo}
				onBack={() => setIsClicked(true)}
				style={styles.title}
				title={title}
				extra={
					username ? (
						<>
							<Avatar
								style={{
									backgroundColor: "#87d068",
								}}
								icon={<UserOutlined />}
							/>
							<Dropdown overlay={menu}>
								<Text>
									<Space>
										{username}
										<DownOutlined />
									</Space>
								</Text>
							</Dropdown>
						</>
					) : (
						""
					)
				}
			/>
		</>
	);
};

const styles = {
	title: {
		height: "8vh",
		marginTop: "-4px",
	},
};

export default HeaderTitle;
