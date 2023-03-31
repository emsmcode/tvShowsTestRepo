/// <reference types="Cypress" />

import deepEqualInAnyOrder from 'deep-equal-in-any-order'
chai.use(deepEqualInAnyOrder)

describe('TV Shows Exercise', () => {

    let expectedTitles = [{title: 'The  Leftovers'}, {title: 'True Detecive'}, {title: 'Looking'}]

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
            const newShowListIDs: number[] = new Array
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
            return newShowListIDs

        }).then((newShowListIDs) => {
            expect(newShowListIDs.length).to.eq(3)
            for(let i=0; i<newShowListIDs.length; i++) {
                cy.request({
                    method: 'GET',
                    url: 'shows/' + (newShowListIDs[i])
                }).then((resp) => {
                    expect(resp.status).to.eq(200)
                    let theTitle = (resp.body).name
                    cy.log(theTitle)
                    expect(expectedTitles.includes(theTitle))
                })
            }
        })
    })
})
