import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || "3000";

app.listen(PORT, function () {
  console.log(`Server is runngin on port ${PORT}`);
});
