import { Schema, model } from "mongoose";

const MentorSchema = new Schema({
  photo: {
    type: Buffer,
    required: [true, "Photo is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  linkedIn: {
    type: String,
    required: [true, "LinkedIn profile is required"],
    match: [
      /^https?:\/\/(www\.)?linkedin\.com\/.*$/,
      "Please enter a valid LinkedIn URL",
    ],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  url: {
    type: String,
    required: [true, "URL is required"],
    match: [
      /^https?:\/\/.+/,
      "Please enter a valid URL starting with http:// or https://",
    ],
  },
});

const MentorModel = model("Mentor", MentorSchema, "mentor_details");

export { MentorModel, MentorSchema };
