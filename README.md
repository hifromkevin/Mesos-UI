# Mesos-UI
A visual representation of a new Mesos interface.
![alt text](mesos-screenshot.png?raw=true)


## Requirements
- Node 6.13.0

## Installing Dependencies

From within the root directory:
```sh
npm install 
npm start

Go to http://localhost:9000/ on your browser
```

## Selected Libraries and Technologies
- React: React state was the perfect setup to store the servers and available apps. Also, React has built-in commands such as hover, which will come in handy in future iterations of this application. 
- SASS: Preferred over CSS due to the ability to add variables. As such, changing a color, for example, will only need to be performed in one spot, rather than making the change in multiple locations.
- Webpack Dev Server: Given the time constraints, Webpack Dev Server made it simple to get a working MVP up and running. 

## How It Works
The Mesos dashboard starts with four servers (represented by dark gray boxes). 
- Each server can host two apps.
- Apps can be added by clicking the "+" symbol next to the app.
- Apps are added to the server with the most available bandwidth. If the servers are all full (that is, each server is currently hosting two apps), the app is not added.
- An app can be removed by clicking the "-" symbol next to the app, and frees up space on the server that was hosting the app.
- Clicking "Destroy" deletes the most recently added server. If the server is hosting any apps, those apps are reassigned to servers with available bandwidth. If no servers are available, the apps are not reassigned. 