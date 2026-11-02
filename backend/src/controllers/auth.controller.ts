import Admin from "../models/admin.model.js";
import type { Request, Response } from "express";

async function register(req: Request, res: Response) {

    const {email, password} = req.body;

    try{
      // const user = await Admin.findOne({email});

      return res.status(403).json({
        message: "User details.",
        success: true,
        email,
        password
      })
    }
    catch(error){
        console.log(error)
    }
}

export default {
    register
}