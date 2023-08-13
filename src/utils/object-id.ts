import mongoose from "mongoose";

export type Id = typeof Id;
export type ResourceObjectId = (typeof Id)["makeId"];

const Id = Object.freeze({
  makeId: mongoose.Schema.ObjectId.toString(),
  isValid: mongoose.isValidObjectId,
});

export default Id;
