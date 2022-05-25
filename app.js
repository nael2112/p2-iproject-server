var express = require('express');
var app = express();
const cors = require("cors")
var PORT = 3000;
 
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors())
   
app.use("/", require("./routes/index"));

app.use((err, req, res, next) => {
  console.log(err.message)

  res.status(500).json({message: "Error"})
})
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});