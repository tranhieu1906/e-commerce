import mongoose from "mongoose";
mongoose.set("strictQuery", true);
let password = process.env.DATABASE_KEY;
const url = `mongodb+srv://Hieu:${password}@case4.vvsumhd.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    console.log(`database connection established`);
  })
  .catch((e) => {
    console.log("DB connection error:", e.message);
  });
export default mongoose;
