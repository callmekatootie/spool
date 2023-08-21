# Spool | A deck for Threads

An unofficial client to view multiple [Threads](https://www.threads.net/) together. Think Tweetdeck, but for Threads. Uses an [unofficial API](https://github.com/junhoyeo/threads-api) for Threads

Demo Video:

https://github.com/callmekatootie/spool/assets/2317133/ec191111-b7d4-49a6-8a42-2782b4328a4d

## Installation

You need [Node.js](https://nodejs.org/en) to install the dependencies with `npm install`.
This is a [Nextjs](https://nextjs.org/) app, so you can use any of the [Nextjs CLI commands](https://nextjs.org/docs/app/api-reference/next-cli) to run it.

Your app should be available at `localhost:3000` by default.

### Environment Variables

Set the following environment variables before running the app:

```js
THREADS_USERNAME; // Your Threads account username
THREADS_PASSWORD; // Your Threads account password
DEVICE_ID; // A unique id to identify your device. Example `android-ertquuil3x57000`. Needed to use the API
SECRET_COOKIE_PASSWORD; // A secret for your auth cookie
```

## Features

- View multiple account's Threads at the same time
- Search for a user to add their timeline to your deck
- Like, Reply and Quote a Thread post.
- Create a new Thread

## Limitations if you don't login

1. You can view a maximum of 25 posts for a user. Older posts won't be visible.
2. There is no username search available. You need to know the exact username for the Spool that you will add.
3. You view the application in read-only mode. This means you cannot favorite, repost, or reply.

## Why isn't there a hosted version of this project?

Rate Limits. The API used is an unofficial one. As such, Threads can enforce rate limits that are IP based and can restrict access. If we hosted this project, chances are that it could get immediately rate limited, or worse, blocked permanently by Threads. Hence, the best way to use the application would be for individual users to deploy and use v/s working with a hosted solution.

## TODO

- [ ] If the API throws an error, gracefully handle it in the UI. Right now, for some weird reason, Nextjs throws the error as HTML with 500 status code and swr spams the api until it gets a successful response, even though retryOnError is false
- [ ] Test search users column by passing in invalid values. We need to display meaningful error messages
- [ ] Use Virtual DOM for the spool columns. It can lead to performance issues if we have too many threads displayed
- [ ] ... and any other features that the unofficial API supports
