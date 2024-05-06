$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedamenities[amenityId];
    }
    const amenitiesList = Object.values(selectedAmenities).join(', ');
    $('.amenities').find('h4').text(amenitiesList);
  });
    //get status of API
    $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
	}
    });
    // Fetch places
    const url = "http://0.0.0.0:5001/api/v1/places_search/";
    const data = {};
    const header = { "Content-Type": "application/json" };
    $.post({
        url: url,
        headers: header,
        data: data,
        dataType: "json"
    }).done(function(response) {
        // Loop through the response and create article tags representing Places in the section.places
        $.each(response, function(index, place) {
            const article = $('<article></article>');
            article.append($('<div class="title"></div>').text(place.name));
            article.append($('<div class="price_by_night"></div>').text('$' + place.price_by_night));
            article.append($('<div class="number_rooms"></div>').text(place.number_rooms + ' Bedrooms'));
            article.append($('<div class="number_bathrooms"></div>').text(place.number_bathrooms + ' Bathroom'));
            article.append($('<div class="description"></div>').text(place.description));
            $('.places').append(article);
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Request failed: " + textStatus + ", " + errorThrown);
    });
});
