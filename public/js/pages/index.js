import pokemonData from 'Json/all_pokemon_data.json'; // Import JSON file
let pokemon01 = document.getElementById('pokemon-01');
let pokemon02 = document.getElementById('pokemon-02');
let pokemon03 = document.getElementById('pokemon-03');

console.log(pokemonData[24].variations)

let pokemonSprite01 = pokemonData[24].variations["pikachu-belle"]
let pokemonSprite02 = pokemonData[24].variations["pikachu-world-cap"]
let pokemonSprite03 = pokemonData[24].variations["pikachu-rock-star"]

document.addEventListener('DOMContentLoaded', () => {
    pokemon01.src = pokemonSprite01["sprites"]["showdown-default"]
    pokemon02.src = pokemonSprite02["sprites"]["showdown-default"]
    pokemon03.src = pokemonSprite03["sprites"]["showdown-default"]
})
