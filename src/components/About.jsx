import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Icons for social media
import './About.css'; // Optional CSS file if you have specific styling for the About page

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
            fontSize: "1.1rem",
            lineHeight: 1.6,
        },
    },
});

const About = () => {
    const teamMembers = [
        { name: "Harini M", role: "Developer" },
        { name: "Laksitha S", role: "Developer" },
        { name: "Maheswari M", role: "Developer" },
    ];

    const profileImageUrl = "https://icons.veryicon.com/png/o/miscellaneous/bitisland-world/person-18.png";

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Header */}
            <AppBar position="fixed" color="primary" elevation={4}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                            src="/blogo.png" // Replace with your logo source
                            alt="Booklyft Logo"
                            style={{ width: "80px", height: "80px", marginRight: "10px" }}
                        />
                        <Typography variant="h6" sx={{ fontSize: "2.25rem", fontWeight: "bold" }}>
                            Booklyft
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>
                                HOME
                            </Button>
                        </Link>
                        <Link to="/contact" style={{ textDecoration: 'none' }}>
                            <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>
                                CONTACT
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box sx={{ mt: 14, p: 3, textAlign: "center", backgroundColor: "#004d40" }}>
                <Typography variant="h3" sx={{ mb: 2,color:"white" }}>
                    About Booklyft
                </Typography>
                <Typography variant="body1" sx={{ color: "white", maxWidth: "600px", mx: "auto" }}>
                    Welcome to Booklyft! Our mission is to bring you the best book recommendations, tailored just for you. Discover, explore, and find your next great read with us.
                </Typography>
            </Box>

            {/* Team Section */}
            <Box sx={{ py: 5 }}>
                <Typography variant="h3" sx={{ textAlign: "center", mb: 3 }}>
                    Meet Our Team
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {teamMembers.map((member, idx) => (
                        <Grid item xs={12} sm={6} md={3} key={idx}>
                            <Box sx={{ textAlign: "center" }}>
                                <img
                                    src={profileImageUrl}
                                    alt={member.name}
                                    style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                                />
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        mt: 1, 
                                        fontWeight: 'bold', 
                                        color: 'WHITE' 
                                    }}
                                >
                                    {member.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {member.role}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Social Media Section */}
            <Box sx={{ mt: -5, p: 3, textAlign: "center", backgroundColor: "#121212" }}>
                <Typography variant="body1" sx={{ color: "#80cbc4", mb: 2 }}>
                    Connect with us on social media!
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
                    <FaFacebook color="#80cbc4" size={30} />
                    <FaTwitter color="#80cbc4" size={30} />
                    <FaInstagram color="#80cbc4" size={30} />
                </Box>
            </Box>

        </ThemeProvider>
    );
};

export default About;
