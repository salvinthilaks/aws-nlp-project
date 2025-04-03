# Video Transcription Dashboard

A React-based dashboard for browsing and searching through video transcriptions from an S3 bucket.

## Features

- Search through video transcriptions
- Video player with preview functionality
- Sidebar with all videos for easy access
- AWS S3 integration for video storage
- Responsive design

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- AWS account with S3 bucket containing the videos
- AWS Amplify account connected to your GitHub repository

## Setup Instructions

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/salvinthilaks/aws-nlp-project
or navigate to project file /video-dashboard

cd video-dashboard
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

```bash
npm install
```

3. Download NLTK data:

```python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
```

4. Start the development server:

```bash
npm start
```

The app should now be running at http://localhost:3000.

### Deploying to AWS Amplify

1. Push your code to GitHub:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Set up AWS Amplify:

   - Log in to AWS Management Console
   - Navigate to AWS Amplify
   - Click "Connect app" or "New app" > "Host web app"
   - Select GitHub as your repository provider
   - Authenticate with GitHub and select your repository
   - Configure build settings (use the default settings)
   - Review and click "Save and deploy"

3. Configure environment variables in Amplify:

   - In your Amplify app console, go to "Environment variables"
   - Add the necessary environment variables for S3 access:
     - `REACT_APP_AWS_REGION`: Your AWS region
     - `REACT_APP_S3_BUCKET`: Your S3 bucket name

4. Set up CORS for your S3 bucket:
   - Go to your S3 bucket in the AWS Console
   - Click on "Permissions" tab
   - Scroll down to "Cross-origin resource sharing (CORS)"
   - Click "Edit" and add the following configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

## Customization

- To modify the appearance, edit the CSS files in the `src/components` directory.
- To change the video player behavior, modify `src/components/VideoPlayer.js`.
- To adjust search functionality, update `src/utils/csvParser.js`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
