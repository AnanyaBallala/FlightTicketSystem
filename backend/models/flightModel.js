import db from "../config/db.js";

export const createFlight = (flightData, callback) => {
    const { flight_number, origin, destination, departure_time, arrival_time, price, seats_available } = flightData;
    const sql = "INSERT INTO flights (flight_number, origin, destination, departure_time, arrival_time, price, seats_available) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [flight_number, origin, destination, departure_time, arrival_time, price, seats_available], callback);
};

export const getAllFlights = (callback) => {
    const sql = "SELECT * FROM flights";
    db.query(sql, callback);
};
