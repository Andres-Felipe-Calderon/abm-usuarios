<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'welcome');

Route::view('dashboard', 'dashboard')
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::view('profile', 'profile')
    ->middleware(['auth'])
    ->name('profile');

// Protege todas las rutas de 'users' con el middleware de autenticación
Route::middleware(['auth'])->group(function () {
    Route::resource('users', UserController::class);
});

require __DIR__.'/auth.php';

