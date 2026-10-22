const cartPage = require('./CartPage')
const BasePage = require("./BasePage");

const addToCartButton = (productId) => `button[data-add="${productId}"]`
const addToFavoritesButton = (productId) => `button[data-favorite="${productId}"]`

class CatalogPage extends BasePage {
    open() {
        cy.visit('/')
        return this
    }

    findItem(query) {
        cy.get('#search').as('searchInput').clear()
        cy.get('@searchInput').type(query)
        return this
    }

    addToCart(productId) {
        cy.get(addToCartButton(productId)).click()
        return this
    }

    addToFavorites(productId) {
        cy.get(addToFavoritesButton(productId)).as('heartButton').click()
        cy.get('@heartButton').should('have.attr', 'aria-pressed', 'true')
        return this
    }

    openCart() {
        cy.get('#open-cart').click()
        return cartPage
    }
}

module.exports = new CatalogPage()