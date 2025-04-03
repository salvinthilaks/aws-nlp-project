import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import VideoPlayer from './VideoPlayer';
import SearchBar from './SearchBar';
import { parseCSV, searchTranscriptions, extractUniqueWords } from '../utils/csvParser';
import './Dashboard.css';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uniqueWords, setUniqueWords] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await parseCSV('/transcriptions.csv');
        setVideos(data);
        setFilteredVideos(data);
        
        // Extract unique words for auto-suggest
        const words = extractUniqueWords(data);
        setUniqueWords(words);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load video data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchVideos();
  }, []);

  const handleSearch = (searchTerm) => {
    const results = searchTranscriptions(videos, searchTerm);
    setFilteredVideos(results);
    
    // If we have search results and no video is currently selected, select the first result
    if (results.length > 0 && !selectedVideo) {
      setSelectedVideo(results[0]);
    } else if (results.length === 0) {
      setSelectedVideo(null);
    }
  };

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
  };

  if (loading) {
    return <div className="loading">Loading videos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <Container fluid className="dashboard-container">
      <Row className="dashboard-header">
        <Col>
          <h1>Video Transcription Dashboard</h1>
          <SearchBar onSearch={handleSearch} uniqueWords={uniqueWords} />
        </Col>
      </Row>
      
      <Row className="dashboard-content">
        <Col md={3} className="sidebar-col">
          <Sidebar 
            videos={filteredVideos} 
            onSelectVideo={handleSelectVideo} 
            currentVideo={selectedVideo}
          />
        </Col>
        <Col md={9} className="video-col">
          <VideoPlayer video={selectedVideo} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard; 