@extends('blog._master')

@section('meta')
	<title>Blog.Tomo@pagu/Archive</title>
@endsection

@section('content')
	<h1>Blog.Tomo@pagu/Archive</h1>
    <ul>
        @foreach ($blogposts as $blogpost)
            <li><a href="{{ url('blog/show/'.$blogpost['filename']) }}" title="{{ $blogpost['title'] }}">{{ $blogpost['title'] }}</a></li>
        @endforeach
    </ul>
@endsection
