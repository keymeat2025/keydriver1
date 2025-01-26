function navigateTo(page) {
  window.location.href = page;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const pickupInput = document.getElementById('pickup');
  pickupInput.value = `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

document.getElementById('trip-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const pickup = document.getElementById('pickup').value;
  const dropoff = document.getElementById('dropoff').value;
  const datetime = document.getElementById('datetime').value;

  // Add your booking logic here
  alert(`Trip booked from ${pickup} to ${dropoff} at ${datetime}`);
});

function scheduleLater() {
  alert('Trip scheduled for later');
}
