<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>oshimen || tomo@uchuu</title>

        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    </head>
    <body>
        <div id="navbar">
            <navbar navbartype="oshimen" personaljson="{{ json_encode($me) }}" />
        </div>

        <div id="oshimen-copy" style="float: right; margin-right: 15px; text-align: center;">
            <h1>Oshimen</h1>
            <h2>- Idols I Support -</h2>
        </div>
        <div id="oshimen" style="float: left;">
            <idols idoljson="{{ json_encode($oshis) }}" />
        </div>

        <div class="clearfix"></div>

        <div class="copy">
            <p style="text-align: center;">&copy;{{ date('Y') }} - トモ＠宇宙 -</p>
        </div>

        <script src="{{ asset('js/manifest.js') }}" type="text/javascript"></script>
        <script src="{{ asset('js/vendor.js') }}" type="text/javascript"></script>
        <script src="{{ asset('js/oshimen.js') }}" type="text/javascript"></script>
    </body>
</html>
