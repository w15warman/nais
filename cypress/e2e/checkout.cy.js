const catalogPage = require('../support/pages/CatalogPage')
const myOrdersPage = require('../support/pages/MyOrdersPage')

describe('Checkout', () => {
    beforeEach(() => {
        catalogPage.open()
    })

    it('TM-CHECKOUT-001: Оформлення замовлення із промокодом WELCOME10 та стандартною доставкою', () => {
        const product = {
            id: 'p01',
            name: 'Бездротові навушники «Орбіта»',
            quantity: 1,
            price: '2 400,00 грн',
        }

        const expectedTotals = {
            'Товари': '2 400,00 грн',
            'Знижка': '−240,00 грн',
            'Доставка': '0,00 грн',
            'Разом': '2 160,00 грн',
        }

        const customer = {
            'name': 'Олександр Тестовий',
            'email': 'test@example.test',
            'address': 'Київ, вул. Тестова, 12',
        }

        const orderDetails = {
            title: 'Бездротові навушники «Орбіта»',
            quantity: '1',
            goods: '2 400,00',
            discount: '240,00',
            delivery: '0,00',
        }

        catalogPage
            .findItem(' навушники «Орбіта»')
            .addToCart(product.id)
            .validateToastMessage('Товар додано до кошика')
            .validateCartCount(1)
            .openCart()
            .validateItemsInCart(product)
            .useCoupon('WELCOME10')
            .validateTotal(expectedTotals)
            .setCustomerData(customer)
            .selectPaymentTestResult('approved')
            .placeOrder()
            .validateToastMessage('Замовлення успішно оформлено')
            .validateCurrentPage('Мої замовлення')
            .onPage(myOrdersPage)
            .validateOrder({status: 'Підтверджено', total: '2 160,00'})
            .validateCartCount(0)
            .showOrderDetails()
            .validateOrderDetails(orderDetails)
            .reloadPage()
            .onPage(myOrdersPage)
            .validateOrder({status: 'Підтверджено', total: '2 160,00'})
            .showOrderDetails()
            .validateOrderDetails(orderDetails)
    })

    it('TM-CHECKOUT-002: Скасування замовлення', () => {
        const product = {
            id: 'p02',
            name: 'Портативна колонка «Хвиля»',
            quantity: 1,
            price: '1 500,00 грн',
        }

        const customer = {
            'name': 'Олександр Тестовий',
            'email': 'test@example.test',
            'address': 'Київ, вул. Тестова, 12',
        }

        catalogPage
            .findItem('колонка «Хвиля»')
            .addToCart(product.id)
            .validateToastMessage('Товар додано до кошика')
            .validateCartCount(1)
            .openCart()
            .validateItemsInCart(product)
            .setCustomerData(customer)
            .selectPaymentTestResult('approved')
            .placeOrder()
            .validateToastMessage('Замовлення успішно оформлено')
            .validateCurrentPage('Мої замовлення')
            .onPage(myOrdersPage)
            .validateOrder({status: 'Підтверджено', total: '1 580,00'})
            .cancelOrder()
            .validateToastMessage('Замовлення скасовано')
            .validateOrder({status: 'Скасовано', total: '1 580,00'})
    })

    it('TM-CHECKOUT-003: Оформлення 3х одиниць товару в 1 замовленні без промокоду та стандартною доставкою', () => {
        const productID = 'p02'
        const qnt = 3

        const expectedTotals = {
            'Товари': '4 500,00 грн',
            'Знижка': '−0,00 грн',
            'Доставка': '0,00 грн',
            'Разом': '4 500,00 грн',
        }

        const customer = {
            'name': 'Олександр Тестовий',
            'email': 'test@example.test',
            'address': 'Київ, вул. Тестова, 12',
        }

        catalogPage
            .findItem('колонка «Хвиля»')
            .addToCart(productID)
            .validateToastMessage('Товар додано до кошика')
            .validateCartCount(1)
            .openCart()
            .validateItemsInCart({
                id: productID,
                name: 'Портативна колонка «Хвиля»',
                quantity: 1,
                price: '1 500,00 грн',
            })
            .increaseQuantity(productID, qnt)
            .validateItemsInCart({
                id: productID,
                name: 'Портативна колонка «Хвиля»',
                quantity: qnt,
                price: '4 500,00 грн',
            })
            .validateTotal(expectedTotals)
            .setCustomerData(customer)
            .selectPaymentTestResult('approved')
            .placeOrder()
            .validateToastMessage('Замовлення успішно оформлено')
            .validateCurrentPage('Мої замовлення')
            .onPage(myOrdersPage)
            .validateOrder({status: 'Підтверджено', total: '4 500,00'})
    })
})