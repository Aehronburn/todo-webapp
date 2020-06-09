import React, { useContext } from "react";
import { Modal, Input } from "antd";

const ChangeTitle = ({ isModifying, toggle, cardTitle }) => {
	const [title, setTitle] = cardTitle;
	const save = () => {
		const input = document.getElementById("input");
		setTitle(input.value);
		toggle();
	};

	return (
		<Modal
			title="Modify title"
			visible={isModifying}
			onCancel={toggle}
			onOk={save}
		>
			<Input id="input" placeholder="new title"></Input>
		</Modal>
	);
};

export default ChangeTitle;
