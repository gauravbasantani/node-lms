//https://documenter.getpostman.com/view/4734439/2s83zmM2em
var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

var app = express();
app.use(express.json());
app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    // if(!req.headers.authorization){
    //     let data = {
    //         status: "exit",
    //         message:"autherization error"
    //     };
    //     res.end(JSON.stringify(data));
    // }
    // else if(req.path.includes("/gettoken"))
    // {
    //     next();
    // }
    // else{
    //     try{
    //         const authHeader = req.headers.authorization;
    //         const token =  authHeader.split(' ')[1];
    //         //console.log(token);
    //         const decoded = jwt.verify(token, 'SECRETKEY');
    //         //console.log(decoded);
    //         //next();
    //     }catch (err){
    //         let data = {
    //             status: "exit",
    //             message:"authentication error"
    //         };
    //         res.end(JSON.stringify(data));
    //     }
    // }
    next();
});

mongoose.connect("mongodb+srv://gaurav:Gaurav123@gauravcluster.guvu1tg.mongodb.net/edupro");
var db = mongoose.connection;

db.on("error", (err) => {console.log(err);});
db.on("open", () => {console.log("connection success");});

app.get("/", (req, res) => {
    res.send("Hello mongodb");
});

app.post("/gettoken", (req, res)=>{
    let body = req.body;
    const token = jwt.sign({
        token: body.token,
        userid: 1,
    }, 'SECRETKEY',
    { expiresIn: "365d" });
    let data = {
        status: "success",
        token: token
    };
    res.end(JSON.stringify(data));
});
const PORT = process.env.PORT || 3000
app.use("/admin/admin", require("./routes/admin/admin"));
app.use("/admin/trainer", require("./routes/admin/trainer"));
app.use("/admin/inquiry", require("./routes/admin/inquiry"));

app.use("/trainer/course", require("./routes/trainer/course"));
app.use("/trainer/coursesection", require("./routes/trainer/coursesection"));
app.use("/trainer/coursevideo", require("./routes/trainer/coursevideo"));

app.use("/user/course", require("./routes/user/user"));

app.use("/admin/authentication", require("./routes/admin/authentication"));
app.use("/trainer/authentication", require("./routes/trainer/authentication"));
app.use("/user/authentication", require("./routes/user/authentication"));

app.listen(PORT, () => {
    console.log("Server is running at http://localhost:8081");
});
