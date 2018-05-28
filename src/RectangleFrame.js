import React from 'react'
import PropTypes from 'prop-types'
import { GridLayer } from "react-leaflet";
import LeafletRectangleFrame from './react-leaflet-rectangle-frame'
import './react-leaflet-rectangle-frame.css'

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

let areaSelect = null

export default class RectangleFrame extends GridLayer {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    options: PropTypes.object.isRequired,
    show: PropTypes.bool,
  }
  componentWillMount() {
    super.componentWillMount()
    const { options } = this.props
    const areaParams = this.getMeasures(options)
    areaSelect = LeafletRectangleFrame(areaParams)
    areaSelect.addTo(this.context.map)
    console.log(areaSelect.getBounds().toBBoxString())
  }

  componentWillReceiveProps(next) {
    if (!next.show) {
      if (areaSelect) {
        areaSelect.remove()
        areaSelect = null
      }
      return
    }
    const { options } = next
    const areaParams = this.getMeasures(options)
    // ERROR HERE
    // areaSelect = LeafletRectangleFrame(areaParams)
    // areaSelect.addTo(this.context.map)
  }

  getMeasures(options) {
    const { orientation, measureUnits, scale } = options
    const { y } = this.context.map.getSize()
    const height = y * scale
    const width = height * PARAMETERS['orientation'][orientation]
    // TODO PARAMS
    const mmWidth = Math.min(210, 297) * 2
    const mmHeight = Math.max(210, 297) * 2
    return {
      width,
      height,
      mmWidth,
      mmHeight,
      measureUnits
    }
  }
}