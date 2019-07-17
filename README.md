<h1>Weather Application!<h1>

<h2>Run command</h2>
_```npm run start```_ (see package.json -> scripts)

or<br>
_```node src/app.js```_


<h2>Debug with chrome extension</h2>

1. run with _--inspect_ param:<br>
_```node --inspect src/app.js```_
2. in Chrome browser new tab open:<br>
_chrome://inspect_
3. click *'Open dedicated DevTools for Node'*
4. call weather endpoint, for example:<br>
*```curl http://localhost:3000/weather?address=Lviv```*