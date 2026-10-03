## Exercise 0.4
### this exercise depictes the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the Save button.


```mermaid
  sequenceDiagram
  participant Browser
  participant Server

  Browser ->> Server: Post https://studies.cs.helsinki.fi/exampleapp/new_note
  activate Server
  Note right of Browser: The server saves the new note and updating the data
  Server -->> Browser: HTTP status code 302 (URL Redirect to /notes)
  deactivate Server

  Browser ->> Server: Get https://studies.cs.helsinki.fi/exampleapp/notes
  activate Server 
  Server -->> Browser: Notes (HTML document)
  deactivate Server

  Browser ->> Server: Get https://studies.cs.helsinki.fi/exampleapp/main.css
  activate Server
  Server -->> Browser: main.css
  deactivate Server

  Browser ->> Server: Get https://studies.cs.helsinki.fi/exampleapp/main.js
  activate Server
  Server --> Browser: main.js
  deactivate Server

  Note right of Browser: The Browser start executes the javascript code to fetch the JSON from the server
  
  Browser ->> Server: Get https://studies.cs.helsinki.fi/exampleapp/data.json
  activate Server
  Server --> Browser: data.json
  deactivate Server

  Note right of Browser: The Browser start executes the callback function that renders the notes
```
