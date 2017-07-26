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
import data from '../middleware/GCA_001911305.1_ASM191130v1_genomic.fna_rgi.json';


class Schema extends Component {
  componentDidMount(){
    jsonldVis(d3)
    d3.jsonldVis(data, this.el, { w: '100%', h: 600, maxLabelWidth: 250 })
  }
  render(){
    return <div ref={el => this.el = el} />;
  }
}

export default Schema
