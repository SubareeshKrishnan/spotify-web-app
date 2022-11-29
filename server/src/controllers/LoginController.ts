import { Request, response, Response } from "express";
import request from "request";
import { get, post, controller } from "./decorators";
import { generateRandomString } from "../utils/randomStringGen";
import * as dotenv from 'dotenv';
import { URLSearchParams } from "url"

dotenv.config();
const stateKey = 'spotify_auth_state';
const client_id = process.env.CLIENT_ID!;
const client_secret = process.env.CLIENT_SECRET!;
const redirect_uri = "http://localhost:3030/callback";

@controller("")
class LoginController {

    @get("/login")
    getLogin(req: Request, res: Response) {
        const state = generateRandomString(16);
        res.cookie(stateKey, state);

        const scope = 'user-read-private user-read-email user-top-read';
        const params: string = new URLSearchParams([
            ['response_type', 'code'],
            ['client_id', client_id],
            ['scope', scope],
            ['redirect_uri', redirect_uri],
            ['state', state]
        ]).toString();
        res.redirect('https://accounts.spotify.com/authorize?' + params);
    }

    @get("/callback")
    getCallback(req: Request, res: Response) {
        const code = req.query.code;
        const state = req.query.state;
        const storedState: string | null = req.cookies ? req.cookies[stateKey] : null;

        if (state === null || state !== storedState) {
            // FIXME: Do the error part.
            const params = new URLSearchParams([
                ['error', 'state_mismatch']
              ]).toString();

            res.redirect('http://localhost:3001/dashboard/#' + params);
        } else {
            res.clearCookie(stateKey);

            const authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
                },
                json: true
            };

            request.post(authOptions, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const { access_token, refresh_token } = body;
                    // console.log("This token expires in " + expires_in + "s");
                    
                    const params = new URLSearchParams([
                        ['access_token', access_token],
                        ['refresh_token', refresh_token]
                      ]).toString();
                    res.redirect("http://localhost:3001/dashboard/#" + params);
                } else {
                    const params = new URLSearchParams([
                        ['error', 'invalid_token']
                      ]).toString();
                    res.redirect("http://localhost:3001/dashboard/#" + params);
                }
            })
        }
    }
}