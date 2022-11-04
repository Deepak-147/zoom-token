# Zoom Token service
API for generating Zoom tokens (Access token and SDK JWT)

---

**NOTE:** This service uses application credentials configured for Meeting SDK App and Server-to-Server OAuth App created on [Zoom Developer portal](https://marketplace.zoom.us/develop/create).

---

This is a Node.js / Express server that can generate two types of tokens.
1. Access Token: For accessing [Zoom public APIs](https://marketplace.zoom.us/docs/api-reference/introduction/) and
2. SDK JWT: For using [Zoom SDK](https://marketplace.zoom.us/docs/sdk/native-sdks/introduction/).

## Installation

In terminal, run the following command to clone the repo:

`$ git clone https://github.com/Deepak-147/zoom-token.git`

## Setup

1. In terminal, cd into the cloned repo:

   `$ cd zoom-token`

1. Then install the dependencies:

   `$ npm install`

1. Create an environment file to store your SDK Key and Secret:

   `$ touch .env`

1. Add the following code to the `.env` file, and insert your Zoom SDK App's Key and Secret found on the App Credentials page in the Zoom App Marketplace:

   ```
   ZOOM_SDK_KEY=YOUR_SDK_KEY_HERE
   ZOOM_SDK_SECRET=YOUR_SDK_SECRET_HERE
   CLIENT_ID=YOUR_CLIENT_ID_HERE
   CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
   ACCOUNT_ID=YOUR_ACCOUNT_ID_HERE
   ```

1. Save and close `.env`.

1. Start the server:

   `$ npm start`

## Usage

Make a GET request to `http://localhost:3000/token?type=access` (or your deployed url) with the following request body:

| Key                   | Value Description |
| -----------------------|-------------|
| meetingNumber          | Required, the Zoom Meeting or Webinar Number. |
| role                   | Required, `0` to specify participant, `1` to specify host.  |

### Example Request

Make a GET request to `http://localhost:3000/token?type=access` to get an **Access token**

If successful, the response will look something like this:

```json
{
    "token": "eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiIxZGMwMTY1Zi1iZDk0LTRlZDQtYWQ2My0wNDRmMDljNWNmYTgifQ.eyJ2ZXIiOjcsImF1aWQiOiI1YjM3NTlmNjAwMjFhOTZkNTRiZTQ3NDMyMjFjODhjNCIsImNvZGUiOiI3WlIzaEpwRFNuNmZfaXJzaWxBcTNndXdZV2tkTXYzaGwiLCJpc3MiOiJ6bTpjaWQ6VkpwMzlfNGZSdzZVMWRNWElZajY1USIsImdubyI6MCwidHlwZSI6MywiYXVkIjoiaHR0cHM6Ly9vYXV0aC56b29tLnVzIiwidWlkIjoiZlZ4YTdpQ0pRRTZLLWVDN2xWblozdyIsIm5iZiI6MTY2NzU0MTg2NCwiZXhwIjoxNjY3NTQ1NDY0LCJpYXQiOjE2Njc1NDE4NjQsImFpZCI6IlBHNjQ0YlJDUXlTZ0FZLWliTFQ5bkEiLCJqdGkiOiI1ZDdmM2FlNi0yN2U3LTRkOWQtYmRmZS05ODJlMzdlNTRiM2YifQ.OPH4KTJWkCKe8Zi7RKl7nMHI3BMdvsI0oNtls_7EmGOW-aNuMpTG0lbZ145B9BAVn6Uqnb9PnWa-kIKGo7fUMA",
    "type": "access"
}
```

Similarly to get a **SDK JWT** pass 'sdjwt' as query param in the request.