const {textEq} = require("../text-normalizer");
const BasePage = require("./BasePage");

class FavoritesPage extends BasePage {

    validateFavorites(...products) {
        cy.get('#favorites-list .product-card').should('have.length', products.length)

        products.forEach(({id, name, price}) => {
            cy.get(`#favorites-list [data-testid="product-${id}"]`).within(() => {
                cy.get(`.product-title[data-detail="${id}"]`).should(textEq(name))
                cy.get('.price').should(textEq(price))
            })
        })
        return this
    }
}

module.exports = new FavoritesPage()