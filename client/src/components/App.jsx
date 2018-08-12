import React, { Component } from 'react';
import AvailableApps from './AvailableApps.jsx';
import ServerCanvasBlock from './ServerCanvasBlock.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableApps: ['hadoop', 'rails', 'chronos', 'storm', 'spark'],
      // serverCanvas servers have three properties: name, # of active apps, and a key
      // serverCanvas apps have two properties: name, and associated key
      serverCanvas: [
        ['server', 0, 0],
        ['server', 0, 1],
        ['server', 1, 2],
        ['server', 0, 3],
        ['hadoop', 2]
      ]
    }

    this.addServer = this.addServer.bind(this);
    this.destroyServer = this.destroyServer.bind(this);
    this.addApp = this.addApp.bind(this);
  }

  addServer() {
    //make a copy of state, and establish a variable to create key for our server
    let newApp = this.state.serverCanvas.slice();
    let idNumber;

    // Look for the most recent server
    // If found, capture its key and increment it
    for (var i = (newApp.length - 1); i >=0; i--) {
      if (newApp[i][0] === 'server') {
        idNumber = newApp[i][2];
        idNumber++;
        break;
      }
    }

    // If no key was found, then set our id to zero
    if(idNumber === undefined) idNumber = 0;

    // Add our new server
    newApp.push(['server', 0, idNumber]);

    // Update state
    this.setState({
      serverCanvas: newApp
    });

    console.log('server', this.state.serverCanvas);
  }

  destroyServer() {
    //Make copy of state
    var serverCanvasState = this.state.serverCanvas.slice();

    //Loop though our serverCanvas state, starting with most recent recation
    for (var i = (serverCanvasState.length - 1); i >= 0; i--) {
      // if or when we find a server, slice our state array before and after
      // found server to remove it from state
      if (serverCanvasState[i][0] === 'server') {
        serverCanvasState = serverCanvasState.slice(0, i).concat(serverCanvasState.slice(i + 1));
        break;
      }
    }

    //update the state
    this.setState({
      serverCanvas: serverCanvasState
    });
  }

  addApp(item) {
    let serverCanvasState = this.state.serverCanvas.slice();
    let smallest;
    for (var i = 0; i < serverCanvasState.length; i++) {
      if (serverCanvasState[i][0] === 'server' && serverCanvasState[i][1] < 2) {
        if (!smallest) {
          smallest = [serverCanvasState[i][1], serverCanvasState[i][2], i];
        } 
        if (serverCanvasState[i][1] === 0) {
          smallest = [serverCanvasState[i][1], serverCanvasState[i][2], i];
          break;
        } 
      } 
    }

    if(smallest) {
      serverCanvasState[smallest[2]][1]++;
      serverCanvasState.push([item, smallest[1]]);
      console.log(serverCanvasState);
    }

    this.setState({
      serverCanvas: serverCanvasState
    });
  }

  checkName(name) {
    if(name !== 'server') {
      return (
        <p>{name}</p>
      )
    }
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
                        addApp={this.addApp} 
                        destroy={this.destroy} 
                      />
            })
          }

        </div>
        <div className="server-canvas">
          <h2>Server Canvas</h2>
          {this.state.serverCanvas.map((app, i) => {
              return (
                <ServerCanvasBlock app={app} checkName={this.checkName} key={i} />
              )
            })
          }
        </div>
      </div>
    )
  } 
};


/*
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
*/

