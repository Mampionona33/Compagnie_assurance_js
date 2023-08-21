<?php
// Gestion des erreurs probables

use CoffeeCode\Router\Router;

error_reporting(E_ALL);
ini_set('display_errors', '1');
// ----------------------------

require 'vendor/autoload.php';

final class index
{
    private Router $router;
    private string $response;
    private string $baseUrl;
    private string $requestPath;
    private string $requestMethod;

    /**
     * Setter
     */
    public function setRequestMethod(string $requestMethod): void
    {
        $this->requestMethod = $requestMethod;
    }
    public function setRequestPath(string $requestPath): void
    {
        $this->requestPath = $requestPath;
    }
    public function setRouter(Router $router): void
    {
        $this->router = $router;
    }
    public function setBaseUrl(string $baseUrl): void
    {
        $this->baseUrl = $baseUrl;
    }
    public function setResponse(string $response): void
    {
        $this->response = $response;
    }

    /**
     * Getter
     */
    public function getRequestMethod(): string
    {
        return $this->requestMethod;
    }
    public function getRequestPath(): string
    {
        return $this->requestPath;
    }
    public function getBasUrl(): string
    {
        return $this->baseUrl;
    }
    public function getResponse(): string
    {
        return $this->response;
    }

    public function getRouter(): Router
    {
        return $this->router;
    }

    // -----------------------------------

    private function initialiseRequestPath(): void
    {
        $this->setRequestPath(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    }

    private function initializeRequestMethod(): void
    {
        $this->setRequestMethod(parse_url($_SERVER['REQUEST_METHOD'], PHP_URL_PATH));
    }

    public function __construct(string $baseUrl)
    {
        $this->setBaseUrl($baseUrl);
        $this->setRouter(new Router($this->baseUrl));
        $this->initialiseRequestPath();
        $this->initializeRequestMethod();
    }

    private function handleError(): void
    {
        $this->router->group("error")->namespace('Controller\page');
        $this->router->get("/{errcode}", "NotFoundController:notFound");
    }

    private function handleHomePage(): void
    {
        $this->router->namespace("Controller\page");
        $this->router->get("/", "HomePageController:render");
    }

    private function redirectOnError(): void
    {
        if ($this->router->error()) {
            $this->router->redirect("/error/{$this->router->error()}");
        }
    }

    public function __invoke(): void
    {
        $this->handleHomePage();

        $this->handleError();


        $this->setResponse($this->router->dispatch());

        $this->redirectOnError();
    }
}

// $url = "http://localhost:8081";
$url = "https://8081-mampionona3-compagnieas-of01fncqj6r.ws-eu104.gitpod.io";

$app = new index($url);

$app();
