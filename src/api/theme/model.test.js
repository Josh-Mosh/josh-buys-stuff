import { Theme } from '.'

let theme

beforeEach(async () => {
  theme = await Theme.create({ name: 'test', logoUrl: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = theme.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(theme.id)
    expect(view.name).toBe(theme.name)
    expect(view.logoUrl).toBe(theme.logoUrl)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = theme.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(theme.id)
    expect(view.name).toBe(theme.name)
    expect(view.logoUrl).toBe(theme.logoUrl)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
