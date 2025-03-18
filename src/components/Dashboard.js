import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
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
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log('Fetching videos from CSV...');
        setLoading(true);
        setError(null);
        
        const data = await parseCSV('/transcriptions.csv');
        console.log('CSV data loaded:', data.length, 'videos found');
        
        // Check if data is valid
        if (!data || data.length === 0) {
          throw new Error('No video data found in the CSV file');
        }
        
        // Validate data structure
        const firstItem = data[0];
        if (!firstItem['Video Name'] || !firstItem.Transcript) {
          setDebugInfo(firstItem);
          throw new Error('CSV structure is invalid. Expected "Video Name" and "Transcript" columns');
        }
        
        setVideos(data);
        setFilteredVideos(data);
        
        // Extract unique words for auto-suggest
        const words = extractUniqueWords(data);
        setUniqueWords(words);
        console.log('Extracted', words.length, 'unique words');
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to load video data:', err);
        setError(`Failed to load video data: ${err.message}`);
        setLoading(false);
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

  return (
    <Container fluid className="dashboard-container">
      <Row className="dashboard-header">
        <Col>
          <h1>Video Transcription</h1>
          <SearchBar onSearch={handleSearch} uniqueWords={uniqueWords} />
        </Col>
      </Row>
      
      {error && (
        <Row>
          <Col>
            <Alert variant="danger">
              <Alert.Heading>Error Loading Data</Alert.Heading>
              <p>{error}</p>
              {debugInfo && (
                <details>
                  <summary>Debug Info</summary>
                  <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                </details>
              )}
            </Alert>
          </Col>
        </Row>
      )}
      
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