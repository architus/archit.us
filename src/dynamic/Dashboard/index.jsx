import React from "react";
import { Container } from "react-bootstrap";
import TokenExchange from "functional/TokenExchange";

function Dashboard() {
  return (
    <Container className="py-5">
      <TokenExchange />
      <h2>Dashboard</h2>
    </Container>
  );
}

export default Dashboard;
