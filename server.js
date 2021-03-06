const express = require('express');
const app = express();
const cors  = require('cors');
const db = require('./models');
// db sync with force delete all data
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync with { force: true }');
// });
db.sequelize.sync();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const routes = require("./routes");
app.use("/", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

