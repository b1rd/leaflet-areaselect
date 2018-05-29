import React, { Component } from "react"
import { Map, TileLayer, LayersControl } from "react-leaflet"
const { BaseLayer } = LayersControl;
import RectangleFrame from '../src'
const MAX_ZOOM = 24
const SCALE = 0.7
export default class RectangleExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      format: 'a4',
      orientation: 'portrait',
      show: true,
      bbox: ''
    }
  }

  onChangeBbox = (bbox) => {
    const { bboxStr } = bbox
    this.setState({ bbox: bboxStr })
  }

  handleOrientation = (e) => {
    this.setState({
      orientation: e.target.value
    })
  }

  handleFormat = (e) => {
    this.setState({
      format: e.target.value
    })
  }

  handleShow = () => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const { orientation, measureUnits, format, show, bbox } = this.state
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
          <div>
            <h2>Bbox</h2>
            <div>
              {bbox}
            </div>
          </div>
          <div style={{ padding: '10px' }}>
            <h3>Options</h3>
            <div>
              <div style={{ marginBottom: '10px' }}>
                <span>Orientation</span>
                <select name="text" value={this.state.orientation} onChange={this.handleOrientation}>
                  <option value="landscape">landscape</option> 
                  <option value="portrait">portrait</option>
                </select>
              </div>
              <div>
                <span>Format</span>
                <select name="text" value={this.state.format} onChange={this.handleFormat}>
                  <option value="a0">a0</option>
                  <option value="a1">a1</option>
                  <option value="a2">a2</option>
                  <option value="a3">a3</option>
                  <option value="a4">a4</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Map
            center={[42.09618442380296, -71.5045166015625]}
            zoom={2}
            zoomControl={true}
            ref={el => (this.map = el)}
          >
            {this.state.show && <RectangleFrame options={{ orientation, measureUnits: 'мм', format, scale: SCALE }} onChange={this.onChangeBbox} />}
            <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          </Map>
        </div>
      </div>
    )
  }
}