let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');
var ABC = [];

for (var index = 65; index <= 90; index++) {
  ABC.push(String.fromCharCode(index));
}



for (var i = 0; i < 26; i++) {
  var name;
  var json = { artists: { name: "" } };
  var base_url = 'https://www.lyrics.com/artists/' + ABC[i] + '/99999';
  axios.get(base_url).then((response) => {
    var $ = cheerio.load(response.data);

    $('.tdata tbody tr td strong').each((i, elm) => {
      name = $(elm).children().eq(0).text();
      json.name = name;
      console.log(json);
    });
  })
  fs.writeFile(ABC[i] + '.json', JSON.stringify(json, null, 4), function (err) {
    console.log('Archivo creado');
  })
}




