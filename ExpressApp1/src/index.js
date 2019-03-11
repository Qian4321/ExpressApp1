import esriLoader from 'esri-loader';
esriLoader.loadCss('http://127.0.0.1:3001/arcgis_js_api/library/4.9/esri/css/main.css');
//esriLoader.loadCss('https://js.arcgis.com/4.9/esri/css/main.css');
const options = {
  //url: 'http://127.0.0.1:3001/arcgis_js_api/library/4.9/init.js',
 // url:'https://js.arcgis.com/4.9/'
  url:'http://127.0.0.1:3001/arcgis_js_api/library/4.9/dojo/dojo.js'
};
esriLoader.loadModules([
      "esri/layers/WebTileLayer",
      "esri/Map",
      "esri/Basemap",
      "esri/widgets/BasemapToggle",
      "esri/views/SceneView"], options)
.then(([WebTileLayer,Map,Basemap, BasemapToggle, SceneView]) => {
  // create map with the given options at a DOM node w/ id 'mapNode'
      let mapBaseLayer = new WebTileLayer({
         urlTemplate: "https://stamen-tiles-{subDomain}.a.ssl.fastly.net/terrain/{level}/{col}/{row}.png",
         subDomains: ["a", "b", "c", "d"],
         copyright: "Map tiles by <a href=\"http://stamen.com/\">Stamen Design</a>, " +
          "under <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a>. " +
          "Data by <a href=\"http://openstreetmap.org/\">OpenStreetMap</a>, " +
          "under <a href=\"http://creativecommons.org/licenses/by-sa/3.0\">CC BY SA</a>."
      });
      // Create a Basemap with the WebTileLayer. The thumbnailUrl will be used for
      // the image in the BasemapToggle widget.
      let stamen = new Basemap({
        baseLayers: [mapBaseLayer],
        title: "Terrain",
        id: "terrain",
        thumbnailUrl: "https://stamen-tiles.a.ssl.fastly.net/terrain/10/177/409.png"
      });

      let map = new Map({
        basemap: "satellite",
        ground: "world-elevation"
      });

      let initCamera = {
        heading: 124.7,
        tilt: 82.9,
        position: {
          latitude: 40.713906,
          longitude: -111.848111,
          z: 1990
        }
      };

      let view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: initCamera
      });

      view.when(function() {
        // Add a basemap toggle widget to toggle between basemaps
        let toggle = new BasemapToggle({
          titleVisible: true,
          view: view,
          nextBasemap: stamen
        });

        // Add widget to the top right corner of the view
        view.ui.add(toggle, "top-right");
      });
}).catch(err => {
  // handle any script or module loading errors
  console.error(err);
});