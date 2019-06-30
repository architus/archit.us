import React from "react";
import { Container } from "react-bootstrap";
import TokenExchange from "functional/TokenExchange";
import GuildList from "../../components/GuildList"

function Dashboard() {
  return (
    <Container className="py-5">
      <TokenExchange />
      <h2>TEST</h2>
      <GuildList />
    </Container>
  );
}

export default Dashboard;
