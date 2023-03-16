<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mission;
use App\Mail\SendMissionDetails;
use Illuminate\Support\Facades\Mail;
use Auth;
use Illuminate\Support\Facades\Notification;
use App\Models\User;
use App\Notifications\MissionOutcomeUpdated;

class MissionController extends Controller
{
    public function index() {
        $missions = Mission::with('people')->get();

        return $missions;
    }

    public function show($mission_id) {
        $mission = Mission::with('people')->findOrFail($mission_id);

        return $mission;
    }

    public function store(Request $request) {
        $mission = Mission::findOrFail($request->input('id'));

        $outcome_updated = $mission->outcome == $request->input('outcome') ? false : true;

        $mission->name = $request->input('name');
        $mission->year = $request->input('year');
        $mission->outcome = $request->input('outcome');

        $mission->save();

        if ($outcome_updated) {
            $admins = User::where('role', 'admin')->get();
    
            Notification::send($admins, new MissionOutcomeUpdated($mission));
        }
        
        return ['message' => 'Succesfully saved'];
    }

    public function sendMissionDetails($mission_id) {
        $mission = Mission::findOrFail($mission_id);

        $user = Auth::user();

        Mail::to($user ? $user->email : 'test@test.com')
            ->send(new SendMissionDetails($mission));
        
        return [
            'success_message' => 'Details sent!'
        ];
    }
}
