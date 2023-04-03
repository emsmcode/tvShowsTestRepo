/// <reference types="Cypress" />

describe('TV Shows Exercise', () => {

    const expectedTitles: string[] = ['The Leftovers', 'True Detective', 'Looking']
    let newShowTitles: string[] = []

    it('1. All HBO Drama Shows that premiered AFTER 2012 and BEFORE 2016', () => {

        cy.request({
            method: 'GET',
            url: '/shows'

        }).then((resp) => {
            expect(resp.status).to.eq(200)

        }).then((resp) => {
            const shows = resp.body
            return shows

        }).then((shows) => {
            const newShowListIDs: number[] = []
            for(let i=0; i< shows.length; i++) {
                if(
                    shows[i]!.name &&
                    shows[i]!.premiered &&
                    shows[i].premiered > '2012-12-31' &&
                    shows[i].premiered < '2016-01-01' &&
                    shows[i]!.genres &&
                    shows[i].genres.includes('Drama') &&
                    shows[i]!.network &&
                    shows[i]!.network.name &&
                    shows[i].network.name === 'HBO') {

                        newShowListIDs.push(shows[i].id)
                }
            }
            expect(newShowListIDs.length).to.eq(expectedTitles.length)
            return newShowListIDs

        }).then((newShowListIDs) => {
            for(let i=0; i<newShowListIDs.length; i++) {
                cy.request({
                    method: 'GET',
                    url: 'shows/' + (newShowListIDs[i])

                }).then((resp) => {
                    expect(resp.status).to.eq(200)

                }).then((resp) => {
                    newShowTitles.push((resp.body).name)
                })
            }
        }).then(() => {
            expect(newShowTitles.length).to.eq(expectedTitles.length)

        }).then(() => {
            expectedTitles.sort()
            newShowTitles.sort()
            
        }).then(() => {
            let valuesAreEqual: boolean = true
            for(let i=0; i<expectedTitles.length; i++) {
                if(expectedTitles[i] !== newShowTitles[i]) {
                    
                    valuesAreEqual = false
                }
            }
            expect(valuesAreEqual).to.be.true
        })
    })
})
