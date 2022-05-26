var express = require('express');
var app = express();
const cors = require("cors")
var PORT = 3000;
 
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors())
const errorHandler = require("./middlewares/errorHandler");
   
app.use("/", require("./routes/index"));

app.use(errorHandler)

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});