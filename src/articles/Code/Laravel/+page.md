---
layout: Code
title: Laravel - an open-source PHP web framework
tags: Beginner, PHP, Laravel
category: Code
description: Laravel is a web application framework with expressive, elegant syntax. A web framework provides a structure and starting point for creating your application, allowing you to focus on creating something amazing while we sweat the details.
excerpt: Laravel is a web application framework with expressive, elegant syntax. A web framework provides a structure and starting point for creating your application, allowing you to focus on creating something amazing while we sweat the details.
date: 2023-09-31
coverImageUrl: https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/738px-Laravel.svg.png
---



## HTML example

```html
<nav class="nav" role="doc-pagelist" aria-label="Page list">
  <ul>
    <li>
      <a href="#">Lorem ipsum dolor</a>
    </li>
    <li>
      <a href="#">Lorem ipsum dolor</a>
    </li>
    <li>
      <a href="#">Lorem ipsum dolor</a>
    </li>
    <li>
      <a href="#">Lorem ipsum dolor</a>
    </li>
  </ul>
</nav>
```



## PHP example

```php {1,3-5,8}
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}

// From https://github.com/laravel/laravel/blob/10.x/app/Console/Kernel.php
```


## JSON example

```json
{"name": "Gilbert", "wins": [["straight", "7♣"], ["one pair", "10♥"]]}
{"name": "Alexa", "wins": [["two pair", "4♠"], ["two pair", "9♠"]]}
{"name": "May", "wins": []}
{"name": "Deloise", "wins": [["three of a kind", "5♣"]]}
{
  "name": "Gilbert",
  "wins": [
    [
      "straight",
      "7♣"
    ],
    [
      "one pair",
      "10♥"
    ]
  ]
}
{
  "name": "Alexa",
  "wins": [
    [
      "two pair",
      "4♠"
    ],
    [
      "two pair",
      "9♠"
    ]
  ]
}
// From https://jsonlines.org/examples/
```


## CSS example

```css
html {
	margin: 0;
	background: black;
	height: 100%;
}

body {
	margin: 0;
	width: 100%;
	height: inherit;
}

/* the three main rows going down the page */

body > div {
  height: 25%;
}

.thumb {
	float: left;
	width: 25%;
	height: 100%;
	object-fit: cover;
}

.main {
  display: none;
}

.blowup {
  display: block;
  position: absolute;
  object-fit: contain;
  object-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
}

.darken {
  opacity: 0.4;
}

/* From https://github.com/mdn/css-examples/blob/main/object-fit-gallery/style.css */

```

## JavaScript example


```js
function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

// async function expression assigned to a variable
const add = async function (x) {
  const a = await resolveAfter2Seconds(20);
  const b = await resolveAfter2Seconds(30);
  return x + a + b;
};

add(10).then((v) => {
  console.log(v); // prints 60 after 4 seconds.
});

// async function expression used as an IIFE
(async function (x) {
  const p1 = resolveAfter2Seconds(20);
  const p2 = resolveAfter2Seconds(30);
  return x + (await p1) + (await p2);
})(10).then((v) => {
  console.log(v); // prints 60 after 2 seconds.
});

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function

```

```ts
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log("Log level key is:", key);
    console.log("Log level value is:", num);
    console.log("Log level message is:", message);
  }
}
printImportant("ERROR", "This is a message");

// From https://www.typescriptlang.org/docs/handbook/enums.html

```


Laravel is a web application framework with expressive, elegant syntax. A web framework provides a structure and starting point for creating your application, allowing you to focus on creating something amazing while we sweat the details.

Laravel strives to provide an amazing developer experience while providing powerful features such as thorough dependency injection, an expressive database abstraction layer, queues and scheduled jobs, unit and integration testing, and more.

Whether you are new to PHP web frameworks or have years of experience, Laravel is a framework that can grow with you. We'll help you take your first steps as a web developer or give you a boost as you take your expertise to the next level. We can't wait to see what you build.