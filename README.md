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
- AWS account with S3 bucket containing your videos
- AWS Amplify account connected to your GitHub repository

## Setup Instructions

### Local Development

1. Clone the repository:

```bash
git clone <your-repository-url>
cd video-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Update AWS configuration:
   Edit `src/aws-config.js` and update the following values:

- `region`: Your AWS region
- `bucket`: Your S3 bucket name where videos are stored
- `identityPoolId`: Your AWS Identity Pool ID

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

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
