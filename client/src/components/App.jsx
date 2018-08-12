import React, { Component } from 'react';
import AvailableApps from './AvailableApps.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableApps: ['hadoop', 'rails', 'chronos', 'storm', 'spark'],
      server: [1,1,1,1],
      hadoop: 0,
      rails: 0,
      chronos: 0,
      storm: 0,
      spark: 0
    }

    this.add = this.add.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  add(item) {
    let newItem = this.state[item].slice();
    newItem.push(1);
    this.setState({
      [item]: newItem
    })
  }

  destroy(item) {
    if (this.state[item].length > 0) {
      let newItem = this.state[item].slice();
      newItem.pop();

      this.setState({
        [item]: newItem
      })
    }
  }


  render() {
    return (
      <div>
        <div className="app-sidebar">
          <p onClick={() => this.add('server')}>Add Server</p>
          <p onClick={() => this.destroy('server')}>Destroy</p>

          <p className="app-sidebar__title">Available Apps</p>
          {this.state.availableApps.map(app => {
              return <AvailableApps name={app} key={app} add={this.add} destroy={this.destroy} />
            })
          }

        </div>
        <div className="server-canvas">
          <h2>Server Canvas</h2>
          {this.state.server.map((server, i) => {
              return <div className="server" key={i}></div>
            })
          }
        </div>
      </div>
    )
  } 
};


/*

  add(item) {
    this.setState({
      [item]: this.state[item] + 1
    })
    console.log(item, this.state[item])
  }

  destroy(item) {
    if (this.state[item] > 0) {
      this.setState({
        [item]: this.state[item] - 1
      })
    }
    console.log(item, this.state[item])
  }

*/
