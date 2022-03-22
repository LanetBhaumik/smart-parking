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
          position: "absolute",
          backgroundImage: "url('/images/background.jpeg')",
          height: "100%",
          width: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          top: "0",
          bottom: "0",
        }}
      >
        <Box textAlign="center">
          <Button
            variant="contained"
            style={{
              marginTop: "40vh",
              color: "white",
              fontWeight: "bold",
              backgroundColor: "primary",
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
