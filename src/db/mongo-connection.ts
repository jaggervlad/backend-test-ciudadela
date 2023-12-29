import mongoose from 'mongoose';

let isConnected = false;

export const mongooseConnection = async () => {
  if (!isConnected) {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/test-dev');
      console.log('Mongo its connected!');
      isConnected = true;
    } catch (error) {
      console.error('Error al conectar a MongoDB', error);
      throw error;
    }
  }
};
