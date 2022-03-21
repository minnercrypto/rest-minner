import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    phone: { 
      type: Number,
      default: 0,
    },
    firstname: {
        type: String,
        default: "Nombres...",
    },
    lastname: {
        type: String,
        default: "Apellidos...",
    },
    address: {
        type: String,
        default: "Dirección Postal...",
    },
    city: {
        type: String,
        default: "Ciudad...",
    },
    country: {
        type: String,
        default: "País...",
    },
    postalcode: {
        type: Number,
        default: 0,
    },
    wallet: {
        type: String,
        default: "Nombre de Wallet...",
    },
    addresswallet: {
        type: String,
        default: "Dirección de Wallet...",
    },
    description: {
        type: String,
        default: "Cuentanos sobre ti...",
    },
    status: {
      type: String,
      default: "Cuenta Inactiva",
    },
    balance: {
      type: Number,
      default: 0.00,
    },
    investment: {
      type: Number,
      default: 0.00,
    },
    referral: {
      type: Number,
      default: 0,
    },
    referralactive: {
      type: Number,
      default: 0,
    },
    numberplan: {
      type: Number,
      default: 0,
    },
    plan: {
      type: String,
      default: "Sin Planes",
    },
    day: {
      type: String,
      default: "0/15",
    },
    date: {
      type: String,
      default: "00/00/00",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default model("User", UserSchema);
