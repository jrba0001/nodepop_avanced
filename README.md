# Práctica Nodejs Avanzado (nodepop_avanced) de MasterBootcamp Web Keepcoding.

### Ejemplo de modulo npm creado y subbido, por jrba, para cálculo de dosis antibioticoterapía para primer dia.


https://www.npmjs.com/package/ejemplo_microservicios
npm i ejemplo_microservicios


### Nodejs - Mongodb - Express

* Arrancar la base de datos mongodb.
**La carpeta completa mongodb, debe estar en el directorio nodepop_avanced para que funcionen los scripts de package.json

**./bin/mongod --dbpath ./data/db --directoryperdb**

en nuestro caso, por comodidad hemos creado un script en la ruta mongodb y llamamos con npm run startdb

> La base de datos no se sube, luego este script no aparecerá, arrancar la base de datos a mano.

* Inicializar la base de datos: npm run inicializa, ejecuta escript que tenemos ubicado en la ruta ./datos/install_db.js realiza las siguientes acciones:
  _ borra la base de datos.
  _ La crea y crea indices. \* Carga datos con dos ficheros .json que tenemos en ./datos/

> Para ejecutar npm run inicializa, no olvidar tener el motor de base de datos arrancado.

* Crear usuarios en la base de datos:
Hay que ejecutar **npm run install_D,** para cargar los usuarios. Se crea un usuario admin@example.com con 1234 contraseña para hacer login.

*arrancar nuestro servidor:
- npm run dev   o
- **npm run start**.

La presente práctica se basa sobre la partica de nodejs fundamentos, revisar repositorio correspondiente para ver que se pedia, en esta práctica se pide

## **Práctica nodejs avanzada**
#### Índice de retos:
1. Autenticación
	* Implementar autenticación JWT al API.
2. Internacionalización.
	* Este reto consiste en convertir el frontend de anuncios de la aplicación Nodepop en
multi-idioma.
3. Subida de imagen con tarea en background
	* El API necesita un end-point para crear anuncios.
4. Testing (Opcional)
	* Hagamos que la calidad sea una característica de nuestro software.
Este reto consiste en incluir tests e2e del API de Anuncios con Supertest
https://github.com/visionmedia/supertest
5. BONUS TRACK
	* Se propone hacer alguna utilidad de nuestra invención que pueda resultar útil para nosotros
mismos o para otros.
# NOTAS DE CONFIGURACION.
Tras clonar repositorio, hay que configurar las variables en fichero .env, que hay que crear, con las variables para enviar correos de sendgrid, y el tocken.
Para evitar fallos, no incluimos este fichero en .gitignore, y las variables  de sendgrid van sin rellenar.

La subida de imágenes al servidor y creación de thumbnail, se realiza mediente rabbitmq. Para el correcto funcionamiento:

*** En una ventana bash, arrancar dentro de la carpeta /lib de nuestro proyecto node consumer.js**

* **Podemos comprobar, como para cada subida de archivos, el publiser va encolando los mensajes, a la cola rabbitmq, y posteriormente va dejandolos en el servidor.**

### TESTING

Para realizar los test

$ npm run e2e

###  http://localhost:3000/

### Para la utilizacion de la apiv1, es necesario la obtencion de token:

### localhost:3000/loginJWT. hacemos un post a esta dirección y en el body nos autenticamos con email y password, en este caso el usuario es admin@example.com con password 1234.

El token obtenido es = <p>Todos los ejemplos anteriores pueden realizarse atacando a la api: /apiv1/anuncios?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWNhNmQyNjU4NDVjMzliYzhkY2NlYjgiLCJpYXQiOjE1MjMyMTU5MTgsImV4cCI6MTUyMzM4ODcxOH0.98fMGCkMNSDY85NuH4JNlNwTF23thYEo2l1t3T5Yrw4

Pide token, podemos autenticarnos con postman y hacer un post para obtener el token. El día de la prueba el token facilitado es: 
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWNhNmQyNjU4NDVjMzliYzhkY2NlYjgiLCJpYXQiOjE1MjMyMTU5MTgsImV4cCI6MTUyMzM4ODcxOH0.98fMGCkMNSDY85NuH4JNlNwTF23thYEo2l1t3T5Yrw4
        
        