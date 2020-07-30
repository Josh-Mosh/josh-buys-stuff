import { Theme } from '.'

let theme

beforeEach(async () => {
  theme = await Theme.create({ name: 'test', logoUrl: 'test', bgImageUrl: 'test', bgColor: 'test', fontTheme: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = theme.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(theme.id)
    expect(view.name).toBe(theme.name)
    expect(view.logoUrl).toBe(theme.logoUrl)
    expect(view.bgImageUrl).toBe(theme.bgImageUrl)
    expect(view.bgColor).toBe(theme.bgColor)
    expect(view.fontTheme).toBe(theme.fontTheme)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = theme.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(theme.id)
    expect(view.name).toBe(theme.name)
    expect(view.logoUrl).toBe(theme.logoUrl)
    expect(view.bgImageUrl).toBe(theme.bgImageUrl)
    expect(view.bgColor).toBe(theme.bgColor)
    expect(view.fontTheme).toBe(theme.fontTheme)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
