<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Tomo Homepage
Route::get('/', function () {
    return view('welcome');
});

// Tomo Blog
Route::get('/blog', function () {
    return view('welcome');
});

// Tomo Oshis
Route::get('/oshimen', function () {
    return view('welcome');
});

// Tomo Start
Route::get('/start', function () {
    return view('welcome');
});
