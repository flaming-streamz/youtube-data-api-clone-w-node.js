import mongoose from "mongoose";

export type ObjectIdType = typeof ObjectId;
export type ResourceObjectId = ReturnType<(typeof ObjectId)["getId"]>;

const ObjectId = Object.freeze({
  getId: () => mongoose.Schema.ObjectId.toString(),
  isValid: mongoose.isValidObjectId,
});

export default ObjectId;
