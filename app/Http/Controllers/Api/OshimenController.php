<?php

namespace Tomo\Http\Controllers\Api;

use Illuminate\Http\Request;
use Tomo\Http\Controllers\Controller;

use Twitter;

class OshimenController extends Controller
{
    public function get() {
        $oshis = [];

        $kanako = [
            'name' => 'Kanako Momota',
            'url' => 'http://ameblo.jp/momota-sd/',
            'profile_image_url' => 'https://pbs.twimg.com/media/C-bAPqAVYAAD_Jy.jpg',
            'screen_name' => 'momowgp',
        ];
        array_push($oshis, $kanako);

        $mirei = [
            'name' => 'Mirei Hoshina',
            'url' => 'http://www.lineblog.me/tag/%E6%98%9F%E5%90%8D%E7%BE%8E%E6%80%9C?blog_name=ebichu',
            'profile_image_url' => 'http://www.shiritsuebichu.jp/official/pc/img/profile/pro_photo_007.jpg',
            'screen_name' => 'ebichu_staff',
        ];
        array_push($oshis, $mirei);

        $lists = Twitter::getLists();
        foreach ($lists as $list) {
            if ($list->slug === 'oshis') {
                $listMembers = Twitter::getListMembers(['list_id' => $list->id]);
                foreach ($listMembers->users as $member) {
                    array_push($oshis, $member);
                }
                return response()->json($oshis);
            }
        }
    }
}
