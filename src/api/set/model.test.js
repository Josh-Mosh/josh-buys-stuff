import { Set } from '.'

let set

beforeEach(async () => {
  set = await Set.create({ setId: 'test', name: 'test', description: 'test', pieces: 'test', age: 'test', price: 'test', imgUrl: 'test', affiliateLink: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = set.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(set.id)
    expect(view.setId).toBe(set.setId)
    expect(view.name).toBe(set.name)
    expect(view.description).toBe(set.description)
    expect(view.pieces).toBe(set.pieces)
    expect(view.age).toBe(set.age)
    expect(view.price).toBe(set.price)
    expect(view.imgUrl).toBe(set.imgUrl)
    expect(view.affiliateLink).toBe(set.affiliateLink)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = set.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(set.id)
    expect(view.setId).toBe(set.setId)
    expect(view.name).toBe(set.name)
    expect(view.description).toBe(set.description)
    expect(view.pieces).toBe(set.pieces)
    expect(view.age).toBe(set.age)
    expect(view.price).toBe(set.price)
    expect(view.imgUrl).toBe(set.imgUrl)
    expect(view.affiliateLink).toBe(set.affiliateLink)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
