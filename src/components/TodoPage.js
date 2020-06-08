import React from "react";
import HeaderTitle from "./HeaderTitle";
import { Layout } from "antd";

const { Header, Content } = Layout;

const TodoPage = ({ collection, username }) => {
	return (
		<Layout>
			<Header style={styles.header}>
				<HeaderTitle title={collection} username={username} />
			</Header>
			<Content style={styles.content}></Content>
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
		height: "90vh",
		backgroundColor: "rgb(240, 242, 245)",
	},
};

export default TodoPage;
