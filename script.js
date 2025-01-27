$(document).ready(function() {
  // Autocomplete for dropoff location
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

  // Show and hide clear button for dropoff location
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

  // Show and hide clear button for pickup location
  $("#clear-pickup").click(function() {
    $("#pickup").val('');
    $(this).hide();
  });

  $("#pickup").on('input', function() {
    if ($(this).val() === '') {
      $("#clear-pickup").hide();
    } else {
      $("#clear-pickup").show();
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
