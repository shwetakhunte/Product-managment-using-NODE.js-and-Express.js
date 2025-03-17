const express = require('express');
const app = express();


app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); // Parse JSON data
app.use(express.static('public/')); // Serve static files

// File Upload Middleware
const upload = require('express-fileupload');
app.use(upload());


const exe = require('./db');
const { cache } = require('ejs');

// Routes
app.get('/', async(req, res) => {

    const sql = 'SELECT * FROM products';
        const products = await exe(sql);

        const obj = {data : products};

        res.render('product-data.ejs', obj); 
});

app.get('/add-product', (req, res) => {
    res.render('add-new-product.ejs');
});

// Form handling
app.post('/saveform', async(req, res) => {

    //res.send(req.files.image.name);
    //res.send(req.body);   

    //move files
    var filenmae = new Date().getTime()+ "_" + req.files.image.name;
   const filepath= req.files.image.mv('public/uploads/'+filenmae)

    const sql = `INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)`;
    const values = [req.body.name, req.body.price, req.body.description, filenmae];

    const result = await exe(sql, values);
    console.log(result);
   //res.send('Add product successfully..');
   res.redirect('/product-data')
});


//view products

app.get('/product-data', async (req, res) => {
    try {
        const sql = 'SELECT * FROM products';
        const products = await exe(sql);

        const obj = {data : products};

        res.render('product-data.ejs', obj); 
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error retrieving products');
    }
});


//delet product

app.get('/delete/:id', async (req, res) => {

    try{
    var id = req.params.id;

    var sql = `Delete from products where id='${id}'`;
    const result = await exe(sql);
    console.log(result)


    // res.send("<h1>Deleted ....</h1>" + id)

    res.redirect('/product-data')
    }
    catch(err){
        console.error('Error deleting products:', err);
        res.status(500).send('Error deleting products');
    }
})



//edit product
app.get('/edit/:id', async(req,res)=>{
    try{
        var id = req.params.id;
        var sql =  `Select * from products where id='${id}'`;
        var result = await exe(sql);
        console.log(result);
        const obj = {data:result[0]};

        res.render('edit.ejs', obj);

    }
    catch(err){
        console.error('Error editing products:', err);
        res.status(500).send('Error editing products');
    }
})


//update product data

app.post('/updateform', async(req, res) => {
    try {

        if (req.files && req.files.image) {
            var filename = new Date().getTime() + "_" + req.files.image.name;
            await req.files.image.mv('public/uploads/' + filename);
        }

        
        const sql = `UPDATE products SET 
        name = '${req.body.name}',price = ${req.body.price},description = '${req.body.description}',image = '${filename}'WHERE id = '${req.body.id}'`;
        const result = await exe(sql);
        console.log(result);
        res.redirect('/product-data');
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).send("Error updating product");
    }
});


// Server Configuration
const PORT = process.env.PORT || 3000;
const HOST = '127.0.0.1';

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
