import { model, Schema, models } from "mongoose";

const UserLinksSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  links: [Schema.Types.Mixed],
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Userl = models.UserLinks || model("UserLinks", UserLinksSchema);

export default Userl;
