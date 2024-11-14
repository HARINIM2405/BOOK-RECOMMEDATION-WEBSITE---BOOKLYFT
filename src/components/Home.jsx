import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Paper,
  CssBaseline,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './Home.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#004d40",
    },
    secondary: {
      main: "#80cbc4",
    },
    background: {
      default: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "#80cbc4",
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
      fontSize: "2rem",
      color: "#ffffff",
    },
    h6: {
      fontWeight: 400,
      fontSize: "1rem",
      color: "#80cbc4",
    },
    body1: {
      fontWeight: 300,
    },
  },
});

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Header */}
      <AppBar position="fixed" color="primary" elevation={4}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/blogo.png"
              alt="Booklyft Logo"
              style={{ width: "80px", height: "80px", marginRight: "1px" }}
            />
            <Typography
              variant="h6"
              sx={{ fontSize: "2.25rem", fontWeight: "bold" }}
            >
              Booklyft
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {['About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                style={{ textDecoration: 'none', color: 'inherit' }} // Ensure link styles match button appearance
              >
                <Button color="inherit" sx={{ marginLeft: 1 }}>
                  {item}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginLeft: 1, borderRadius: '20px', padding: '6px 20px' }}
              >
                Login
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh", // Decreased from 80vh to 60vh
          paddingTop: "700px",  // Adjusted to align the content better
          backgroundColor: "#121212",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            maxWidth: "1200px",
            padding: 4,
            border: "5px solid #20B2AA",
            borderRadius: 2,
            textAlign: "left",
            backgroundColor: "#121212",
          }}
        >
          {/* Left Side: Text */}
          <Box sx={{ width: "50%" }}>
            <Typography variant="h3" sx={{ color: "#ffffff" }}>
              Welcome to Booklyft!
            </Typography>
            <Typography variant="h6" sx={{ color: "#80cbc4", marginTop: 2 }}>
              Unlock a world of personalized book recommendations!
              Find stories that match your unique taste and interests.
              From bestsellers to hidden gems, there's always something new.
              Explore books curated just for you, anytime, anywhere.
              Start your reading journey with Booklyft today!
            </Typography>
          </Box>

          {/* Right Side: Image */}
          <Box sx={{ width: "50%" }}>
            <img
              src="/new.jpeg"
              alt="Booklyft Hero"
              style={{
                width: "100%",
                height: "auto", // Automatically adjust the height based on width
                maxHeight: "350px", // Limit the max height
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Content Section */}
      {/* Content Section */}
<Container className="content-section" sx={{ paddingTop: '160px' }}>
  <Grid container spacing={4} justifyContent="center">
    <Grid item xs={12} sm={4}>
      <Paper elevation={3} className="feature-paper" sx={{ textAlign: 'center', padding: 2 }}>
        <Typography>
          "A room without books is like a body without a soul." – 
          <Typography component="span" sx={{ color: 'blue' }}>
            Marcus Tullius Cicero
          </Typography>
        </Typography>
      </Paper>
    </Grid>
  </Grid>
</Container>


      {/* Footer */}
      <footer>
        <Typography variant="body1" align="center">
          © 2024 Booklyft. All rights reserved.
        </Typography>
      </footer>
    </ThemeProvider>
  );
}

export default Home;
