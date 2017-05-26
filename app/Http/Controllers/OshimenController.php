<?php

namespace Tomo\Http\Controllers;

use Illuminate\Http\Request;

use Tomo\Http\Controllers\Api\MeController as MeApi;
use Tomo\Http\Controllers\Api\OshimenController as OshimenApi;

class OshimenController extends Controller
{
    public function __invoke()
    {
        $data = [];

        $meApi = new MeApi();
        $meJson = $meApi->me()->getContent();
        $data['me'] = json_decode($meJson, true);

        $oshimenApi = new OshimenApi();
        $oshimenJson = $oshimenApi->get()->getContent();
        $data['oshis'] = json_decode($oshimenJson, true);

        return view('oshimen.index', $data);
    }
}
