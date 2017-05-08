<?php

namespace Tomo\Http\Controllers\Api;

use Illuminate\Http\Request;
use Tomo\Http\Controllers\Controller;

use KzykHys\FrontMatter\FrontMatter;

class BlogController extends Controller
{
    public function index()
	{
		$blogdir = public_path().'/blogposts';
		$blogposts = array_diff(scandir($blogdir), array('..', '.', '.DS_Store'));

		foreach ($blogposts as $id => $blogpost) {
			$blogpost = explode('.', $blogpost);
			$blogposts[$id] = $blogpost[0];
		}

        $blogposts = array_reverse($blogposts);

		return response()->json([
			'blogposts' => $blogposts,
		]);
	}

	public function latest()
	{
		$blogdir = public_path().'/blogposts';
		$blogposts = array_diff(scandir($blogdir), array('..', '.'));

		$blogpostfile = array_pop($blogposts);

		$blogpostfilecontent = file_get_contents($blogdir.'/'.$blogpostfile);
		$blogpostparse = FrontMatter::parse($blogpostfilecontent);

		$mdparser = new \cebe\markdown\Markdown();
		$mdparser->html5 = true;

		$blogpost = $blogpostparse->getConfig();
		$blogpost['content'] = $mdparser->parse($blogpostparse->getContent());
		$blogpost['file'] = explode('.', $blogpostfile)[0];

		return response()->json([
			'blogpost' => $blogpost,
		]);
	}

	public function show($file)
	{
		$blogdir = public_path().'/blogposts';

		$blogpostfilecontent = file_get_contents($blogdir.'/'.$file.'.txt');
		$blogpostparse = FrontMatter::parse($blogpostfilecontent);

		$mdparser = new \cebe\markdown\Markdown();
		$mdparser->html5 = true;

		$blogpost = $blogpostparse->getConfig();
		$blogpost['content'] = $mdparser->parse($blogpostparse->getContent());
		$blogpost['file'] = $file;

		return response()->json([
			'blogpost' => $blogpost,
		]);
	}
}
