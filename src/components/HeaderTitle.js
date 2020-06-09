import React, { useState } from "react";
import { PageHeader, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";

const { Text } = Typography;

const HeaderTitle = ({ title, username, isTodo }) => {
	const [isClicked, setIsClicked] = useState(false);
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
							<Text type="secondary">{username}</Text>
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
