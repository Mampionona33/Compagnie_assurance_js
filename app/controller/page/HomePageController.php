<?php

namespace Controller\page;

class HomePageController extends BasePage
{
    public function render(): void
    {
        echo $this->getTwigEnv()->render("homePage.html.twig");
    }
}
