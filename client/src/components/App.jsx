import React, { Component } from 'react';
import AvailableApps from './AvailableApps.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableApps: ['hadoop', 'rails', 'chronos', 'storm', 'spark'],
      server: [1,1,1,1],
      activeApps: [
        ['server', true],
        ['server', true],
        ['server', true],
        ['server', true]
      ]
    }

    this.add = this.add.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  add(item) {
    let newApp = this.state.activeApps.slice();
    newApp.push([item, true]);
    this.setState({
      activeApps: newApp
    });
  }

  destroy(item) {
    var activeApps = this.state.activeApps;
    for (var i = (activeApps.length - 1); i >= 0; i--) {
      if(activeApps[i][0] === item) {
        var newApps = activeApps.slice();
        newApps = newApps.slice(0, i).concat(newApps.slice(i + 1));
        this.setState({
          activeApps: newApps
        });
        break;
      }
    }
    console.log(item, this.state.activeApps);
  }


  render() {
    return (
      <div>
        <div className="app-sidebar">
          <p onClick={() => this.add('server')}>Add Server</p>
          <p onClick={() => this.destroy('server')}>Destroy</p>

          <p className="app-sidebar__title">Available Apps</p>
          {this.state.availableApps.map(app => {
              return <AvailableApps 
                        name={app} 
                        key={app} 
                        add={this.add} 
                        destroy={this.destroy} 
                      />
            })
          }

        </div>
        <div className="server-canvas">
          <h2>Server Canvas</h2>
          {this.state.activeApps.map((app, i) => {
              return (
                <div className={`block block__${app[0]}`} key={i}>
                  <p>{app[0]}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  } 
};



