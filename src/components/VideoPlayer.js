import React, { useState, useEffect } from "react";
import AwsS3Client from "../utils/AwsS3Client";
import "./VideoPlayer.css";

const VideoPlayer = ({ video }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    setVideoUrl(null);
    setError(null);
    setDebugInfo(null);
    
    if (video && video["Video Name"]) {
      setLoading(true);
      
      try {
        // Simple URL generation - using the function directly without SDK
        const videoKey = video["Video Name"];
        const url = AwsS3Client.getVideoUrl(videoKey);
        
        console.log("Video URL:", url);
        setVideoUrl(url);
        setLoading(false);
        
        setDebugInfo({
          videoName: video["Video Name"],
          url: url,
          timestamp: new Date().toISOString()
        });
      } catch (err) {
        console.error("Error generating video URL:", err);
        setError("Failed to generate video URL: " + err.message);
        setLoading(false);
        
        setDebugInfo({
          videoName: video["Video Name"],
          error: err.message,
          stack: err.stack,
          timestamp: new Date().toISOString()
        });
      }
    }
  }, [video]);

  if (!video) {
    return (
      <div className="video-player-placeholder">
        <div className="placeholder-text">
          <h3>Select a video from the sidebar</h3>
          <p>Video preview will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="video-player-container">
      <h2 className="video-title">{video["Video Name"]}</h2>
      <div className="video-container">
        {loading && (
          <div className="video-placeholder">
            <p>Loading video...</p>
          </div>
        )}
        
        {error && (
          <div className="video-placeholder video-error">
            <p>{error}</p>
            {debugInfo && (
              <details>
                <summary>Debug Info</summary>
                <pre className="debug-info">{JSON.stringify(debugInfo, null, 2)}</pre>
              </details>
            )}
          </div>
        )}
        
        {!loading && !error && (
          videoUrl ? (
            <video controls className="video-element" src={videoUrl}>
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="video-placeholder">
              <p>Video: {video["Video Name"]}</p>
              <p>Unable to load video from S3</p>
              <p>Please check your S3 bucket configuration</p>
            </div>
          )
        )}
      </div>
      <div className="transcript-container">
        <h4>Transcript</h4>
        <p className="transcript-text">{video.Transcript}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
