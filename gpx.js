function bounds(minlat, minlon, maxlat, maxlon)
{
    this.minlat = minlat;
    this.minlon = minlon;
    this.maxlat = maxlat;
    this.maxlon = maxlon;
}

function metadata()
{
    this.name = null;
    this.desc = null;
    this.copyright = null;
    this.time = null;
    this.links = [];
    this.keywords = null;
    this.bounds = null;
    this.extensions = null;
}

function wpt(latitude, longitude)
{
    this.lat = latitude;
    this.lon = longitude;
    this.ele = 0;
    this.time = null;
    this.magvar = 0;
    this.geoidheight = 0;
    this.name = null;
    this.cmt = null;
    this.desc = null;
    this.src =null;
    this.link = [];
    this.sym = null;
    this.type = null;
    this.fix = null;
    this.sat = 0;
    this.hdop = 0;
    this.vdop = 0;
    this.pdop = 0;
    this.ageofdgpsdata = 0;
    this.dgpsid = null;
    this.extensions = null;
    this.marker = null;
}

function rte() {
    this.name = null;
    this.cmt = null;
    this.desc = null;
    this.src = null;
    this.link = [];
    this.number = 0;
    this.type = null;
    this.extensions = null;
    this.rtept = [];
}

function trk() {
    this.name = null;
    this.cmt = null;
    this.desc = null;
    this.src = null;
    this.link = [];
    this.number = 0;
    this.type = null;
    this.extensions = null;
    this.trkseg = [];
}

function trkseg() {
    this.trkpt = [];
    this.extensions = null;
}

function gpx()
{
    this.metadata = [];
    this.wpt = [];
    this.rte = [];
    this.trk = [];
    this.extensions = [];
}
