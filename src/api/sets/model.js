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
    type: Number
  },
  age: {
    type: String
  },
  price: {
    type: String
  },
  imgUrl: {
    type: String
  },
  affiliateLink: {
    type: String
  },
  favorite: {
    type: Boolean
  },
  videoId: {
    type: String
  },
  videoUploaded: {
    type: Date
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
      affiliateLink: this.affiliateLink,
      favorite: this.favorite,
      videoId: this.videoId,
      videoUploaded: this.videoUploaded,
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
