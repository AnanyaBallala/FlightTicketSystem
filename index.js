function validateLogin(event) {
  event.preventDefault(); 

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let errorMsg = document.getElementById("errorMsg");

 
  if (username === "admin" && password === "1234") {
    window.location.href = "booking.html"; 
  } else {
    errorMsg.textContent = "Invalid username or password!";
  }

  return false;
}
let bookings = [];

function bookTicket() {
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let date = document.getElementById("date").value;
  let passengers = document.getElementById("passengers").value;

  let basePrice = 5000;
  let totalPrice = basePrice * passengers;

  let booking = {
    id: Date.now(),
    from,
    to,
    date,
    passengers,
    totalPrice
  };

  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  displayBookings();

  
  document.querySelector("form").reset();
}

function displayBookings() {
  let ticketDiv = document.getElementById("ticketDetails");
  ticketDiv.style.display = "block";
  ticketDiv.innerHTML = "<h3>Your Bookings</h3>";

  bookings.forEach(b => {
    ticketDiv.innerHTML += `
      <div class="single-ticket">
        <p><strong>From:</strong> ${b.from} → <strong>To:</strong> ${b.to}</p>
        <p><strong>Date:</strong> ${b.date} | <strong>Passengers:</strong> ${b.passengers}</p>
        <p><strong>Total Price:</strong> ₹${b.totalPrice}</p>
        <button onclick="updateBooking(${b.id})">Update</button>
        <button onclick="deleteBooking(${b.id})"> Delete</button>
      </div>
    `;
  });
}

function deleteBooking(id) {
  bookings = bookings.filter(b => b.id !== id);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  displayBookings();
}

function updateBooking(id) {
  let booking = bookings.find(b => b.id === id);
  if (booking) {
    let newPassengers = prompt("Enter new number of passengers:", booking.passengers);
    if (newPassengers) {
      booking.passengers = newPassengers;
      booking.totalPrice = 5000 * newPassengers;
      localStorage.setItem("bookings", JSON.stringify(bookings));
      displayBookings();
    }
  }
}

window.onload = function() {
  let saved = localStorage.getItem("bookings");
  if (saved) {
    bookings = JSON.parse(saved);
    displayBookings();
  }
};
