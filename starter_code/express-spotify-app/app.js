const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path')

var SpotifyWebApi = require('spotify-web-api-node');

// Remember to paste your credentials here
var clientId = '6263805dbb6641f285e542b5725d5784',
    clientSecret = '43c46d2dc5824c97849a1f31dbd5a3ff';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/layout');

app.get('/', (req, res, next) => {
    res.render('index')
    });

app.get('/artists', (req, resp) => {

spotifyApi.searchArtists(req.query.search)

    .then(data => {
     res.render('artist',{data})
     console.log(data);
    
    })
    .catch(err => {
    
        // ----> 'HERE WE CAPTURE THE ERROR'
    })

}); 

app.listen(3001, () => console.log('App listening on port 3000!'))
