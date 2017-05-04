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
        <div id="intro">
            <intro
                personaljson="{{ json_encode($me) }}"
                profileimgurl="{{ $twitter['profile_image_url'] }}"
            />
        </div>
        <div id="navbar">
            <navbar personaljson="{{ json_encode($me) }}" />
        </div>
        <div id="about">
            <about
                personaljson="{{ json_encode($me) }}"
                wanikanijson="{{ json_encode($wanikani) }}"
            />
        </div>
        <div id="recent-tweet">
            <recent-tweet twitterjson="{{ json_encode($twitter) }}" />
        </div>
        <p style="text-align: center;">
            -- RecentBlog --<br>
            -- Code (use https://github.com/Justineo/vue-octicon) --
        </p>

        <script src="{{ asset('js/manifest.js') }}" type="text/javascript"></script>
        <script src="{{ asset('js/vendor.js') }}" type="text/javascript"></script>
        <script src="{{ asset('js/index.js') }}" type="text/javascript"></script>
    </body>
</html>
