import React, { Component } from "react"
import { Map, TileLayer, LayersControl } from "react-leaflet"
const { BaseLayer } = LayersControl;
import RectangleFrame from '../src'
const MAX_ZOOM = 24

export default class RectangleExample extends Component {
  render() {
    return (
      <Map
        center={[42.09618442380296, -71.5045166015625]}
        zoom={2}
        zoomControl={true}
        ref={el => (this.map = el)}
      >
        <RectangleFrame options={{ orientation: 'portrait' }}/>
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      </Map>
    )
  }
}