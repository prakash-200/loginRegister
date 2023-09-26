import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata = {email:"",password:""};
  submit = false;
  loading = false;
  errorMessage = "";

  constructor(private auth:AuthService){}

  ngOnInit(): void{
    this.auth.canAuthenticate();
  }

  onSubmit(){
    this.loading = true;
    console.log(this.formdata);
    this.auth.login(this.formdata.email,this.formdata.password)
    .subscribe({
      next:data=>{
        // store token
        this.auth.storeToken(data.idToken);
        console.log('login token '+data.idToken);
        this.auth.canAuthenticate();
      },
      error:data=>{
        if(data.error.error.message=="INVALID_PASSWORD" || data.error.error.message=="INVALID_EMAIL"){
          this.errorMessage="Invalid credentials";
        }else{
          this.errorMessage="Unknown error when logging into account";
        }
      }
    }).add(()=>{
      console.log('login completed');
      this.loading=false;
    })
  }

}
