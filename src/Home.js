import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Paper from 'react-md/lib/Papers';
import Group from './Group';

export default class Home extends PureComponent {
  render() {
    return (
      <div className="md-grid">
        <div className="paper-container">
          <form>
            <Paper>
                <Group></Group>
            </Paper>
            <Paper>
                <Group></Group>
            </Paper>
          </form>
        </div>
      </div>
    );
  }
}
