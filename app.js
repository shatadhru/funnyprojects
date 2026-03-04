const express = require("express")


const app = express();

require("dotenv").config({ path: ['.env.local', '.env'] });



module.exports = app