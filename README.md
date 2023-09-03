<h1>Configuracion e instalacion de laravel y react</h1>

<strong>Pasos a seguir:</strong>
<p>
1. Instalar Composer https://getcomposer.org/</br>
2. ejecutar el comando composer install en la raiz del proyecto para instalar las dependencias del proyecto</br>
3. copiar y pegar el archivo .env.example y renombrarlo por .env</br>
4. configurar la informacion de la base de datos en las siguientes lineas, para el proyecto esta configurado sobre mysql</br>
    DB_CONNECTION=mysql</br>
    DB_HOST=127.0.0.1</br>
    DB_PORT=3307</br>
    DB_DATABASE=prueba</br>
    DB_USERNAME=root</br>
    DB_PASSWORD=</br>
5. ejecutar el comando php artisan key:generate</br>
6. crear una base de datos con los mismos nombres que se encuentran dentro del archivo .env (en mi caso prueba)</br>
7. ejecutar las migraciones con el comando php artisan migrate</br>
8. ejecutar el comando npm install para cargar las dependencias de react</br>
9. ejecutar el comando php artisan serve para levantar el servicio de laravel</br>
10. ejecutar el comando npm run dev para levantar react</br>
11. entrar a la url http://localhost:8000/ para probar la parte 2 de la prueba
</p>