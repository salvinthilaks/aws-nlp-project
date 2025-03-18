import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import VideoPlayer from './VideoPlayer';
import SearchBar from './SearchBar';
import { parseCSV, searchTranscriptions, extractUniqueWords } from '../utils/csvParser';
import S3Service from '../utils/S3Service';
import './Dashboard.css';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uniqueWords, setUniqueWords] = useState([]);
  const [loadingFromS3, setLoadingFromS3] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await parseCSV('/transcriptions.csv');
        
        if (!data || data.length === 0) {
          // If CSV is empty, try loading from S3 as fallback
          await loadVideosFromS3();
          return;
        }
        
        setVideos(data);
        setFilteredVideos(data);
        
        // Extract unique words for auto-suggest
        const words = extractUniqueWords(data);
        setUniqueWords(words);
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading CSV:', err);
        
        // Try loading from S3 as fallback
        await loadVideosFromS3();
      }
    };

    const loadVideosFromS3 = async () => {
      setLoadingFromS3(true);
      try {
        console.log('Trying to load videos from S3...');
        const s3Videos = await S3Service.listVideos();
        
        // Transform S3 items to match CSV format
        const formattedVideos = s3Videos.map(item => ({
          'Video Name': item.key,
          'Transcript': `Transcript not available for ${item.key}`
        }));
        
        if (formattedVideos.length > 0) {
          setVideos(formattedVideos);
          setFilteredVideos(formattedVideos);
          setLoading(false);
          setLoadingFromS3(false);
        } else {
          throw new Error('No videos found in S3');
        }
      } catch (s3Error) {
        console.error('Error loading videos from S3:', s3Error);
        setError('Failed to load video data. Please check the console for details.');
        setLoading(false);
        setLoadingFromS3(false);
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
    return (
      <div className="loading">
        {loadingFromS3 ? 'Loading videos from S3...' : 'Loading videos...'}
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <Container fluid className="dashboard-container">
      <Row className="dashboard-header">
        <Col>
          <h1>Video Transcription</h1>
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