import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const languageSchema = new mongoose.Schema({
  ar: { type: String, required: false },
  en: { type: String, required: false },
});

const optionChoiceSchema = new mongoose.Schema({
  name: languageSchema,
  additionalPrice: { type: Number, default: 0 },
});

const itemOptionSchema = new mongoose.Schema({
  name: languageSchema,
  choices: [optionChoiceSchema],
  required: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
});

const menuItemSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: languageSchema,
  description: languageSchema,
  price: { type: Number, required: false },
  options: [itemOptionSchema],
});

const categorySchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    menu: { type: String, ref: 'Menu', required: false, index: true },
    name: languageSchema,
    items: [menuItemSchema],
    visionData: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

const menuSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: false, index: true },
    slug: { type: String, required: false, unique: true },
    images: [
      {
        fileId: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          validate: {
            validator: async function (v) {
              const count = await mongoose.connection.db
                .collection('images.files')
                .countDocuments({ _id: v });
              return count > 0;
            },
            message: 'Invalid GridFS file reference',
          },
        },
        filename: { type: String, required: false },
        size: { type: Number, required: false },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    categories: [{ type: String, ref: 'Category' }],
    gptResults: [
      {
        data: mongoose.Schema.Types.Mixed,
        date: { type: Date, default: Date.now },
      },
    ],
    isProcessed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const visionResultSchema = new mongoose.Schema({
  menu: {
    type: String,
    ref: 'Menu',
    required: false,
    index: true,
  },
  rawResponse: mongoose.Schema.Types.Mixed,
  labels: [String],
  structuredText: String,
  context: String,
  processingOrder: Number,
  processedAt: {
    type: Date,
    default: Date.now,
  },
});

menuSchema.index({ 'images.fileId': 1 });
visionResultSchema.index({ processedAt: -1 });

export const Menu = mongoose.model('Menu', menuSchema);
export const Category = mongoose.model('Category', categorySchema);
export const VisionResult = mongoose.model('VisionResult', visionResultSchema);
