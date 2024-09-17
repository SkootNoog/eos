<?php

namespace App\Classes;

use App\Classes\Entity;

class Adventurer extends Entity
{
    private \App\Models\Adventurer $adventurer;

    public function __construct(int $id)
    {
        $this->adventurer = \App\Models\Adventurer::find($id);
    }
}
