# Spotify Top Songs

Generate a Spotify playlist based on the top rated songs of your favorite artists.

Connect user Spotify accounts to this React App and create personalized playlists by calling the Spotify Web API.

![App demo](./demo.gif)

View the [demo](https://master.dj6fzfb5de88f.amplifyapp.com/)

#### Resources:
[Spotify Web Api JS Wrapper](https://github.com/JMPerez/spotify-web-api-js/blob/master/src/spotify-web-api.js)

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