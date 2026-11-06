import {config} from './src/config/config.js'
import app from './src/app.js';
import {connectToDatabase} from './src/config/database.js'

const PORT = config.PORT || 8000

connectToDatabase()
.then(()=>{
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
})
.catch((error: unknown)=>{
     console.error("Server startup failed:", error);
     process.exit(1);
})

