import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    public accountService: AccountService,
    private route: Router
  ){ 

  }

  ngOnInit(): void {
  }

  async login(email: any, password: any){

    if(email.trim().length === 0){
      console.log("Por favor ingresar su email");
      return;
    }

    if(password.trim().length === 0){
      console.log("Por favor ingresar su contraseña");
      return;
    }

    let data = {
      "email": email,
      "password": password
    };

    let token = await this.loginService.Auth(data).toPromise();
    this.set('token', token.accessToken);

    this.accountService.getAccount().subscribe({
      next: (res) =>{
        this.set('currentUser', JSON.stringify(res));
        this.route.navigate(['/starter']);
      },
      error: (err) => console.error(err),
    }); 

  }


  set(key: string, data: string) {
    try {
      localStorage.setItem(key, data);
    }
    catch (e) {
      console.log(e);
    }
  }

}
