const express = require('express');
const app = express();
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// MIDDLEWARES

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  req.time = new Date().toDateString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

// ROUTES V0

//app.get('/api/v1/tours', getTours);
//app.get('/api/v1/tours/:id', getOneTour);
//app.post('/api/v1/tours', createTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);
