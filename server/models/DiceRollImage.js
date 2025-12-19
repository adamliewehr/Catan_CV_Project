import mongoose from "mongoose";

const DiceRollImageSchema = new mongoose.Schema({
  base64: {
    type: String,
    required: true,
  },
});

const DiceRollImage = mongoose.model("DiceRollImage", DiceRollImageSchema);

export default DiceRollImage;
