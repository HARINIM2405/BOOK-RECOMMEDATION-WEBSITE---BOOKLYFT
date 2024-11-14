import React, { useState, useEffect } from "react"; 
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline, MenuItem, Select, InputLabel, FormControl, Modal, Backdrop, Fade } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
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

const Explore = () => {
  const navigate = useNavigate();
  const [latestReleaseBooks, setLatestReleaseBooks] = useState([]);
  const [trillerBooks, setTrillerBooks] = useState([]);
  const [horrorBooks, setHorrorBooks] = useState([]);
  const [fantasyBooks, setFantasyBooks] = useState([]);
  const [scholasticBooks, setScholasticBooks] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [open, setOpen] = useState(false);
  const [recommendedBooks, setRecommendedBooks] = useState([]);  // New state for recommendations

  const fetchBooks = async (query, setState) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&key=AIzaSyBD_YIDvfSOdydGpw0ytXBB7KZH_Ue7WCo`);
      const booksWithVotes = response.data.items.map(book => ({ ...book, votes: 0, liked: false }));
      setState(booksWithVotes);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  

  useEffect(() => {
    fetchBooks('subject:fiction&orderBy=relevance', setLatestReleaseBooks);
    fetchBooks('subject:thriller', setTrillerBooks);
    fetchBooks('subject:horror', setHorrorBooks);
    fetchBooks('subject:fantasy', setFantasyBooks);
    fetchBooks('publisher:Scholastic', setScholasticBooks);
  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };
  const handleWishlistClick = async (book) => {
    // Store book in localStorage or state
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push(book);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    
    // Send book details to the backend
    try {
      const response = await axios.post('http://localhost:5000/api/add-to-wishlist', {
        title: book.title,
        authors: book.authors?.join(", "), // If multiple authors, join them as a string
      });
  
    } catch (error) {
      console.error("Error adding book to wishlist:", error);
      alert("An error occurred while adding the book to wishlist.");
    }
    recommendBooksBasedOnWishlist(wishlist);
  };
  

  const recommendBooksBasedOnWishlist = (wishlist) => {
    // Get the last added book
    const lastBook = wishlist[wishlist.length - 1];
    const author = lastBook.authors?.[0] || "";
    const genre = lastBook.volumeInfo?.categories?.[0] || "";

    // Fetch books by the same author and genre
    const authorQuery = author ? `inauthor:${author}` : '';
    const genreQuery = genre ? `subject:${genre}` : '';
    const query = `${authorQuery} ${genreQuery}`.trim();

    if (query) {
      fetchBooks(query, setRecommendedBooks);
    }
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const renderBookSection = (title, books) => (
    <div className="explore-book-section">
      <h3>{title}</h3>
      <div className="explore-book-list">
        {books.map((book) => {
          const { imageLinks, title, id, description, authors } = book.volumeInfo;
          return (
            <div
              className="explore-book-item"
              key={id}
              onClick={() => handleBookClick({ id, title, image: imageLinks?.thumbnail, description, authors })}
              style={{ cursor: "pointer" }}
            >
              {imageLinks?.thumbnail && (
                <img src={imageLinks.thumbnail} alt={title} className="explore-book-cover" />
              )}
              <Typography variant="body1">{title}</Typography>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" color="primary" elevation={4} className="explore-header">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "0 16px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src="/blogo.png" alt="Booklyft Logo" style={{ width: "80px", height: "80px", marginRight: "1px" }} />
            <Typography variant="h6" sx={{ fontSize: "2.25rem", fontWeight: "bold" }}>Booklyft</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link to="/home1" style={{ textDecoration: 'none' }}>
              <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>Home</Button>
            </Link>
            <Link to="/recommendations" style={{ textDecoration: 'none' }}>
              <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>Recommendations</Button>
            </Link>
            <Button color="inherit" sx={{ marginLeft: 1 }} onClick={() => navigate("/wishlist")}>Wishlist</Button>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>Profile</Button>
            </Link>
            
          </Box>

          <Box sx={{ cursor: "pointer", backgroundColor: "#80cbc4", padding: "8px", borderRadius: "50%" }} onClick={handleSearchClick}>
            <SearchIcon sx={{ color: "white" }} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: "120px", padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select labelId="category-select-label" value={category} onChange={handleCategoryChange} label="Category">
            <MenuItem value=""><em>All</em></MenuItem>
            <MenuItem value="Fiction">Fiction</MenuItem>
            <MenuItem value="Thriller">Thriller</MenuItem>
            <MenuItem value="Horror">Horror</MenuItem>
            <MenuItem value="Fantasy">Fantasy</MenuItem>
            <MenuItem value="Scholastic">Scholastic</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div className="explore-panel" style={{ marginTop: '1400px' }}>
        <div className="explore-books-container">
          {renderBookSection("Latest Release", latestReleaseBooks)}
          {renderBookSection("Thriller", trillerBooks)}
          {renderBookSection("Horror", horrorBooks)}
          {renderBookSection("Fantasy", fantasyBooks)}
          {renderBookSection("Scholastic", scholasticBooks)}
        </div>
        {recommendedBooks.length > 0 && (
          <div className="explore-book-section">
            <h3>Recommended Books</h3>
            <div className="explore-book-list">
              {recommendedBooks.map((book) => {
                const { imageLinks, title, id, description, authors } = book.volumeInfo;
                return (
                  <div
                    className="explore-book-item"
                    key={id}
                    onClick={() => handleBookClick({ id, title, image: imageLinks?.thumbnail, description, authors })}
                    style={{ cursor: "pointer" }}
                  >
                    {imageLinks?.thumbnail && (
                      <img src={imageLinks.thumbnail} alt={title} className="explore-book-cover" />
                    )}
                    <Typography variant="body1">{title}</Typography>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Modal open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
  <Fade in={open}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'black',
        p: 4,
        borderRadius: 1,
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      {selectedBook && (
        <>
          <Typography variant="h5" sx={{ color: '#2c746d' }}>
            {selectedBook.title}
          </Typography>
          {selectedBook.image && (
            <img src={selectedBook.image} alt={selectedBook.title} style={{ maxWidth: '100%', margin: '16px 0' }} />
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
            <Typography variant="body1" sx={{ color: '#80cbc4' }}>
              {selectedBook.liked ? "WaaW" : "Like"}
            </Typography>
            <span
              style={{ cursor: 'pointer', fontSize: '24px' }}
              onClick={() => {
                const updatedBook = { ...selectedBook, liked: !selectedBook.liked };
                setSelectedBook(updatedBook);
              }}
            >
              {selectedBook.liked ? "❤️" : "🤍"}
            </span>
          </Box>
          <Typography variant="body2" sx={{ color: '#ffffff' }}>
            {selectedBook.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleWishlistClick(selectedBook);
                alert("Book added to wishlist!");
              }}
            >
              Add to Wishlist
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                // Construct Amazon search URL using the book title
                const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(selectedBook.title)}`;
                window.open(amazonSearchUrl, "_blank"); // Open in a new tab
              }}
            >
              Buy Now
            </Button>
          </Box>
        </>
      )}
    </Box>
  </Fade>
</Modal>
    </ThemeProvider>
  );
};

export default Explore;
