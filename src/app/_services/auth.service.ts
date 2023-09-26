import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private http:HttpClient) { }

  isAuthenticate():boolean{
    if(sessionStorage.getItem('token')!==null){
      return true;
    }
    return false;
  }

  canAccess(){
    if(!this.isAuthenticate()){
      this.router.navigate(['/login'])
    }
  }

  canAuthenticate(){
    if(this.isAuthenticate()){
      this.router.navigate(['/dashboard'])
    }
  }

  register(name:string,email:string,password:string){
         // send data to register api ( firebase registre api )
         return this.http
         .post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYYGM7G76RnXJgPtDTvqBi-_BTLk0HPEc',
         {displayName:name,email,password} )
        }

  storeToken(token:string){
    sessionStorage.setItem('token',token);
  }

  login(email:string,password:string){
    // send data to fire base api
    return this.http
    .post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYYGM7G76RnXJgPtDTvqBi-_BTLk0HPEc',
    {email,password});
  }

  removeToken(){
    sessionStorage.removeItem('token');
  }
}

        