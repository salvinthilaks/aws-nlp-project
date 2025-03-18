import React, { useState } from 'react';
import { ListGroup, Accordion } from 'react-bootstrap';
import './Sidebar.css';

const Sidebar = ({ videos, onSelectVideo, currentVideo }) => {
  const [activeKey, setActiveKey] = useState(null);

  // Group videos by module
  const groupByModule = (videos) => {
    const modules = {};
    
    videos.forEach(video => {
      // Extract module number from video name (e.g., "Mod01", "Mod02")
      const moduleName = video['Video Name'].match(/Mod(\d+)/i);
      
      if (moduleName) {
        const moduleNumber = moduleName[1];
        const moduleKey = `Module ${moduleNumber}`;
        
        if (!modules[moduleKey]) {
          modules[moduleKey] = [];
        }
        
        modules[moduleKey].push(video);
      } else {
        // For videos that don't match the module pattern
        if (!modules['Other']) {
          modules['Other'] = [];
        }
        modules['Other'].push(video);
      }
    });
    
    return modules;
  };
  
  const moduleGroups = groupByModule(videos);
  const sortedModuleKeys = Object.keys(moduleGroups).sort();

  // If there's a current video, find its module and set it as active
  React.useEffect(() => {
    if (currentVideo) {
      const moduleName = currentVideo['Video Name'].match(/Mod(\d+)/i);
      if (moduleName) {
        const moduleKey = `Module ${moduleName[1]}`;
        setActiveKey(moduleKey);
      }
    }
  }, [currentVideo]);
  
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Course Modules</h3>
      
      <Accordion activeKey={activeKey} onSelect={setActiveKey}>
        {sortedModuleKeys.map((moduleKey) => (
          <Accordion.Item key={moduleKey} eventKey={moduleKey} className="module-accordion-item">
            <Accordion.Header className="module-header">
              {moduleKey}
              <span className="video-count">{moduleGroups[moduleKey].length} videos</span>
            </Accordion.Header>
            <Accordion.Body className="module-body">
              <ListGroup variant="flush">
                {moduleGroups[moduleKey].map((video, index) => (
                  <ListGroup.Item 
                    key={`${moduleKey}-${index}`}
                    active={currentVideo && currentVideo['Video Name'] === video['Video Name']}
                    onClick={() => onSelectVideo(video)}
                    className="sidebar-item"
                  >
                    {video['Video Name']}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default Sidebar; 