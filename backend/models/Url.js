import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UrlSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title.'],
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    content: {
      type: Object,
      required: [true, 'Please provide content.'],
    },
  },
  { timestamps: true }
)

UrlSchema.pre('save', async function () {
  if (!this.password) return
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UrlSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('Url', UrlSchema)
