import { Response,Request, NextFunction } from "express";

export function isAuthenticate(
    req:Request,
    res:Response,
    next:NextFunction
):void{
    if(req.session.userId && req.session){
        return next()
    }
    res.redirect('/')
      
 }


export function noCache(req:Request,res:Response,next:NextFunction):void{
        res.set(
          "Cache-Control",
          "no-store, no-cache, must-revalidate, proxy-revalidate"
        );
        next()

 }