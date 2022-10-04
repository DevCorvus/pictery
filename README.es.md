<p align="center">
  <img src="./pictery-icon.png" alt="Pictery Icon">
</p>

<h1 align="center">Pictery</h1>

Una aplicación de gestión de galerías de imágenes desarrollada en Vue y Express.js con Typescript.

**Échale un vistazo: https://pictery.onrender.com/**

> **IMPORTANTE:** Esta no es una aplicación destinada al público general. Se trata de un proyecto personal con fines demostrativos y de aprendizaje técnico. Úsese con precaución y no suba contenido perjudicial, clasificado u explícito. Espero le sea interesante y no me hackee porfavor, gracias. ❤️

Es libre de explorar el código y si desea contactar conmigo por cualquier motivo relacionado, puede hacerlo a través de los distintos medios públicos que dejo a disposición.

Puede leer este documento en los siguientes idiomas:

- [Inglés](README.md)
- [Español (actual)](README.es.md)
- [Francés](README.fr.md)

## ⚗️ Stack tecnológico (lo más relevante)

- Typescript (todo el código)
- Vue 3 (Composition API)
- TailwindCSS
- Cypress
- Express.js
- Prisma (PostgreSQL)
- Passport.js
- Google OAuth
- Cloudinary
- Zod
- Jest
- Entre otros...

# 😴 TL;DR;JK 📖

Este es un proyecto única y exclusivamente demostrativo enfocado en mi aprendizaje personal durante el mismo. Todo este documento está redactado desde un enfoque personal con toques técnicos sobre las partes que consideré más relevantes o distintivas del proyecto y siendo crítico conmigo mismo.

## Contexto

Todo el proceso de desarrollo de este proyecto ha sido un gran viaje del que he aprendido mucho y con el que me he superado en muchos sentidos (el cual es el objetivo). Sin embargo, casi 10,000 líneas de código después y varios meses de desarrollo en condiciones poco óptimas (entre muchas de ellas, una patata de ordenador con 4GB de RAM y un procesador Intel Celeron 847 Dual Core de 1.1 Ghz) el proyecto me ha tomado mucho más tiempo del que preveía y la experiencia de desarrollo en general fue decayendo conforme más añadía al mismo. Teniendo esto en consideración, hubieron varias características que se quedaron en el papel y de las que haré mención más adelante, pero aún así este sigue siendo con diferencia el proyecto personal en el que más esfuerzo he puesto.

> NOTA: Debido a no saber con certeza si este proyecto saldría a la luz en un principio y dado el largo proceso de aprendizaje con constantes cambios abruptos y disruptivos, no tenía muy claro en qué punto debía empezar a hacer Commits y para cuando lo vi claro ya estaba cerca de terminar así que de nuevo me marqué un facepalm.

## La idea

Este proyecto empezó con la simple idea de crear una galería de imágenes bastante cómoda de usar (subiendo archivos) utilizando Vue como framework para el UI (simplemente porque estaba bastante interesado en aprender a utilizar esta tecnología). Sin embargo, fui añadiendo cada vez más herramientas como Prisma, Zod, Jest, Cypress, entre otros. Y conceptos relativamente nuevos para mi en los que quería profundizar a lo largo del desarrollo, como suelo hacer en cada uno de mis proyectos.

## Primeros pasos

> **Typescript:** Desde el backend hasta el frontend y las herramientas de testing, todo está escrito en Typescript en vez de Javascript, y lo tenía muy claro desde un principio. No creo haga falta mencionar las numerosas razones por las que esto es así, los beneficios son más que obvios: sistema de tipos, autocompletado, código más robusto, menos propenso a errores, etc. Typescript es el camino a seguir para casi cualquier proyecto de este ecosistema en estos tiempos y me es bastante cómodo de usar.

Empecé este proyecto, de hecho, a través de otro proyecto en el que estaba trabajando que se trataba simplemente de un backend en Express.js con Typescript y Prisma (el mejor ORM que he usado hasta ahora en Node.js), influenciado un poco por los principios SOLID y una estructuración más escalable por características. Aproveché esta implementación que hice del backend y la modifiqué para integrarla a esta nueva idea (dos pájaros de un tiro) con un esquema en la base de datos que incluía usuarios, galerías e imágenes.

> **OOP y principios SOLID:** Nunca he utilizado mucho OOP (Object Oriented Programming) en mis proyectos aunque sea un tema que conozca relativamente bien, sencillamente porque la programación funcional suele encajar mejor dado el lenguaje y el tipo de proyecto. Para esta ocasión quise hacerlo, pero de manera muy simplificada y sólo en el backend, intentando seguir además los principios SOLID (que no apliqué a rajatabla, he de decir). Los beneficios de desarrollar software siguiendo este paradigma y diseño son apreciables, especialmente en equipos de desarrollo y proyectos de escala mucho más grandes. Aunque también me he percatado de que si no se toman ciertas medidas puede hacerlo todo más complejo de lo que debería ser y que se puede alcanzar algo muy similar con programación funcional bien organizada. Por último, he de decir que en vez de hacer esto por cuenta propia (aunque se aprende mucho), es mejor usar un framework ya establecido y más dogmático como Nest.js.

> **Estructuración por características:** Dada la escala del proyecto decidí ir por una estructuración organizada por características (features) y la verdad es que ha sido una excelente decisión aunque mi implementación puede ser mejor.

Antes de escribir la primera línea de código en el cliente, me dispuse a diseñar en Figma (de manera muy básica) algunas de las cosas que tenía en mente en ese momento para un MVP (Minimum Viable Product). Puedes visualizar dicho diseño a través este link: https://www.figma.com/file/7ZvkKPdhLL8ycGwyyVUaVr/Vue-Gallery

> El nombre del proyecto se escogió hasta el final, por lo que durante el desarrollo, mantuvo el nombre genérico de "Vue Gallery".

Una vez terminé el esqueleto básico de la aplicación en Figma, hice algunos pequeños adelantos aprendiendo Vue 3 con el API de composición y Typescript en la marcha, utilizando además Vite (el mejor frontend tooling que hay) y CSS puro. Mi mejor amiga fue la documentación a través de este proceso, ya que era la primera vez para mi utilizando este framework.

### La experiencia Vue

En general, la experiencia de desarrollo en Vue ha sido bastante agradable, con una curva de aprendizaje muy cómoda, un ecosistema y una documentación de muchísima calidad pero que no es muy abundante.

Utilizando el API de composición en Vue, fue muy fácil encontrar similitudes con React (mi punto de referencia) que simplificaron mucho el proceso de aprendizaje. En comparación con React, se siente todo mucho más organizado, integrado y coherente al menos para los recien llegados como yo y tal y como su nombre indica, es un framework progresivo que se va descubriendo y extendiendo según la necesidad. Aún así, React sigue siendo más relevante para mi ya que hay muchísimo más soporte y demanda en comparación, y ya estoy bastante acostumbrado a JSX.

Lo que más me ha encantado de Vue es la facilidad para elegir entre las opciones recomendadas (oficialmente) de su ecosistema y trabajar con animaciones, cosa que con React no es tan sencillo.

## Mejorando en diseño web

Después de un largo proceso de aprendizaje haciendome a las bases de Vue y construyendo parte del UI, me decidí por mejorar el diseño. Para ello terminé leyendo un excelente libro llamado **Refactoring UI**, el cual recomiendo muchísimo ya que está enfocado por y para desarrolladores que no son diseñadores como tal (lo cual es mi caso). Traté de absorber cuanto conocimiento pude y aplicarlo en el proyecto, de lo cual aprendí muchísimo y la mejora con respecto a otros proyectos anteriores es bastante notable en mi opinión aunque sigue habiendo mucho que aprender. Siendo un desarrollador principalmente de backend, estoy orgulloso del progreso.

En este punto y para agilizar el proceso de desarrollo con un sistema de diseño ya establecido, reemplacé el CSS puro por TailwindCSS (mi framework de CSS favorito) en vista de que el código escalaría mucho más que en un principio. 

La idea general del diseño y el UI era que fuese bastante minimalista e intuitivo, haciendo más con menos y que todo esté adaptado a los distintos tamaños de pantalla. En vez de sobrecargar la interfaz con mil y un cosas traté de mantener todo lo más simple y ligero posible para que fuera muy cómodo y suave al uso. En este sentido creo que he cumplido el objetivo aunque hay partes mejorables, sin duda.

## Cosas del backend

Con parte de la interfaz establecida, el siguiente paso lógico fue integrar el API del backend con el cliente. En este sentido, lo primero fue el sistema de autentificación con Passport.js que en esta ocación, quería que fuera algo distinto: OAuth (Open Authentication). De los servicios disponibles, escogí Google OAuth ya que es el más accesible de entre los más relevantes. Más tarde decidí también incorporar la opción de un registro por credenciales locales (email y contraseña), en el cual quería implementar la verificación de email pero lo descarté al no tener disponible un servicio SMTP que pudiera llevar cómodamente a producción.

Después de concluir con numerosas rutas (al final, un total de 23, la mayoría CRUDs), middlewares y demás con validación en Zod (una librería que quería probar), era momento de implementar un servicio para subir archivos. La primeras opciones que barajeé y también las más conocidas son AWS S3, GCS o Microsoft Azure, sin embargo todas estan opciones fueron descartadas ya que no son gratis ni sencillas (aún así, hice varias pruebas de simulación con sus SDK). En busca de una alternativa más viable, la opción más obvia terminó siendo Cloudinary, que no sólo ofrece un servicio gratuito y bastante generoso para subir archivos multimedia y demás, sino también numerosas herramientas para manipular de forma dinámica dichos archivos. Para este proyecto, sólo aproveché la subida de archivos de Cloudinary y del resto me encargué yo, teniendo en cuenta las limitaciones y la escala del proyecto.

> A partir de este punto en el desarrollo, me lo tomé todo de manera más seria para entregar un producto lo más "realista" posible, tal y como si estuviera dirigido al público general (con sus matices), aunque al final sólo sea una demostración (algo que suelo hacer y me retrasa mucho en materializar mis "pequeñas" ideas). Por este motivo, tomé muchos más detalles en consideración para dar un acabado más profesional. A lo largo del desarrollo fui integrando numerosos cambios y mejoras cada que veía la oportunidad para aprender más y mejor, haciendo del proyecto más vez más ambicioso.

### Seguridad

Esta es una de esas cosas que siempre tomo en consideración y que me encantan en torno al desarrollo de software, pero sobre lo que no he podido profundizar mucho de forma práctica en un caso real donde sea vital. Esto debido a que simplemente no existe dicha necesidad en proyectos de este tipo, con lo esencial es más que suficiente (y es lo que he hecho). Entre dichas medidas estan las de siempre: proteger bien las rutas, validar y limpiar los datos de entrada y salida, no emitir errores que comprometan el sistema, limitar peticiones, mantener la integridad del sistema y los usuarios, etc. Además tuve una especial consideración con Cloudinary para evitar exceder el límite del plan "accidentalmente".

### Registrando cosas

Siempre he querido aprender sobre registros en sistemas de software aunque la verdad es que es mucho mejor dejar esta tarea en manos de un servicio de terceros más automatizado. A pesar de ello intenté implementar un muy simplificado middleware de registros sólo por tenerlo aunque realmente ni fuera necesario y sólo pudiera enviarlos a la consola debido a la limitación de archivos no persistentes (que sabía que me encontraría en producción).

### Privacidad

Como suele pasar en todos mis proyectos, la privacidad de los usuarios es primordial. No hay nada bajo la mesa, lo que se ve es lo que hay (puede verse en el código). El uso de los datos recabados del usuario sólo se usan en el contexto del servicio que la aplicación ofrece, nada más. Sólo los usuarios autenticados pueden acceder al contenido dentro de la aplicación y todos los datos eliminados por el usuario, son realmente eliminados a través de un "hard delete".

Las galerías privadas OCULTAN el acceso a las imágenes que contienen dentro de la aplicación, pero estas siempre son accesibles de manera pública a través de su URL directa. Traté de tomar alguna medida al respecto pero no encontré nada muy esclarecedor, además de que se trata de un servicio externo por lo que no tengo absoluto control (aunque seguro es posible y soy tonto). Para no sobrecomplicar las cosas, al final mantuve la implementación tal y como estaba.

> **IMPORTANTE:** Las imágenes subidas en esta aplicación estan dentro de una carpeta del mismo nombre en mi cuenta de Cloudinary. Por favor, no suba contenido que pueda ser perjudicial, clasificado u explícito. Recuerde, esta es una aplicación con fines demostrativos que no está destinada al público general.

## Cosas del frontend

Aqui es donde estan la mayoría de líneas de código, y por ende, la mayor parte del esfuerzo y tiempo en este proyecto.

En comparación con el backend, el frontend está mucho menos organizado y consistente. Esto es debido a que hay mucho más código y todo ese código ha sido escrito en el contexto de alguien que está aprendiendo a utilizar la herramienta (Vue). Por lo que no es de extrañar ver distintas formas de hacer lo mismo o cambios que hacen inconsistente ciertas secciones de código ya que partí de cero y fui evolucionando conforme más aprendía (un poco de código spaguetti de toda la vida, aunque nada muy grave).

### Páginas

- **Home:** A modo de simulación, pensé en hacer la presentación más genérica posible sobre la aplicación y el servicio que ofrece, vendiendola un poco de cara al público.

- **Register/Login:** Unos simples formularios para crear una cuenta e iniciar sesión respectivamente, con la opción de hacerlo a través de Google OAuth.

- **Dashboard:** Donde se gestionan todas las galerías del usuario.

- **Gallery:** Donde se gestiona una galería y todas las imágenes que pertenecen a ella.

- **Profile:** Donde se muestra información muy básica de un usuario. En un principio tendría una personalización extensa... al final terminó siendo el lugar perfecto donde poner frases motivadoras de forma aleatoria (lo cual es mucho mejor en mi opinión).

- **Not Found:** Un simple cartel para redirigirte a "Home" si has entrado en una página inexistente, lo cual incluye galerías y perfiles.

### Accesibilidad

Siempre tomo en cuenta la accesibilidad al momento de desarrollar en el frontend, al menos en lo más esencial: contraste, feedback del UI, interacción completa y cómoda con el teclado, que sea intuitivo, etc.

### Rendimiento y optimización

El rendimiento y la optimización siempre son importantes para mi, aunque en este caso no fue una preocupación prioritaria. Tanto en el backend como el frontend tomé ciertas medidas y factores en consideración para evitar excederme con alguna operación de cómputo pesada. Vue es bastante rápido (en el contexto de Javascript) y a pesar de haber algunas operaciones de cierto esfuerzo, está previsto que todo vaya como la seda. 

### Formularios

Trabajar en formularios decentes para una SPA (Single Page Application) casi siempre es un dolor de cabeza, esta no fue la excepción. Hay varias cosas que tomar en cuenta: estado de los datos, validación, mensajes de error, envío, etc. Traté de utilizar una librería (Vee-validate) para resolver este asunto de forma más sencilla que el método "manual" y además aprender algo nuevo. El resultado fue satisfactorio, especialmente debido al soporte disponible con Zod, aunque creo que hay mejores formas de hacerlo.

### Trabajando con códigos QR

Un amigo mío me dio una vez una idea de incluir códigos QR en alguno de mis proyectos para lo cual simplemente pensé "¿Por qué no?". No tenía ni idea de este tema, así que investigué al respecto y busqué la forma de implementar algo así. Leve fue mi sorpresa de que en el ecosistema de Vue encontraría una solución extremadamente sencilla para este asunto (ya que es usual que exista una para casi todo). Y así como así, terminé implementando códigos QR para compartir galerías.

### Lighthouse

El resultado general de Lighthouse ha sido casi perfecto, con algún detalle menor en torno al contraste y poco más.

![Lighthouse](https://i.ibb.co/7pq8NGv/pictery-lighthouse.png)

## Testing

Utilizando Jest en el backend y Cypress (por primera vez) en el frontend... Una de las cosas que más dolores de cabeza me provocó fue el implementar tests a lo largo y ancho de las partes más importantes de la aplicación (no por pereza, lo juro). Tenía pensado inicialmente desarrollar este proyecto de principio a fin utilizando TDD (Test Driven Development), el cual es un proceso de desarrollo bastante interesante y útil a mi parecer. Sin embargo, el problema reside en el hardware con el que he trabajado (bastante malo), ya que estar constantemente ejecutando nuevos tests para todo, montones de código nuevo y demás, no haría otra cosa que ralentizar el desarrollo y dañar mi experiencia general en el proyecto. Por ello, empecé a hacer sólo tests "importantes" en un punto relativamente avanzado pero no tanto como para hacer complicada su implementación, ya que es mejor empezar los tests lo antes posible en el desarrollo. A pesar de esta medida, el sufrimiento fue inevitable con cerca de 15 minutos de espera en los tests E2E del cliente (mi patata de ordenador olía a quemado, literalmente). Por supuesto, esta terrible experiencia de desarrollo se ve reflejada en la calidad de los tests. Sin embargo, dejando de lado esos problemas, hacer tests es muy gratificante para mi y probar Cypress por primera vez ha sido, dentro de lo que cabe, una enriquecedora experiencia (pero que no recomiendo a quienes tengan una patata de ordenador como yo).

Hablando de los tests, hay 34 en el cliente (33 E2E y 1 de componente) y 81 en el backend (unitarios e integrales). Dichos tests cubren, como he mencionado antes, las partes más importantes de la aplicación aunque no de manera muy profunda. Hay muchas cosas que mejorar en cuanto a los tests: Estan muy anidados, faltan muchas más simulaciones, algunos dependen de conexiones en la red, no estan del todo aislados o no cubren la totalidad de los casos. Sin embargo, el objetivo nunca ha sido el 100% de cobertura ni un código que aspire a ser infalible. El objetivo es aprender, y para mi implementar dichos tests en un proyecto de esta magnitud dadas mis limitaciones, ya es un gran paso en la dirección correcta. Además, esto es sólo una demostración, y para dicho fin es más que suficiente.

## Intento de Monorepo

La necesidad por compartir código (interfaces, esquemas, constantes y datos de simulación) entre el frontend y el backend para así evitar violar el principio DRY (Don't Repeat Yourself) en este caso en particular, me llevó a buscar una solución en la cual vi una oportunidad perfecta para aprender algo nuevo. La solución que escogí para este asunto fue el uso de un Monorepo, cosa que no había hecho antes pero que llamaba mucho mi atención. Investigué sobre el tema y las herramientas más populares en torno a esta estrategia de desarrollo, siendo Nx la que más llamaba mi atención pero que lamentablemente no contaba con soporte nativo a Vue. El resto de herramientas disponibles no terminaban de convencerme así que terminé haciendo mi propio "Monorepo" con los workspaces de npm y Typescript (Spoiler: Me disparé a mi mismo en el pie). El resultado no fue el mejor, he de decir, ni siquiera estoy seguro de que se merezca llamar Monorepo, pero cumple el objetivo de compartir código entre ambas partes y aprendí bastante más de esta manera a pesar de la falta de documentación clara al respecto (para la próxima, mejor utilizar una herramienta óptima para el trabajo).

## Más ideas

Hubieron muchas cosas que por una razón u otra no pude incluir en el producto final pero que tuve en mente, la mayoría de estas por limitaciones o simplemente porque era demasiado dado el contexto. Entre las cuales estaban:

- Verificación del email
- Explorador de galerías con paginación y filtros de búsqueda
- "Visitas" y "Me gusta" para galerías e imágenes
- Sección de galerías favoritas
- Personalización extensa del perfil del usuario (nombre, imagen, portada, bio, etc.)
- URLs más amigables de cara al usuario
- CI/CD
- Entre otros...

Muchas de estas características potenciales giran en torno al apartado social de la aplicación. Puede que más adelante las incluya, aunque sin una motivación clara y un mejor hardware, lo dudo mucho.

## Problemas en producción

Ser un desarrollador fullstack/backend que quiere subir demostraciones de sus proyectos a internet no es para nada fácil. Desplegar un proyecto frontend puede ser tan sencillo como un par de clicks de forma completamente gratuita y como por arte de magia, pero este no suele ser el caso en el backend. Los proyectos que involucran backend son mucho más complejos y costosos dada su naturaleza. Teniendo esto en cuenta, sabía que llevar a producción un proyecto de estas características sería complicado, pero lo fue todavía más.

### Hosting

Con la caída de los planes gratuitos de Heroku (la plataforma donde usualmente subía mis demostraciones), fue dificil encontrar un reemplazo que fuera viable tanto para sus servicios de hosting web como de base de datos. Heroku no era perfecto pero ofrecía un plan gratuito, muy generoso, bien documentado y fácil de utilizar.

La alternativa que pude encontrar fue una combinación de Render.com para el hosting web y Supabase para el hosting de una base de datos PostgreSQL.

### Google OAuth

Siempre hay algo que funciona perfectamente en local y piensas que no dará problemas en producción pero lo termina haciendo, este fue el caso de Google OAuth. Básicamente el problema reside en el proceso de verificación que hay que llevar a cabo para utilizar públicamente el API de Google como proveedor OAuth. Este proyecto no cumple con los requisitos y por ende no está verificado para utilizar Google OAuth al completo. Hay un límite por defecto de sólo 100 usos en total del servicio en este contexto.

Pienso que es exagerado llevar a cabo este proceso de verificación cuando sólo quiero demostrar que la funcionalidad está ahí. Por lo que es cuestión de tiempo de que esta característica deje de funcionar como es debido en la demostración pública.

### Otros

Como he mencionado a lo largo del documento, hay muchas otras características limitadas o que no pude incluir como tenía previsto dadas las condiciones presentadas. Como por ejemplo: verificación de correo, subida de archivos, etc.

> Considerando todos estos problemas, veo complicado actualmente seguir desplegando proyectos personales que involucren semejante complejidad, tiempo y coste. No porque no quiera sino porque es algo insostenible en mi contexto. Me centraré en proyectos puramente técnicos de pequeña escala hasta que pueda retomar esta clase de proyectos ya que son muy divertidos para mi y aportan mucho a mi aprendizaje y experiencia.

## Conclusión

Este es el proyecto personal en el que más esfuerzo y tiempo he puesto. No es en el que más he aprendido, pero si en el que más he consolidado aquello que he aprendido en todo este tiempo y aún queda mucho por aprender y mejorar, eso es lo que más me gusta del desarrollo de software y estoy muy orgulloso del trabajo que he hecho aquí. Debo reconocer que es en el que peor lo he pasado debido a las limitaciones con las que he llevado a cabo este trabajo (como el hardware deficiente). Aún así, eso no ha detenido este proyecto ni los muchos otros que tengo en mente para explorar nuevas e interesantes ideas a través de este apasionante campo.

Ya para finalizar, muchas gracias por leer y nos vemos en otra pull request! ❤️

*Casi olvidaba la referencia a The Office LMAO.*

![The Office I'm dead inside](https://c.tenor.com/o-YELW_C6s8AAAAd/when-ur-bff-moves-away-dead-inside.gif)

_\- DevCorvus_
