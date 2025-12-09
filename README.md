# TripRecomendation

TripRecomendation es una web que te permite buscar sitios de vacaciones utilizando una implementación de ia.

De tal forma que veremos un mapa con los puntos importantes

AÑADIR VIDEO

El proyecto se levanta creando un `/backend/.env` y añadimos esto

La clave GEMINI_API_KEY se genera [aqui](https://aistudio.google.com/api-keys)

```c
PORT=5555
GEMINI_API_KEY="XXXXXXXXXXXXXXXXXXX" //clave q nos proporciona gemini
```

una vez q este todo nos vamos a la carpeta `ex00/` y hacemos estos comandos

```c
docker-compose build
docker-compose up
```
