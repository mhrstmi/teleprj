const Router = require("express").Router();
const Product = require("../model/product")
const Category = require("../model/category")
const Questions = require("../model/questions")
const Qcategory = require("../model/qcategory")
const Securbuy = require("../model/securbuy")
const Scategory = require("../model/scategory")
const Tutorials = require("../model/tutorials")
const Tcategory = require("../model/tcategory")
const Notes = require("../model/notes")
const Comments = require("../model/comments")
const OrdersList = require("../model/user")




Router.get("/", async (req, res) => {
    const products = await Product.countDocuments();
    const tutorials = await Tutorials.countDocuments();
    const securbuy = await Securbuy.countDocuments();
    const questions = await Questions.countDocuments();

    const lastProducts = await Product.findOne().sort({_id: -1});
    const lastTutorials = await Tutorials.findOne().sort({_id: -1});
    const lastSecurbuy = await Securbuy.findOne().sort({_id: -1});
    const lastQuestions = await Questions.findOne().sort({_id: -1});
    const notes = await Notes.find().sort({_id: -1});
    const comments = await Comments.find().sort({_id: -1}).limit(10);

    res.render("home" , {questions,securbuy,tutorials,products,notes,lastProducts,lastTutorials,lastSecurbuy,lastQuestions,comments});
})

Router.get("/products", async (req, res) => {
    const products = await Product.find().sort({_id: -1});
    res.render("productList", {products});
})

Router.get("/commentsList", async (req, res) => {
    const comments = await Comments.find().sort({_id: -1});
    res.render("commentsList", {comments});
})

Router.get("/ordersList", async (req, res) => {
    const ordersList = await OrdersList.find().sort({_id: -1});
    res.render("ordersList", {ordersList});
})


Router.get("/pcategory", async (req, res) => {
    const category = await Category.find().sort({_id: -1});
    res.render("categoryList", {category});
})

Router.get("/addProduct", async (req, res) => {
    const cats = await Category.find();
    res.render("addProduct", {cats});
})

Router.get("/notes", async (req, res) => {
    const notes = await Notes.find().sort({_id: -1});

    res.render("notesList", {notes});

})

Router.get("/addNotes", async (req, res) => {
    res.render("addNotes");
})

Router.get("/addPcategory", async (req, res) => {
    res.render("addPcategory");
})

Router.get("/questions", async (req, res) => {
    const questions = await Questions.find().sort({_id: -1});
    res.render("questionsList", {questions});
})

Router.get("/qcategory", async (req, res) => {
    const qcategory = await Qcategory.find().sort({_id: -1});
    res.render("qcategoryList", {qcategory});
})

Router.get("/addQuestions", async (req, res) => {
    const qcats = await Qcategory.find();
    res.render("addQuestions", {qcats});
})

Router.get("/addQcategory", async (req, res) => {
    res.render("addQcategory");
})

Router.get("/securbuy", async (req, res) => {
    const securbuy = await Securbuy.find().sort({_id: -1});
    res.render("securbuyList", {securbuy});
})

Router.get("/scategory", async (req, res) => {
    const scategory = await Scategory.find().sort({_id: -1});
    res.render("scategoryList", {scategory});
})

Router.get("/addSecurbuy", async (req, res) => {
    const scats = await Scategory.find();
    res.render("addSecurbuy", {scats});
})

Router.get("/addScategory", async (req, res) => {
    res.render("addScategory");
})

Router.get("/tutorials", async (req, res) => {
    const tutorials = await Tutorials.find().sort({_id: -1});
    res.render("tutorialsList", {tutorials});
})

Router.get("/tcategory", async (req, res) => {
    const tcategory = await Tcategory.find().sort({_id: -1});
    res.render("tcategoryList", {tcategory});
})

Router.get("/addTutorials", async (req, res) => {
    const tcats = await Tcategory.find();
    res.render("addTutorials", {tcats});
})

Router.get("/addTcategory", async (req, res) => {
    res.render("addTcategory");
})


Router.post("/addProduct", async (req, res) => {
    const product = new Product({
        name : req.body.name,
        photo : req.body.photo,
        price : req.body.price,
        link : req.body.link,
        cat : req.body.cat,
    })
    await product.save();
    res.redirect("/products")
})

Router.post("/addPcategory", async (req, res) => {
    const category = new Category({
        title : req.body.title,
    })
    await category.save();
    res.redirect("/pcategory")
})

Router.post("/addSecurbuy", async (req, res) => {
    const securbuy = new Securbuy({
        name : req.body.name,
        photo : req.body.photo,
        description : req.body.description,
        link : req.body.link,
        scat : req.body.scat,
    })
    await securbuy.save();
    res.redirect("/securbuy")
})

Router.post("/addScategory", async (req, res) => {
    const scategory = new Scategory({
        title : req.body.title,
    })
    await scategory.save();
    res.redirect("/scategory")
})

Router.post("/addQuestions", async (req, res) => {
    const questions = new Questions({
        name : req.body.name,
        photo : req.body.photo,
        description : req.body.description,
        link : req.body.link,
        qcat : req.body.qcat,
    })
    await questions.save();
    res.redirect("/questions")
})

Router.post("/addQcategory", async (req, res) => {
    const qcategory = new Qcategory({
        title : req.body.title,
    })
    await qcategory.save();
    res.redirect("/qcategory")
})

Router.post("/addTutorials", async (req, res) => {
    const tutorials = new Tutorials({
        name : req.body.name,
        photo : req.body.photo,
        description : req.body.description,
        link : req.body.link,
        tcat : req.body.tcat,
    })
    await tutorials.save();
    res.redirect("/tutorials")
})

Router.post("/addTcategory", async (req, res) => {
    const tcategory = new Tcategory({
        title : req.body.title,
    })
    await tcategory.save();
    res.redirect("/tcategory")
})

Router.post("/addNotes", async (req, res) => {
    const notes = new Notes({
        title : req.body.title,
    })
    await notes.save();
    res.redirect("/notes")
})


Router.post('/delete/tutorial', function(req, res, next) {
    var id = req.body.id;
    Tutorials.findByIdAndRemove(id, function (err, deletedTutorials) {
       // handle any potential errors here
       res.redirect('/');        
     });
});

Router.post('/delete/comments', function(req, res, next) {
    var id = req.body.id;
    Comments.findByIdAndRemove(id, function (err, deletedComments) {
       // handle any potential errors here
       res.redirect('/');        
     });
});

Router.post('/delete/products', function(req, res, next) {
    var id = req.body.id;
    Products.findByIdAndRemove(id, function (err, deletedProducts) {
       // handle any potential errors here
       res.redirect('/');        
     });
});

Router.post('/delete/securbuy', function(req, res, next) {
    var id = req.body.id;
    Securbuy.findByIdAndRemove(id, function (err, deletedSecurbuy) {
       // handle any potential errors here
       res.redirect('/');        
     });
});

Router.post('/delete/questions', function(req, res, next) {
    var id = req.body.id;
    Questions.findByIdAndRemove(id, function (err, deletedQuestions) {
       // handle any potential errors here
       res.redirect('/');        
     });
});

Router.post('/delete/notes', function(req, res, next) {
    var id = req.body.id;
    Notes.findByIdAndRemove(id, function (err, deletedNotes) {
       // handle any potential errors here
       res.redirect('/');        
     });
});

Router.post('/delete/category', function(req, res, next) {
    var id = req.body.id;
    Category.findByIdAndRemove(id, function (err, deletedCategory) {
       // handle any potential errors here
       res.redirect('/');        
     });
});

Router.post('/delete/qcategory', function(req, res, next) {
    var id = req.body.id;
    Qcategory.findByIdAndRemove(id, function (err, deletedQcategory) {
       // handle any potential errors here
       res.redirect('/');        
     });
});

Router.post('/delete/scategory', function(req, res, next) {
    var id = req.body.id;
    Scateroy.findByIdAndRemove(id, function (err, deletedScategory) {
       // handle any potential errors here
       res.redirect('/');        
     });
});

Router.post('/delete/tcategory', function(req, res, next) {
    var id = req.body.id;
    Tcategory.findByIdAndRemove(id, function (err, deletedTcategory) {
       // handle any potential errors here
       res.redirect('/');        
     });
});



module.exports = Router;
