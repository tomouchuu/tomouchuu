<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Me API
// Basically emulate me-api
Route::group(['prefix' => 'me'], function () {
    Route::get('/', 'Api\MeApiController@me');
    Route::get('/twitter', 'Api\MeApiController@twitter');
    Route::get('/instagram', 'Api\MeApiController@instagram');
    Route::get('/github', 'Api\MeApiController@github');
});

// Blog API
// File system to markdown files
Route::group(['prefix' => 'blog'], function () {
    Route::get('/', function ()    {
        return "GENERAL";
    });
});

// Oshimen API
// Get from twitter list (if name matches this == kami, else if name marches this == newentry, esle general)
Route::group(['prefix' => 'oshimen'], function () {
    Route::get('/', function ()    {
        return "GENERAL";
    });
});
