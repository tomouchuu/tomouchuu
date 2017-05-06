<?php

namespace Tomo\Http\Controllers;

use Illuminate\Http\Request;

use KzykHys\FrontMatter\FrontMatter;
use Tomo\Http\Controllers\Api\BlogController as BlogApi;

class BlogController extends Controller
{
    public function index()
	{
        $blogApi = new BlogApi();
        $blogpostsJson = $blogApi->index()->getContent();
        $data = json_decode($blogpostsJson, true);

		return view('blog.archive', [
			'blogposts' => $data['blogposts'],
		]);
	}

	public function latest()
	{
        $blogApi = new BlogApi();
        $blogpostJson = $blogApi->latest()->getContent();
        $data = json_decode($blogpostJson, true);

		return view('blog.post', [
			'blogpost' => $data['blogpost'],
		]);
	}

	public function show($file)
	{
		$blogApi = new BlogApi();
        $blogpostJson = $blogApi->show($file)->getContent();
        $data = json_decode($blogpostJson, true);

		return view('blog.post', [
			'blogpost' => $data['blogpost'],
		]);
	}
}
