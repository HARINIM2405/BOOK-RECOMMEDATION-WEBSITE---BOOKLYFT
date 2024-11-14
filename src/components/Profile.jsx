// Profile.js
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, TextField, Avatar, IconButton, Snackbar, Fab } from "@mui/material";
import { PhotoCamera, Brush } from "@mui/icons-material";  // Import Brush icon
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './Profile.css';

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

const Profile = () => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        bio: "",
        profilePicture: "",
        address: "",
        location: "",
    });
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);

    useEffect(() => {
        const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (storedUserDetails) {
            setUserDetails(storedUserDetails);
        }
    }, []);

    const handleUserDetailsChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value,
        });
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        setSaveSuccess(true);
    };

    const handleUploadDialogClose = () => {
        setOpenUploadDialog(false);
    };

    const handleProfilePictureUpload = () => {
        if (newProfilePicture) {
            setUserDetails({
                ...userDetails,
                profilePicture: newProfilePicture,
            });
            localStorage.setItem("userDetails", JSON.stringify({ ...userDetails, profilePicture: newProfilePicture }));
        }
        setOpenUploadDialog(false);
    };

    const generateAvatar = (name) => {
        if (!name) return "A";
        return name.charAt(0).toUpperCase();
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" color="primary" elevation={4} className="profile-header">
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
                        <Button color="inherit" sx={{ marginLeft: 1, color: 'white' }}>Profile</Button>
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
                                    backgroundColor: '#a8d5ba',
                                    "&:hover": {
                                        backgroundColor: '#80cbc4',
                                    }
                                }}
                            >
                                Explore
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Profile Content */}
            <Box sx={{ padding: "90px 20px 20px 20px", backgroundColor: "#121212", marginTop: 10 }}>
                <Box sx={{ position: "relative", display: "flex", alignItems: "center", marginBottom: 3 }}>
                    <Avatar
                        alt="User"
                        sx={{
                            width: 100,
                            height: 100,
                            backgroundColor: "#80cbc4",
                            fontSize: "2.5rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {userDetails.name ? generateAvatar(userDetails.name) : "A"}
                    </Avatar>
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="h3">{userDetails.name || "  User Name"}</Typography>
                        <Typography variant="h6">{userDetails.bio || "  Short bio or user description..."}</Typography>
                    </Box>

                    <IconButton onClick={() => setOpenUploadDialog(true)} sx={{ marginLeft: 2 }}>
                        <PhotoCamera sx={{ color: '#80cbc4' }} />
                    </IconButton>
                </Box>

                {/* Editable Profile Form */}
                <form onSubmit={handleProfileSubmit}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        name="name"
                        value={userDetails.name}
                        onChange={handleUserDetailsChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Bio"
                        variant="outlined"
                        fullWidth
                        name="bio"
                        value={userDetails.bio}
                        onChange={handleUserDetailsChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        name="address"
                        value={userDetails.address}
                        onChange={handleUserDetailsChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Location"
                        variant="outlined"
                        fullWidth
                        name="location"
                        value={userDetails.location}
                        onChange={handleUserDetailsChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <Button type="submit" variant="contained" sx={{ backgroundColor: "#004d40", color: "#fff" }}>
                        Save Profile
                    </Button>
                </form>
            </Box>

            {/* Snackbar for success message */}
            <Snackbar
                open={saveSuccess}
                autoHideDuration={4000}
                onClose={() => setSaveSuccess(false)}
                message="Profile saved successfully!"
            />

            {/* Floating Action Button (FAB) for Brush Icon */}
            <Fab
                color="secondary"
                aria-label="edit"
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    zIndex: 1100, // Ensures the FAB appears above other elements
                    "&:hover": {
                        backgroundColor: '#80cbc4',
                    }
                }}
                component={Link}
                to="/blackboard"
            >
                <Brush />
            </Fab>
        </ThemeProvider>
    );
};

export default Profile;
