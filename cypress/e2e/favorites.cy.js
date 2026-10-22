const catalogPage = require('../support/pages/CatalogPage')
const myOrdersPage = require('../support/pages/MyOrdersPage')

describe('Favorites', () => {
    beforeEach(() => {
        catalogPage.open()
    })

    it('TM-FAVORITES-001: Додавання товару в "Обране"', () => {
        const headphones = {
            id: 'p01',
            name: 'Бездротові навушники «Орбіта»',
            price: '2 400,00 грн',
        }

        const speaker = {
            id: 'p02',
            name: 'Портативна колонка «Хвиля»',
            price: '1 500,00 грн',
        }

        const keyboard = {
            id: 'p03',
            name: 'Механічна клавіатура «Студія»',
            price: '3 200,00 грн',
        }

        catalogPage
            .findItem(headphones.name)
            .addToFavorites(headphones.id)
            .validateFavoritesCount(1)
            .findItem(speaker.name)
            .addToFavorites(speaker.id)
            .validateFavoritesCount(2)
            .findItem(keyboard.name)
            .addToFavorites(keyboard.id)
            .validateFavoritesCount(3)
            .openFavorites()
            .validateFavorites(headphones, speaker, keyboard)
            .reloadPage()
            .validateFavorites(headphones, speaker, keyboard)
    })

})