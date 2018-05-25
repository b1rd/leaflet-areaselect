import React from 'react'
import PropTypes from 'prop-types'
// import L from 'leaflet'
// import { GeoJSON } from 'react-leaflet'
import { GridLayer } from "react-leaflet";
import LeafletRectangleFrame from './react-leflet-rectangle-frame'

const SCALE = 0.7
const PARAMETERS = {
  orientation: {
    portrait: 0.707,
    landscape: 1.414,
  },
}

const ORIENTATION = {
  landscape: 'landscape',
  portrait: 'portrait',
}

export default class RectangleFrame extends GridLayer {

  componentWillMount() {
    super.componentWillMount()
    // let areaSelect = LeafletRectangleFrame(this.context.map.getSize())

    const { y } = this.context.map.getSize()
    // TODO remove fixed vars
    const hArea = y * SCALE
    const wArea = hArea * PARAMETERS['orientation']['portrait']
    let mmWidth, mmHeight
    // mmWidth = Math.max(next.options.view.w, next.options.view.h) * 2
    // mmHeight = Math.min(next.options.view.w, next.options.view.h) * 2
    mmWidth = Math.min(210, 297) * 2
    mmHeight = Math.max(210, 297) * 2
    // }
    let areaSelect = LeafletRectangleFrame({
      width: wArea,
      height: hArea,
      mmWidth,
      mmHeight,
    })
    areaSelect.addTo(this.context.map)
    console.log('...',  wArea, hArea, mmWidth, mmHeight)
    // let area = LeafletRectangleFrame({
    //   width: 800,
    //   height: 400,
    // })
    // return area
  }
}


    // super.componentWillMount();
    // const { additionalGoogleLayer } = this.props;

    // this.leafletElement = new L.gridLayer.googleSubMutant(this.props);

    // if (additionalGoogleLayer) {
    //   this.leafletElement.addGoogleLayer(additionalGoogleLayer);
    // }