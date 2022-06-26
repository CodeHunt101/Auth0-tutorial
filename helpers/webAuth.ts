import { WebAuth } from "auth0-js";

export var webAuth = new WebAuth({
  domain: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL,
  clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  redirectUri: "http://localhost:3000/auth0js/logged-in",
  scope: "openid profile email",
});