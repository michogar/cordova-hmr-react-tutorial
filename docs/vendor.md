# Code Splitting
Uno de los factores a tener en cuenta con el uso de `webpack` es el tamaño del `bundle`. En nuestro caso, si creamos una 
tarea de `build`:

    "build": "webpack"

podremos ver en la salida:

    > webpack
    
    Hash: 65779b8f1ff313e41c2b
    Version: webpack 2.6.1
    Time: 4669ms
                                       Asset     Size  Chunks                    Chunk Names
                         assets/ionicons.svg   334 kB          [emitted]  [big]  
              assets/fontawesome-webfont.eot  76.5 kB          [emitted]         
              assets/fontawesome-webfont.ttf   153 kB          [emitted]         
             assets/fontawesome-webfont.woff  90.4 kB          [emitted]         
            assets/fontawesome-webfont.woff2  71.9 kB          [emitted]         
                         assets/ionicons.eot   121 kB          [emitted]         
              assets/fontawesome-webfont.svg   392 kB          [emitted]  [big]  
                         assets/ionicons.ttf   189 kB          [emitted]         
                        assets/ionicons.woff  67.9 kB          [emitted]         
      assets/Material-Design-Iconic-Font.ttf  99.2 kB          [emitted]         
     assets/Material-Design-Iconic-Font.woff  50.3 kB          [emitted]         
    assets/Material-Design-Iconic-Font.woff2  38.4 kB          [emitted]         
                                     main.js  12.3 MB       0  [emitted]  [big]  main
                                     
De momento el archivo `main.js` tiene un tamaño de 12.3MB. Podemos imaginar que esto es debido a que genera el `bundle` con
las importaciones de OnsenUI, React, React-DOM, además de las dependencias de estas librerías. Aun imaginando esto, podremos 
usar un plugin, el [BundleAnalyzerPlugin]() de `webpack` que nos permita una mejor visualización. Para ello, primero instalaremos
el paquete del plugin:

    yarn add webpack-bundle-analyzer --dev

y después añadimos el plugin en el `webpack.config.js`:

    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    
    plugins: [
       new webpack.HotModuleReplacementPlugin(), // Enable HMR
       new webpack.NamedModulesPlugin(),
       new BundleAnalyzerPlugin({
           analyzerMode: 'static'
       })
    ],
    
si volvemos a realizar un `build` de nuestro `bundle` podremos ver que se abre en nuestro navegador un diagrama de las
dependencias de nuestra `App`.

<iframe width="600" height="400" frameborder="0" src="../_reports/report_1.html"></iframe>

Ahora podremos comprobar cual es el tamaño de nuestras dependencias. Pero para evitar que se lance el informe en cada `build`
crearemos una tarea `report` en el `package.json` usando las variables de entorno de Node:

    "report": "REPORT=true webpack"
    
y modificaremos el `webpack.config.js` de la siguiente manera:

    let plugins = [
            new webpack.HotModuleReplacementPlugin(), // Enable HMR
            new webpack.NamedModulesPlugin()
        ]
    
    if (process.env.REPORT) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
        plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }))
    }
    
    ...
    
    },
    plugins: plugins

Cada vez que hagamos cambios en nuestra `App`, `webpack` debe generar el `bundle` importando gran cantidad de código que no 
cambia, como todo aquello referente al framework Onsen, React, etc, para ello una de las maneras que nos propone `webpack`
es el uso de [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) que nos generará varios `chunks` 
con nuestro código.

Configuraremos el plugin, primero definiendo las entradas que irán al `vendor`:

    entry: {
        main: entries,
        vendor: ['onsenui', 'react', 'react-dom', 'react-onsenui']
    },
    
y después cargando el plugin:

    let plugins = [
        new webpack.HotModuleReplacementPlugin(), // Enable HMR
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // Specify the common bundle's name.
        })
    ]
    
Si lanzamos ahora el `report` podremos observar que las dependencias `webpack` las ha empaquetado en el `vendor.js`. Aun así 
vemos que la dependencia de los CSS sigue estando en el `main.js`.

<iframe width="600" height="400" frameborder="0" src="../_reports/report_2.html"></iframe>

Para extraer los CSS del `main.js` utilizaremos otro plugin de `webpack`, [ExtractTextWebpackPlugin](https://webpack.js.org/guides/code-splitting-css/#using-extracttextwebpackplugin)
Instalamos el plugin:

    yarn add extract-text-webpack-plugin --dev

Modificamos el `webpack.config.js` para usar este nuevo plugin:

    const ExtractTextPlugin = require('extract-text-webpack-plugin');

    let plugins = [
        new webpack.HotModuleReplacementPlugin(), // Enable HMR
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // Specify the common bundle's name.
        }),
        new ExtractTextPlugin('styles.css')
    ]

<iframe width="600" height="400" frameborder="0" src="../_reports/report_3.html"></iframe>