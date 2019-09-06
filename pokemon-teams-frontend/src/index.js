const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const $main = document.querySelector('main')

const getPokemons = () => {
    fetch(POKEMONS_URL)
        .then(response => response.json())
}


const getTrainers = () => {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(createTrainerCard)
}

const createTrainerCard = (trainers) => {
    trainers.data.forEach(trainer => {
        let $div = document.createElement('div')
        let $p = document.createElement('p')
        let $addPokemonButton = document.createElement('button')
        let $ul = document.createElement('ul')

        $div.classList.add('card')        
        $p.textContent = trainer.attributes.name
        $addPokemonButton.textContent = 'Add Pokemon'
        
        trainer.attributes.pokemons.forEach(pokemon => {
            let $li = document.createElement('li')
            let $releasePokemonButton = document.createElement('button')

            $releasePokemonButton.classList.add('release')
            $releasePokemonButton.innerText = 'Release'
            $releasePokemonButton.setAttribute('data-id', `${pokemon.id}`)


            $li.textContent = pokemon.nickname + " " + `(${pokemon.species})`
            $li.append($releasePokemonButton)
            $ul.append($li)
        })

        $div.append($p, $addPokemonButton, $ul)
        $main.appendChild($div)
    })
}

getTrainers()