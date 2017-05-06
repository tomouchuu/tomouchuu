<?php

namespace Tomo\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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
                // [
                //     'company' => 'unemployed',
                // ],
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
                'blog' => "http://localhost:8000/blog",
                // 'blog' => "https://tomo.uchuu.io/blog",
                'github' => "https://github.com/tomouchuu",
                'instagram' => "https://instagram.com/tomouchuu",
                'trello' => "https://trello.com/b/FcW2Q1jL",
                'twitter' => "https://www.twitter.com/tomouchuu",
                'mastodon' => "https://niu.moe/@tomo",
            ]
        ]);
    }

    public function twitter() {
        $twitter = Cache::get('twitter');
        if ($twitter === NULL) {
            $twitterResponse = Twitter::getUsers(['screen_name' => 'tomouchuu', 'format' => 'json']);
            Cache::put('twitter', $twitterResponse, 10);
            return $twitterResponse;
        }
        return $twitter;
    }

    public function instagram() {
        $instagram = Cache::get('instagram');
        if ($instagram === NULL) {
            $instagramResponse = Instagram::get('v1/users/self/media/recent', ['access_token' => env('INSTAGRAM_API_ACCESS_TOKEN', '')]);
            Cache::put('instagram', $instagramResponse['data'], 10);
            return response()->json($instagramResponse['data']);
        }
        return response()->json($instagram);
    }

    public function github() {
        $github = Cache::get('github');
        if ($github === NULL) {
            $client = new \Github\Client();
            $response = $client->getHttpClient()->get('users/tomouchuu/events/public');
            $events = \Github\HttpClient\Message\ResponseMediator::getContent($response);
            Cache::put('github', $events, 10);
            return response()->json($events);
        }
        return response()->json($github);
    }

    public function wanikani() {
        $wanikani = Cache::get('wanikani');

        if ($wanikani === NULL) {
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


            Cache::put('wanikani', $wanikani, 10);
            return response()->json($wanikani);
        }

        return response()->json($wanikani);
    }
}
