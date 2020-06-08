import React from "react";
import { PageHeader, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

const HeaderTitle = ({ title, username }) => {
	return (
		<PageHeader
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
	);
};

const styles = {
	title: {
		height: "8vh",
		marginTop: "-4px",
	},
};

export default HeaderTitle;
