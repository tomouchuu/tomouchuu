<!doctype html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>tomo@uchuu</title>

        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    </head>
    <body>
        <div id="app">
            <intro personaljson="{{ json_encode($me) }}" profileimgurl="{{ $twitter['profile_image_url'] }}" instagramjson="{{ json_encode($instagram) }}" />
        </div>
        <p style="text-align: center;">
            -- NAVBAR --<br>
            -- RecentTweet --<br>
            -- About --<br>
            -- RecentBlog --<br>
            -- Code --
        </p>
        <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
    </body>
</html>
