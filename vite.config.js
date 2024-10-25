import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/js/user.js', // Agrega el archivo user.js aquí
            ],
            refresh: true,
        }),
    ],
    base: 'https://abm-usuarios-production.up.railway.app/', // URL base en HTTPS
});
