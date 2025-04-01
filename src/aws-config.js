// AWS Configuration
import { Amplify } from 'aws-amplify';

// Define region and identity pool ID
const region = 'us-east-1';
const identityPoolId = 'us-east-1:398e67d9-28dd-4b2d-989d-8f475d23da6e';
const bucketName = 'salvin-nlp-project';

console.log('Configuring Amplify with:', {
  region,
  identityPoolId,
  bucketName
});

// Configure Amplify with v6 format
Amplify.configure({
  // Auth Configuration - for unauthenticated access
  Auth: {
    Cognito: {
      identityPoolId: identityPoolId,
      region: region
    }
  },
  
  // Storage Configuration
  Storage: {
    S3: {
      bucket: bucketName,
      region: region
    }
  }
});

export default Amplify;