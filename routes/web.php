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
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');

    Route::resource('users', UserController::class);


require __DIR__.'/auth.php';
