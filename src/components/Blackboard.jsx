import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Snackbar,
  Rating,
} from "@mui/material";
import { ArrowBack, Edit, Close } from "@mui/icons-material"; // Removed unnecessary imports
import { Link } from "react-router-dom";
import { random } from "lodash";

const colors = ["#FFB74D", "#81C784", "#4DB6AC", "#7986CB", "#FF8A80", "#FFD54F"];

const getRandomColor = () => colors[random(0, colors.length - 1)];

const Blackboard = () => {
  const [stickyNotes, setStickyNotes] = useState([]);
  const [noteContent, setNoteContent] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Load sticky notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("stickyNotes"));
    if (savedNotes) {
      setStickyNotes(savedNotes);
    }
  }, []);

  // Save sticky notes to localStorage whenever the stickyNotes state changes
  useEffect(() => {
    if (stickyNotes.length > 0) {
      localStorage.setItem("stickyNotes", JSON.stringify(stickyNotes));
    }
  }, [stickyNotes]);

  const handleAddStickyNote = () => {
    if (noteContent.trim() === "") return;
    const newNote = {
      id: Date.now(),
      content: noteContent,
      pinned: false,
      color: getRandomColor(),
      editable: false,
      rating: 0,
    };
    setStickyNotes([...stickyNotes, newNote]);
    setNoteContent("");
    setSnackbarMessage("Sticky note added!");
    setOpenSnackbar(true);
  };

  const handleDeleteNote = (id) => {
    setStickyNotes(stickyNotes.filter((note) => note.id !== id));
    setSnackbarMessage("Sticky note removed!");
    setOpenSnackbar(true);
  };

  const handleEditNote = (id, newContent) => {
    setStickyNotes(
      stickyNotes.map((note) =>
        note.id === id ? { ...note, content: newContent, editable: false } : note
      )
    );
  };

  const handlePinNote = (id) => {
    setStickyNotes(
      stickyNotes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
    setSnackbarMessage("Sticky note pinned!");
    setOpenSnackbar(true);
  };

  const handleEditToggle = (id) => {
    setStickyNotes(
      stickyNotes.map((note) =>
        note.id === id ? { ...note, editable: !note.editable } : note
      )
    );
  };

  const handleRatingChange = (id, newRating) => {
    setStickyNotes(
      stickyNotes.map((note) =>
        note.id === id ? { ...note, rating: newRating } : note
      )
    );
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#282c34",
        height: "100vh",
        overflow: "auto",
        padding: 3,
        position: "relative",
      }}
    >
      <Link to="/home1">
        <IconButton sx={{ color: "#ffffff", marginBottom: 2 }}>
          <ArrowBack />
        </IconButton>
      </Link>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <TextField
          label="Add a fun Sticky Note"
          variant="outlined"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          fullWidth
          sx={{
            marginRight: 2,
            backgroundColor: "#3c3f41",
            borderRadius: 2,
            "& .MuiInputBase-root": {
              color: "#ffffff",
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleAddStickyNote}
          sx={{
            backgroundColor: "#ff5722",
            "&:hover": {
              backgroundColor: "#e64a19",
            },
          }}
        >
          Add
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "flex-start",
        }}
      >
        {stickyNotes.map((note) => (
          <Box
            key={note.id}
            sx={{
              backgroundColor: note.color,
              padding: 2,
              width: "200px",
              minHeight: "150px",
              borderRadius: 2,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              position: "relative",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                cursor: "pointer",
              },
            }}
          >
            {note.editable ? (
              <TextField
                variant="outlined"
                fullWidth
                value={note.content}
                onChange={(e) =>
                  setStickyNotes(
                    stickyNotes.map((n) =>
                      n.id === note.id ? { ...n, content: e.target.value } : n
                    )
                  )
                }
                onBlur={() => handleEditNote(note.id, note.content)}
                multiline
                rows={4}
                sx={{
                  backgroundColor: "transparent",
                  border: "none",
                  "& .MuiInputBase-root": {
                    color: "#000",
                    fontFamily: "Comic Sans MS, cursive",
                    fontWeight: "bold",
                  },
                }}
              />
            ) : (
              <TextField
                variant="outlined"
                fullWidth
                value={note.content}
                disabled
                multiline
                rows={4}
                sx={{
                  backgroundColor: "transparent",
                  border: "none",
                  "& .MuiInputBase-root": {
                    color: "#000",
                    fontFamily: "Comic Sans MS, cursive",
                    fontWeight: "bold",
                  },
                }}
              />
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 1,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePinNote(note.id)}
                sx={{
                  backgroundColor: note.pinned ? "#ff7043" : "#4caf50",
                  "&:hover": {
                    backgroundColor: note.pinned ? "#e64a19" : "#388e3c",
                  },
                  borderRadius: "50%",
                  minWidth: "36px",
                  height: "36px",
                }}
              >
                {note.pinned ? "📌" : "🔗"}
              </Button>
              <IconButton onClick={() => handleEditToggle(note.id)}>
                <Edit sx={{ color: "#000" }} />
              </IconButton>
              <IconButton onClick={() => handleDeleteNote(note.id)}>
                <Close sx={{ color: "#000" }} />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Rating
                value={note.rating}
                onChange={(e, newRating) => handleRatingChange(note.id, newRating)}
                sx={{ color: "#ffd700" }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#1f1f1f",
            color: "#ffffff",
          },
        }}
      />
    </Box>
  );
};

export default Blackboard;
