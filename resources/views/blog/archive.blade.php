@extends('blog._master')

@section('meta')
    <title>Archive || tomo@uchuu blog</title>
@endsection

@section('content')
    <h1>All blog posts</h1>
    <ul>
        @foreach ($blogposts as $blogpost)
            <li><a href="{{ url('blog/show/'.$blogpost['filename']) }}" title="{{ $blogpost['title'] }}">{{ $blogpost['title'] }}</a></li>
        @endforeach
    </ul>
@endsection
