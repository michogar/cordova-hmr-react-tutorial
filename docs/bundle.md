# Creación del Bundle
Webpack genera un archivo llamado bundle, donde almacenará las dependencias de nuestro proyecto a partir de los imports de este mismo. 
 
En este tutorial usaremos `yarn` como gestor de paquetes, por lo que empezamos inicializando el proyecto creando el `package.json`:

```
yarn init
```
 
Seguiremos con la instalación de `webpack`:
 
```
$ yarn add webpack
```
 
 Ahora configuraremos `webpack` para la creación de nuestro bundle. Crearemos el archivo `webpack.config.js` y añadiremos la siguiente configuración:
 
    const path = require('path');
 
    module.exports = {
        context: path.resolve(__dirname),
        devtool: "eval-source-map",
        entry: {
            main: './src/index.js'
         },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
        }
    };
 
 * `context`: será el directorio base a partir del cual se se resuelven los puntos de entrada y los `loaders`
 * `devtool`: Controla como quieres que se generen los `source maps` [Documentación](https://webpack.js.org/configuration/devtool/). Es importante controlar este valor ya que será el que nos permita debugar la salida generada por `webpack`
 * `entry`: entrada desde la que se generará el `bundle`. Es el archivo de inicio de nuestra aplicación, a partir del cual `webpack`irá construyendo el `bundle` "tirando" de las dependencias de los módulos que importamos.
 * `output`: controla donde y como queremos que se generen las salidas o salida de nuestro `bundle` y resto de archivos necesarios en nuestra aplicación.
 
 Con la configuración básica anterior, nos faltaría tener los archivos `index.js` y sus dependencias. En el [repositorio]() preparado para este tutorial podrás encontrar estos arhivos ya preparados.
 
 Crearemos una tarea de `npm` que nos ejecute `webpack` y nos genere nuestro `bundle`:
 
    "build": "webpack"
    
 Si ejecutamos este script:
 
     npm run build
     
construiremos nuestro `bundle` que será guardado en la ruta que hemos indicado en el `output`:

    > webpack

    Hash: 019c0dd0b804295531e4
    Version: webpack 2.6.1
    Time: 79ms
      Asset     Size  Chunks             Chunk Names
    main.js  4.49 kB       0  [emitted]  main
       [0] ./src/App.js 149 bytes {0} [built]
       [1] ./src/index.js 84 bytes {0} [built]
