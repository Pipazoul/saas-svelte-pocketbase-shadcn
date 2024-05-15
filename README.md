# ANOTHER SAAS

Saas with the following stack:
- SvelteKit
- Shadcn
- PocketBase
- Temporal

## Features
- Email Login
- Mail verification
- Password Reset
- Subscription Management
- Temporal connected to PocketBase and watching for changes


## Getting Started




## Pocketbase configuration

### Update app url
In http://localhost:8090/_/?#/settings, update the app url to the frontend url

### Email verification
In email verification template, under the action field, add the following line:

`{APP_URL}/account/verify?token={TOKEN}`
⚠️ Be sur to set the correct APP_URL in the Application tab