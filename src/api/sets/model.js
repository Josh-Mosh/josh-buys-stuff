import mongoose, { Schema } from 'mongoose'

const setsSchema = new Schema({
  setId: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  pieces: {
    type: String
  },
  age: {
    type: String
  },
  price: {
    type: String
  },
  imgUrl: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

setsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      setId: this.setId,
      name: this.name,
      description: this.description,
      pieces: this.pieces,
      age: this.age,
      price: this.price,
      imgUrl: this.imgUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Sets', setsSchema)

export const schema = model.schema
export default model
