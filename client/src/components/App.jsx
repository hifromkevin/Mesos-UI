import React, { Component } from 'react';
import AvailableApps from './AvailableApps.jsx';
import ServerCanvasBlock from './ServerCanvasBlock.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableApps: ['hadoop', 'rails', 'chronos', 'storm', 'spark'],
      // serverCanvas servers have three properties: name, # of active apps, and a key
      // serverCanvas apps have two properties: name and associated key
      serverCanvas: [
        ['server', 0, 0],
        ['server', 0, 1],
        ['server', 0, 2],
        ['server', 0, 3]
      ], 
      serverLoad: 2
    }

    this.addServer = this.addServer.bind(this);
    this.destroyServer = this.destroyServer.bind(this);
    this.addApp = this.addApp.bind(this);
    this.removeApp = this.removeApp.bind(this);
  }

  addServer() {
    let newApp = this.state.serverCanvas.slice();
    let idNumber = 0;

    // If there are other servers, capture the most recent server's key and 
    // increment it to overwrite key of 0
    for (var i = (newApp.length - 1); i >=0; i--) {
      if (newApp[i][0] === 'server') {
        idNumber = newApp[i][2];
        idNumber++;
        break;
      }
    }
    // Add our new server
    newApp.push(['server', 0, idNumber]);

    // Update state
    this.setState({
      serverCanvas: newApp
    });
  }

  destroyServer() {
    // Make copy of state
    var serverCanvasState = this.state.serverCanvas.slice();
    var serverKey;

    // Loop though serverCanvasState, starting with most recent addition
    // If we find a server, remove it
    for (var i = (serverCanvasState.length - 1); i >= 0; i--) {
      if (serverCanvasState[i][0] === 'server') {
        serverKey = serverCanvasState[i][2];
        serverCanvasState = serverCanvasState.slice(0, i).concat(serverCanvasState.slice(i + 1));
        break;
      }
    }

    this.setState({
      serverCanvas: serverCanvasState
    })

    setTimeout(() => {
      this.reassignApp(serverKey, serverCanvasState)
    }, 100);
  }

  addApp(appName) {

    let serverCanvasState = this.state.serverCanvas.slice();
    let serverSmallestLoad;

    // Find the server with the smallest load
    // If the smallest load is 0, it is the smallest server
    // The first server with the smallest value is set to variable, and 
    // will not be overwritten unless a smaller server is found
    for (var i = 0; i < serverCanvasState.length; i++) {
      if (serverCanvasState[i][0] === 'server' && serverCanvasState[i][1] < this.state.serverLoad) {
        if (!serverSmallestLoad) serverSmallestLoad = [serverCanvasState[i][1], serverCanvasState[i][2], i];
        if (serverCanvasState[i][1] === 0) {
          serverSmallestLoad = [serverCanvasState[i][1], serverCanvasState[i][2], i];
          break;
        } 
      } 
    }

    // If we find our smallest server, increment the number of 
    // apps running on it, and add the new app to our state
    if(serverSmallestLoad) {
      serverCanvasState[serverSmallestLoad[2]][1]++;
      serverCanvasState.push([appName, serverSmallestLoad[1]]);

      this.setState({
        serverCanvas: serverCanvasState
      });
    }
  }

  removeApp(appName) {
    let serverCanvasState = this.state.serverCanvas.slice();
    let serverKey;

    // Find the most recent app with the given name
    // Store the corresponding server key
    for (var i = (serverCanvasState.length - 1); i >= 0; i--) {
      if (serverCanvasState[i][0] === appName) {
        serverKey = serverCanvasState[i][1];
        serverCanvasState = serverCanvasState.slice(0, i).concat(serverCanvasState.slice(i + 1));
        break;
      }
    }

    // Decrement the number of apps on the server
    if (serverKey >= 0) {
      for (var i = 0; i < serverCanvasState.length; i++) {
        if (serverCanvasState[i][0] === 'server' && 
          serverCanvasState[i][2] === serverKey) serverCanvasState[i][1]--;
      }

      this.setState({
        serverCanvas: serverCanvasState
      });
    }
  }

  reassignApp(key, newState) {
    let appsOnServer = [];

    // Find all apps that belong to the deleted server, and 
    // remove them from the queue 
    let i = newState.length;
    while (i--) {
      if (newState[i][0] !== 'server' && newState[i][1] === key) {
        appsOnServer.push(newState[i][0]);
        newState = newState.slice(0, i).concat(newState.slice(i + 1));
      }
    }

    this.setState({
      serverCanvas: newState
    });

    // Reassign the apps from the deleted server (if 
    // there are any open spaces)
    if (appsOnServer.length) {
      for (var j = 0; j < appsOnServer.length; j++) {
        this.addApp(appsOnServer[j]);
      }
    }
  } 

  checkName(name) {
    if(name !== 'server') {
      return (
        <p>{name[0].toUpperCase() + name.slice(1)}</p>
      )
    }
  }


  render() {
    return (
      <div>
        <div className="app-sidebar">
          <p className="app-sidebar__text" onClick={this.addServer}>Add Server</p>
          <p className="app-sidebar__text" onClick={this.destroyServer}>Destroy</p>

          <p className="app-sidebar__title">Available Apps</p>
          {this.state.availableApps.map(app => {
              return <AvailableApps 
                        name={app} 
                        key={app} 
                        addApp={this.addApp} 
                        removeApp={this.removeApp} 
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
