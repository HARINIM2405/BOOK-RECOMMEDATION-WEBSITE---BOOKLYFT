import React from "react";
import { Typography, Button, Box, AppBar, Toolbar, Container, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './Home1.css';

const theme = createTheme({
  palette: {
    primary: { main: "#004d40" },
    secondary: { main: "#80cbc4" },
    background: { default: "#121212" },
    text: { primary: "#ffffff", secondary: "#80cbc4" },
  },
  typography: {
    h3: { fontWeight: 700, fontSize: "2rem", color: "#ffffff" },
    h6: { fontWeight: 400, fontSize: "1rem", color: "#80cbc4" },
    body1: { fontWeight: 300 },
  },
});

function Home1() {
  const handleLogout = () => {
    // Placeholder for logout logic
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" color="primary" elevation={4}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} className="home1">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src="/blogo.png" alt="Booklyft Logo" style={{ width: "80px", height: "80px", marginRight: "1px" }} />
            <Typography variant="h6" sx={{ fontSize: "2.25rem", fontWeight: "bold" }}>Booklyft</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" sx={{ marginLeft: 1 }}>Home</Button>
            <Link to="/recommendations" style={{ textDecoration: 'none' }}>
              <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>Recommendations</Button>
            </Link>
            <Link to="/wishlist" style={{ textDecoration: 'none' }}>
              <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>Wishlist</Button>
            </Link>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>Profile</Button>
            </Link>
            
          </Box>


          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{ marginLeft: 1, borderRadius: '20px', padding: '6px 20px' }}
              >
                Logout
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Content of Home1 */}
      <Container sx={{ marginTop: 12, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          From Fiction to Facts, We’ve Got Your Next Read!
        </Typography>

        {/* GIF Overlay */}
        <Box sx={{
          position: "relative",
          width: "100%",
          height: "300px",
          marginTop: 36,
          backgroundImage: "url('/openbook.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          
        </Box>

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h4" color="secondary" gutterBottom>
            Why Choose Booklyft?
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ maxWidth: 800, margin: "0 auto" }}>
            Booklyft is your personal book recommendation platform, where we help you find your next great read based on your preferences.
            Whether you are a fan of fiction, non-fiction, or any niche genre, Booklyft has it all. Our smart recommendation system will suggest books
            tailored just for you. Get ready to discover new books, authors, and genres!
          </Typography>
        </Box>

        <Box sx={{ marginTop: 6 }}>
          <Link to="/explore" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: "10px 40px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: "25px",
              }}
            >
              Explore More Books
            </Button>
          </Link>
        </Box>

        <Box sx={{ marginTop: 6, marginBottom: 4 }}>
          <Typography variant="h4" color="secondary" gutterBottom>
            What You can Expect !!
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: 3, backgroundColor: "#212121", borderRadius: "8px" }}>
                <Typography variant="h6" color="primary">"Amazing Recommendations!"</Typography>
                <Typography variant="body1" color="textSecondary">
                  Booklyft's recommendations are spot on! Discovered so many great books I would have never found on my own.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: 3, backgroundColor: "#212121", borderRadius: "8px" }}>
                <Typography variant="h6" color="primary">"A Book Lover's Dream!"</Typography>
                <Typography variant="body1" color="textSecondary">
                  Easy to use, and the suggestions are incredibly tailored. It's my go-to for finding new reads!
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Home1;
