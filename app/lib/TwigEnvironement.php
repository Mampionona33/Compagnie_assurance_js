<?php

namespace Lib;

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

final class TwigEnvironement
{
    private static $instance;
    private Environment $twig;

    private function __construct()
    {
        $loader = new FilesystemLoader(__DIR__ . '/../views');
        $this->twig = new Environment($loader);
    }

    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getTwig(): Environment
    {
        return $this->twig;
    }
}
