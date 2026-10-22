const BasePage = require("./BasePage");
const {textContains, textMatch, normalize, textEq} = require("../text-normalizer");

class MyOrdersPage extends BasePage {

    showOrderDetails() {
        cy.contains('details', 'Деталі замовлення').click()
        return this
    }

    cancelOrder() {
        cy.get('[data-testid="order-card"] button[data-cancel]').click()
        return this
    }

    validateOrder({status, total}) {
        cy.get('#orders-list [data-testid="order-card"]').as('orderCard')
            .should('have.length', 1)
        cy.get('@orderCard').find('.status-pill').should('have.text', status)
        cy.get('@orderCard').contains('p', '·').should(textContains(`· ${total} грн`))
        return this
    }

    validateOrderDetails({ title, quantity, goods, discount, delivery }) {
        cy.contains('details', 'Деталі замовлення').within(() => {
            cy.get('p.order-id').should(textMatch(/^Повний номер: [0-9a-f]+$/))
            cy.get('p').eq(1).should(textEq(`${title} × ${quantity}`))
            cy.get('p').eq(2).should(($p) => {
                const parts = normalize($p.text()).split('·').map((s) => s.trim())
                expect(parts).to.deep.eq([
                    `Товари: ${goods} грн`,
                    `Знижка: ${discount} грн`,
                    `Доставка: ${delivery} грн`,
                ])
            })
        })
        return this
    }
}

module.exports = new MyOrdersPage()