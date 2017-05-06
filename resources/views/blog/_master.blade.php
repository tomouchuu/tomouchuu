<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	@yield('meta')

	<link rel="stylesheet" href="https://s3-us-west-1.amazonaws.com/tachyons-css/4.0.1-beta/tachyons.min.css">
</head>
<body>
	<div class="sans-serif w-75 center lh-copy">
		<header>
			<p class="f1 tr">Blog.Tomo@pagu</p>
			<p class="tr"><a href="{{ url('/archive') }}">Archive</a></p>
			<hr />
		</header>

		<div class="tj">
			@yield('content')
		</div>
	</div>
</body>
</html>
