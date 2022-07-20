import { Request, Response } from 'express';

import { findUserByEmail } from '../user/user.service';
import {StatusCodes} from "http-status-codes";
import { signJWT } from "./auth.utils";
import { LoginBody } from "./auth.schema";
import omit from "../../helpers/omit";

export async function loginHandler(
    req: Request<{}, {}, LoginBody>,
    res: Response
) {
    const { email, password } = req.body;

    //find the user by email
    const user = await findUserByEmail(email);
    if(!user || !user.comparePassword(password)){
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid email or password")
    }
    const payload = omit(user.toJSON(), ['password', '_v']);
    const jwt = signJWT(payload);
    res.cookie("accessToken", jwt, {
        maxAge: 3.154e10, //1 year
        httpOnly: true,
        domain: "localhost", //has to change if deploy
        path: "/",
        sameSite: "strict",
        secure: false //has to make true in production to force work in https
    })
    return res.status(StatusCodes.OK).send(jwt);
        //check user exits - return error

    //verify user password
        //if wrong password - return error

    //add a cookie to the response

    //response
}
