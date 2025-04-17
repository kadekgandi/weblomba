<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// Route statis didefinisikan lebih dulu
$router->get('/lombas/statistik', 'LombasController@statistik');

// Route untuk CRUD Lomba
$router->get('/lombas', 'LombasController@index');
$router->post('/lombas', 'LombasController@store');
$router->get('/lombas/{id}', 'LombasController@show');
$router->put('/lombas/{id}', 'LombasController@update');
$router->delete('/lombas/{id}', 'LombasController@destroy');

// Route untuk CRUD Pendaftaran
$router->get('/pendaftarans', 'PendaftaransController@index');
$router->post('/pendaftarans', 'PendaftaransController@store');
$router->get('/pendaftarans/{id}', 'PendaftaransController@show');
$router->put('/pendaftarans/{id}', 'PendaftaransController@update');
$router->delete('/pendaftarans/{id}', 'PendaftaransController@destroy');

// routes/web.php
$router->post('register', 'AuthController@register');
$router->post('login', 'AuthController@login');
$router->get('me', 'AuthController@me');
$router->post('logout', 'AuthController@logout');  // Hapus middleware auth dari logout


// Route untuk akses file gambar
$router->get('/images/{filename}', function ($filename) {
    $path = storage_path('app/public/lomba_images/' . $filename);

    if (!file_exists($path)) {
        abort(404); // Jika file tidak ditemukan
    }

    return response()->file($path);
});

// routes/web.php
$router->group(['middleware' => ['auth', 'role:admin']], function () use ($router) {
    $router->get('dashboard', 'DashboardController@index');
    // Tambahkan rute lain untuk admin
});

$router->group(['middleware' => ['auth', 'role:user']], function () use ($router) {
    // Tambahkan rute untuk user
});

$router->group(['middleware' => ['auth', 'role:guru']], function () use ($router) {
    // Tambahkan rute untuk guru
});

