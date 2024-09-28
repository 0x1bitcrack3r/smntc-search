import React, { useState } from "react";
import { Button, Typography, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/upload/", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setMessage(result.message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <Typography variant="h6" gutterBottom>
        Upload Document
      </Typography>
      <input type="file" onChange={handleFileChange} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        style={{ marginLeft: "1rem" }}
      >
        Upload
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DocumentUpload;
