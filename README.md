🗳️ eVote System - Mendoza 2026
📝 Descripción
Este sistema es una plataforma integral para la gestión de procesos electorales digitales, desarrollada para el examen final de Programación II. Permite el registro de candidatos, la emisión de votos seguros con marcas de tiempo y la visualización de escrutinios en tiempo real para administradores.
+4

🚀 Instalación y Ejecución
Requisitos Previos

Node.js (v18 o superior)

MongoDB (Local o Atlas)

Pasos para Instalar

Clonar el repositorio:
+1

Bash

git clone https://github.com//evote-system.git

Configurar el Backend:

Bash

cd api-evote
npm install

# Asegúrate de tener MongoDB corriendo en el puerto 27017

npm run start:dev

Configurar el Frontend:

Bash

cd client-evote
npm install
npm run dev
🔑 Credenciales y Roles
Para probar las validaciones de acceso por roles, utilizá las siguientes cuentas preconfiguradas:
+1

Rol Usuario Contraseña Permisos
Admin Admin Mendoza admin123
Ver resultados completos, resetear urna, gestionar sistema
+2

Votante Pedro Votante user123
Filtrar elecciones y emitir voto único

Exportar a Hojas de cálculo

🛠️ Endpoints Documentados (API)
La API está construida con NestJS y cuenta con los siguientes puntos de acceso:

Elecciones:

GET /elections: Lista todas las elecciones (soporta filtros por name, status y date).
+2

GET /elections/:id/candidates: Devuelve candidatos filtrados por la categoría (cargo) enviada por Query Params.

Votos:

POST /votes: Registra un sufragio. Valida que el usuario no haya votado antes en esa categoría.
+2

GET /votes/resultados: Devuelve el escrutinio ordenado de mayor a menor (Solo accesible para Admin).
+1

DELETE /votes/clear: Vacía la urna electrónica (Solo Admin).

🧪 Pasos para Ejecutar Pruebas
Inicia sesión como Votante para ver el listado de elecciones activas.
+2

Aplicá los filtros de búsqueda por nombre o estado en el Home.
+3

Seleccioná una categoría (ej: Gobernador) y emití tu voto.
+3

Intentá votar nuevamente en la misma categoría para verificar el bloqueo de duplicados.
+3

Cerrá sesión e ingresá como Admin para visualizar las barras de porcentaje y el timestamp de cada voto.
+2

📧 Entrega

Materia: Programación II

Profesor: Pietrobon Cristian

Institución: IES 9-023

Asunto del correo: final programación 3
