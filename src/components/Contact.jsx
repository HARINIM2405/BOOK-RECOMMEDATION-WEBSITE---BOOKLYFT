import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import './Contact.css';

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

const Contact = () => {
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
                        <Link to="/about" style={{ textDecoration: 'none' }}>
                            <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>
                                ABOUT
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box sx={{ mt: 14, p: 4, textAlign: "center", backgroundColor: "#004d40", color: "white" }}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                    Contact Us
                </Typography>
                <Typography variant="body1" sx={{ maxWidth: "600px", mx: "auto" }}>
                    We would love to hear from you! Feel free to reach out using the form below, or connect with us on social media.
                </Typography>
            </Box>

            {/* Contact Information Section */}
            <Container sx={{ py: 5 }}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} md={5}>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Contact Information
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Email:</strong> contact@booklyft.com
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Phone:</strong> +123-456-7890
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Address:</strong> 123 Book St, Library City, BK 56789
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            {/* Social Media Section */}
            <Box sx={{ p: 3, textAlign: "center", backgroundColor: "#121212" }}>
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

export default Contact;
