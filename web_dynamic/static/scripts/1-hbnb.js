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
});
