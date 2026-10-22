const {textEq} = require("../text-normalizer");
const BasePage = require("./BasePage");
const cartLines = '#bag-items .bag-line'
const productName = '.bag-product h3'
const quantity = (productId) => `[data-testid="quantity-${productId}"]`
const price = '.price'

class CartPage extends BasePage {

    useCoupon(code) {
        cy.get('#coupon').type(code, {delay: 0})
        cy.get('#apply-coupon').click()
        return this
    }

    validateTotal(total) {
        cy.get('#totals').within(() => {
            Object.entries(total).forEach(([label, value]) => {
                cy.contains('div span', label).next().should(textEq(value))
            })
        })
        return this
    }

    setCustomerData(customer) {
        cy.get('#customer-name').type(customer.name)
        cy.get('#email').type(customer.email)
        cy.get('#address').type(customer.address)
        return this
    }

    selectPaymentTestResult(result) {
        cy.get('#payment').select(result)
        return this
    }

    placeOrder() {
        cy.get('[data-testid="place-order"]').as('placeOrder').should('be.enabled')
        cy.get('@placeOrder').click()
        return this
    }

    increaseQuantity(productId, quantity = 1) {
        for (let i = 1; i < quantity; i++) {
            cy.get(`button[data-quantity="${productId}"][data-delta="1"]`).click()
        }
        return this
    }

    validateItemsInCart(...items) {
        cy.get(cartLines).should('have.length', items.length)

        items.forEach((item) => {
            cy.contains(cartLines, item.name).within(() => {
                cy.get(productName).should('have.text', item.name)
                cy.get(quantity(item.id)).should('have.text', String(item.quantity))
                cy.get(price)
                    .invoke('text')
                    .invoke('replace', /\u00a0/g, ' ')
                    .should('eq', item.price)
            })
        })
        return this
    }
}

module.exports = new CartPage()