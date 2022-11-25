import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login-request.playload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;
  registerSuccessMessage: string;
  isError: boolean;
loginRequestPayload:LoginRequestPayload;
  constructor(private activatedRoute: ActivatedRoute,private router:Router,
    private toastr:ToastrService,private authService:AuthService) { 

    this.loginRequestPayload={
      username:'',
      password:''
    };
  }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      username: new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    });
  this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }

  login(){
   this.loginRequestPayload.username=this.loginForm.get('username')?.value;
   this.loginRequestPayload.password=this.loginForm.get('password')?.value;
   this.authService.login(this.loginRequestPayload).subscribe(data=>{
   if(data){
    this.isError=false;
    this.router.navigateByUrl('/');
    this.toastr.success('Login Successful')
   }else{
    this.isError=true;
   }
  });
  }

}
