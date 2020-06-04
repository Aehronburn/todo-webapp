import React, { useState, useEffect } from "react";
import Collection from "./Collection";
import CreateCollection from "./CreateCollection";
import { Layout, Typography, Row, Col } from "antd";
import image from "../res/Mohaka.png";

const { Header, Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
  const [collections, setCollections] = useState([
    { title: "Spesa", number: 1 },
    { title: "Spesa", number: 2 },
    { title: "Spesa", number: 3 },
    { title: "Spesa", number: 4 },
    { title: "Spesa", number: 5 },
    { title: "Spesa", number: 6 },
  ]);

  const [grid, setGrid] = useState([]);

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
        <Title style={styles.title} level={3}>
          Home
        </Title>
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
                      title={element.title}
                      number={element.number}
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
