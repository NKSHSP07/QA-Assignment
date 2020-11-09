/*
***** TEST ASSIGNMENT **********
* TESTCASE 1: Validate whether the products can be sorted Lowest to Highest and assert the price of first product is kr 9.000
* TESTCASE 2: Validate whether the products can be sorted Highest to Lowest and assert the price of first product is kr 134.900
* TESTCASE 3: Validate whether the products can be filtered by selecting Size S and assert the combined price of items is kr 33.400
* TESTCASE 4: Select only the products which have installments and assert the total number of products is 15
* TESTCASE 5: Without selecting any product, go to cart and click on Checkout. Assert the text in Alert box is "Add some product in the cart!"
* TESTCASE 6: Select "Sphynx Tie Dye Wine T-Shirt", go to checkout and handel the alerts
*/
/// <reference types="cypress" />

describe('Test-Assignment', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')

    })

    it('Test Case 1', () => {

        cy.get('select').select('lowestprice')
        cy.xpath('//*[@id="root"]/main/div[2]/div[2]/div[3]/div[1]')
            .invoke('text').then((text) => {
                expect(text.trim()).equal('kr9.000')
            })

    })

    it('Test Case 2', () => {

        cy.get('select').select('highestprice')
        cy.xpath('//*[@id="root"]/main/div[2]/div[2]/div[3]/div[1]')
            .invoke('text').then((text) => {
                expect(text.trim()).equal('kr134.900')
            })

    })

    it('Test case 3', () => {

        var total = 0

        cy.get(':nth-child(3) > label > .checkmark').click()

        cy.get('div.val').each(($el, index) => {

            var fullText = $el.text()
            var number = fullText.replace(/[^\d]/g, '');
            total = total + parseFloat(number)
        }).then(() => {
            expect(total).to.equal(33400)

        })

    })

    it('Test Case 5', () => {

        cy.get('.bag--float-cart-closed').click()
            .then(() => {

                cy.get('.buy-btn').click()
                cy.on('window:alert', (str) => {
                    expect(str).to.equal(`Add some product in the cart!`)
                })

            })

    })

    it('Test Case 6', () => {

        cy.get('.shelf-item__title').contains("Sphynx Tie Dye Wine T-Shirt").click()
        cy.get('.buy-btn').click()
        cy.on('window:alert', (str) => {
            expect(str).to.exist
        })

    })

})