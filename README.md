# flask-chart
Chart exibition in Flask/Python integrated with Chart.js

This is a use case to consume apis and show the data in graphs of type bubble and bars.

#structure:
/static
  /js
    main.js => consume api and build the charts
/template
  index.html => simple html file with the charts tags
app.py => here we use flask to serve our app in localhost:5000/

obs.: 
      Install the latest version of Chart.js and Cube.js and create a bundle webpack
      The cubeToken used in main.js is not personal, you can find it in chart.js website            https://www.chartjs.org/docs/latest/getting-started/
      To execute the app run: flask run in root directory
