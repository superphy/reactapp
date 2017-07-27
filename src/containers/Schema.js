import React, { Component } from 'react';
// react-md
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
// redux
import { connect } from 'react-redux'
import { addJob } from '../actions'
// axios
import axios from 'axios'
import { API_ROOT } from '../middleware/api'
// router
import Loading from '../components/Loading'
import d3 from 'd3';
import jsonldVis from 'jsonld-vis';
import '../middleware/jsonld-vis.css'
import data from '../middleware/example_spfyid.json';

const jsonldVisConfig = {
  h: 600, // height
  w: '100%', // width
  maxLabelWidth: 250, // maximum label width
  transitionDuration: 750, // transition duration, in ms
  transitionEase: 'cubic-in-out', // transition easing function
  minRadius: 5, // minimum node radius
  scalingFactor: 2 // factor to scale node sizes
}

class Schema extends Component {
  componentDidMount(){
    jsonldVis(d3)
    d3.jsonldVis(data, this.el, jsonldVisConfig)
  }
  render(){
    return <div ref={el => this.el = el} />;
  }
}

export default Schema
