import mongoose from 'mongoose';
import { DB_URL } from './config/env';

const connect = mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err: Error) => console.log(err));
