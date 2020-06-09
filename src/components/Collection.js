import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import ChangeTitle from "./ChangeTitle";
import DeleteCollection from "./DeleteCollection";
import { TokenContext } from "../contexts/TokenContext";
import { Card, Typography, Divider } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;

const Collection = ({ id, name, number, eliminate, username }) => {
	const [token, setToken] = useContext(TokenContext);
	const [cardId, setCardId] = useState(id);
	const [cardTitle, setCardTitle] = useState(name);
	const [cardCount, setCardCount] = useState(number);
	const [isModifying, setIsModifying] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isOpening, setIsOpening] = useState(false);

	const toggle = () => {
		setIsModifying(!isModifying);
	};

	const toggleDelete = () => {
		setIsDeleting(!isDeleting);
	};

	const editTitle = () => {
		toggle();
	};

	const deleteCard = () => {
		toggleDelete();
	};

	const enterTodo = (e) => {
		let collectionId = e.target.id;
		setIsOpening(true);
	};

	useEffect(() => {
		const updateTitle = async (id, name) => {
			try {
				let response = await fetch(
					"https://366q1oq2q5.execute-api.eu-south-1.amazonaws.com/dev/api/collections/" +
						id,
					{
						method: "PATCH",
						headers: {
							Authorization: token,
						},
						body: JSON.stringify({ name }),
					}
				);
			} catch (error) {
				console.log(error);
			}
		};
		updateTitle(cardId, cardTitle);
	}, [cardTitle]);

	return (
		<>
			{isOpening ? (
				<Redirect
					to={{
						pathname: "/todo",
						state: {
							collection: cardId,
							username: username,
							collectionName: cardTitle,
						},
					}}
				/>
			) : (
				""
			)}
			<Card
				style={styles.card}
				hoverable
				actions={[
					<EditOutlined onClick={editTitle} />,
					<DeleteOutlined onClick={deleteCard} />,
				]}
			>
				<Link id={cardId} onClick={enterTodo}>
					{cardTitle}
				</Link>
				<Divider />
				<Text type="secondary">{cardCount}</Text>
			</Card>
			<ChangeTitle
				isModifying={isModifying}
				toggle={toggle}
				cardTitle={[cardTitle, setCardTitle]}
			/>
			<DeleteCollection
				id={cardId}
				isDeleting={isDeleting}
				toggleDelete={toggleDelete}
				eliminate={eliminate}
			/>
		</>
	);
};

const styles = {
	card: {
		textAlign: "center",
	},
};

export default Collection;
