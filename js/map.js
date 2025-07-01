const loader = new google.maps.plugins.loader.Loader({
  apiKey: "AIzaSyBIzuqxmC-SHPpqQs9Fie-NgstNd8xQGlA",
  version: "weekly",
});

loader.load().then(() => {
  initMap();
});

function initMap() {
  var styleArray = [
    {
      featureType: "all",
      stylers: [{ saturation: -100 }],
    },
  ];

  var mapDiv = document.getElementById("contact-map");
  if (!mapDiv) return;

  var LatLng = { lat: 58.341887, lng: 8.596423 };
  var styledMap = new google.maps.StyledMapType(styleArray, {
    name: "Styled Map",
  });

  var map = new google.maps.Map(mapDiv, {
    zoom: 10,
    center: LatLng,
    mapTypeControlOptions: {
      mapTypeIds: ["roadmap", "map_style"],
    },
    scrollwheel: false,
  });

  var pin = "";
  var pinElem = document.querySelector("[data-pin]");
  if (pinElem) {
    pin = pinElem.dataset.pin;
  }
  // Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set("map_style", styledMap);
  map.setMapTypeId("map_style");
}
