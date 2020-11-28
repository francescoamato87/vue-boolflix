
// FrappiFlix

const app = new Vue({
  el: '#app',
  data:{
    query: '',
    results: [],
    availableFlags: ['it', 'en'],
    movies:[],
    tvSeries:[],
    actualGenre: ''
  },


  methods: {
    // Ricerca risultati
    search() {
      this.results = [];
      // films

      axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: '196299f19923153f2b76efa6985f5ad3',
          query: this.query,
          language: 'it-IT'
        }
      })
      .then(response => {
          // console.log(response.data.results);
          // consegna dati all'HTML

        // Mile 1
        // this.results = response.data.results;
        // Mile 2
        // this.results = this.results.concat(response.data.results);
        // console.log(this.results);
        this.movies = response.data.results;
        this.filterGenre();
      })
      .catch(error => {
        console.log(error);
      });

      // Tv Series

      axios.get('https://api.themoviedb.org/3/search/tv', {
        params: {
          api_key: '196299f19923153f2b76efa6985f5ad3',
          query: this.query,
          language: 'it-IT'
        }
      })
      .then(response => {
          // console.log(response.data.results);
          // consegna dati all'HTML
          // this.results = this.results.concat(response.data.results);
          // console.log(this.results);
          this.tvSeries = response.data.results;
          this.filterGenre();
      })
      .catch(error => {
        console.log(error);
      });

    },

    // Stelline Voto
      getVote(vote) {
        return Math.ceil(vote / 2); // <-- conversione da 1 a 10 / 1 a 5
      },

      isRightFlag(source) {
      // (includes per controllare se in un Array c è un dato valore )
      return this.availableFlags.includes(source);
      },

      getFlag(source) {
        return `./img/${source}.png`; // interpolazione
      },

      filterGenre(){
        // Se ho selezionato movies inserire in results l'array movies
        // Se ho selezionato tvSeries inserire in results l'array tvSeries
        // Se ho selezionato vuoto inserire in results il concat tra movies e tvSeries
        if (this.actualGenre === 'movies') {
          this.results = this.movies;
        } else if (this.actualGenre === 'tvSeries') {
          this.results = this.tvSeries;
        } else {
          this.results = this.movies.concat(this.tvSeries);
        }
      }

    }
});

// Jquery Section

$(document).ready(function() {

// Refs
var dropLinks = $('.with-dropdown > a' );
var dropMenu = $('.with-dropdown > .dropdown-menu');

// Show / Hide dropdown Menu
dropLinks.click( function() {

  var actualMenu = $(this).next('.dropdown-menu');

  dropMenu.not(actualMenu).hide();

  actualMenu.toggle(1000);


    });

}); // <-- end doc ready
