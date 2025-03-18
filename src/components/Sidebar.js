import React, { useState } from 'react';
import { ListGroup, Accordion } from 'react-bootstrap';
import './Sidebar.css';

const Sidebar = ({ videos, onSelectVideo, currentVideo }) => {
  const [activeKey, setActiveKey] = useState(null);

  // Group videos by module with improved pattern detection
  const groupByModule = (videos) => {
    const modules = {};
    
    if (!videos || videos.length === 0) {
      return { 'No Videos Found': [] };
    }
    
    videos.forEach(video => {
      if (!video['Video Name']) {
        return;
      }
      
      // Try different patterns for module extraction
      // Pattern 1: Mod01, Mod02, etc.
      let moduleMatch = video['Video Name'].match(/Mod(\d+)/i);
      
      // Pattern 2: Module 1, Module 2, etc.
      if (!moduleMatch) {
        moduleMatch = video['Video Name'].match(/Module\s*(\d+)/i);
      }
      
      // Pattern 3: M01, M02, etc.
      if (!moduleMatch) {
        moduleMatch = video['Video Name'].match(/^M(\d+)/i);
      }
      
      if (moduleMatch) {
        const moduleNumber = moduleMatch[1];
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
    
    // If no modules were found, add everything to "All Videos"
    if (Object.keys(modules).length === 0) {
      modules['All Videos'] = videos;
    }
    
    return modules;
  };
  
  const moduleGroups = groupByModule(videos);
  const sortedModuleKeys = Object.keys(moduleGroups).sort();

  // If there's a current video, find its module and set it as active
  React.useEffect(() => {
    if (currentVideo && currentVideo['Video Name']) {
      // Try different patterns for module extraction
      let moduleMatch = currentVideo['Video Name'].match(/Mod(\d+)/i);
      
      if (!moduleMatch) {
        moduleMatch = currentVideo['Video Name'].match(/Module\s*(\d+)/i);
      }
      
      if (!moduleMatch) {
        moduleMatch = currentVideo['Video Name'].match(/^M(\d+)/i);
      }
      
      if (moduleMatch) {
        const moduleKey = `Module ${moduleMatch[1]}`;
        setActiveKey(moduleKey);
      } else if (sortedModuleKeys.includes('Other')) {
        setActiveKey('Other');
      } else if (sortedModuleKeys.length > 0) {
        setActiveKey(sortedModuleKeys[0]);
      }
    }
  }, [currentVideo, sortedModuleKeys]);
  
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