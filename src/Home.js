import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';
import Paper from 'react-md/lib/Papers';

export default class Home extends PureComponent {
  render() {
    return (
      <div className="md-grid">
        <div className="paper-container">
          <form>
            <Paper>
                <TextField
                  id="eventEmail"
                  placeholder="Email"
                  defaultValue="heyfromjonathan@gmail.com"
                  block
                  paddedBlock
                />
                <Divider />
                <TextField
                  id="eventName"
                  placeholder="Event name"
                  block
                  paddedBlock
                />
                <Divider />
                <TextField
                  id="eventDescription"
                  placeholder="Description"
                  block
                  paddedBlock
                  rows={4}
                  defaultValue="asdlafkjewflaksejflakjskl"
                />
            </Paper>
          </form>
        </div>
      </div>
    );
  }
}
