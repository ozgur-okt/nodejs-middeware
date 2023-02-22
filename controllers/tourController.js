const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    time: req.time,
    count: tours.length,
    data: {
      tours,
    },
  });
};

exports.getOneTour = (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    time: req.time,
    data: { tour },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: tours,
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = parseInt(req.params.id);
  
  // we get data with id but do process with index below
  // id and index may not the same
  //tours[id] = { ...tours[id], ...req.body };
  // a solution:

  for (let i = 0; i < tours.length; i++) {
    if (tours[i].id === id) {
      tours[i] = { ...tours[i], ...req.body };
      //console.log(tours[i])
    }
  }
  res.status(204).json({
    status: 'success',
    updatedData: tours[id],
  });
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => console.log(err)
  );
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const newList = tours.filter((el) => el.id !== id);
  fs.writeFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(newList)
  );
  //console.log(newList);
  res.status(204).json({
    status: 'success - deleted',
    deletedData: tours[id],
  });
};

exports.checkID = (req, res, next, val) => {
  console.log(`Tour is is ${val}`);
  for (let i = 0; i < tours.length; i++) {
      if(!(tours[i].id == req.params.id)){
          return res.status(404).json({
              status: "fail",
              message: "Invalid ID"
          })
      }
  }
  next();
};

exports.isBodyValid = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
      return res.status(404).json({
          status: 'fail',
          message: 'Missing name or price',
      });
  }
  next();
};
