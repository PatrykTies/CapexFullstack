
import { validateRoute } from '../../lib/auth';

 export default function validateRoute((req,res,user)=>{
     return res.body(user)
 }