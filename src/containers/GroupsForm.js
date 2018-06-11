import React, { PureComponent } from 'react'
import update from 'immutability-helper'
import {
  Button,
  Card,
  CardText,
} from 'react-md';
// reactapp's components
import { maxWidth } from '../middleware/layout'
import Group from '../components/Group'
import AddTarget from '../components/AddTarget'
// axios is a http client lib
import axios from 'axios'
import { API_ROOT } from '../middleware/api'

const initialStateRelation = {
    negated: false,
    relation: "",
    attribute: "",
    logical: null
}

const initialState = {
  groups: [
    [
      {
        negated: false,
        relation: "",
        attribute: "",
        logical: null
      }
    ],
    [
      {
        negated: false,
        relation: "",
        attribute: "",
        logical: null
      }
    ]
  ],
  relations:[], // a list of possible relations from spfy
  o_relations: [], // the object containining the 'uri': human-readable mapping
  targets: [],
  o_targets: [], // the object containining the 'uri': human-readable mapping
  target: "" // the chosen target to compare against
}

const gdescrip = () => (
  <Card
    style={{ maxWidth: maxWidth }}
  >
    <CardText>
      <p>
        <h5>Help:</h5>
        <li>
          <b>Node/Attribute Types:</b>
           are classes of nodes or their attributes in the graph database.
           For example, O-type is a class of nodes/attributes in the graph.
           Note: for analysis, nodes and attributes are treated the same.
        </li>
        <li>
          <b>Node/Attribute values:</b>
           are specific instances of a node/attribute type. For example, O157 is
           an instance of O-Type
        </li>
      </p>
      <p>
        Groups can be built by selecting single or multiple matching value(s)
        and joining them through logical connectives (AND/OR/NOT). For example,
        O-Type 157 can be joined with H-Type H7 by clicking the "Add another
        value to this group" and joining them with the connective AND.
      </p>
      <p>
        Note: We currently build these values on-the-fly from any and all
        nodes/attributes in the database. This will be restricted in the future
        to simplify the choices.
      </p>
    </CardText>
  </Card>
)

const tdescrip = () => (
  <Card
    style={{ maxWidth: maxWidth }}
  >
    <CardText>
      <p>
        <h5>Help:</h5>
        <b>Targets</b> are any node/attribute type in addition to any superclass
        of a node/attribute type. For example, 'Any_Marker' is the superclass
        to AMR_Genes and Virulence_Factors.
        <br />
        There is no need to select specific values for the selected target class
        as Spfy will compare all instances of that class in their entirety.
        For example, selecting 'AMR_Gene' will compare all AMR genes in the
        graph connected to any member of the query groups.
      </p>
    </CardText>
  </Card>
)

class GroupsForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeAddRelation = this.handleChangeAddRelation.bind(this);
    this.handleChangeTarget = this.handleChangeTarget.bind(this);
  }
  handleSubmit(event) {
    console.log(event)
    event.preventDefault();
    this.props.handleChangeSubmit(this.state.groups, this.state.target)
  }
  // this handles updating state for any change in form fields
  handleChange(value, event, groupIndex, attributeIndex, property) {
    console.log(value, event, groupIndex, attributeIndex, property)
    this.setState({
      groups: update(this.state.groups, {
          [groupIndex]: {
            [attributeIndex]: {
              [property]: {
                $set: value
              }
            }
          }
        }
      )
    })
  }
  handleChangeAddRelation(groupIndex) {
    this.setState({
      groups: update(this.state.groups, {
        [groupIndex]: {
          $push: [initialStateRelation]
        }
      })
    })
  }
  handleChangeTarget(value){
    const target = this.state.o_targets[value];
    this.setState({target})
  }
  componentDidMount() {
    // get possible relations for user to build groups
    axios.get(API_ROOT + `get_all_attribute_types`)
      .then(res => {
        const o_relations = res.data;
        const relations = Object.keys(res.data).sort();
        this.setState({ o_relations, relations });
      });
    // get possible targets to compare groups against
    axios.get(API_ROOT + `get_all_types`)
      .then(res => {
        const o_targets = res.data;
        const targets = Object.keys(res.data).sort();
        this.setState({ o_targets, targets });
      });
  }
  groupCard = (group, index) => (
    <div>
      {gdescrip()}
      <Card
        key={index}
        style={{ maxWidth: maxWidth }}
      >
        {console.log(group)}
          <Group groupIndex={index} relations={this.state.relations} o_relations={this.state.o_relations} handleChange={this.handleChange}  handleChangeAddRelation={this.handleChangeAddRelation} group={group}
          numberAttributes={group.length} setQuerying={this.props.setQuerying}/>
      </Card>
    </div>
  )
  render() {
    const {
      step,
      nextButton
    } = this.props;
    const {
      groups,
      targets,
    } = this.state;
    console.log(step)
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="paper-container">
          {step===2?
            this.groupCard(groups[0], 0)
          :''}
          {step===3?
            this.groupCard(groups[1], 1)
          :''}
          {step===4?
            <div>
              {tdescrip()}
              <Card style={{ width: maxWidth }}>
                <AddTarget handleChangeTarget={this.handleChangeTarget} targets={targets} />
              </Card>
              <Card style={{ width: maxWidth }}>
                <h5>Finished!</h5>
                <Button flat primary label="Submit" onClick={this.handleSubmit}>send</Button>
              </Card>
            </div>
          :''}
          <Card style={{ width: maxWidth }}>
            {nextButton}
          </Card>
        </div>
      </form>
    );
  }
}

export default GroupsForm;
