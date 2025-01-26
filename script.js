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

$(document).ready(function() {
  $("#dropoff").autocomplete({
    source: function(request, response) {
      $.ajax({
        url: "https://api.locationiq.com/v1/autocomplete.php",
        data: {
          key: "YOUR_API_KEY",
          q: request.term,
          format: "json"
        },
        success: function(data) {
          response($.map(data, function(item) {
            return {
              label: item.display_name,
              value: item.display_name
            };
          }));
        }
      });
    },
    minLength: 2,
    select: function(event, ui) {
      $("#dropoff").val(ui.item.label);
      $("#clear-dropoff").show();
      return false;
    }
  });

  $("#clear-dropoff").click(function() {
    $("#dropoff").val('');
    $(this).hide();
  });

  $("#dropoff").on('input', function() {
    if ($(this).val() === '') {
      $("#clear-dropoff").hide();
    } else {
      $("#clear-dropoff").show();
    }
  });
});

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
