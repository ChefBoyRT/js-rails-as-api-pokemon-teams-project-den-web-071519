const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const $main = document.querySelector('main')

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
        $addPokemonButton.addEventListener('click', event => {addPokemon(trainer)})
        
        trainer.attributes.pokemons.forEach(pokemon => {
            let $li = document.createElement('li')
            let $releasePokemonButton = document.createElement('button')
            $releasePokemonButton.addEventListener('click', event => {deletePokemon(pokemon.id)})

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

const addPokemon = (trainer) => {
    if (trainer.attributes.pokemons.length < 6){
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: trainer.id
            })
        }
        fetch(POKEMONS_URL, config)
    }
}

const deletePokemon = (id) => {
    let config = {
        method: 'DELETE',
        body: JSON.stringify({
            pokemon_id: id
        })
    }
    // debugger
    fetch(POKEMONS_URL + `/${id}`, config)
}

getTrainers()