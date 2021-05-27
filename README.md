# Configurar un proyecto de node con typescript

creat el proyecto
npm init -y

crear el archivo app.ts

# Instalar typescript de forma global
- sudo npm i -g typescript

# Crear el archivo de configuracion de typescript (tsconfig.json)
- tsc --init

# Abrir el archivo tsconfig.json y modificar:

    "target": "es6",
    "sourceMap": true,
    "outDir": "./dist", 
    "moduleResolution": "node",

Cerrar las terminales abiertas

en la terminal correr el comando "tsc" para que lea el archivo tsconfig.json

se crea la carpeta dist y los archivos:
    - app.js
    - app.js.map

# Correr el comando para ejecutar node:
- node dist/app.js

# Ańadir reglas adicionales a typescript (standares de desarrollo)
- npm i tslint --save-dev
- npm i typescript --save-dev

# Crear el archivo de configuracion de tslint, en el terminal
- ./node_modules/.bin/tslint --init   

# Abrir el archivo tslint.json y agregar la regla:
    "rules": {
        "no-console": false
    },

Volver a correr el comando "tsc" 

# Instalar Express, Cors y Dotenv
- npm i express cors dotenv
- npm i --save-dev @types/express
- npm i --save-dev @types/cors

# Una vez realizado la creacion del server, compilamos la app con;
- tsc 

# Corremos la app con:
- nodemon dist/app.js

# Correr typescript (tsc) automatico
usar otra terminal y usar el comando:
- tsc --watch

git checkout -- .

# Nota:
Ejecutar el comando ```npm install``` para reconstruir los módulos de Node.

# Instalar Mongoose
- npm i mongoose
- npm i @types/mongoose --save-dev
