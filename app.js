const ort = require('onnxruntime-web');
const express = require("express");
const { check, validationResult } = require("express-validator");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("static"));
app.use("/css",express.static(__dirname + "static/css"));
app.use("/js",express.static(__dirname + "static/js"));
app.use("/img",express.static(__dirname + "static/img"));

app.set("view engine","ejs");

app.get("",(req,res) => {
    res.render("home")
});

app.get("/linear",(req,res) => {
    res.render("form");
});

app.post("/linear",urlencodedParser,[
    check("numberinput","Idiot You must enter the a number")
        .exists()
        .isNumeric(),
    check("email","Idiot You must enter your Email-ID")
        .exists()
        .isEmail()
        .normalizeEmail()
],
(req,res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const alert = errors.array();
        res.render("form",{
            alert
        });
    }
    else{
        // res.json(req.body);
        linearRegression(req.body.numberinput).then(prediction => {
            res.render("form",{
                prediction
            });
            
        });
        
    }
});

async function linearRegression(number) {
    try{
        const session = await ort.InferenceSession.create("./onnx_model.onnx");
        const data = Float32Array.from([number]);
        const tensor_data = new ort.Tensor('float32', data, [1, 1]);
        const feeds = { "input": tensor_data };
        const results = await session.run(feeds);
    
        return results;
    }
    catch (error) {
        return `failed to inference ONNX model: ${error}.`;
    }
}


app.listen(port,() => {
    console.info("App is @ http://127.0.0.1:" + port);
})