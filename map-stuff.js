function loadPoints() {
    // hide all old points - I need to figure out how to fully delete them easily
    for (i=0;i<gpxs.wpt.length;i++)
        {
            gpxs.wpt[i].marker.setVisible(false);
        }
    var gpx_text = document.getElementById('gpx_input').value;
    var gpx_xml_doc = $.parseXML(gpx_text);

    gpxs = new gpx();

    $(gpx_xml_doc).find("wpt").each(function(){
            var lat = $(this).attr('lat');
            var lon = $(this).attr('lon');
            var time = $(this).find('time').text();
            var waypoint = new wpt(lat, lon);
            waypoint.name = "(" + lat + ", " + lon + ")";
            waypoint.time = time
                waypoint.marker = new google.maps.Marker({
                        position: new google.maps.LatLng(waypoint.lat,waypoint.lon),
                        map: map,
                        title: waypoint.name
                    });
            gpxs.wpt.push(waypoint);
        });
    gpxs.wpt.sort(function(a, b){
            if (a.time > b.time) {
                return 1;
            }
            return -1;
        });
    if (gpxs.wpt.length > 0) {
        var center = new google.maps.LatLng(gpxs.wpt[0].lat, gpxs.wpt[0].lon);
    }
    map.setCenter(center);
    loadSlider();
    showPoints();
}

function showPoints() {
    for (i=0;i<gpxs.wpt.length;i++)
        {
            gpxs.wpt[i].marker.setVisible(true);
        }
}

function loadAndShowPoints() {
    loadPoints();
    showPoints();
}

function loadSlider() {
    $(function() {
            $( "#slider" ).slider({ min: 0, max: gpxs.wpt.length - 1 });
        });
    $( "#slider" ).on("slidechange",function( event, ui ) {
            var point = gpxs.wpt[ui.value];
            var point_text = "(" + point.lat + ", " + point.lon + "), " + point.time;
            document.getElementById('header').innerHTML = 'Current point: ' + point_text;

            for (i=0;i<gpxs.wpt.length;i++)
                {
                    if (i != ui.value) {
                        gpxs.wpt[i].marker.setVisible(false);
                    }
                    else {
                        gpxs.wpt[i].marker.setVisible(true);
                    }
                }
        });
}

function initialize() {
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    gpxs = new gpx();

    loadPoints();

    var myLatlng = new google.maps.LatLng(1,1);
    var mapOptions = {
        zoom: 5,
        center: myLatlng
    }

    map.setZoom(15);

    document.getElementById("loadPoints").onclick = loadPoints;
    document.getElementById("showPoints").onclick = showPoints;

}

google.maps.event.addDomListener(window, 'load', initialize);
