
let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');
const ABC = [];
const BASE_URL = 'https://www.lyrics.com/';

for (var index = 65; index <= 90; index++) {
  ABC.push(String.fromCharCode(index));
}

function getArtistas (ABC) {
  for (var i = 0; i < ABC.length; i++) {
    const alphabet = ABC[i]
    var base_url = 'https://www.lyrics.com/artists/' + ABC[i] + '/99999';
    const alpha = axios.get(base_url).then((response) => {
      const objPorLetra = {
        letra: alphabet,
        artistas: []
      };
  
      var $ = cheerio.load(response.data);
      $('.tdata tbody tr td strong').each((i, elm) => {
        const name = $(elm).children().eq(0).text();
        const url = $(elm).find('a').attr('href');
        const objArtista = {
          name: name,
          urlToExtractAlbum: BASE_URL + url
        }
        objPorLetra.artistas.push(objArtista);
        });
      fs.writeFile('statics/' + alphabet + '.json', JSON.stringify(objPorLetra, null, 4), function (err) {
       console.log('Archivo: ' + alphabet + '.json creado, contiene: ' + objPorLetra.artistas.length);
      })

    })
  }
}

function getAlbumsByArtist(objArtista) {
    for(var i=0; i< objArtista.urlToExtractAlbum.length; i++){
      const alpha = axios.get(objArtista.urlToExtractAlbum).then((response) => {
      const objPorArtista = {
        artista: objArtista.name,
        albums: []
      };

      var $ = cheerio.load(response.data);
      $('.tdata-ext .clearfix .artist-album-label').each((i, elm) => {
        const name = $(elm).children().eq(0).text();
        const url = $(elm).find('a').attr('href');
        const objAlbum = {
          name: name,
          urlToExtractSongs: BASE_URL + url
        }
        objPorArtista.albums.push(objAlbum)
      });

      console.log(objPorArtista);

    })
  }
}

function getSongsByAlbums(objAlbum) {
    for(var i=0; i< objAlbum.urlToExtractAlbum.length; i++){
      const alpha = axios.get(objAlbum.urlToExtractSongs).then((response) => {
      const objPorAlbum = {
        album: objAlbum.name,
        songs: []
      };

      var $ = cheerio.load(response.data);
      $('.tdata tbody tr td strong').each((i, elm) => {
        const name = $(elm).children().eq(0).text();
        const url = $(elm).find('a').attr('href');
        const objSong = {
          name: name,
          urlOfLyric: BASE_URL + url
        }
        objPorAlbum.songs.push(objSong)
      });

      console.log(objPorAlbum);

    })
  }
}

getArtistas(ABC);
getAlbumsByArtist(objArtista);
getSongsByAlbums(objAlbum);
