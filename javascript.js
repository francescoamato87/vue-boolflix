
// FrappiFlix

const app = new Vue({
  el: '#app',
  data:{
    query: '',
    results: [],
    availableFlags: ['it', 'en']
  },

  methods: {
    // Ricerca risultati
    search() {

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
        this.results = this.results.concat(response.data.results);
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
          this.results = this.results.concat(response.data.results);

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


    }
});
