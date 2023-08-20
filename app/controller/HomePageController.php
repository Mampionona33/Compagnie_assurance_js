<?php

namespace Controller\page;

use BasePage;

class HomePageController extends BasePage
{
    public function render(): void
    {
        echo $this->getTwigEnv()->render("homePage.html.twig");
    }
}
