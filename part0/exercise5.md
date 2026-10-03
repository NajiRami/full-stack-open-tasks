## Exercise 0.5
### this Diagram depictes the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.


```mermaid
  sequenceDiagram
  participant Browser
  participant Server

  Browser ->> Server: Get https://studies.cs.helsinki.fi/exampleapp/spa
  activate Server
  Server -->> Browser: spa (HTML document)
  deactivate Server

  Browser ->> Server: Get https://studies.cs.helsinki.fi/exampleapp/spa.css
  activate Server
  Server -->> Browser: spa.css
  deactivate Server

  Browser ->> Server: Get https://studies.cs.helsinki.fi/exampleapp/spa.js
  activate Server
  Server -->> Browser: spa.js
  deactivate Server

  Note right of Browser: The Browser start executes the javascript code to fetch the JSON from the server
  
  Browser ->> Server: Get https://studies.cs.helsinki.fi/exampleapp/data.json
  activate Server
  Server -->> Browser: data.json
  deactivate Server

  Note right of Browser: The Browser start executes the callback function that renders the notes
```
