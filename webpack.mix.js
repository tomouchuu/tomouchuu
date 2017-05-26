const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/index.js', 'public/js')
   .extract(['vue'])

mix.js('resources/assets/js/oshimen.js', 'public/js');

mix.sass('resources/assets/sass/app.scss', 'public/css');

mix.copyDirectory('resources/assets/images', 'public/images');

mix.copyDirectory('resources/assets/blogposts', 'public/blogposts');
