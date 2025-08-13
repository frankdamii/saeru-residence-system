
---

# SAERU — Sistema de Admisión de Estudiantes en Residencia Universitaria

![AAUCA Logo](frontend/client/src/assets/images/AAUCA_LOGO-TR@2x_EP.png)

**SAERU** es una aplicación web integral diseñada para gestionar, digitalizar y centralizar el proceso de admisión y la vida residencial de estudiantes en las residencias de la **Universidad Afro-Americana de África Central (AAUCA)**.
Cubre todo el flujo: desde la solicitud pública del aspirante hasta la admisión, asignación de habitación, gestión de residentes y comunicación interna mediante tablón de anuncios.

---

## 🧭 Índice

* [Características](#-características)

  * [Para Estudiantes](#para-estudiantes)
  * [Para Administradores](#para-administradores)
* [Arquitectura y Pila Tecnológica](#-arquitectura-y-pila-tecnológica)
* [Estructura de Carpetas](#-estructura-de-carpetas)
* [Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)

  * [Prerrequisitos](#prerrequisitos)
  * [1. Clonar el Repositorio](#1-clonar-el-repositorio)
  * [2. Configuración de la Base de Datos](#2-configuración-de-la-base-de-datos)
  * [3. Configuración del Backend](#3-configuración-del-backend)
  * [4. Configuración del Frontend](#4-configuración-del-frontend)
* [Variables de Entorno](#-variables-de-entorno)
* [Flujo de Admisión (Resumen)](#-flujo-de-admisión-resumen)
* [Buenas Prácticas y Seguridad](#-buenas-prácticas-y-seguridad)
* [Resolución de Problemas](#-resolución-de-problemas)
* [Contribución](#-contribución)
* [Hoja de Ruta (Roadmap)](#-hoja-de-ruta-roadmap)
* [Licencia y Copyright](#-licencia-y-copyright)

---

## 🚀 Características

### Para Estudiantes

* **Portal de Bienvenida:** Página de inicio con información clave sobre la universidad y las residencias.
* **Formulario de Solicitud Público:** Formulario **multistep** claro e intuitivo para datos personales, académicos y subida de documentos.
* **Panel Personal (post-admisión):** Acceso autenticado con perfil completo, detalle de habitación asignada y tablón de anuncios.
* **Descarga de Ficha en PDF:** Generación y descarga de ficha de residente en formato PDF.

### Para Administradores

* **Panel de Control Centralizado:** Métricas y KPIs (solicitudes pendientes, residentes activos, ocupación de habitaciones) y últimas solicitudes.
* **Gestión de Solicitudes:** Listado y detalle de cada aspirante con sus documentos adjuntos.
* **Proceso de Admisión:** Aprobar/Rechazar solicitudes; creación automática de cuenta de usuario y **asignación de habitación disponible**.
* **Gestión de Residentes:** Visualización, activación/desactivación de cuentas y acceso al perfil completo.
* **Gestión de Residencias y Habitaciones:** Herramientas **CRUD** (Crear, Leer, **Actualizar**, Borrar) con estado de ocupación en tiempo real.
* **Tablón de Anuncios:** Publicación de avisos visibles en los paneles de los estudiantes.

---

## 🏗️ Arquitectura y Pila Tecnológica

* **Frontend:** **Angular** (v17+) con **Standalone Components** y **Angular Material** para una interfaz moderna y responsiva.
* **Backend:** **Node.js** con **Express.js** (API REST).
* **Base de Datos:** **MySQL** con **Sequelize** como ORM.
* **Autenticación:** **JWT (JSON Web Tokens)** para proteger rutas y sesiones.
* **PDF en Cliente:** **jsPDF** para generar fichas descargables desde el navegador.

> El frontend consume la API REST del backend; el backend persiste los datos en MySQL usando Sequelize (migraciones/modelos) y aplica validaciones y autorización por rol.

---

## 🗂️ Estructura de Carpetas

> La estructura puede variar según la evolución del proyecto, pero de forma general:

```
saeru-residence-system/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env                   # variables del servidor
│   └── src/
│       ├── config/            # config db, cors, jwt, etc.
│       ├── models/            # modelos Sequelize
│       ├── controllers/       # lógica por recurso
│       ├── middlewares/       # auth, manejo de errores, validaciones
│       ├── routes/            # rutas Express agrupadas por módulo
│       └── utils/             # helpers, formateos, etc.
├── frontend/
│   └── client/
│       ├── angular.json
│       ├── package.json
│       ├── src/
│       │   ├── app/
│       │   │   ├── core/      # servicios base, guards, interceptors
│       │   │   ├── shared/    # componentes reutilizables, pipes
│       │   │   ├── features/  # módulos: solicitudes, residentes, etc.
│       │   │   └── pages/     # vistas
│       │   └── assets/
│       │       └── images/    # AAUCA_LOGO-TR@2x_EP.png
└── database/
    └── saeru_db_schema.sql    # esquema y datos iniciales
```

---

## ⚙️ Instalación y Puesta en Marcha

### Prerrequisitos

* **Node.js** v18 o superior
* **Angular CLI** v17 o superior
* **MySQL** (p. ej., XAMPP, WAMP, MAMP o MySQL Server nativo)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/frankdamii/saeru-residence-system.git
cd saeru-residence-system
```

### 2. Configuración de la Base de Datos

1. **Inicia** tu servidor MySQL.
2. **Crea** una base de datos vacía llamada `saeru_db`.
3. **Importa** el esquema:

   * Desde tu cliente SQL (MySQL Workbench, DBeaver, CLI), importa el archivo:

     ```
     database/saeru_db_schema.sql
     ```
   * Esto creará las tablas necesarias (y, si aplica, datos iniciales).

### 3. Configuración del Backend

```bash
cd backend
npm install
```

Crea un archivo **`.env`** en `backend/` con el siguiente contenido (ajústalo a tu entorno):

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=saeru_db
SERVER_PORT=3000
JWT_SECRET=una_frase_secreta_muy_larga_y_segura
```

Inicia el servidor:

```bash
node server.js
```

Deberías ver algo como: **🚀 Servidor corriendo en el puerto 3000.**

> **Nota:** si usas otra IP/puerto para la API, recuerda actualizar el **endpoint** en el frontend (servicios Angular / entornos).

### 4. Configuración del Frontend

En otra terminal:

```bash
cd frontend/client
npm install
ng serve
```

Abre el navegador en:
**[http://localhost:4200](http://localhost:4200)**

---

## 🔐 Variables de Entorno

| Variable      | Descripción                          | Ejemplo                            |
| ------------- | ------------------------------------ | ---------------------------------- |
| `DB_HOST`     | Host del servidor MySQL              | `localhost`                        |
| `DB_USER`     | Usuario de la base de datos          | `root`                             |
| `DB_PASSWORD` | Contraseña del usuario MySQL         | `MiPass123!`                       |
| `DB_NAME`     | Nombre de la base de datos           | `saeru_db`                         |
| `SERVER_PORT` | Puerto del servidor Express          | `3000`                             |
| `JWT_SECRET`  | Clave secreta para firmar tokens JWT | `cambia_esto_por_una_clave_segura` |

> Mantén **`JWT_SECRET`** en privado. No lo comitas al repositorio.

---

## 🧪 Flujo de Admisión (Resumen)

1. **Aspirante → Solicitud Pública:**
   Completa el formulario por pasos y adjunta documentos.
2. **Administrador → Revisión:**
   Consulta lista y detalle de solicitudes, valida información y archivos.
3. **Decisión:**

   * **Aprobar:** se crea cuenta de estudiante y se **asigna habitación** disponible.
   * **Rechazar:** se notifica y la solicitud queda registrada como rechazada.
4. **Estudiante Admitido:**
   Accede a su **dashboard**, revisa **datos de habitación**, descarga **ficha PDF** y ve **anuncios**.
5. **Operación Continua:**
   Administradores gestionan **residentes**, **residencias/habitaciones** y **tablero de anuncios**.

---

## 🛡️ Buenas Prácticas y Seguridad

* **Validación y Sanitización:** valida inputs en backend y frontend.
* **Autorización por Rol:** protege rutas (admin/estudiante) con **guards** (Angular) y **middlewares** (Express).
* **CORS y HTTPS:** configura CORS para los dominios permitidos; en producción usa HTTPS.
* **Secretos y Credenciales:** gestiona `.env` con cuidado; usa vaults o variables del sistema en producción.
* **Subida de Archivos:** limita tipos y tamaño de documentos; almacén seguro (disco/objeto) y nombres únicos.
* **Logs y Auditoría:** registra eventos clave (admisiones, cambios de estado, accesos) respetando privacidad.

---

## 🧰 Resolución de Problemas

* **“ECONNREFUSED / No conecta a MySQL”**

  * Verifica que MySQL esté iniciado y las credenciales en `.env` sean correctas.
  * Comprueba que `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` coincidan con tu servidor.

* **“CORS error” en el navegador**

  * Asegura que el backend tenga CORS habilitado para `http://localhost:4200` (en desarrollo).
  * Verifica que el endpoint de la API en el frontend sea correcto.

* **“ng: command not found”**

  * Instala Angular CLI globalmente: `npm i -g @angular/cli`.

* **Error 404 en rutas de Angular al refrescar**

  * Usa `PathLocationStrategy` correctamente y configura el servidor (si desplegado) para redirigir a `index.html`.

* **PDF no descarga**

  * Comprueba permisos de pop-ups/descargas del navegador y que la función de jsPDF se ejecute tras interacción del usuario.

---

## 🤝 Contribución

1. **Haz un fork** del repositorio.
2. Crea una rama de trabajo: `git checkout -b feat/mi-mejora`.
3. Implementa cambios con descripciones claras y pruebas.
4. Envía un **Pull Request** describiendo el contexto, la motivación y evidencias (capturas, endpoints afectados).

> Aporta siguiendo el estilo de código del proyecto y convenciones de commits.

---

## 🗺️ Hoja de Ruta (Roadmap)

* [ ] Exportaciones adicionales (CSV/Excel) para listados de solicitudes y residentes.
* [ ] Notificaciones por email al cambiar estado de solicitud.
* [ ] Gestión avanzada de ocupación y **overbooking** con reglas.
* [ ] Reportes y paneles (dashboards) más detallados.
* [ ] Integración de pasarela de pago (si aplica a tasas).
* [ ] Internacionalización (i18n) ampliada.

---

## 📄 Licencia y Copyright

Este proyecto se distribuye **sin licencia de código abierto** explícita. Todos los derechos reservados salvo acuerdo por escrito.

**Copyright © 2025 Francisco Severino Engonga.
Todos los derechos reservados.**
