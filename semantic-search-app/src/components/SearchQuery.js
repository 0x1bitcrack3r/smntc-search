import React, { useState } from "react";
import { Button, TextField, Typography, List, ListItem } from "@mui/material";

function SearchQuery() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch("http://localhost:8000/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    setResults(result.results);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <Typography variant="h6" gutterBottom>
        Search Documents
      </Typography>
      <TextField
        variant="outlined"
        label="Enter search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginRight: "1rem" }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      <List>
        {results.map((result, index) => (
          <ListItem key={index}>
            {result[0]} - Similarity: {result[1].toFixed(4)}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SearchQuery;
