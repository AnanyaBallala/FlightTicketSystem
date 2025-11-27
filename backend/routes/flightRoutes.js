import express from "express";
import { getAllFlights, getFlightById, searchFlights, addFlight } from "../controllers/flightController.js";

const router = express.Router();

// Get all flights
router.get("/", getAllFlights);

// Get a specific flight by ID
router.get("/:id", getFlightById);

// Search flights by origin, destination, and date
router.get("/search/flights", searchFlights);

// Add a new flight
router.post("/", addFlight);

export default router;
