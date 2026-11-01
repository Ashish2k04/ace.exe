import {config} from './src/config/config.js'
import app from './src/app.js';
import {connectToDatabase} from './src/config/database.js'

const PORT = config.PORT

connectToDatabase()
.then(()=>{
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
})
.catch((error)=>{
      console.error(error.message);
      process.exit(1);
})

