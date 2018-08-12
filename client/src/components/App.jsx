import React, { Component } from 'react';
import AvailableApps from './AvailableApps.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableApps: ['hadoop', 'rails', 'chronos', 'storm', 'spark'],
      activeApps: [
        ['server', true],
        ['server', true],
        ['server', true],
        ['server', true]
      ],
      serverCanvas: [
        ['server', 0, 0],
        ['server', 0, 1],
        ['server', 0, 2],
        ['server', 0, 3],
        ['hadoop', 2]
      ]
    }

    this.add = this.add.bind(this);
    this.destroy = this.destroy.bind(this);
    this.addServer = this.addServer.bind(this);
    this.destroyServer = this.destroyServer.bind(this);
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

  addServer() {
    let newApp = this.state.serverCanvas.slice();
    let idNumber;

    for (var i = (newApp.length - 1); i >=0; i--) {
      if (newApp[i][0] === 'server') {
        idNumber = newApp[i][2];
        break;
      }
    }

    if(idNumber === undefined) idNumber = 0;

    newApp.push(['server', 0, idNumber+1]);

    this.setState({
      serverCanvas: newApp
    });

    console.log('server', this.state.serverCanvas);
  }

  destroyServer() {
    var activeServers = this.state.serverCanvas.slice();

    for (var i = (activeServers.length - 1); i >= 0; i--) {
      console.log(activeServers[i][0])
      if (activeServers[i][0] === 'server') {
        console.log('hi')
        activeServers = activeServers.slice(0, i).concat(activeServers.slice(i + 1));
        break;
      }
    }

    this.setState({
      serverCanvas: activeServers
    });
  }


  render() {
    return (
      <div>
        <div className="app-sidebar">
          <p onClick={this.addServer}>Add Server</p>
          <p onClick={this.destroyServer}>Destroy</p>

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
          {this.state.serverCanvas.map((app, i) => {
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



