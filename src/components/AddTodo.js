import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const AddTodo = ({ submit, collection, user, isLoading }) => {
	const [name, setName] = useState("");

	const updateName = (e) => {
		setName(e.target.value);
	};

	const finish = () => {
		submit(collection, name, user);
	};

	return (
		<Form style={styles.form} name="form" layout="inline" onFinish={finish}>
			<Form.Item
				name="name"
				rules={[{ required: true, message: "insert task name" }]}
			>
				<Input placeholder="task" value={name} onChange={updateName} />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" loading={isLoading}>
					Create
				</Button>
			</Form.Item>
		</Form>
	);
};

const styles = {
	form: {
		margin: "16px 0px 16px 120px",
	},
};

export default AddTodo;
