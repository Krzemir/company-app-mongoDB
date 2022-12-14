const Product = require('../models/products.model')

exports.getAll = async (req, res) => {
    try {
      res.json(await Product.find())
    }
    catch(err) {
      res.status(500).json({ message: err})
    }
  };

  exports.getRandom = async (req, res) => {
    try {
      const count = await Product.countDocument()
      const rand = Math.floor(Math.random() * count);
      const product = await Product.findOne().skip(rand);
      if(!product) res.status(404).json({ message: 'Not found'});
      else res.json(product);
    }
    catch (err) {
      res.status(500).json({ message: err })
    }
  };

  exports.getId = async (req, res) => {
    try {
        const employee = await Product.findById (req.params.id);
        if (!employee) {
          res.status(404).json({ message: 'Not found'})
        } 
        else res.json(employee)
    }
    catch(err) {
      res.status(500).json({ message: err})
    }
  };
  
  exports.postOne = async (req, res) => {
    try {
      const { name, client } = req.body;
      const newProduct = new Product({
        name: name,
        client: client
      })
      await newProduct.save()
      res.json({ message: 'OK'})
    }
    catch(err) {
      res.status(500).json({ message: err})
    }
  };
  
  exports.putOne = async (req, res) => {
    const { name, client } = req.body;
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        product.name = name;
        product.client = client;
        await product.save()
        res.json({ message: 'OK'})
      } 
      else res.status(404).json({ message: 'Not Found'})
    }
    catch(err) {
      res.status(500).json({ message: err})
    }
  };

  exports.deleteOne = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
      if (product) {
        await Product.deleteOne({ _id: req.params.id})
        res.json({ message: 'OK'})
      }
      else res.status(404).json({ message: err})
    }
    catch (err) {
      res.status(500).json({ message: err })
    }
  };