const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/',(req,res) => {
    res.send("hello from node API Server Updated");
});

app.get('/api/products', async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/api/product/:id', async(req,res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
})

app.post('/api/products', async(req,res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Update a product
app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;

        // Check if any of the required fields are missing in the request body
        if (!name) {
            return res.status(400).json({ message: 'Name required' });
        }

        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true });

        // Check if the product was found and updated
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Return the updated product
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// delete 

app.delete('/api/product/:id',async (req,res) => {
    try {
        const {id} = req.params;

        await Product.findByIdAndDelete(id);

        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }

        return res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});




mongoose.connect("mongodb+srv://rishikvissa7:admin123@backenddb.i3jxebn.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });

})
.catch(() => {
  console.log("Connection failed");  
})