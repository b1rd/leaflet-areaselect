import React from 'react'
import PropTypes from 'prop-types'
import { MapControl } from "react-leaflet";
import LeafletRectangleFrame from './react-leaflet-rectangle-frame'
import './react-leaflet-rectangle-frame.css'


const ORIENTATION = {
  landscape: 'landscape',
  portrait: 'portrait',
}

const PAGE_SIZES = {
  a4: {
    w: 210,
    h: 297,
  },
  a3: {
    w: 297,
    h: 420,
  },
  a2: {
    w: 420,
    h: 594,
  },
  a1: {
    w: 594,
    h: 841,
  },
  a0: {
    w: 841,
    h: 1189,
  },
}

export default class RectangleFrame extends MapControl {
  static propTypes = {
    options: PropTypes.object,
    onChange: PropTypes.func,
  }
  createLeafletElement(props) {
    const { options } = props
    return new LeafletRectangleFrame(this.getMeasures(options))
  }

  updateLeafletElement(fromProps, toProps) {
    // Changes from new props
    if (JSON.stringify(fromProps.options) !== JSON.stringify(toProps.options)) {
      this.leafletElement.setOptions(this.getMeasures(toProps.options))
      this.updateBbox(this.leafletElement.getBounds())
    }
  }

  componentDidMount() {
    this.leafletElement.addTo(this.context.map)
    this.updateBbox(this.leafletElement.getBounds())
  }

  updateBbox = (bbox) => {
    // Changes from resize & other map events
    const { onChange } = this.props
    const bboxStr = bbox.toBBoxString()
    onChange({ bbox, bboxStr })
  }

  getMeasures(options) {
    const { orientation, measureUnits, scale, format } = options

    let mmWidth, mmHeight
    if (orientation === ORIENTATION.portrait) {
      mmWidth = PAGE_SIZES[format].w
      mmHeight = PAGE_SIZES[format].h
    } else {
      mmWidth = PAGE_SIZES[format].h
      mmHeight = PAGE_SIZES[format].w
    }
    return {
      mmWidth,
      mmHeight,
      measureUnits,
      scale,
      orientation,
      onUpdateBbox: this.updateBbox,
    }
  }
}
