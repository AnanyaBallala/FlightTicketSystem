document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const date = document.getElementById("date").value;

  const results = document.getElementById("resultsContainer");
  results.innerHTML = `
    <h3>Available Flights from ${from} to ${to} on ${date}</h3>
    <div class="flight-card">
      <p>Flight: AI203 | Airline: Air India | Time: 10:00 AM</p>
      <button onclick="bookFlight('AI203')">Book Now</button>
    </div>
    <div class="flight-card">
      <p>Flight: 6E110 | Airline: Indigo | Time: 12:30 PM</p>
      <button onclick="bookFlight('6E110')">Book Now</button>
    </div>
  `;
});

function bookFlight(flightId) {
  // Create a flight object
  const flightObject = {
    id: flightId,
    name: flightId, // or full flight name if you have it
    airline: flightId === "AI203" ? "Air India" : "Indigo",
    time: flightId === "AI203" ? "10:00 AM" : "12:30 PM"
  };

  // Save the full object
  localStorage.setItem("selectedFlight", JSON.stringify(flightObject));

  // Save from/to/date
  localStorage.setItem("fromCity", document.getElementById("from").value);
  localStorage.setItem("toCity", document.getElementById("to").value);
  localStorage.setItem("flightDate", document.getElementById("date").value);

  // Go to booking page
  window.location.href = "booking.html";
}
