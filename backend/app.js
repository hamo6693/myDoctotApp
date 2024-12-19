
require("dotenv").config()
const exprees = require("express")
const routes = require("./router")

//معرفة معلومات الطلب والاستجابة
const morgan = require("morgan")
//الاستجابة لطلب الخادم
const cors = require("cors")
//الوصول الى البيانات المرسلة تحويل البيانات المرسلة الى جيسون والعكس
const bodyParser = require("body-parser")
const models = require("./models")

const db = require("./models/database")


const port = process.env.PORT || 5000

const app = exprees()
app.use(morgan("dev"))
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/",routes)

app.use((req,res,next) => {
    const err = new Error("not Found")
    err.status(404);
    next(err)
})

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        message:error.message
    })

})

db.sync().then(() => {
    app.listen(port,()=> {
        console.log("running on port " + port);
    })
})
