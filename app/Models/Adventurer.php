<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Adventurer extends Model
{
    use HasFactory;

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }

    public function archetype(): BelongsTo
    {
        return $this->belongsTo(Archetype::class);
    }


}
