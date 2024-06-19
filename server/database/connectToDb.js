import { connect } from "mongoose";

async function connectToDb() {
  try {
    await connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
}

export default connectToDb;
