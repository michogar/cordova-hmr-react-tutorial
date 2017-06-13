# Webpack-dev-server

    yarn add webpack-dev-server
 
y creamos una orden en los scripts del package.json para ejecutarlo:

    “dev”: “webpack-dev-server”

Este es un servidor de desarrollo que publicará los recursos de webpack para que sean accesibles desde el navegador. Lo que hace es crear un servidor de desarrollo que publica los recursos. Para ello configuramos en el webpack.config.js los siguientes cambios:
 
    devServer: {
        contentBase: path.join(__dirname, "platforms/android/assets/www"),
        compress: true,
        port: 3000,
        publicPath: '/js/'  
    },
 
* `contentBase`: carpeta desde la que se publicará la raíz de nuestro contenido
* `compress`: comprime como gzip todo el contenido servido
* `port`: el puerto donde se publicará http://localhost:<port>
* `publicPath`: el path donde será publicados los recursos bundled, en nuestro caso que el valor es /js/ la ruta final de los archivos bundled será http://localhost:<port>/js/
 
Si ejecutamos npm dev la salida nos dará:

       > webpack-dev-server
       
       Project is running at http://localhost:3000/
       webpack output is served from /js/
       Content not from webpack is served from /home/michogarcia/geomati.co/TMB/dev/hmr-tutorial/dist
       Hash: b6f42794026ca8bf8d0a
       Version: webpack 2.6.1
       Time: 928ms
         Asset    Size  Chunks                    Chunk Names
       main.js  841 kB       0  [emitted]  [big]  main
       chunk    {0} main.js (main) 302 kB [entry] [rendered]
          [35] (webpack)-dev-server/client?http://localhost:3000 5.68 kB {0} [built]
          [36] ./src/index.js 84 bytes {0} [built]
          [37] ./~/ansi-html/index.js 4.26 kB {0} [built]
          [38] ./~/ansi-regex/index.js 135 bytes {0} [built]
          [40] ./~/events/events.js 8.33 kB {0} [built]
          [41] ./~/html-entities/index.js 231 bytes {0} [built]
          [48] ./~/querystring-es3/index.js 127 bytes {0} [built]
          [77] ./~/strip-ansi/index.js 161 bytes {0} [built]
          [78] ./~/url/url.js 23.3 kB {0} [built]
          [79] ./~/url/util.js 314 bytes {0} [built]
          [80] (webpack)-dev-server/client/overlay.js 3.73 kB {0} [built]
          [81] (webpack)-dev-server/client/socket.js 897 bytes {0} [built]
          [83] (webpack)/hot/emitter.js 77 bytes {0} [built]
          [84] ./src/App.js 149 bytes {0} [built]
          [85] multi (webpack)-dev-server/client?http://localhost:3000 ./src/index.js 40 bytes {0} [built]
            + 71 hidden modules
       webpack: Compiled successfully.


`webpack-dev-server` creará el `bundle` tal y como hemos definido y lo publicará en las rutas que hayamos configurado. Si nos 
fijamos en la salida, el propio servidor nos está indicando donde podemos encontrar nuestros `bundles` publicados:

    Project is running at http://localhost:3000/
    
Podremos ver un resumen en:

[http://localhost:3000/webpack-dev-server](http://localhost:3000/webpack-dev-server)

y veremos nuestro `bundle` publicado en:

[http://localhost:3000/main.js](http://localhost:3000/main.js)

Para comprobar como `webpack-dev-server` nos ayuda en el desarrollo generando el `bundle` de manera dinámica cada vez que se detecta un cambio
crearemos un archivo `index.html` en la carpeta `dist` que será la carpeta que publicaremos.

Haremos algunos cambios en la creación del `bundle` para adaptarlo a la nueva estructura de carpetas. Para ello, modificaremos la salida:

    output: {
       path: path.resolve(__dirname, 'dist/js'),
       filename: '[name].js',
    },

indicándole la nueva ruta `dist/js`. Recordad que el raiz de nuestro `webpack-dev-server` será la propia carpeta `dist` y que el
`publicPath` apunta a la que será la carpeta `dist/js` donde se guardará el `bundle` que se genera.
   
Si ejecutamos de nuevo:

    npm run dev
    
podremos observar que ahora la ruta de nuestro `bundle` (main.js) está en:
    
[http://localhost:3000/js/main.js](http://localhost:3000/js/main.js)

Si vamos a la carpeta `dist` comprobaremos que no se ha creado ningún archivo en la misma, eso es porque en todo momento
`webpack-dev-server` está publicando el `bundle` desde memoria.

Ahora crearemos una `<div id=rootElement>` en el `index.html` para poder visualizar como trabaja `webpack-dev-server`.

    <body>
        <div id="rootElement"></div>
    </body>

Incluiremos en nuestra `App.js` la funcionalidad que modifique el contenido de esa `<div>`

    constructor() {
        document.getElementById('rootElement').innerHTML = '<span>Mira, ¡¡funciona!!</span>';
    }
    
y haremos que el `index.html` cargue nuestro `bundle`.
   
    <script type="text/javascript" src="./js/main.js"></script>
    
Si modificamos nuestra `App.js` por ejemplo cambiando el texto, veremos como `webpack-dev-server` "compila" de nuevo
 
     webpack: Compiling...
     Hash: e5d45663418c4a61284b
     Version: webpack 2.6.1
     Time: 146ms
       Asset    Size  Chunks                    Chunk Names
     main.js  841 kB       0  [emitted]  [big]  main
     chunk    {0} main.js (main) 302 kB [entry] [rendered]
        [84] ./src/App.js 201 bytes {0} [built]
          + 85 hidden modules
     webpack: Compiled successfully.
     
y publica el nuevo `bundle` aplicando los cambios automáticamente sin refrescar.
