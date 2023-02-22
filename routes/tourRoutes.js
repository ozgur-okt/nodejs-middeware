const express = require('express');
const {getTours, createTour, getOneTour, updateTour, 
        deleteTour, checkID, isBodyValid} = require('../controllers/tourController');

const tourRouter = express.Router();

tourRouter.param("id", checkID)

tourRouter.route('/').get(getTours).post(isBodyValid, createTour);
tourRouter.route('/:id').get(getOneTour).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;