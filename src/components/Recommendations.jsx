import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  CssBaseline,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';  // Import axios for HTTP requests
import './Recommendations.css';

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

const questions = [
  {
    question: "Do you have a favorite author?",
    options: [
      'J.K. Rowling', 
      'Stephen King', 
      'Agatha Christie', 
      'George Orwell', 
      'Jane Austen', 
      'Haruki Murakami', 
      'Mark Twain', 
      'Neil Gaiman'
    ],
  },
  {
    question: "What genre of books are you interested in?",
    options: [ 
      'Mystery & Thriller', 
      'Science Fiction', 
      'Fantasy', 
      'Romance', 
      'Historical Fiction', 
      'Biography', 
      'Self-Help', 
      'Cookbooks & Food'
    ],
  },
  {
    question: "Do you prefer fiction or non-fiction books?",
    options: ['Fiction', 'Non-fiction'],
  },
  {
    question: "What type of character development do you prefer?",
    options: ['Strong character arcs with growth', 'Focus on relationships and emotions', 'Characters who are morally ambiguous', 'No preference'],
  },
];

const RecommendationPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});  // Initialize answers state
  const [start, setStart] = useState(false);
  const [bookResults, setBookResults] = useState([]);
  const [isRecommendationsFetched, setIsRecommendationsFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDone, setIsDone] = useState(false); // New flag to track if all questions are answered

  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestion]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      fetchBooks(); // Fetch books after the final question is answered
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleStart = () => {
    setStart(true);
  };

  // Function to fetch books based on author and genre
  const fetchBooks = async () => {
    const author = answers[0]; // Author preference
    const genre = answers[1]; // Genre preference
    const fictionOrNonFiction = answers[2]; // Fiction/Non-fiction preference

    let authorBooks = [];
    let genreBooks = [];

    // Construct queries for author and genre
    try {
      setLoading(true); // Set loading state
      setError(''); // Reset error state

      // Fetch books by author
      if (author && author !== 'Others') {
        const authorResponse = await axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: {
            q: `inauthor:${author}`,
            key: 'AIzaSyBD_YIDvfSOdydGpw0ytXBB7KZH_Ue7WCo', // API key
          },
        });
        authorBooks = authorResponse.data.items.slice(0, 2); // Take 2 books from author
      }

      // Fetch books by genre
      if (genre && genre !== 'Others') {
        const genreResponse = await axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: {
            q: `subject:${genre}`,
            key: 'AIzaSyBD_YIDvfSOdydGpw0ytXBB7KZH_Ue7WCo', // API key
          },
        });
        genreBooks = genreResponse.data.items.slice(0, 2); // Take 2 books from genre
      }

      // Combine author and genre books
      const combinedBooks = [...authorBooks, ...genreBooks];
      setBookResults(combinedBooks);
      setIsRecommendationsFetched(true);
      setLoading(false);
      setIsDone(true); // Mark that the process is done
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('There was an error fetching the book recommendations.');
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" color="primary" elevation={4}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/blogo.png"
              alt="Booklyft Logo"
              style={{ width: '80px', height: '80px', marginRight: '1px' }}
            />
            <Typography variant="h6" sx={{ fontSize: '2.25rem', fontWeight: 'bold' }}>
              Booklyft
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link to="/home1" style={{ textDecoration: 'none' }}>
              <Button color="inherit" sx={{ color: 'white' }}>Home</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <div className="background-image" style={{ paddingTop: '64px' }}>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Box sx={{
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '800px',
            zIndex: 1,
          }}>
            <Typography variant="h4" sx={{ color: '#20B2AA', marginBottom: '20px' }}>
              Find Your Next Favorite Book!
            </Typography>

            {!start ? (
              <Button variant="contained" color="primary" onClick={handleStart} sx={{ backgroundColor: '#20B2AA', color: 'white' }}>
                Start
              </Button>
            ) : (
              <>
                <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                  {questions[currentQuestion].question}
                </Typography>

                <RadioGroup
                  value={answers[currentQuestion] || ''}  // Ensure value is never undefined
                  onChange={handleAnswerChange}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                      sx={{ color: '#ffffff' }}
                    />
                  ))}
                </RadioGroup>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handlePrevious}
                    sx={{ marginRight: '10px' }}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{ backgroundColor: '#20B2AA' }}
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </>
            )}

            {/* Display Books after all questions are answered */}
            {isDone && (
              <Box sx={{ marginTop: '30px', overflowX: 'auto', display: 'flex', gap: '20px' }}>
                {bookResults.map((book, index) => (
                  <Box
                    key={index}
                    sx={{
                      minWidth: '200px', // Set a minimum width for each book card
                      maxWidth: '250px', // Limit the width
                      textAlign: 'center',
                      backgroundColor: '#222',
                      padding: '10px',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#80cbc4' }}>
                      {book.volumeInfo.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#ffffff' }}>
                      {book.volumeInfo.authors?.join(', ')}
                    </Typography>
                    <img
                      src={book.volumeInfo.imageLinks?.thumbnail}
                      alt={book.volumeInfo.title}
                      style={{ width: '100%', borderRadius: '8px' }}
                    />
                  </Box>
                ))}
              </Box>
            )}

            {/* Loading or Error message */}
            {loading && <Typography variant="body1" sx={{ color: '#ffffff' }}>Loading...</Typography>}
            {error && <Typography variant="body1" sx={{ color: '#f44336' }}>{error}</Typography>}
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default RecommendationPage;
