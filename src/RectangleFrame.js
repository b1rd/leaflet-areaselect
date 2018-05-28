import React from 'react'
import PropTypes from 'prop-types'
import { MapControl } from "react-leaflet";
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
  createLeafletElement(props) {
    const { options } = props
    return new LeafletRectangleFrame(this.getMeasures(options))
  }

  updateLeafletElement(fromProps, toProps) {
    const { options } = toProps
    console.log(this.getMeasures(options))
    this.leafletElement.setOptions(this.getMeasures(options))
  }

  getMeasures(options) {
    const { orientation, measureUnits, scale, format } = options
    const { y } = this.context.map.getSize()
    const height = y * scale
    const width = height * PARAMETERS['orientation'][orientation]
    let mmWidth, mmHeight
    if (orientation === ORIENTATION.portrait) {
      mmWidth = PAGE_SIZES[format].w
      mmHeight = PAGE_SIZES[format].h
    } else {
      mmWidth = PAGE_SIZES[format].h
      mmHeight = PAGE_SIZES[format].w
    }
    return {
      width,
      height,
      mmWidth,
      mmHeight,
      measureUnits
    }
  }
}

// export default class RectangleFrame extends GridLayer {
//   constructor(props) {
//     super(props)
//   }
//   static propTypes = {
//     options: PropTypes.object.isRequired,
//     show: PropTypes.bool,
//   }
//   componentWillMount() {
//     super.componentWillMount()
//     const { options } = this.props
//     const areaParams = this.getMeasures(options)
//     areaSelect = LeafletRectangleFrame(areaParams)
//     areaSelect.addTo(this.context.map)
//     console.log(areaSelect.getBounds().toBBoxString())
//   }

//   componentWillReceiveProps(next) {
//     if (!next.show) {
//       if (areaSelect) {
//         areaSelect.remove()
//         areaSelect = null
//       }
//       return
//     }
//     const { options } = next
//     const areaParams = this.getMeasures(options)
//     // ERROR HERE
//     // areaSelect = LeafletRectangleFrame(areaParams)
//     // areaSelect.addTo(this.context.map)
//   }
// }