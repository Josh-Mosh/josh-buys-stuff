import { Sets } from '.'

let sets

beforeEach(async () => {
  sets = await Sets.create({ setId: 'test', name: 'test', description: 'test', pieces: 'test', age: 'test', price: 'test', imgUrl: 'test', affiliateLink: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = sets.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(sets.id)
    expect(view.setId).toBe(sets.setId)
    expect(view.name).toBe(sets.name)
    expect(view.description).toBe(sets.description)
    expect(view.pieces).toBe(sets.pieces)
    expect(view.age).toBe(sets.age)
    expect(view.price).toBe(sets.price)
    expect(view.imgUrl).toBe(sets.imgUrl)
    expect(view.affiliateLink).toBe(sets.affiliateLink)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = sets.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(sets.id)
    expect(view.setId).toBe(sets.setId)
    expect(view.name).toBe(sets.name)
    expect(view.description).toBe(sets.description)
    expect(view.pieces).toBe(sets.pieces)
    expect(view.age).toBe(sets.age)
    expect(view.price).toBe(sets.price)
    expect(view.imgUrl).toBe(sets.imgUrl)
    expect(view.affiliateLink).toBe(sets.affiliateLink)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
