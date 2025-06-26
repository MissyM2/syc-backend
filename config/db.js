// module.exports = {
//   url: 'mongodb+srv://fdmaloney:Daisl9515$!#@@fdmclustersandbox.0zdlunl.mongodb.net/syc-backend?retryWrites=true&w=majority&appName=FDMClusterSandbox',
// };

// database connection file to MongoDB
import { mongoose } from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`mongodb connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
