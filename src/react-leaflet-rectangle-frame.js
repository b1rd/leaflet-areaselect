L.AreaSelect = L.Class.extend({
    includes: L.Evented.prototype,
    
    options: {
        width: 200,
        height: 300,
        mmWidth: 297,
        mmHeight: 210,
        measureUnits: 'мм',
        keepAspectRatio: false,
    },

    initialize: function(options) {
        L.Util.setOptions(this, options);
        this._width = this.options.width;
        this._height = this.options.height;
        this._measureUnits = this.options.measureUnits
        this._mmWidth = this.options.mmWidth
        this._mmHeight = this.options.mmHeight
    },

    setOptions: function(options) {
        this.initialize(options)
        this._mmWidthText.textContent = this._mmWidth
        this._mmHeightText.textContent = this._mmHeight
        
        this._render()
    },
    
    addTo: function(map) {
        this.map = map;
        this._createElements();
        this._render();
        return this;
    },
    
    getBounds: function() {
        var size = this.map.getSize();
        var topRight = new L.Point();
        var bottomLeft = new L.Point();
        
        bottomLeft.x = Math.round((size.x - this._width) / 2);
        topRight.y = Math.round((size.y - this._height) / 2);
        topRight.x = size.x - bottomLeft.x;
        bottomLeft.y = size.y - topRight.y;
        
        var sw = this.map.containerPointToLatLng(bottomLeft);
        var ne = this.map.containerPointToLatLng(topRight);
        
        return new L.LatLngBounds(sw, ne);
    },
    
    remove: function() {
        this.map.off("moveend", this._onMapChange);
        this.map.off("zoomend", this._onMapChange);
        this.map.off("resize", this._onMapResize);
        
        this._container.parentNode.removeChild(this._container);
    },

    
    setDimensions: function(dimensions) {
        if (!dimensions)
            return;

        this._height = parseInt(dimensions.height) || this._height;
        this._width = parseInt(dimensions.width) || this._width;
        this._render();
        this.fire("change");
    },

    
    _createElements: function() {
        if (!!this._container)
            return;
        this._container = L.DomUtil.create('div', 'leaflet-areaselect-container', this.map._controlContainer)
        this._topShade = L.DomUtil.create('div', 'areaselect__shade leaflet-control', this._container)
        this._bottomShade = L.DomUtil.create('div', 'areaselect__shade leaflet-control', this._container)
        this._leftShade = L.DomUtil.create(
            'div',
            'areaselect__shade areaselect__shade_left leaflet-control',
            this._container
        )
        this._rightShade = L.DomUtil.create(
            'div',
            'areaselect__shade areaselect__shade_right leaflet-control',
            this._container
        )
    
        this._topBorder = L.DomUtil.create(
            'div',
            'areaselect__border areaselect__border_top leaflet-control',
            this._container
        )
        this._bottomBorder = L.DomUtil.create(
            'div',
            'areaselect__border areaselect__border_bottom leaflet-control',
            this._container
        )
        this._leftBorder = L.DomUtil.create(
            'div',
            'areaselect__border areaselect__border_left leaflet-control',
            this._container
        )
        this._rightBorder = L.DomUtil.create(
            'div',
            'areaselect__border areaselect__border_right leaflet-control',
            this._container
        )
    
        this._mmText = L.DomUtil.create('span', 'areaselect__text leaflet-control', this._container)
        this._mmWidthText = L.DomUtil.create('span', 'areaselect__text leaflet-control', this._container)
        this._mmHeightText = L.DomUtil.create('span', 'areaselect__text leaflet-control', this._container)
        this._mmText.textContent = this._measureUnits
        this._mmWidthText.textContent = this._mmWidth
        this._mmHeightText.textContent = this._mmHeight
    
        this._nwHandle = L.DomUtil.create(
            'div',
            'areaselect__handle areaselect__handle_nw leaflet-control',
            this._container
        )
        this._swHandle = L.DomUtil.create(
            'div',
            'areaselect__handle areaselect__handle_sw leaflet-control',
            this._container
        )
        this._neHandle = L.DomUtil.create(
            'div',
            'areaselect__handle areaselect__handle_ne leaflet-control',
            this._container
        )
        this._seHandle = L.DomUtil.create(
            'div',
            'areaselect__handle areaselect__handle_se leaflet-control',
            this._container
        )
        
        this.map.on("moveend", this._onMapChange, this);
        this.map.on("zoomend", this._onMapChange, this);
        this.map.on("resize", this._onMapResize, this);
        
        this.fire("change");
    },
    
    _onMapResize: function() {
        this._render();
    },
    
    _onMapChange: function() {
        this.fire("change");
    },
    
    _render: function() {
        var size = this.map.getSize();
        // var handleOffset = Math.round(this._nwHandle.offsetWidth/2);
        
        var topBottomHeight = Math.round((size.y-this._height)/2);
        var leftRightWidth = Math.round((size.x-this._width)/2);
        
        function setDimensions(element, dimension) {
            element.style.width = dimension.width + "px";
            element.style.height = dimension.height + "px";
            element.style.top = dimension.top + "px";
            element.style.left = dimension.left + "px";
            element.style.bottom = dimension.bottom + "px";
            element.style.right = dimension.right + "px";
        }
        
        
    setDimensions(this._topShade, { width: size.x, height: topBottomHeight, top: 0, left: 0 })
    setDimensions(this._bottomShade, { width: size.x, height: topBottomHeight, bottom: 0, left: 0 })
    setDimensions(this._leftShade, {
      width: leftRightWidth,
      height: size.y - topBottomHeight * 2,
      top: topBottomHeight,
      left: 0,
    })
    setDimensions(this._rightShade, {
      width: leftRightWidth,
      height: size.y - topBottomHeight * 2,
      top: topBottomHeight,
      right: 0,
    })
    setDimensions(this._topBorder, {
      width: size.x - leftRightWidth * 2,
      top: topBottomHeight,
      height: 14,
      left: leftRightWidth,
    })
    setDimensions(this._bottomBorder, {
      width: size.x - leftRightWidth * 2,
      top: size.y - topBottomHeight - 14,
      height: 14,
      left: leftRightWidth,
    })
    setDimensions(this._leftBorder, {
      width: 14,
      height: size.y - topBottomHeight * 2 - 28,
      top: topBottomHeight + 14,
      left: leftRightWidth,
    })
    setDimensions(this._rightBorder, {
      width: 14,
      height: size.y - topBottomHeight * 2 - 28,
      top: topBottomHeight + 14,
      left: size.x - leftRightWidth - 14,
    })
    setDimensions(this._nwHandle, { left: leftRightWidth - 14, top: topBottomHeight - 14 })
    setDimensions(this._neHandle, { right: leftRightWidth - 14, top: topBottomHeight - 14 })
    setDimensions(this._swHandle, { left: leftRightWidth - 14, bottom: topBottomHeight - 14 })
    setDimensions(this._seHandle, { right: leftRightWidth - 14, bottom: topBottomHeight - 14 })

    setDimensions(this._mmText, { left: leftRightWidth - 24, top: topBottomHeight - 20 })
    setDimensions(this._mmHeightText, { right: size.x - leftRightWidth + 7, bottom: topBottomHeight - 22 })
    setDimensions(this._mmWidthText, { left: size.x - leftRightWidth + 7, top: topBottomHeight - 20 })
    }
});

L.areaSelect = function(options) {
    return new L.AreaSelect(options);
}
export default L.areaSelect