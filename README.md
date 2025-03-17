# Product Management App

A simple Node.js and Express.js application to add, update, delete, and view products with file uploads.

# Features
1. Add new products with images  
2. View all products  
3. Edit and update products (including images)  
4. Delete products  


# Install dependencies
npm init -y
npm i express ejs mysql2 express-fileupload util
```

# Configure the database
- Create a MySQL database my_store.
- Import the provided `my_store.sql` file.
- Update your database connection details in `db.js`.


The server will run at http://127.0.0.1:3000/.

#Routes
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| GET    | `/`              | Prodauct Data page |
| GET    | `/add-product`   | Add product form |
| POST   | `/saveform`      | Save new product |
| GET    | `/product-data`  | View all products |
| GET    | `/edit/:id`      | Edit product form |
| POST   | `/updateform`    | Update product |
| GET    | `/delete/:id`    | Delete product |

# Technologies Used
- Backend: Node.js, Express.js  
- Database: MySQL  
- Templating Engine: EJS  
- File Uploads: `express-fileupload`  
- CSS Framework:** Bootstrap
- icons: Fontawesome  
