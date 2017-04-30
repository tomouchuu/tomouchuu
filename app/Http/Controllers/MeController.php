<?php

namespace Tomo\Http\Controllers;

use Illuminate\Http\Request;
use Tomo\Http\Controllers\Api\MeController as MeApi;

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
        $data['instagram'] = json_decode($instagramJson, true);
        // Only want latest picture & 5 recent videos

        $githubJson = $meApi->github()->getContent();
        $data['github'] = json_decode($githubJson, true);
        // cut down to 15

        $wanikaniJson = $meApi->wanikani()->getContent();
        $data['wanikani'] = json_decode($wanikaniJson, true);

        dd($data);

        return view('index', $data);
    }
}
