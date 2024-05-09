import express from "express"
import { Login , signup,Logout} from "../controller/userController.js";

const route=express.Router();

route.post("/signup",signup);
route.post("/login",Login);
route.get("/logout",Logout);

export default route;