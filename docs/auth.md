# Authentication

This project is using [SST Auth](https://github.com/sst/sst/tree/master/packages/sst/src/node/future/auth). It is a stateless authentication system that uses JWT tokens/ or cookies. It supports multiple authentication providers, including Google, Facebook, GitHub, and Email/Password, code-based login, and magic link.

## Auth API

The `future` version SST Auth is a rewrite of the stable Auth on SST documentation. It is a breaking change from the current API and could change more in the future.

## Implemented Auth

- [x] OIDC (Google) Authentication sends a JWT token to the client

## Improvements

While SST Auth is stateless a database can be utilized to store user information and session information. This will allow for more features such as:
Email verification, password reset, and more.
