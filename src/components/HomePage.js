import React, { useState, useEffect, useContext } from "react";
import Collection from "./Collection";
import CreateCollection from "./CreateCollection";
import { Layout, Row, Col, Modal } from "antd";
import image from "../res/Doubs.png";
import HeaderTitle from "./HeaderTitle";
import { UserContext } from "../contexts/UserContext";
import { TokenContext } from "../contexts/TokenContext";

const { Header, Content } = Layout;

const HomePage = () => {
  const [token, setToken] = useContext(TokenContext);
  const [collections, setCollections] = useState([]);
  const { username } = useContext(UserContext);
  const [usernameValue, setUsernameValue] = username;
  const [grid, setGrid] = useState([]);

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
  }, []);

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

  return (
    <Layout>
      <Header style={styles.header}>
        <HeaderTitle title="Home" username={usernameValue} />
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
                    ></Collection>
                  </Col>
                );
              })}
            </Row>
          );
        })}
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={styles.row}>
          <Col span={6}>
            <CreateCollection />
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
