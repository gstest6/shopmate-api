const fs = require('fs');

fs.writeFileSync('models/User.js', [
"const mongoose = require('mongoose');",
"",
"const userSchema = new mongoose.Schema({",
"  name:     { type: String, required: true },",
"  email:    { type: String, required: true, unique: true },",
"  password: { type: String, required: true },",
"  phone:    { type: String },",
"  isActive: { type: Boolean, default: true },",
"  role:     { type: String, enum: ['customer', 'admin'], default: 'customer' }",
"}, { timestamps: true });",
"",
"module.exports = mongoose.model('User', userSchema);",
].join('\n'));

fs.writeFileSync('models/Product.js', [
"const mongoose = require('mongoose');",
"",
"const productSchema = new mongoose.Schema({",
"  name:        { type: String, required: true },",
"  description: { type: String },",
"  price:       { type: Number, required: true },",
"  stock:       { type: Number, default: 0 },",
"  category:    { type: String, required: true },",
"  isAvailable: { type: Boolean, default: true }",
"}, { timestamps: true });",
"",
"module.exports = mongoose.model('Product', productSchema);",
].join('\n'));

fs.writeFileSync('models/Order.js', [
"const mongoose = require('mongoose');",
"",
"const orderSchema = new mongoose.Schema({",
"  user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },",
"  items: [{",
"    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },",
"    quantity: { type: Number, required: true },",
"    price:    { type: Number, required: true }",
"  }],",
"  totalAmount: { type: Number, required: true },",
"  status:      { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },",
"  address:     { type: String, required: true }",
"}, { timestamps: true });",
"",
"module.exports = mongoose.model('Order', orderSchema);",
].join('\n'));

console.log('All model files written successfully.');