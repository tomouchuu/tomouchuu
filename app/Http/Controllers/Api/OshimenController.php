<?php

namespace Tomo\Http\Controllers\Api;

use Illuminate\Http\Request;
use Tomo\Http\Controllers\Controller;

use Twitter;

class OshimenController extends Controller
{
    public function get() {
        $lists = Twitter::getLists();
        foreach ($lists as $list) {
            if ($list->slug === 'oshis') {
                $listMembers = Twitter::getListMembers(['list_id' => $list->id]);
                return response()->json($listMembers->users);
            }
        }
    }
}
