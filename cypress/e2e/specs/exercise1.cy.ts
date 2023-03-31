/// <reference types="Cypress" />

describe('TV Shows Exercise', () => {

    it('1. All HBO Drama Shows that premiered AFTER 2012 and BEFORE 2016', () => {
        let newShowList: any[] = new Array

        cy.request({
            method: 'GET',
            url: '/shows'

        }).then((resp) => {
            expect(resp.status).to.eq(200)

        }).then((resp) => {
            const show = resp.body
            return show

        }).then((show) => {
            
            for(let i=0; i< show.length; i++) {
                if (show[i]!.name &&
                    show[i]!.premiered &&
                    show[i].premiered > '2012-12-31' &&
                    show[i].premiered < '2016-01-01' &&
                    show[i]!.genres &&
                    show[i].genres.includes('Drama') &&
                    show[i]!.network &&
                    show[i]!.network.name &&
                    show[i].network.name === 'HBO') {
                    
                        newShowList.push(show[i])
                }
            }
        }).then(() => {
            for(let i=0; i< newShowList.length; i++) {
                cy.log(newShowList[i].name)
           }
        })
    })
})
