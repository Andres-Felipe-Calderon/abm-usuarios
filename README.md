# ABM de Usuarios

Este proyecto es una aplicación web desarrollada en Laravel que permite realizar un ABM (Alta, Baja y Modificación) de registros de usuarios.

## Requisitos Previos

Antes de empezar, asegúrate de tener instalados los siguientes programas en tu máquina:

- [PHP](https://www.php.net/downloads) (versión 8.0 o superior)
- [Composer](https://getcomposer.org/download/) (para gestionar las dependencias de PHP)
- [Laravel](https://laravel.com/docs/8.x/installation#installation-via-composer) (se recomienda instalarlo globalmente)
- [Node.js](https://nodejs.org/en/download/) (opcional, si necesitas compilar assets)

## Clonación del Repositorio

Para clonar el repositorio en tu máquina local, abre una terminal y ejecuta el siguiente comando:


git clone https://github.com/Andres-Felipe-Calderon/abm-usuarios.git

Luego, navega al directorio del proyecto:

cd abm-usuarios

## Instalación de Dependencias
Ejecuta el siguiente comando para instalar las dependencias del proyecto:

composer install
npm install

## Generar la Clave de Aplicación
Ejecuta el siguiente comando para generar la clave de la aplicación:


php artisan key:generate

## Migrar la Base de Datos
 ejecuta:

php artisan migrate

## Levantar el Servidor de Desarrollo
Finalmente, puedes levantar el servidor de desarrollo con el siguiente comando:


php artisan serve