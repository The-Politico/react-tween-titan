# react-tween-titan 🦹‍♀️🦸‍♂️⚛

A small-but-mighty library for declaratively animating DOM elements (and other stuff!) on scroll.

See this library in action at tween-titan's [demo site.](https://tween-titan.app)

# What it does

(This library is a React port of [tween-titan](https://github.com/the-politico/tween-titan/).)

Scrolling is one of the most basic interactions on the internet. Everyone knows how to do it! And it’s fun to make things change as the user scrolls down the page — maybe a chart animates, or the background flips colors. Libraries like Scrollama do this really well.

But wouldn’t it be cooler if scrolling did more than just fire off discrete animations? What if the page ✨morphed before your very eyes✨ with smooth transitions controlled by the scroll itself?

That’s what tween-titan does, using vanilla JS. This library wraps that code with a declarative hook, making it easy to tag a JSX element with a ref and tween it to your heart’s content.

# Installation

🚨 One note at the top: **react-tween-titan** requires React as a peer dependency!

If you’re doing this old-school, you can include the library in a `script` tag.

```jsx
<script type="text/javascript" src="https://unpkg.com/react-tween-titan/"></script>
<script type="text/javascript">
	const { useTween } = ReactTweenTitan;
	// Rest of your code below....
</script>
```

But it’s more common to use **npm** or **yarn.**

```jsx
npm i react-tween-titan react
```

```jsx
yarn add react-tween-titan react
```

And then you can import it as you would any other module.

```jsx
import { useTween } from 'react-tween-titan';
```

# How it works

You can build tween animations based on one of two frames of reference:

- `self`: Where the tweened object itself sits in relation to the user’s viewport, or
- `waypoint`: Where any number of waypoint elements sit.

You’d use the **first method** when you want an element to animate based on its own position on the screen — say, a section header fading in as the user scrolls down to it.

The **second method** is more useful when you’re tweening a fixed or sticky element, whose position in the viewport might not change even though the user is scrolling. In that case, you’d drop in a couple of elements that *do* scroll with the page, and key the target’s tween to them.

Here’s how you’d approach having an object tween itself.

```jsx
import { useTween } from 'react-tween-titan';

const SpinningLogo = function SpinningLogo() {
  const [ref, props] = useTween({
		mode: 'self',
    waypoints: [
      {
        percent: 0,
        style: {
	        transform: 'rotate(0deg)',
        },
      },
      {
        percent: 1,
        style: {
          transform: 'rotate(360deg)'
        },
      },
    ],
  });

	const { style } = props;

  return (
    <div
      className='spinning-logo'
      ref={ref}
      style={style}
    >
      tween titan
    </div>
  );
};

export default TitleLogo;
```

What’s happening here?

1. You’re supplying `useTween` with a `config` object, which in this example just includes a series of waypoints and a `mode` set to `self`.

    Each waypoint has a `percent`, which indicates the scroll point where the tween should complete, and a `style` object, which contains a number of CSS styles (written in the JavaScript camelCase format). This way, you can transition between multiple states – just add tweens

2. In return, you’re getting:
    - A `ref`, which you’ll apply to the element you’re tweening.
    - `props`, which will always contain a `style` property — that’s where the calculated CSS lives.
3. Just apply the `style` to the element as shown, and you’re in business.

Note that `useTween` is a React [hook](https://reactjs.org/docs/hooks-intro.html), and therefore must follow the various [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html) — you need to use it within a functional component, it needs to execute consistently, etc.

# API

This library has just one method — `useTween`.

**useTween([options])**

*options:*

- `mode` (string, *optional*): Determines the type of tween. It’s either `self` or `waypoints`, and defaults to `self`.
- `waypoints` (array, *optional*): An array of waypoint objects. Each object should have these properties:
    - `percent` (number): A value between 0 and 1, indicating the scroll percent. *Only use this with* `mode='self'`.
    - `elem` (string): A selector for a DOM waypoint. *Only use this with* `mode='waypoints'`.
    - `style`: An object of camelcase CSS properties, indicating the final state of the tween at that waypoint.
- `margin`: This can be one of two formats, depending on which `mode` you’re using. Either way, it’s meant to offset the start of a tween animation. Both are *optional.*
    - For `mode='self'`, `margin` is an object with `top` and `bottom` properties, which are both numbers (which can be negative). By default, tweens end when the top of the element touches the top of the user’s viewport. If you wanted it to end 50 pixels after that point, you’d code this: `margin: { bottom: 50 }`
    - For `mode='waypoints',` it’s a bit simpler — it’s a single number that adds (or subtracts) the number of pixels from the actual position of the waypoint element. By default, the waypoint is considered reached when the top of the waypoint element hits the bottom of the user’s viewport So if you wanted to end the tween after 50px of the waypoint element was visible, you would code `margin: 50`.
- `stepFunction`: (function, *optional*): Specifies a function to run at every scroll event during the tween. Takes three arguments: `percent` (the current progress of the tween), `style` (the current tweened style object), and `target` (the object being tweened).

    Whatever you return from this function is put into the `props` object returned by `useTween`.


# Examples

- [Tweening self](https://codesandbox.io/s/stupefied-feynman-44y4kn?file=/src/App.js)
- [Tweening via waypoint](https://codesandbox.io/s/waypoints-example-q0kgl1)

# Advice and caveats

To come!

# To-dos
