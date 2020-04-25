import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import regeneratorRuntime from 'regenerator-runtime';
import router from './router';

// Initialize necessary variables
dotenv.config();
const app = express();

// Enable/disable cross origin resource sharing if necessary
app.use(cors());

app.use(morgan('dev'));

app.set('view engine', 'ejs');

// Enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up database
mongoose.Promise = global.Promise;
let uri;
if (!process.env.MONGODB_URI) {
  uri = 'mongodb://localhost/inboard';
} else {
  uri = process.env.MONGODB_URI;
}
const db = mongoose.connect(uri, {
  useMongoClient: true,
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log(`MongoDB connection successful to ${uri}`);
});

app.use('/api', router);

// Start the server
const port = process.env.PORT || 9000;
app.listen(port);
console.log(`Server listening on port ${port}`);
