const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

/* 'mongodb+srv://hiep1999:fghj1234@test.zoe2d.mongodb.net/BookDatabase?retryWrites=true&w=majority' */

mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://hiep1999:Danghoanghiep123@test.zoe2d.mongodb.net/MyFirstDb?retryWrites=true&w=majority')
  .then(() => { console.log('Success connected!'); })
  .catch(err => { throw err; })

const categoryRouter = require('./routes/CategoryRoute');
const bookRouter = require('./routes/BookRoute');
const userRouter = require('./routes/UserRoute');
const orderRouter = require('./routes/OrderRoute');

app.use('/api/category', categoryRouter);
app.use('/api/book', bookRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);

/*app.get('/', (req, res) => { res.json('Hello World!') });*/

app.listen(PORT, () => console.log(`Connect to http://localhost:${PORT}`));