import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, default: 1 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false, enum: [true, false] },
  },
  { timestamps: true }
);

// create the model for users and expose it to our app
const cartModal = mongoose.model("cart", cartSchema);
export default cartModal;
