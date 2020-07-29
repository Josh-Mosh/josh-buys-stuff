import mongoose, { Schema } from 'mongoose'

const themeSchema = new Schema({
  name: {
    type: String
  },
  logoUrl: {
    type: String
  },
  bgImageUrl: {
    type: String
  },
  fontTheme: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

themeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      logoUrl: this.logoUrl,
      bgImageUrl: this.bgImageUrl,
      fontTheme: this.fontTheme,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Theme', themeSchema)

export const schema = model.schema
export default model
