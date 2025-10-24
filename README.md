# MovieFlix

Movie streaming web app with React, TypeScript, Redux.

## Start Locally

```bash
npm install
npm start
```

Create `.env`:
```
REACT_APP_TMDB_API_KEY=your_key
REACT_APP_AUTH0_DOMAIN=your_domain
REACT_APP_AUTH0_CLIENT_ID=your_client_id
```

Get keys from:
- TMDB: [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
- Auth0: [auth0.com](https://auth0.com)

## Deploy on Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repo
5. Build settings:
   - Command: `npm run build`
   - Publish: `build`
6. Add environment variables in Site Settings
7. Deploy!

App will be live at: `https://your-app-name.netlify.app`

## Features

- Login (Email & Social)
- Browse movies by category
- Search movies & TV shows
- Movie details & cast
- Save favorites
- Mobile responsive

## Tech

React • TypeScript • Redux • SASS • Auth0 • TMDB API