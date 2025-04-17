<?php


return [
    'secret' => env('JWT_SECRET'),
    'ttl' => 60, // 60 minutes
    'algo' => 'HS256',
    'keys' => [
        'public' => '',
        'private' => '',
    ],
    'required_claims' => ['sub', 'iat', 'exp'],
    'persistent_claims' => [],
    'use_custom_claims' => false,
    'blacklist_enabled' => true,
    'check_last_revoked' => true,
    'keys' => [
        'public' => '',
        'private' => '',
    ],
];
