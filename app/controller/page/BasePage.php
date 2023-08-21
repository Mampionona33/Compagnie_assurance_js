<?php

namespace Controller\page;

use Lib\TwigEnvironement;
use Twig\Environment;

class BasePage
{
    private Environment $twigEnv;

    /**
     * Setter
     */
    public function setTwigEnv(Environment $twigEnv): void
    {
        $this->twigEnv = $twigEnv;
    }

    /**
     * Getter
     */
    public function getTwigEnv(): Environment
    {
        return $this->twigEnv;
    }

    public function __construct()
    {
        $twig = TwigEnvironement::getInstance()->getTwig();
        $this->setTwigEnv($twig);
    }
}
