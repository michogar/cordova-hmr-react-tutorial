# Compilando desde ES6
 Como ya os habréis fijado, hemos escrito nuestro código usando ES6. Aunque cada vez más los navegadores incorporan prácticamente 
 todas las funcionalidades del nuevo estandar, pero en algunso casos querremos compilar nuestro código desde ES6 a ES5. 

 Para ello utilizaremos [Babel](https://babeljs.io/) un compilador de JavaScript que nos permite realizar esta compilación.
 
 Tendremos instalar algunos paquetes y realizar algunos cambios en la configuración del `webpack`.
 
 Para realizar la compilación usaremos los `loaders` de `webpack`. Los loaders se encargan de realizar ciertas operaciones 
 durante la creación del `bundle`.
 
 Primero instalamos los paquetes necesarios para la compilación:
 
    yarn add babel-core babel-loader --dev
    
 y añadimos la configuración necesaria:
 
     module: {
         rules: [
             {
                 test: /\.(js|jsx)$/,
                 exclude: [/node_modules/],
                 use: ['babel-loader'],
             }
         ],
     },
 
 * `module`: se encarga de definir los típos de módulos que tenemos dentro del proyecto y nos permite configurar diferentes
 tratamientos.
 * `rules`: reglas que aplicarán configuraciones sobre aquellos módulos que las cumplan. Se trata de un `Array` en el que se van incluyendo
 las diferentes reglas
 
 Una `rule` viene definida por un objeto que a su vez tiene unas propiedades, en nuestro caso:
 
 * `test`: la regla que se aplicará a los recursos, en nuestro caso es una expresión regular que aplica la configuración 
 definida a los archivos con extensión `.js` o `.jsx`. [Documentación Oficial](https://webpack.js.org/configuration/module/#condition)
 * `exclude`: **NO** se aplica a los recursos que cumplan la condición, en nuestro caso que se encuentren en el path `node_modules`
 evitando así la compilación de los archivos que se encuentran en esa carpeta
 * `use`: listado de `loaders` que serán aplicados a los recursos
 
 Ahora nuestro código estará preparado para los navegadores que no implementen todavía ES6.