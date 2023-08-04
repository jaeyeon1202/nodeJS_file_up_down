const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const router = require("./src/routers/router")(app);

app.set("views", __dirname+"/src/views");
app.set("view engine", "ejs");

app.use("/", router);
//app.get("/", (req,res)=>{
    //res.send("연결확인인데 이렇게 열악하게 해야되나?");
//})
app.use("/static", express.static(__dirname+"/public")); 
//해당하는 경로에 고정적파일을 등록하겠다.
//스태틱이라고 명시하면 퍼블릭까지 잡힌다.

app.listen(3000, ()=>{console.log("3000서버 연결이다.")})