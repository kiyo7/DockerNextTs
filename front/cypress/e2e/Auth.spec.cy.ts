///<reference types="cypress" />
describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  //保存するたびにユーザーが生成されるためコメントアウト

  it('Shall navigate to Dashboard when successfully login', () => {
    cy.get('input[placeholder="example@email.com"]').type('user1@test.com')
    cy.get('input[placeholder="******"]').type('wawawa')
    cy.get("[type='submit']").click()
    cy.get('[data-testid="logout"]').should('be.visible')
  })

  it('Shall navigate to Auth when logout clicked', () => {
    cy.get('input[placeholder="example@email.com"]').type('user1@test.com')
    cy.get('input[placeholder="******"]').type('wawawa')
    cy.get("[type='submit']").click()
    cy.get('[data-testid="logout"]').should('be.visible')
    cy.get('[data-testid="logout"]').click()
    cy.get('input[placeholder="example@email.com"]').should('be.visible')
    cy.get('input[placeholder="******"]').should('be.visible')
  })

  it('Shall not navigate to DashBoard with wrong credentials', () => {
    cy.get('input[placeholder="example@email.com"]').type('user1@test.com')
    cy.get('input[placeholder="******"]').type('wawa')
    cy.get("[type='submit']").click()
    cy.get('[data-testid="logout"]').should('not.exist')
  })

  //テスト毎にユーザーが登録されてしまうためコメント
  // it('Shall navigate to DashBoard when successfully registered', () => {
  //   cy.get('input[placeholder="example@email.com"]').type('user6@test.com')
  //   cy.get('input[placeholder="******"]').type('wawawa')
  //   cy.contains('新規登録はこちら').click()
  //   cy.get('[type=submit]').should('have.text', '新規登録')
  //   cy.get('[type=submit]').click()
  // })
})

export {}
