# MovieFlix

Movie streaming web app with React, TypeScript, Redux.

## Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/Gyananjay-Nayak/movieflix.git
cd movieflix
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the root directory:
```bash
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_AUTH0_DOMAIN=your-auth0-domain.region.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id
```

### Getting API Keys

1. TMDB API Key:
   - Create account at [TMDB](https://www.themoviedb.org/signup)
   - Go to Settings > API
   - Request an API key for developer use
   - Copy the API key (v3 auth)

2. Auth0 Setup:
   - Create account at [Auth0](https://auth0.com)
   - Create a new application (Single Page Web Application)
   - Set Allowed Callback URLs: `http://localhost:3000, https://movieflix-tmdb.netlify.app/`
   - Set Allowed Logout URLs: `http://localhost:3000, https://movieflix-tmdb.netlify.app/`
   - Set Allowed Web Origins: `http://localhost:3000, https://movieflix-tmdb.netlify.app/`
   - Copy Domain and Client ID

## Development

Start the development server:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Netlify

1. Push your code to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push
```

2. Deploy on Netlify:
   - Sign up/Login at [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Select your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click "Deploy site"

3. Configure environment variables:
   - Go to Site Settings > Build & Deploy > Environment
   - Add the same variables from your `.env` file:
     - `REACT_APP_TMDB_API_KEY`
     - `REACT_APP_AUTH0_DOMAIN`
     - `REACT_APP_AUTH0_CLIENT_ID`
   - Trigger a new deploy

4. Update Auth0 settings:
   - Add your Netlify domain to Auth0 allowed URLs
   - Format: `https://movieflix-tmdb.netlify.app/`

Your app will be live at `https://movieflix-tmdb.netlify.app/`

## Features

- Login (Email & Social)
- Browse movies by category
- Search movies & TV shows
- Movie details & cast
- Save favorites
- Mobile responsive

## Tech

React • TypeScript • Redux • SASS • Auth0 • TMDB API