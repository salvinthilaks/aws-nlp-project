import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, InputGroup, ListGroup } from 'react-bootstrap';
import { getSuggestions } from '../utils/csvParser';
import './SearchBar.css';

const SearchBar = ({ onSearch, uniqueWords }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const suggestionsRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const newSuggestions = getSuggestions(uniqueWords, searchTerm);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setActiveSuggestion(-1);
  }, [searchTerm, uniqueWords]);

  // Handle outside click to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    // Down arrow key
    if (e.keyCode === 40) {
      e.preventDefault();
      if (activeSuggestion < suggestions.length - 1) {
        setActiveSuggestion(activeSuggestion + 1);
      }
    }
    // Up arrow key
    else if (e.keyCode === 38) {
      e.preventDefault();
      if (activeSuggestion > 0) {
        setActiveSuggestion(activeSuggestion - 1);
      }
    }
    // Enter key
    else if (e.keyCode === 13 && activeSuggestion >= 0) {
      e.preventDefault();
      setSearchTerm(suggestions[activeSuggestion]);
      onSearch(suggestions[activeSuggestion]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-bar">
      <Form onSubmit={handleSubmit}>
        <div className="suggestion-container" ref={suggestionsRef}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search in transcripts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              autoComplete="off"
            />
            <Button variant="primary" type="submit">
              Search
            </Button>
          </InputGroup>
          
          {showSuggestions && (
            <ListGroup className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <ListGroup.Item
                  key={index}
                  active={index === activeSuggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  {suggestion}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      </Form>
    </div>
  );
};

export default SearchBar; 