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
    Route::get('/', 'Api\MeController@me');
    Route::get('/twitter', 'Api\MeController@twitter');
    Route::get('/instagram', 'Api\MeController@instagram');
    Route::get('/github', 'Api\MeController@github');
    Route::get('/wanikani', 'Api\MeController@wanikani');
});

// Blog API
// File system to markdown files
Route::group(['prefix' => 'blog'], function () {
    Route::get('/', 'Api\BlogController@get');
    // Route::get('/', function ()    {
    //     return "GENERAL";
    // });
});

// Oshimen API
// Get from twitter list (if name matches this == kami, else if name marches this == newentry, esle general)
Route::group(['prefix' => 'oshimen'], function () {
    Route::get('/', 'Api\OshimenController@get');
    // Route::get('/', function ()    {
    //     return "GENERAL";
    // });
});
