import mongoose from 'mongoose';

export default (connetionString: string) => {
  
  const connect = () => {
    mongoose
      .connect(
        connetionString,
        { 
            useNewUrlParser: true
        }
      )
      .then(() => {
        return console.info(`Successfully connected to ${connetionString}`);
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
