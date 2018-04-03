# Práctica nodepop de MasterBootcamp Web Keepcoding.

### Fundamentos Nodejs - Mongodb - Express

* Arrancar la base de datos mongodb.

./bin/mongod --dbpath ./data/db --directoryperdb

en nuestro caso, por comodidad hemos creado un script en la ruta mongodb y llamamos con npm run startdb

> La base de datos no se sube, luego este script no aparecerá, arrancar la base de datos a mano.

* Inicializar la base de datos: npm run inicializa, ejecuta escript que tenemos ubicado en la ruta ./datos/install_db.js realiza las siguientes acciones:
  _ borra la base de datos.
  _ La crea y crea indices. \* Carga datos con dos ficheros .json que tenemos en ./datos/

> Para ejecutar npm run inicializa, no olvidar tener el motor de base de datos arrancado.

arrancar nuestro servidor
nodemon o npm run start

## **Tema de listados**



### **Se pueden aplicar filtros usando los parametros siguientes: Nombre, estado (compra o vende), precio, foto, tags.
**
    Añadimos esta etiqueta o varias a la pagina ?nombre=bicicleta1 o directamente ?nombre=bicicleta http://localhost:3000/anuncios?nombre=bicicleta

    Ordenado http://localhost:3000/anuncios?nombre=bicicleta&sort=nombre

    Ordenado descendente http://localhost:3000/anuncios?nombre=bicicleta&sort=-nombre

    Limitado a x anuncios, en este ejmplo1 http://localhost:3000/anuncios?nombre=bicicleta&limit=1

    Limitado a estado compra o vende, este ejemplo compra ordenado precio http://localhost:3000/anuncios?estado=compra&sort=precio>

    Limitado a estado compra o vende, este ejemplo vende ordenado precio descendiente http://localhost:3000/anuncios?estado=vende&sort=-precio

    Listado por precios Busca por precio ("x-" -> Mayor que x || "x-y" -> Entre x e y || "-y" -> Menor qu. En este ejemplo mayor a 600: http://localhost:3000/anuncios?precio=600-

    Listado por precios Busca por precio ("x-" -> Mayor que x || "x-y" -> Entre x e y || "-y" -> Menor que y En este ejemplo menor a 600: http://localhost:3000/anuncios?precio=-600

    En este ejemplo entre 100 y 800: http://localhost:3000/anuncios?precio=100-800&sort=-precio

    Se pueden aplicar filtros para ordenar "sort", limitar "limit", saltar algun valor "skip"

    Listado por nombre = biclice, precio mayor que 600, ordenador precio descendiente, limitada a dos busqueda. http://localhost:3000/anuncios?nombre=bicicle&precio=400-&sort=-precio&limit=1
    tags: Busca por tags o etiquetas ("lifestyle", "motor", "mobile", "work")
### **
###     Todos los ejemplos anteriores pueden realizarse atacando a la api: /apiv1/anuncios
**
    En este ejemplo entre 100 y 800: http://localhost:3000/apiv1/anuncios?precio=100-800&sort=-precio

    Añadir anuncios:

    Realizando una petición post a la dirección http://localhost:3000/apiv1/anuncios se pueden añadir nuevos anuncios a la base de datos.
    Borrar anuncios:

    Realizando una petición delete a la dirección http://localhost:3000/apiv1/anuncios se pueden borrar anuncios a la base de datos.