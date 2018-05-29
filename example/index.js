import React, { Fragment, Component } from 'react'
import { render } from 'react-dom'
import RectangleExample from './RectangleExample'

const example = (
  <Fragment>
    <RectangleExample />
  </Fragment>
  )

render(example, document.getElementById('app'));