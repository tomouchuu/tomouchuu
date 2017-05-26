<?php

namespace Tomo\Http\Controllers;

use Illuminate\Http\Request;
use Tomo\Http\Controllers\Api\MeController as MeApi;
use Tomo\Http\Controllers\Api\BlogController as BlogApi;

class MeController extends Controller
{
    public function __invoke()
    {
        $data = [];
        $meApi = new MeApi();

        $meJson = $meApi->me()->getContent();
        $data['me'] = json_decode($meJson, true);

        $twitterJson = $meApi->twitter();
        $data['twitter'] = json_decode($twitterJson, true);

        $instagramJson = $meApi->instagram()->getContent();
        $instagrams = json_decode($instagramJson, true);
        $recentPhoto = [];
        $recentVideos = [];
        foreach ($instagrams as $key => $instagram) {
            if (count($recentPhoto) === 0) {
                if ($instagram['type'] === 'image') {
                    array_push($recentPhoto, $instagram);
                }
            }
            if (count($recentVideos) <= 5) {
                if ($instagram['type'] === 'video') {
                    array_push($recentVideos, $instagram);
                }
            }
        }
        $data['instagram'] = [
            'photo' => $recentPhoto[0],
            'videos' => $recentVideos,
        ];

        $githubJson = $meApi->github()->getContent();
        $data['github'] = json_decode($githubJson, true);
        $data['github'] = array_slice($data['github'], 0, 15);

        $blogApi = new BlogApi();
        $blogpostJson = $blogApi->latest()->getContent();
        $blogpostArray = json_decode($blogpostJson, true);
        $data['blogpost'] = $blogpostArray['blogpost'];

        $wanikaniJson = $meApi->wanikani()->getContent();
        $data['wanikani'] = json_decode($wanikaniJson, true);

        // dd($data);

        return view('index', $data);
    }
}
