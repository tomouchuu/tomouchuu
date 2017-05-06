@extends('blog._master')

@section('meta')
	<title>Blog.Tomo@pagu/Archive</title>
@endsection

@section('content')
	<h1>Blog.Tomo@pagu/Archive</h1>
	<ul>
		@foreach ($blogposts as $blogpost)
			<li><a href="/show/{{ $blogpost }}" title="{{ $blogpost }}">{{ $blogpost }}</a></li>
		@endforeach
	</ul>
@endsection
