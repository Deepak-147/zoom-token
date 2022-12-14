require('dotenv').config();
const express = require("express");
const KJUR = require('jsrsasign');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running on port: "+port);
});

app.get("/", (req, res) => {
    res.send("HOME ROUTE ==> Zoom Token API")
});

app.get("/token", (req, res) => {
    const type = req.query.type;
    if (type == "access") {
        try {
            const accountID = process.env.ACCOUNT_ID;
            const clientID = process.env.CLIENT_ID;
            const clientSecret = process.env.CLIENT_SECRET;
            const options = {
                headers: {
                    Authorization: "Basic " + Buffer.from(clientID + ':' + clientSecret).toString('base64'),
                },
            };

            // axios post request
            axios.post("https://zoom.us/oauth/token?grant_type=account_credentials&account_id=" + accountID, {}, options)
                .then(response => {
                    res.json({
                        token: response.data.access_token,
                        type: type
                    });
                })
                .catch(error => {
                    res.json(error);
                });
        }
        catch(err) {
            res.json(err);
        }
    }
    else if (type == "sdkjwt") {
        try {
            const sdkKey = process.env.ZOOM_SDK_KEY;
            const sdkSecret = process.env.ZOOM_SDK_SECRET;
            const iat = Math.round((new Date().getTime() - 30000) / 1000);
            const exp = iat + 60 * 60 * 2;
            const oHeader = { alg: 'HS256', typ: 'JWT' };

            // Omitted some optional params like meeting number and role
            const oPayload = {
                appKey: sdkKey,
                sdkKey: sdkKey,
                iat: iat,
                exp: exp,
                tokenExp: iat + 60 * 60 * 2
            };

            const sHeader = JSON.stringify(oHeader);
            const sPayload = JSON.stringify(oPayload);
            const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret);

            res.json({
                token: sdkJWT,
                type: type
            });
        }
        catch(err) {
            res.json(err);
        }
    }
    else {
        res
            .status(404)
            .json({
                message: "Param \"type\" is either invalid or empty. Check your request and try again."
            });
    }
});
