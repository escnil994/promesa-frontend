import { delay } from 'rxjs/operators';
import { environment } from "src/environments/environment";


const base_url = environment.base_url;

export class User {
  
  constructor(
    public name: string,
    public last_name?: string,
    public genre?: string,
    public phone?: string,
    public whatsapp?: string,
    public direction?: string,
    public dui?: string,
    public email?: string,
    public image?: string,
    public google?: boolean,
    public uid?: string,
    public role?: 'ADMIN' | 'USER',
    public password?: string,
    public commented?: boolean,
  ) {
  }
}

