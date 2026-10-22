class BasePage {
    /**
     * @param {string} [path] URL path of the page, e.g. '/cart'.
     *   Used by open() and shouldBeOpened().
     */
    constructor(path) {
        this.path = path
    }

    // ---------- Navigation ----------

    /** Visit this page directly by its path. */
    open() {
        if (!this.path) throw new Error(`${this.constructor.name}: path is not set`)
        cy.visit(this.path)
        return this.shouldBeOpened()
    }

    openFavorites() {
        cy.get('a[data-nav="favorites"]').click()
        return this.onPage(favoritesPage)
    }

    /** Assert that the browser is on this page (when path is set). */
    shouldBeOpened() {
        if (this.path) {
            cy.location('pathname').should('include', this.path)
        }
        return this
    }

    reloadPage() {
        cy.reload()
        return this
    }

    /**
     * Switch to another page object.
     * Accepts either a singleton instance (module.exports = new CartPage())
     * or a class (module.exports = CartPage).
     *
     * @template T
     * @param {T | (new () => T)} page
     * @param {{ verify?: boolean }} [options] verify=true checks the URL of the target page
     * @returns {T}
     */
    onPage(page, { verify = true } = {}) {
        const target = typeof page === 'function' ? new page() : page

        if (!(target instanceof BasePage)) {
            throw new Error('goTo() expects a page object that extends BasePage')
        }

        return verify ? target.shouldBeOpened() : target
    }

    validateToastMessage(message) {
        cy.get('#toast')
            .should('be.visible')
            .and('have.text', message)
        return this
    }

    validateCurrentPage(pageName) {
        cy.get('[aria-current="page"]').should('have.text', pageName)
        return this
    }

    validateCartCount(expectedCounterValue) {
        cy.get('#cart-count').should('have.text', expectedCounterValue)
        return this
    }

    validateFavoritesCount(expectedCounterValue) {
        cy.get('#favorite-count').should('have.text', expectedCounterValue)
        return this
    }

}

module.exports = BasePage
const favoritesPage = require('./FavoritesPage')