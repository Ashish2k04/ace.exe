import Admin from "../models/admin.model.js";
import type { Request, Response } from "express";

async function login(req: Request, res: Response) {

    const {email, password} = req.body;

    try{
      const user = await Admin.findOne({email});

      if(!user){
          return res.status(404).json({
             message: "No user found with this email address.",
             success: false,
        })
      }
     
    }
    catch(error){
        console.log(error)
    }
}

export {
    login
}