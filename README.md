# MapRouting

It is an Angular application that allows the user to have a map (utilizing Leaflet to work 
with the map), on which they can set route points. Lines connect the points, and an arrow indicates the direction of movement. 
    * Points are movable, added, and deleted (using Leaflet plugins). 
    * When points are deleted, the numbers must be updated so the points remain in the correct order. 

Each point has the following parameters: 
    * Number 
    * Latitude 
    * Longitude 
    * Height 

When clicking on a point, a window should appear with the possibility of editing the point parameters. 
The list of points with parameters must be sent via the service to the server (only the sending code). 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

