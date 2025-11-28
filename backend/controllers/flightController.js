import * as Flight from "../models/flightModel.js";




export const getAllFlights = (req, res) => {
  Flight.getAllFlights((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

export const addFlight = (req, res) => {
  const flightData = req.body;
  Flight.createFlight(flightData, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Flight added successfully!" });
  });
};


export const getFlightById = (req, res) => {
  const { id } = req.params;
  Flight.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Flight not found" });
    res.json(results[0]);
  });
};

export const searchFlights = (req, res) => {
  const { origin, destination, date } = req.query;
  Flight.search(origin, destination, date, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// export const addFlight = (req, res) => {
//   const flightData = req.body;
//   Flight.create(flightData, (err, results) => {
//     if (err) return res.status(500).json({ error: err });
//     res.status(201).json({ message: "Flight added successfully!" });
//   });
// };

