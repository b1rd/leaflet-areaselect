import React from 'react'
import PropTypes from 'prop-types'
import { GridLayer } from "react-leaflet";
import LeafletRectangleFrame from './react-leaflet-rectangle-frame'
import './react-leaflet-rectangle-frame.css'

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
  // static get propTypes() {
  //   return {
  //     options: React.PropTypes.object
  //   }
  // }
  componentWillMount() {
    super.componentWillMount()
    const { orientation } = this.props.options
    const { y } = this.context.map.getSize()
    const hArea = y * SCALE
    const wArea = hArea * PARAMETERS['orientation'][orientation]
    let mmWidth, mmHeight
    mmWidth = Math.min(210, 297) * 2
    mmHeight = Math.max(210, 297) * 2
    let areaSelect = LeafletRectangleFrame({
      width: wArea,
      height: hArea,
      mmWidth,
      mmHeight,
    })
    areaSelect.addTo(this.context.map)
    console.log(areaSelect.getBounds().toBBoxString())
  }
}