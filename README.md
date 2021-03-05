# Spotify Top Songs

Generate a Spotify playlist based on the top rated songs of your favorite artists.

Connect user Spotify accounts to this React App and create personalized playlists by calling the Spotify Web API.

![App demo](./demo.gif)

View the [demo](https://master.dj6fzfb5de88f.amplifyapp.com/)

#### Resources:
- [React](https://reactjs.org/)
- [Spotify Web Api JS Wrapper](https://github.com/JMPerez/spotify-web-api-js/blob/master/src/spotify-web-api.js)
- [React Router](https://reactrouter.com/)

### To-do:
- Reorder/Shuffle songs: [DOCS](https://developer.spotify.com/documentation/web-api/reference/#endpoint-reorder-or-replace-playlists-tracks)
- Get artist's related artists [DOCS](https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-an-artists-related-artists)
- (remove the current one if it already exists? then put this one here?)
- replace logo.svg
- replace favicon, logo192, logo512
- back button
- Readme instructions (npm install, npm start)
- Callback link in auth_server/public/index.html?
- add related artists bubble 
- button generate ui fix
- filter out /callback# if it is already in location in <LoginComponent />
- handle errors (error react fallback)
- auto redirect if you type in sneaky link
- new playlist on home page
- back button
- reset all lists? 
- remove call back on home page before trying to auth
- userplaylist, artist list of names
- get rid of console logs
- make sure playlist isn't null, becuase it won't get artists (at home playlist)
- clear callback from url if token exists (BUT DONT REFRESH THE WHOLE STATE OF "/")
- add info to landing page for NEW PLAYLIST
