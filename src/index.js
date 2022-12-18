 const bodyParser = require('body-parser');
 const express = require ('express');
 const workoutRouter = require('./routes/workout_routes');
 const {PORT} = require('./config');

 const app = express();


app.use(bodyParser.json());
app.use("/api/gym", workoutRouter);



app.listen(PORT, ()=>{
    console.log('api is listening on port ' + PORT);
});

 
