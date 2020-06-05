import mongoose, { Schema, Document } from 'mongoose';

export interface ICategoria extends Document {
    name: String;
}

const CategoriaSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true }
});

export default mongoose.model<ICategoria>('Categoria', CategoriaSchema);