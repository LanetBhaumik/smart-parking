import React from "react";
import { useNavigate } from "react-router";

// material ui
import { Box, Button } from "@mui/material";

const Homepage = () => {
  const Navigate = useNavigate();
  return (
    <>
      <div
        style={{
          backgroundImage: "url('/images/background.jpeg')",
          height: "100vh",
          marginTop: "-70px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box textAlign="center">
          <Button
            variant="contained"
            style={{
              marginTop: "50vh",
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#38383A",
            }}
            onClick={() => Navigate("/parkings")}
          >
            Park Now
          </Button>
        </Box>
      </div>
    </>
  );
};

export default Homepage;
