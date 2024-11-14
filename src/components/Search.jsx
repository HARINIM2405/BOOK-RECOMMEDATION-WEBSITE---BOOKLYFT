import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline, TextField, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './Explore.css';

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

const Search = () => {
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [books, setBooks] = useState([]); // State for storing books fetched from API

    // Handle search query change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to fetch books from Google Books API
    const fetchBooks = async () => {
        if (searchQuery) {
          const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=10&key=AIzaSyBD_YIDvfSOdydGpw0ytXBB7KZH_Ue7WCo`; // Updated URL to include the API key
          try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setBooks(data.items || []); // Set books state with fetched books
          } catch (error) {
            console.error("Error fetching books:", error);
          }
        }
      };
      

    // Fetch books whenever the search query changes
    useEffect(() => {
        fetchBooks();
    }, [searchQuery]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Header */}
            <AppBar position="fixed" color="primary" elevation={4} className="explore-header">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                            src="/blogo.png"
                            alt="Booklyft Logo"
                            style={{ width: "80px", height: "80px", marginRight: "1px" }}
                        />
                        <Typography variant="h6" sx={{ fontSize: "2.25rem", fontWeight: "bold" }}>
                            Booklyft
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Link to="/home1" style={{ textDecoration: 'none' }}>
                            <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>
                                Home
                            </Button>
                        </Link>
                        <Link to="/wishlist" style={{ textDecoration: 'none' }}>
                            <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>Wishlist</Button>
                        </Link>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>Profile</Button>
                        </Link>
                        <Button color="inherit" sx={{ marginLeft: 1 }}>
                            Contact
                        </Button>
                        <Link to="/recommendations" style={{ textDecoration: 'none' }}>
                            <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>
                                Recommendations
                            </Button>
                        </Link>
                        <Link to="/explore" style={{ textDecoration: 'none' }}>
                            <Button
                                color="inherit"
                                sx={{
                                    marginLeft: 1,
                                    color: 'Black',
                                    backgroundColor: '#a8d5ba', // Pale green background
                                    "&:hover": {
                                        backgroundColor: '#80cbc4', // Slightly darker green when hovered
                                    }
                                }}
                            >
                                Explore
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Search Bar */}
            <Box sx={{
                position: "fixed",
                top: 80, // Adjust to start below the header
                left: 0,
                right: 0,
                backgroundColor: "#121212",
                paddingBottom: "10px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: 3,
                paddingLeft: "20px",
                paddingRight: "20px",
                zIndex: 1000,
            }}>
                <TextField
                    label="Search Books"
                    variant="outlined"
                    fullWidth
                    value={searchQuery} // Bind the search input value
                    onChange={handleSearchChange} // Handle input change
                    sx={{
                        marginTop: 3,
                        "& .MuiOutlinedInput-root": {
                            borderColor: "#004d40",
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#80cbc4",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#80cbc4",
                            },
                        },
                        "& .MuiInputLabel-root": {
                            color: "#80cbc4",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#004d40",
                        },
                    }}
                />
            </Box>

            {/* Book Display Section */}
            <Box sx={{ paddingTop: "160px", paddingLeft: "20px", paddingRight: "20px" }}>
                <Grid container spacing={3}>
                    {books.length > 0 ? books.map((book) => (
                        <Grid item xs={12} sm={6} md={4} key={book.id}>
                            <Card sx={{ backgroundColor: "#121212", color: "#ffffff", maxWidth: 200 }}>
                                <CardMedia
                                    component="img"
                                    alt={book.volumeInfo.title}
                                    height="180"
                                    image={book.volumeInfo.imageLinks?.thumbnail || "/default-book-image.jpg"}
                                    sx={{ objectFit: "contain" }}
                                />
                                <CardContent sx={{ padding: "10px" }}>
                                    <Typography variant="h6" sx={{ fontSize: "0.9rem" }}>
                                        {book.volumeInfo.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                                        {book.volumeInfo.authors?.join(", ")}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )) : (
                        <Typography variant="h6" color="textSecondary">No books found.</Typography>
                    )}
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default Search;
