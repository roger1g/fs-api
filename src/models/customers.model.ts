import mongoose, { Schema } from "mongoose";
const customerSchema = new Schema<I_Customer>(
  {
    companyName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    businessAddress: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
    referralSource: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export interface I_Customer {
  companyName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  businessAddress: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
  referralSource: string;
}

export const customerModel = mongoose.model("Customers", customerSchema);

