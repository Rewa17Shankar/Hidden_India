
document.addEventListener("DOMContentLoaded", function () {
  // Hide all details divs initially
  const detailsDivs = document.querySelectorAll(".details");
  detailsDivs.forEach((div) => {
    div.style.display = "none";
  });

  // Add event listeners to buttons
  document
    .getElementById("btn-idukki")
    .addEventListener("click", function () {
      showDiv("idukki");
    });
  document
    .getElementById("btn-auli")
    .addEventListener("click", function () {
      showDiv("auli");
    });
  document
    .getElementById("btn-meghalaya")
    .addEventListener("click", function () {
      showDiv("meghalaya");
    });
  document
    .getElementById("btn-doodhpathri")
    .addEventListener("click", function () {
      showDiv("doodhpathri");
    });
  document
    .getElementById("btn-khajjar")
    .addEventListener("click", function () {
      showDiv("khajjar");
    });

  function showDiv(id) {
    // Hide all details divs
    detailsDivs.forEach((div) => {
      div.style.display = "none";
    });
    // Show the selected div
    document.getElementById(id).parentElement.style.display = "block";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Hide all details divs initially
  const detailsDivs = document.querySelectorAll(".details");
  detailsDivs.forEach((div) => {
    div.style.display = "none";
  });

  // Add event listeners to buttons
  document
    .getElementById("btn-idukki")
    .addEventListener("click", function () {
      showDiv("idukki");
    });
  // Add listeners for other destination buttons here
  // e.g., document.getElementById('btn-auli').addEventListener('click', function () { showDiv('auli'); });

  function showDiv(id) {
    // Hide all details divs
    detailsDivs.forEach((div) => {
      div.style.display = "none";
    });
    // Show the selected div
    document.getElementById(id).parentElement.style.display = "block";
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Function to calculate the total amount
  function calculateAmount(bookingForm) {
      const startDate = bookingForm.querySelector('#booking-date').value;
      const endDate = bookingForm.querySelector('#end-date').value;
      const roomCount = bookingForm.querySelector('#room-count').value;
      const amountDisplay = bookingForm.querySelector('#amount-display');
      
      if (startDate && endDate && roomCount) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
          const totalAmount = days * roomCount * 600; // Assuming 600 per room per day
          amountDisplay.textContent = `Total Amount: ₹${totalAmount}`;
      } else {
          amountDisplay.textContent = 'Please select valid dates and room count';
      }
  }

  // Function to save booking details and clear the form
  function bookNow(bookingForm, formId) {
      const startDate = bookingForm.querySelector('#booking-date').value;
      const endDate = bookingForm.querySelector('#end-date').value;
      const roomCount = bookingForm.querySelector('#room-count').value;
      const amountDisplay = bookingForm.querySelector('#amount-display').textContent;
      
      if (startDate && endDate && roomCount && amountDisplay) {
          const bookingDetails = {
              startDate: startDate,
              endDate: endDate,
              roomCount: roomCount,
              amount: amountDisplay
          };

          let bookingHistory = JSON.parse(localStorage.getItem('bookingHistory')) || [];
          bookingHistory.push(bookingDetails);
          localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));

          // Clear the form inputs
          bookingForm.querySelector('#booking-date').value = '';
          bookingForm.querySelector('#end-date').value = '';
          bookingForm.querySelector('#room-count').value = '1';
          bookingForm.querySelector('#amount-display').textContent = '';

          alert('Booking confirmed!');
      } else {
          alert('Please fill in all fields and calculate the amount first.');
      }
  }

  // Function to display booking history
  function reviewBookings() {
      const bookingHistory = JSON.parse(localStorage.getItem('bookingHistory')) || [];
      const reviewSection = document.getElementById('review-section');
      reviewSection.innerHTML = ''; // Clear previous reviews

      if (bookingHistory.length > 0) {
          bookingHistory.forEach((booking, index) => {
              const bookingInfo = document.createElement('div');
              bookingInfo.className = 'booking-info';
              bookingInfo.innerHTML = `
                  <p><strong>Booking ${index + 1}:</strong></p>
                  <p>Start Date: ${booking.startDate}</p>
                  <p>End Date: ${booking.endDate}</p>
                  <p>Rooms Per Person: ${booking.roomCount}</p>
                  <p>${booking.amount}</p>
              `;
              reviewSection.prepend(bookingInfo);
          });
      } else {
          reviewSection.innerHTML = '<p>No bookings found.</p>';
      }
  }

  // Add event listeners for all forms
  document.querySelectorAll('form').forEach((form, index) => {
      form.querySelector('#calculate-amount').addEventListener('click', function () {
          calculateAmount(form);
      });

      const bookNowButton = form.parentElement.querySelector('#book-now');
      bookNowButton.addEventListener('click', function () {
          bookNow(form, `form-${index + 1}`);
      });

      const reviewButton = form.parentElement.querySelector('#review');
      reviewButton.addEventListener('click', function () {
          reviewBookings();
      });
  });
});

