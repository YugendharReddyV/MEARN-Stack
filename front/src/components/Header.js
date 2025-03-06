import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Icons
import "./Header.css";

const Header = ({ cartCount }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null); // Null initially
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if user is logged in (runs once when component mounts)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser) {
      setUserDetails(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userDetails"); // Remove stored user data
    setIsLoggedIn(false);
    setUserDetails(null);
    alert("Logged out successfully!");
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <h1>E-Shop</h1>
        </Link>
      </div>

      <form className="header__search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="header__actions">
        <ul>
          <li className="header__cart">
            <Link to="/cart">
              🛒 <span>{cartCount}</span>
            </Link>
          </li>
          <li className="header__profile">
            <div onClick={toggleDropdown} className="profile-icon">
              <FaUserCircle size={24} />
            </div>
            {showDropdown && (
              <div className="dropdown-menu">
                {isLoggedIn ? (
                  <>
                    <p className="dropdown-item">
                      <strong>{userDetails?.name}</strong>
                      <br />
                      {userDetails?.email}
                    </p>
                    <button className="dropdown-item logout-button" onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-item">
                      <FaSignInAlt /> Login
                    </Link>
                    <Link to="/register" className="dropdown-item">
                      <FaUserPlus /> Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;