import express from "express";
import db from "../config/db.js";

const router = express.Router();


router.post("/", (req, res) => {
  const { user_id, flight_id, seat_number } = req.body;

  if (!user_id || !flight_id) {
    return res.status(400).json({ message: "Missing user_id or flight_id" });
  }

  const sql = "INSERT INTO bookings (user_id, flight_id, seat_number) VALUES (?, ?, ?)";
  db.query(sql, [user_id, flight_id, seat_number], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.sqlMessage });
    }

    res.status(201).json({
      message: "Flight booked successfully ",
      bookingId: result.insertId,
    });
  });
});

// ✅ Route 2: Booking with seat availability check
router.post("/book", async (req, res) => {
  const { flight_id, user_id } = req.body;

  try {
    // Step 1: Check availability
    const [flight] = await db.query(
      "SELECT seats_available FROM flights WHERE id = ?",
      [flight_id]
    );

    if (!flight.length) {
      return res.status(404).json({ message: "Flight not found" });
    }

    if (flight[0].seats_available > 0) {
      // Step 2: Book seat
      await db.query(
        "INSERT INTO bookings (flight_id, user_id) VALUES (?, ?)",
        [flight_id, user_id]
      );

      // Step 3: Decrease seat count
      await db.query(
        "UPDATE flights SET seats_available = seats_available - 1 WHERE id = ?",
        [flight_id]
      );

      res.json({ message: "Seat booked successfully " });
    } else {
      res.json({ message: "Sorry, no seats available " });
    }
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
