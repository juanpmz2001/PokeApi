const { useState, useEffect } = React;

const typeColors = {
  bug: '#729f3f',
  dragon: '#53a4cf',
  fairy: '#fdb9e9',
  fire: '#fd7d24',
  ghost: '#7b62a3',
  ground: '#f7de3f',
  normal: '#a4acaf',
  pyschic: '#f366b9',
  steel: '#9eb7b',
  dark: '#707070',
  electric: '#eed535',
  fighting: '#d56723',
  flying: '#3dc7ef',
  grass: '#9bcc50',
  ice: '#51c4e7',
  poison: '#b97fc9',
  rock: '#a38c21',
  water: '#4592c4' };


// Services Function
const getAllPokemon = async url => {
  return new Promise((resolve, reject) => {
    fetch(url).
    then(res => res.json()).
    then(data => {
      resolve(data);
    });
  });
};

const getPokemon = async url => {
  return new Promise((resolve, reject) => {
    fetch(url).
    then(res => res.json()).
    then(data => {
      resolve(data);
    });
  });
};


// Components
function Card({ pokemon }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "Card" }, /*#__PURE__*/
    React.createElement("div", { className: "Card__img" }, /*#__PURE__*/
    React.createElement("img", { src: pokemon.sprites.front_default, alt: "" })), /*#__PURE__*/

    React.createElement("div", { className: "Card__name" },
    pokemon.name), /*#__PURE__*/

    React.createElement("div", { className: "Card__types" },

    pokemon.types.map(type => {
      return /*#__PURE__*/(
        React.createElement("div", { className: "Card__type", style: { backgroundColor: typeColors[type.type.name] } },
        type.type.name));


    })), /*#__PURE__*/


    React.createElement("div", { className: "Card__info" }, /*#__PURE__*/
    React.createElement("div", { className: "Card__data Card__data--weight" }, /*#__PURE__*/
    React.createElement("p", { className: "title" }, "Weight"), /*#__PURE__*/
    React.createElement("p", null, pokemon.weight)), /*#__PURE__*/

    React.createElement("div", { className: "Card__data Card__data--weight" }, /*#__PURE__*/
    React.createElement("p", { className: "title" }, "Height"), /*#__PURE__*/
    React.createElement("p", null, pokemon.height)), /*#__PURE__*/

    React.createElement("div", { className: "Card__data Card__data--ability" }, /*#__PURE__*/
    React.createElement("p", { className: "title" }, "Ability"), /*#__PURE__*/
    React.createElement("p", null, pokemon.abilities[0].ability.name)))));




}

const NavBar = () => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "NavBar" }, "Pokemon API"));



};

// Main Component
const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = `https://pokeapi.co/api/v2/pokemon/`;

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      let pokemon = await loadingPokemon(response.results);
      console.log(pokemon);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadingPokemon = async data => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord;
    }));
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);

  return /*#__PURE__*/(
    React.createElement("div", null,
    loading ? /*#__PURE__*/React.createElement("h1", null, "Loading...") : /*#__PURE__*/
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(NavBar, null), /*#__PURE__*/
    React.createElement("div", { className: "btn" }, /*#__PURE__*/
    React.createElement("button", { onClick: prev }, "Prev"), /*#__PURE__*/
    React.createElement("button", { onClick: next }, "Next")), /*#__PURE__*/

    React.createElement("div", { className: "grid-container" },
    pokemonData.map((pokemon, i) => {
      return /*#__PURE__*/React.createElement(Card, { key: i, pokemon: pokemon });
    })), /*#__PURE__*/

    React.createElement("div", { className: "btn" }, /*#__PURE__*/
    React.createElement("button", { onClick: prev }, "Prev"), /*#__PURE__*/
    React.createElement("button", { onClick: next }, "Next")))));





};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));