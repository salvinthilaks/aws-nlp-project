import Papa from 'papaparse';

export const parseCSV = async (csvFilePath) => {
  try {
    const response = await fetch(csvFilePath);
    const csvText = await response.text();
    
    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          resolve(results.data);
        },
        skipEmptyLines: true
      });
    });
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
};

export const searchTranscriptions = (transcriptions, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return transcriptions;
  }
  
  const term = searchTerm.toLowerCase();
  
  return transcriptions.filter(item => {
    const transcript = item.Transcript ? item.Transcript.toLowerCase() : '';
    const videoName = item['Video Name'] ? item['Video Name'].toLowerCase() : '';
    
    return transcript.includes(term) || videoName.includes(term);
  });
};

// Extract all unique words from transcriptions for auto-suggest
export const extractUniqueWords = (transcriptions) => {
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
    'with', 'by', 'about', 'as', 'into', 'like', 'through', 'after', 'over', 
    'between', 'out', 'against', 'during', 'without', 'before', 'under', 
    'around', 'among', 'of', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall',
    'should', 'can', 'could', 'may', 'might', 'must', 'it', 'that', 'this', 'these',
    'those', 'i', 'you', 'he', 'she', 'we', 'they', 'who', 'which', 'what', 'whose'
  ]);
  
  const uniqueWords = new Set();
  
  transcriptions.forEach(item => {
    if (item.Transcript) {
      // Split by various separators and filter out short words and stop words
      const words = item.Transcript.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopWords.has(word));
      
      words.forEach(word => uniqueWords.add(word));
    }
  });
  
  return Array.from(uniqueWords).sort();
};

// Get suggestions based on user input
export const getSuggestions = (uniqueWords, input) => {
  if (!input || input.trim() === '') {
    return [];
  }
  
  const inputLower = input.toLowerCase();
  return uniqueWords
    .filter(word => word.toLowerCase().includes(inputLower))
    .slice(0, 10); // Limit to 10 suggestions
}; 