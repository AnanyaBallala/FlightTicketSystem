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
