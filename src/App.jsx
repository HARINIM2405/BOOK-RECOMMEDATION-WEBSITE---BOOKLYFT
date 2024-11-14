import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import necessary routing components
import Home from './components/Home';  // Import your Home component
import Recommendations from './components/Recommendations';  
import Login from './components/Login'; // Import Recommendations page
import Register from './components/Register';
import Home1 from './components/Home1';
import Explore from './components/Explore';
import Search from './components/Search';
import Wishlist from './components/Wishlist';
import Profile from './components/Profile';
import About from './components/About';
import Contact from './components/Contact';
import Blackboard from "./components/Blackboard";
import GlobalFAB from './components/GlobalFAB'; // Adjust the path if needed

// This component will handle the FAB visibility logic
const AppWithFAB = () => {
  const location = useLocation(); // Get current route
  
  // Do not show FAB on the home page ('/'), register ('/register'), and login ('/login')
  const showFAB = !['/', '/register', '/login'].includes(location.pathname);

  return (
    <>
      {showFAB && <GlobalFAB />} {/* Conditionally render FAB based on route */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Set the home route to Home component */}
        <Route path="/recommendations" element={<Recommendations />} /> {/* Define the route for Recommendations */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home1" element={<Home1/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/search" element={<Search/>}/>    
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/profile" element={<Profile/>}/>    
        <Route path="/about" element={<About/>}/>  
        <Route path="/contact" element={<Contact/>}/>  
        <Route path="/blackboard" element={<Blackboard />} /> 
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <Router>  {/* Wrap everything in Router for routing functionality */}
      <AppWithFAB /> {/* Use the new AppWithFAB component that handles FAB visibility */}
    </Router>
  );
}
