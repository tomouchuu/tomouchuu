<?php

namespace Tomo\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Tomo\Http\Controllers\Controller;

use Twitter;

class OshimenController extends Controller
{
    public function get() {
        $oshis = Cache::get('oshis');

        if ($oshis === NULL) {
            $oshis = [];

            $kanako = [
                'name' => 'Kanako Momota',
                'expanded_url' => 'http://ameblo.jp/momota-sd/',
                'profile_image_url_https' => 'https://pbs.twimg.com/media/C-bAPqAVYAAD_Jy.jpg',
                'screen_name' => 'momowgp',
                'profile_link_color' => 'FF0000',
            ];
            array_push($oshis, $kanako);

            $mirei = [
                'name' => 'Mirei Hoshina',
                'expanded_url' => 'http://www.lineblog.me/tag/%E6%98%9F%E5%90%8D%E7%BE%8E%E6%80%9C?blog_name=ebichu',
                'profile_image_url_https' => 'https://www.shiritsuebichu.jp/official/pc/img/profile/pro_photo_007.jpg',
                'screen_name' => 'ebichu_staff',
                'profile_link_color' => 'FF69B4',
            ];
            array_push($oshis, $mirei);

            $lists = Twitter::getLists();
            foreach ($lists as $list) {
                if ($list->slug === 'oshis') {
                    $listMembers = Twitter::getListMembers(['list_id' => $list->id]);
                    foreach ($listMembers->users as $member) {
                        $member->profile_image_url = str_replace('_normal.jpg', '.jpg', $member->profile_image_url);
                        $member->profile_image_url_https = str_replace('_normal.jpg', '.jpg', $member->profile_image_url_https);
                        $member->expanded_url = $member->entities->url->urls[0]->expanded_url;
                        array_push($oshis, $member);
                    }
                    Cache::put('oshis', $oshis, 10);
                }
            }
        }

        return response()->json($oshis);
    }
}
