const cartPage = require('./CartPage')
const BasePage = require("./BasePage");

const searchInput = '#search'
const addToCartButton = (productId) => `button[data-add="${productId}"]`
const cartButton = '#open-cart'


class CatalogPage extends BasePage {
    open() {
        cy.visit('/')
        return this
    }

    findItem(query) {
        cy.get(searchInput).type(query)
        return this
    }

    addToCart(productId) {
        cy.get(addToCartButton(productId)).click()
        return this
    }

    openCart() {
        cy.get(cartButton).click()
        return cartPage
    }
}

module.exports = new CatalogPage()