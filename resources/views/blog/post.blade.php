@extends('blog._master')

@section('meta')
	<title>{{ $blogpost['title'] }} || tomo@uchuu blog</title>
@endsection

@section('content')
	<div class="blog-meta tc">
		<h1>{{ $blogpost['title'] }}</h1>
		@if (isset($blogpost['subtitle']))
			<h2>{{ $blogpost['subtitle'] }}</h2>
		@endif
		<p class="date">{{ $blogpost['date'] }}</p>
	</div>
	{!! $blogpost['content'] !!}
@endsection
