import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './Wishlist.css';

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
        h6: {
            fontWeight: 400,
            fontSize: "1rem",
            color: "#80cbc4",
        },
    },
});

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch book image using Google Books API based on book title
    const fetchBookImage = async (bookTitle) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(bookTitle)}&maxResults=1`);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                return data.items[0].volumeInfo.imageLinks?.thumbnail || '/default-image.jpg';
            }
            return '/default-image.jpg'; // Fallback if no image is found
        } catch (error) {
            console.error("Error fetching book image:", error);
            return '/default-image.jpg'; // Fallback in case of error
        }
    };

    // Fetch the wishlist from localStorage when the component mounts
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const fetchImagesForWishlist = async () => {
            setLoading(true);
            const updatedWishlist = await Promise.all(
                storedWishlist.map(async (book) => {
                    const imageUrl = await fetchBookImage(book.title);
                    return { ...book, imageUrl }; // Add imageUrl to the book object
                })
            );
            setWishlist(updatedWishlist);
            setLoading(false);
        };
        fetchImagesForWishlist();
    }, []);

    // Helper function to add a book to the wishlist without duplicates
    const addBookToWishlist = async (book) => {
        const isDuplicate = wishlist.some(item => item.title === book.title);
        if (isDuplicate) {
            alert("This book is already in your wishlist!");
            return;
        }

        try {
            // Get the token from localStorage or wherever you store it
            const token = localStorage.getItem('jwtToken');

            // Make the POST request to the backend API
            const response = await fetch('http://localhost:5000/api/add-to-wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
                },
                body: JSON.stringify({
                    title: book.title,
                    authors: book.authors, // Send only title and authors to the backend
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // If the book is successfully added to the backend, add it to local state
                const updatedWishlist = [...wishlist, { ...book, imageUrl: book.imageUrl }];
                setWishlist(updatedWishlist);
                localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Store it in localStorage as well
                alert("Book added to wishlist!");
            } else {
                alert(`Failed to add book: ${data.message}`);
            }
        } catch (error) {
            console.error("Error adding book to wishlist:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const handleRemoveBook = (bookTitle) => {
        const updatedWishlist = wishlist.filter(book => book.title !== bookTitle);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" color="primary" elevation={4} className="wishlist-header">
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
                            <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>Home</Button>
                        </Link>
                        <Button color="inherit" sx={{ marginLeft: 1 }}>Wishlist</Button>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>Profile</Button>
                        </Link>
                        <Button color="inherit" sx={{ marginLeft: 1 }}>Contact</Button>
                        <Link to="/recommendations" style={{ textDecoration: 'none' }}>
                            <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>Recommendations</Button>
                        </Link>
                        <Link to="/explore" style={{ textDecoration: 'none' }}>
                            <Button
                                color="inherit"
                                sx={{
                                    marginLeft: 1,
                                    color: 'black',
                                    backgroundColor: '#a8d5ba',
                                    "&:hover": { backgroundColor: '#80cbc4' }
                                }}
                            >
                                Explore
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{ padding: "80px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {loading ? (
                    <Typography variant="body1" sx={{ color: "#ffffff" }}>Loading your wishlist...</Typography>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {wishlist.length > 0 ? (
                            wishlist.map((book, index) => (
                                <Box key={index} sx={{ display: "flex", alignItems: "center", backgroundColor: "#1e1e1e", padding: 2, borderRadius: 1 }}>
                                    <img
                                        src={book.imageUrl ? book.imageUrl : "/default-image.jpg"}  // Fallback to default image
                                        alt={book.title}
                                        style={{ width: "100px", height: "140px", objectFit: "cover", marginRight: "16px" }}
                                    />
                                    <Typography variant="h6" sx={{ color: '#ffffff', flexGrow: 1 }}>
                                        {book.title}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleRemoveBook(book.title)}
                                        sx={{ marginLeft: 2 }}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body1" sx={{ color: "#ffffff" }}>
                                Your wishlist is empty. Start exploring and adding books!
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default Wishlist;
