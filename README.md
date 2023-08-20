## Limitations if you don't login

1. You can view a maximum of 25 posts for a user. Older posts won't be visible.
2. You need to know the exact username for the Spool that you will add. There is no username search available.
3. You view the application in read-only mode. This means you cannot favorite, repost, or reply.

## Why isn't there a hosted version of this project?

Rate Limits. The API used is an unofficial one. As such, Threads can enforce rate limits that are IP based and can restrict access. If we hosted this project, chances are that it could get immediately rate limited, or worse, blocked permanently by Threads. Hence, the best way to use the application would be for individual users to deploy and use v/s working with a hosted solution.

## TODO

- [ ] If the API throws an error, gracefully handle it in the UI. Right now, for some weird reason, Nextjs throws the error as HTML with 500 status code and swr spams the api until it gets a successful response, even though retryOnError is false
- [ ] Test search users column by passing in invalid values. We need to display meaningful error messages
