const mongoose = require("mongoose");
const Product = require("./model/product")
const Qcategory = require("./model/scategory")

const {startBot} = require("./bot");
const express = require("express");
const productList = require("./bot/data/product.json")
const routes = require("./routes")
const bodyParser = require("body-parser")

class Application {
    constructor() {
        this.configApp();
        this.setupMongo()
        this.setupServer()
        //this.insertOneProduct();
        startBot();
    }

    async insertOneProduct() {
        const tcategory = new Qcategory({
            title: "1"
            
        })
        await tcategory.save()

        const tcategory2 = new Qcategory({
            title: "2"
            
        })
        await tcategory2.save()

        const tcategory3 = new Qcategory({
            title: "3"
            
        })
        await tcategory3.save()

        
    }

    setupServer() {
        const app = express();
        app.listen(3000, () => {
            console.log("app listen to port 3000")
        })
        app.use(bodyParser.urlencoded({extended : true}))
        app.use(routes)
        app.use(express.static("public"))
        app.set("view engine","ejs")
    }

    setupMongo() {
        mongoose.connect("mongodb://localhost:27017/store").then(() => {
            console.log("db connected");
        }).catch(err => {
            console.log(err);
        })
    }

    configApp() {
        require("dotenv").config();

    }
}

module.exports = Application;
