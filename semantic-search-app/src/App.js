import React from "react";
import { Container, Typography } from "@mui/material";
import DocumentUpload from "./components/DocumentUpload";
import SearchQuery from "./components/SearchQuery";

function App() {
  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Semantic Search Application
      </Typography>
      <DocumentUpload />
      <SearchQuery />
    </Container>
  );
}

export default App;
