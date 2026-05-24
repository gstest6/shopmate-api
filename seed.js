const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

const users = [
  { name: 'Amit Sharma', email: 'amit@shopmate.com', password: 'Pass@123', phone: '9876543210', role: 'customer' },
  { name: 'Priya Patel', email: 'priya@shopmate.com', password: 'Pass@123', phone: '9823456789', role: 'customer' },
  { name: 'Rahul Verma', email: 'rahul@shopmate.com', password: 'Pass@123', phone: '9712345678', role: 'customer' },
  { name: 'Sneha Joshi', email: 'sneha@shopmate.com', password: 'Pass@123', phone: '9634567890', role: 'customer' },
  { name: 'Karan Mehta', email: 'karan@shopmate.com', password: 'Pass@123', phone: '9556789012', role: 'customer' },
  { name: 'Neha Singh', email: 'neha@shopmate.com', password: 'Pass@123', phone: '9478901234', role: 'customer' },
  { name: 'Vikram Das', email: 'vikram@shopmate.com', password: 'Pass@123', phone: '9390123456', role: 'customer' },
  { name: 'Anjali Roy', email: 'anjali@shopmate.com', password: 'Pass@123', phone: '9212345678', role: 'customer' },
  { name: 'Deepak Nair', email: 'deepak@shopmate.com', password: 'Pass@123', phone: '9134567890', role: 'customer' },
  { name: 'Admin User', email: 'admin@shopmate.com', password: 'Admin@123', phone: '9000000000', role: 'admin' }
];

const products = [
  { name: 'iPhone 15', description: 'Latest Apple smartphone', price: 79999, stock: 50, category: 'Electronics' },
  { name: 'Samsung Galaxy S24', description: 'Flagship Android phone', price: 69999, stock: 40, category: 'Electronics' },
  { name: 'Sony WH-1000XM5', description: 'Noise cancelling headphones', price: 24999, stock: 30, category: 'Electronics' },
  { name: 'MacBook Air M2', description: 'Lightweight Apple laptop', price: 114999, stock: 20, category: 'Electronics' },
  { name: 'Nike Air Max', description: 'Premium running shoes', price: 8999, stock: 100, category: 'Footwear' },
  { name: 'Adidas Ultraboost', description: 'High performance running shoes', price: 12999, stock: 80, category: 'Footwear' },
  { name: 'Levi\'s 511 Jeans', description: 'Slim fit denim jeans', price: 3999, stock: 150, category: 'Clothing' },
  { name: 'Allen Solly Shirt', description: 'Formal cotton shirt', price: 1999, stock: 200, category: 'Clothing' },
  { name: 'Instant Pot', description: 'Electric pressure cooker', price: 7999, stock: 60, category: 'Kitchen' },
  { name: 'Philips Air Fryer', description: 'Healthy cooking air fryer', price: 9999, stock: 45, category: 'Kitchen' },
  { name: 'Yoga Mat', description: 'Non slip exercise mat', price: 1499, stock: 120, category: 'Sports' },
  { name: 'Protein Powder', description: 'Whey protein supplement', price: 2999, stock: 90, category: 'Sports' },
  { name: 'Harry Potter Set', description: 'Complete 7 book collection', price: 2499, stock: 70, category: 'Books' },
  { name: 'Atomic Habits', description: 'Self improvement bestseller', price: 499, stock: 200, category: 'Books' },
  { name: 'Himalaya Face Wash', description: 'Herbal neem face wash', price: 299, stock: 300, category: 'Beauty' },
  { name: 'Lakme Lipstick', description: 'Long lasting matte lipstick', price: 599, stock: 250, category: 'Beauty' },
  { name: 'boAt Earbuds', description: 'Wireless TWS earbuds', price: 1999, stock: 180, category: 'Electronics' },
  { name: 'Puma T-Shirt', description: 'Dry fit sports t-shirt', price: 1299, stock: 160, category: 'Clothing' },
  { name: 'Milton Water Bottle', description: 'Stainless steel bottle 1L', price: 799, stock: 400, category: 'Kitchen' },
  { name: 'Fastrack Watch', description: 'Casual analog wristwatch', price: 2499, stock: 75, category: 'Accessories' }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared existing data');

    const createdUsers = await User.insertMany(users);
    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdUsers.length} users`);
    console.log(`Created ${createdProducts.length} products`);

    const orders = [
      {
        user: createdUsers[0]._id,
        items: [
          { product: createdProducts[0]._id, quantity: 1, price: 79999 },
          { product: createdProducts[2]._id, quantity: 1, price: 24999 }
        ],
        totalAmount: 104998,
        status: 'delivered',
        address: '12 MG Road, Mumbai 400001'
      },
      {
        user: createdUsers[1]._id,
        items: [{ product: createdProducts[4]._id, quantity: 2, price: 8999 }],
        totalAmount: 17998,
        status: 'shipped',
        address: '45 Park Street, Kolkata 700016'
      },
      {
        user: createdUsers[2]._id,
        items: [
          { product: createdProducts[6]._id, quantity: 1, price: 3999 },
          { product: createdProducts[7]._id, quantity: 2, price: 1999 }
        ],
        totalAmount: 7997,
        status: 'confirmed',
        address: '78 Brigade Road, Bangalore 560001'
      },
      {
        user: createdUsers[3]._id,
        items: [{ product: createdProducts[3]._id, quantity: 1, price: 114999 }],
        totalAmount: 114999,
        status: 'pending',
        address: '23 Connaught Place, Delhi 110001'
      },
      {
        user: createdUsers[4]._id,
        items: [
          { product: createdProducts[13]._id, quantity: 2, price: 499 },
          { product: createdProducts[12]._id, quantity: 1, price: 2499 }
        ],
        totalAmount: 3447,
        status: 'delivered',
        address: '56 Anna Salai, Chennai 600002'
      },
      {
        user: createdUsers[5]._id,
        items: [{ product: createdProducts[9]._id, quantity: 1, price: 9999 }],
        totalAmount: 9999,
        status: 'cancelled',
        address: '34 FC Road, Pune 411004'
      },
      {
        user: createdUsers[6]._id,
        items: [
          { product: createdProducts[16]._id, quantity: 2, price: 1999 },
          { product: createdProducts[11]._id, quantity: 1, price: 2999 }
        ],
        totalAmount: 6997,
        status: 'shipped',
        address: '89 CG Road, Ahmedabad 380009'
      },
      {
        user: createdUsers[7]._id,
        items: [{ product: createdProducts[19]._id, quantity: 1, price: 2499 }],
        totalAmount: 2499,
        status: 'delivered',
        address: '67 MG Road, Jaipur 302001'
      },
      {
        user: createdUsers[8]._id,
        items: [
          { product: createdProducts[14]._id, quantity: 3, price: 299 },
          { product: createdProducts[15]._id, quantity: 2, price: 599 }
        ],
        totalAmount: 2095,
        status: 'confirmed',
        address: '12 Marine Drive, Kochi 682001'
      },
      {
        user: createdUsers[0]._id,
        items: [{ product: createdProducts[1]._id, quantity: 1, price: 69999 }],
        totalAmount: 69999,
        status: 'pending',
        address: '12 MG Road, Mumbai 400001'
      }
    ];

    const createdOrders = await Order.insertMany(orders);
    console.log(`Created ${createdOrders.length} orders`);
    console.log('\nSeed complete. Your test data:');
    console.log('- 10 users (9 customers + 1 admin)');
    console.log('- 20 products across 7 categories');
    console.log('- 10 orders with statuses: pending, confirmed, shipped, delivered, cancelled');
    console.log('\nSample user emails to test with:');
    console.log('  amit@shopmate.com');
    console.log('  admin@shopmate.com');

    mongoose.connection.close();
  } catch (err) {
    console.error('Seed error:', err.message);
    mongoose.connection.close();
  }
}

seed();