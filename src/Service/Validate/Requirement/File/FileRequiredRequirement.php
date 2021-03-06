<?php

namespace App\Service\Validate\Requirement\File;

use App\Service\Validate\Requirement\RequirementInterface;

class FileRequiredRequirement implements RequirementInterface
{
    private $key;

    public function __construct(string $key)
    {
        $this->key = $key;
    }

    public function check(): bool
    {
        return !empty($_FILES) && array_key_exists($this->key, $_FILES) && !empty($_FILES[$this->key]['type']);
    }
}