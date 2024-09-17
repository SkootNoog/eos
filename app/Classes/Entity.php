<?php

namespace App\Classes;

abstract class Entity
{
    private int $defense;
    private int $agility;
    private int $magic;
    private int $strength;

    public function getDefense(): int
    {
        return $this->defense;
    }

    public function getAgility(): int
    {
        return $this->agility;
    }

    public function getMagic(): int
    {
        return $this->magic;
    }

    public function getStrength(): int
    {
        return $this->strength;
    }
}
