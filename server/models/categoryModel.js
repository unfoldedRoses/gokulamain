import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const CategorySchema = new Schema({
    title: { type: String, default: '' },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false, enum: [true, false] },
   
}, { timestamps: true });



// create the model for users and expose it to our app
const Category = mongoose.model('Category', CategorySchema);
export default Category