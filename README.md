# photon-request-counter
The idea of this prototype is to have a counter of request in a LCD that can show you analytics of a site quickly.
In this example the protoype count event when you heat with a POST this following URL:
- http://localhost:8000/api/yellow
- http://localhost:8000/api/red
- http://localhost:8000/api/green

But you can use it to get more interested statistics like login URL hits or some other URL that is important to your site.
When someone hit a URL that you have controlled by the index.js server the LCD screen connected to the Photon increase the count and also a light is going to turned on.

## INSTALLATION

###GLOBAL Node.js
Install Node.js in your system

### DEPENDENCES
```javascript
npm install
```
### RUN
Edit config.json and add your credentials and then...

```javascript
node index.js
```

## BUILD THE PROTOTYPE

###STUFF
- Photon
- 220 OMS Resistence
- 3 LED lights
- 1 Potenciometer 50k
- 1 Protoboard
- 1 LCD 12x16 Cells
- 16 wires


![photo1](https://raw.githubusercontent.com/maximobelen/assets/master/images/spark-request-counter/IMG_0154.JPG)  

![photo2](https://raw.githubusercontent.com/maximobelen/assets/master/images/spark-request-counter/IMG_0155.JPG)  



