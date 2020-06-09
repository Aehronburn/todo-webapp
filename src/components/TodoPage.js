import React, { useState, useEffect, useContext } from "react";
import HeaderTitle from "./HeaderTitle";
import AddTodo from "./AddTodo";
import { TokenContext } from "../contexts/TokenContext";
import { Layout, Table, Checkbox, Typography } from "antd";
import image from "../res/Vorderrhein.png";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Link } = Typography;

const TodoPage = ({
	location: {
		state: { collection, username, collectionName },
	},
}) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [token, setToken] = useContext(TokenContext);

	useEffect(() => {
		const getData = async (collection) => {
			try {
				let response = await fetch(
					"https://366q1oq2q5.execute-api.eu-south-1.amazonaws.com/dev/api/todos/" +
						collection,
					{
						method: "GET",
						headers: { Authorization: token },
					}
				);
				setData(await response.json());
			} catch (error) {
				console.log(error);
			}
		};
		getData(collection);
	}, [isLoading]);

	const submit = async (collection, title, user) => {
		setIsLoading(true);
		try {
			await fetch(
				"https://366q1oq2q5.execute-api.eu-south-1.amazonaws.com/dev/api/todos",
				{
					method: "POST",
					headers: {
						Authorization: token,
					},
					body: JSON.stringify({
						title: title,
						author: user,
						group: collection,
					}),
				}
			);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const setCompleted = async (e) => {
		const id = e.target.id;
		let newArray = [...data];
		let index = newArray.findIndex((x) => x._id === id);
		let newState = !newArray[index].completed;
		newArray[index].completed = newState;
		setData(newArray);

		try {
			await fetch(
				"https://366q1oq2q5.execute-api.eu-south-1.amazonaws.com/dev/api/todos/" +
					id,
				{
					method: "PATCH",
					headers: {
						Authorization: token,
					},
					body: JSON.stringify({ completed: newState }),
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTodo = async (e) => {
		const id = e.target.id;
		let newArray = data.filter((element) => {
			return element._id !== id;
		});
		setData(newArray);
		try {
			await fetch(
				"https://366q1oq2q5.execute-api.eu-south-1.amazonaws.com/dev/api/todos/" +
					id,
				{
					method: "DELETE",
					headers: {
						Authorization: token,
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	const columns = [
		{
			title: "Task",
			dataIndex: "title",
			key: "title",
			width: "35%",
		},
		{
			title: "Author",
			dataIndex: "author",
			key: "author",
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date) => new Date(date).toLocaleString("it-IT"),
			sorter: (a, b) => new Date(a.date) - new Date(b.date),
			width: "20%",
		},
		{
			title: "Done",
			dataIndex: "completed",
			key: "completed",
			render: (completed, element) => (
				<Checkbox
					id={element._id}
					checked={element.completed}
					onChange={setCompleted}
				/>
			),
			filters: [
				{
					text: "completed",
					value: true,
				},
				{
					text: "uncompleted",
					value: false,
				},
			],
			filterMultiple: false,
			onFilter: (value, record) => record.completed === value,
			width: "10%",
		},
		{
			title: "Action",
			dataIndex: "_id",
			key: "_id",
			render: (_id) => (
				<Link id={_id} onClick={deleteTodo}>
					delete
				</Link>
			),
			width: "10%",
		},
	];

	return (
		<Layout style={styles.layout}>
			<Header style={styles.header}>
				<HeaderTitle
					title={collectionName}
					username={username}
					isTodo={<ArrowLeftOutlined />}
				/>
			</Header>
			<Content style={styles.content}>
				<AddTodo
					submit={submit}
					collection={collection}
					user={username}
					isLoading={isLoading}
				/>
				<Table
					style={styles.table}
					rowKey="_id"
					dataSource={data}
					columns={columns}
				/>
			</Content>
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
		backgroundImage: "url(" + image + ")",
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundColor: "rgb(240, 242, 245)",
		height: "100%",
	},
	table: {
		margin: "0px 120px 32px 120px",
	},
	layout: {
		backgroundColor: "rgb(240, 242, 245)",
		height: "100vh",
	},
};

export default TodoPage;
