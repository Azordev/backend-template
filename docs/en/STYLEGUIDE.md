# Code style guide

In this document you can check the general JavaScript code styling and rules. Using these rules is strongly advisable when contributing to Simple Project project.

## Variable declaration

* One variable declaration per line is preferable to multiple
* Use let only when you know the value will be updated, otherwise use const

```js
const foo = 'foo';
const num = 2;
let bar = 'bar';

bar = foo; // this one is fine
foo = bar; // will be error
```

## Tabs and indentation

* Do not use tab character, use spaces instead
* Tab size is 2 spaces
* Indentation is 1 tab size (2 spaces)
* Continuation indent is 1 tab size
* Empty lines must not keep indents
* Blank lines can be added for readability
* 2 consecutive blank lines are allowed
* `case` branches in switch statements must be indented

```js
function foo() {
  const bar = 'bar';

  switch (bar) {
    case 'bar':
      alert('Expected...');
      break;

    case 'foo':
      alert('Unexpected...');
      break;

    default:
      alert('default');
      break;
  }
}
```

## Semicolons and quotation

* Statements must always be terminated with semicolon.
* Single quotes are preferred to double quotes. Exceptionally, double quotes might be used if single quotes would require escaping

```js
++ const foo = 'just a string';
-- const bar = "I'm using single quotes inside";
```

## Braces

We use Egyptian braces. Also, braces are required in every block elements, even if they are oneliners (if, while, do...while, try...catch...finally, etc...)

// do this
async function foo() {
  const bar = await fetchBar();

  if (!!bar) {
    doSomething();
  }
}

// but not this
async function foo() {
  const bar = await fetchBar();

  if (!!bar) doSomething();
}
