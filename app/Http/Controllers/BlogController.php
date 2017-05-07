<?php

namespace Tomo\Http\Controllers;

use Illuminate\Http\Request;

use KzykHys\FrontMatter\FrontMatter;
use Tomo\Http\Controllers\Api\MeController as MeApi;
use Tomo\Http\Controllers\Api\BlogController as BlogApi;

class BlogController extends Controller
{
    public function index()
	{
        $blogApi = new BlogApi();
        $blogpostsJson = $blogApi->index()->getContent();
        $data = json_decode($blogpostsJson, true);

        $meApi = new MeApi();
        $meJson = $meApi->me()->getContent();
        $data['me'] = json_decode($meJson, true);

		return view('blog.archive', [
			'blogposts' => $data['blogposts'],
			'me' => $data['me'],
		]);
	}

	public function latest()
	{
        $blogApi = new BlogApi();
        $blogpostJson = $blogApi->latest()->getContent();
        $data = json_decode($blogpostJson, true);

        $meApi = new MeApi();
        $meJson = $meApi->me()->getContent();
        $data['me'] = json_decode($meJson, true);

		return view('blog.post', [
			'blogpost' => $data['blogpost'],
            'me' => $data['me'],
		]);
	}

	public function show($file)
	{
        $blogApi = new BlogApi();
        $blogpostJson = $blogApi->show($file)->getContent();
        $data = json_decode($blogpostJson, true);

        $meApi = new MeApi();
        $meJson = $meApi->me()->getContent();
        $data['me'] = json_decode($meJson, true);

		return view('blog.post', [
			'blogpost' => $data['blogpost'],
            'me' => $data['me'],
		]);
	}
}
