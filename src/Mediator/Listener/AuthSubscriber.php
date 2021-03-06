<?php

namespace App\Mediator\Listener;

use App\Mediator\Event\BeforeRenderEvent;
use App\Service\Auth\AuthServiceInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class AuthSubscriber implements EventSubscriberInterface
{
    private $auth;

    public function __construct(AuthServiceInterface $auth)
    {
        $this->auth = $auth;
    }

    public function onBeforeRender(BeforeRenderEvent $event)
    {
        $event->getView()->addDefaultParams([
            'auth' => $this->auth->authParams(), 
        ]);
    }

    public static function getSubscribedEvents()
    {
        return [
            'beforeRender' => ['onBeforeRender']
        ];
    }
}
