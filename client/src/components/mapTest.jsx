const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

const Map = () => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicC1ob2FuZyIsImEiOiJjbGZ2cGI4eGQwOWNuM2VuMGtpaHIxNDFlIn0.RO72YmZihltpeE_pKIZCUQ'
  const map = new mapboxgl.Map({
    container: 'testMap',
    style: 'mapbox://styles/mapbox/streets-v11'
  })

  return <div id="testMap"></div>
}
export default Map
