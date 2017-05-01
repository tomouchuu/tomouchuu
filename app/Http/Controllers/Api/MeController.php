<?php

namespace Tomo\Http\Controllers\Api;

use Illuminate\Http\Request;
use Tomo\Http\Controllers\Controller;

use Twitter;
use Instagram;
use GuzzleHttp\Client;
use GuzzleHttp\Promise;

class MeController extends Controller
{
    public function me() {
        return response()->json([
            'name' => 'Thomas Moore',
            'location' => 'Chelmsford',
            'based' => 'London',
            'birthday' => '1993-09-14',
            'work' => [
                [
                    'company' => 'reed.co.uk',
                    'date' => 'September 2016 - Current',
                    'description' => 'I\'m a junior full-stack developer working on the jobseeker site. At work we use Razor & Knockout with LESS for our front end and a C# backend.'
                ],
                [
                    'company' => 'Ahead4',
                    'date' => 'May 2012 - September 2016',
                    'description' => 'I handled a lot of the front end tasks such as slicing sites and some back end tasks using PHP and MySQL to integrate designs into our custom CMS, Wordpress or a bespoke control panel depending on the client.'
                ]
            ],
            'contact' => [
                'email' => "tomo@uchuu.io",
                'blog' => "https://tomo.uchuu.io/blog",
                'github' => "https://github.com/tomouchuu",
                'instagram' => "https://instagram.com/tomouchuu",
                'trello' => "https://trello.com/b/FcW2Q1jL",
                'twitter' => "https://www.twitter.com/tomouchuu",
                'mastodon' => "https://niu.moe/@tomo",
            ]
        ]);
    }

    public function twitter() {
        return Twitter::getUsers(['screen_name' => 'tomouchuu', 'format' => 'json']);
    }

    public function instagram() {
        $data = Instagram::get('v1/users/self/media/recent', ['access_token' => env('INSTAGRAM_API_ACCESS_TOKEN', '')]);
        return response()->json($data['data']);
    }

    public function github() {
        $client = new \Github\Client();
        $response = $client->getHttpClient()->get('users/tomouchuu/events/public');
        $events     = \Github\HttpClient\Message\ResponseMediator::getContent($response);
        return response()->json($events);
    }

    public function wanikani() {
        $client = new Client(['base_uri' => 'https://www.wanikani.com/api/user/'.env('WANIKANI_API_KEY', '').'/']);

        // Initiate each request but do not block
        $promises = [
            'srs-distribution' => $client->getAsync('srs-distribution'),
            'study-queue' => $client->getAsync('study-queue'),
            'level-progression' => $client->getAsync('level-progression'),
        ];

        // Wait on all of the requests to complete. Throws a ConnectException
        // if any of the requests fail
        $results = Promise\unwrap($promises);

        // Wait for the requests to complete, even if some of them fail
        $results = Promise\settle($promises)->wait();

        // Setup all the response data
        $srs = json_decode($results['srs-distribution']['value']->getBody(), true);
        $studyQueue = json_decode($results['study-queue']['value']->getBody(), true);
        $levelProgression = json_decode($results['level-progression']['value']->getBody(), true);

        $wanikani = [
            'user-information' => $srs['user_information'],
            'srs-distribution' => $srs['requested_information'],
            'study-queue' => $studyQueue['requested_information'],
            'level-progression' => $levelProgression['requested_information'],
        ];

        return response()->json($wanikani);
    }
}
