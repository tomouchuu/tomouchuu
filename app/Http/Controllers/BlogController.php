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
        $blogpostsArray = json_decode($blogpostsJson, true);
        // Try to make the blogpost title a bit nicer
        $data['blogposts'] = [];
        foreach ($blogpostsArray['blogposts'] as $blogpost) {
            $blogpostData['filename'] = $blogpost;
            $blogpostDataArray = explode('-', $blogpost, 2);
            $blogpostDate = \DateTime::createFromFormat('Ymd', $blogpostDataArray[0]);
            $blogpostDateFormat = $blogpostDate->format('d-m-Y');

            $blogpostName = str_replace('_', ' ', $blogpostDataArray[1]);

            $blogpostData['title'] = $blogpostDateFormat.' || '.$blogpostName;

            array_push($data['blogposts'], $blogpostData);
        }

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
