import app from './app'

// database
import './database'

// starting the server
app.listen(3000, () => {
    console.log('sever listen on port ', 3000);
});