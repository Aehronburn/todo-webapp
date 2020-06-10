import React, { useState, useEffect, useContext } from "react";
import Collection from "./Collection";
import CreateCollection from "./CreateCollection";
import { Layout, Row, Col } from "antd";
import image from "../res/Doubs.png";
import HeaderTitle from "./HeaderTitle";
import { UserContext } from "../contexts/UserContext";
import { TokenContext } from "../contexts/TokenContext";

const { Header, Content } = Layout;

const HomePage = ({ logout }) => {
	const [token, setToken] = useContext(TokenContext);
	const [collections, setCollections] = useState([]);
	const { username } = useContext(UserContext);
	const [usernameValue, setUsernameValue] = username;
	const [grid, setGrid] = useState([]);
	const [adding, setAdding] = useState(false);

	useEffect(() => {
		const getData = async () => {
			try {
				let response = await fetch(
					"https://366q1oq2q5.execute-api.eu-south-1.amazonaws.com/dev/api/collections",
					{
						method: "GET",
						headers: { Authorization: token },
					}
				);
				let fetchedData = await response.json();
				setCollections(fetchedData);
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, [adding]);

	useEffect(() => {
		setGrid(createGrid(collections));
	}, [collections]);

	const createGrid = (array) => {
		let rows = [];
		let counter = 1;
		rows[counter] = [];
		array.forEach((element, index) => {
			if (index % 4 === 0 && index !== 0) {
				counter++;
				rows[counter] = [];
				rows[counter].push(element);
			} else {
				rows[counter].push(element);
			}
		});
		rows.shift();
		return rows;
	};

	const eliminate = async (id) => {
		setCollections(collections.filter((collection) => collection._id !== id));
		try {
			await fetch(
				"https://366q1oq2q5.execute-api.eu-south-1.amazonaws.com/dev/api/collections/" +
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

	const createNew = async (name) => {
		try {
			await fetch(
				"https://366q1oq2q5.execute-api.eu-south-1.amazonaws.com/dev/api/collections/",
				{
					method: "POST",
					headers: { Authorization: token },
					body: JSON.stringify({ name }),
				}
			);
			setAdding(!adding);
		} catch (error) {
			console.log(error);
		}
	};

	const save = async (id, name) => {
		try {
			await fetch(
				"https://366q1oq2q5.execute-api.eu-south-1.amazonaws.com/dev/api/collections/" +
					id,
				{
					method: "PATCH",
					headers: {
						Authorization: token,
					},
					body: JSON.stringify({ name: name }),
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<Header style={styles.header}>
				<HeaderTitle
					title="Home"
					username={usernameValue}
					isTodo={false}
					logout={logout}
				/>
			</Header>
			<Content style={styles.content}>
				{grid.map((elements, index) => {
					return (
						<Row
							key={index}
							gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
							style={styles.row}
						>
							{elements.map((element, index) => {
								return (
									<Col key={index} span={6}>
										<Collection
											id={element._id}
											name={element.name}
											number={element.count}
											eliminate={eliminate}
											username={usernameValue}
											save={save}
											logout={logout}
										></Collection>
									</Col>
								);
							})}
						</Row>
					);
				})}
				<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={styles.row}>
					<Col span={6}>
						<CreateCollection createNew={createNew} />
					</Col>
				</Row>
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
		height: "90vh",
		backgroundImage: "url(" + image + ")",
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundColor: "rgb(240, 242, 245)",
	},
	title: {
		marginTop: "16px",
	},
	row: {
		padding: "32px 80px 0px 80px",
	},
};

export default HomePage;
