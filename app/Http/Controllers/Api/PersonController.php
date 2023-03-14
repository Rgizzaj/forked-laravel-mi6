<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Person;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    public function index(Request $request)
    {
        $page = max(1, intval($request->input('page') ?? 1));

        $search = $request->input('search');

        $on_page = 20;

        // start building the query
        $builder = Person::query()
            ->with([
                'image',
                'status',
                'aliases'
            ]);

        if ($search) {
            $builder->where('name', 'like', "%{$search}%");
        }

        // make a separate query to calculate the total
        $total = $builder->count();
        $last_page = max(1, ceil($total / $on_page));

        $people = $builder->limit($on_page)
            ->offset(($page - 1) * $on_page)
            ->get();

        return compact('people', 'total', 'last_page');
    }
}
