<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

	@yield('meta')

	<link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
</head>
<body>
	<div class="blog-layout">
		<div id="navbar">
            <navbar navbartype="blog" personaljson="{{ json_encode($me) }}" />
        </div>

		<div class="blog-container">
			@yield('content')
		</div>
	</div>

    <script src="{{ asset('js/manifest.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/vendor.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/index.js') }}" type="text/javascript"></script>
</body>
</html>
