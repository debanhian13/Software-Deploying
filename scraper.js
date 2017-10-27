let axios = require('axios');
let cheerio = require('cheerio');

let base_url = 'https://www.lyrics.com/artists/A/99999';

let _URL = {
    URL_BASE: 'https://www.lyrics.com/artists/',
    

    ArrayAlphabet() {
        let a = [];
        for (var index = 65; index <= 90; index++) {
            a.push(String.fromCharCode(index));   
        }
        return a
    },

    generateUrlByAlphabet() {
        let _arr = []
        this.ArrayAlphabet().map(alphabet => {
            _arr.push({
                alphabet: alphabet,
                url: this.URL_BASE + `${alphabet}/99999`
            })
        })
        return _arr
    }
}

let Scrapp = {
    BASE_URL: 'https://horarios.fime.me',

    init(){

        let element = {
            alphabet: 'A', 
            url: 'https://www.lyrics.com/artists/A/99999'
        }

        let _arr_URL = _URL.generateUrlByAlphabet()
        let _arr = []
        
        }}

axios.get(base_url).then( (response) => {
  let $ = cheerio.load(response.data);
  let kurs = [];
  $('div.tdata-ext tbody tr td strong').each( (i, elm) => {
    kurs.push( {
      artists: {
        name: $(elm).children().eq(0).first().text()
      },
    });
  });
  return(kurs);
})
.then ( (kurs) => {
  console.log(kurs);
});

