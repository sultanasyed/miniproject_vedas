import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLogedUser = new BehaviorSubject(false);

  public baseUrl = "http://18.117.1.88:3002";

  constructor(private http:HttpClient) { }

  register(data: any) : Observable<any>{
    return this.http.post(this.baseUrl+"/mini/customer/Register",data);
  }
  otpVerify(data:any):Observable<any>{
    return this.http.post(this.baseUrl+"/mini/customer/verifyotp",data);
  }
  findInfo(data:any) :Observable<any>{
    return this.http.post(this.baseUrl+"/mini/customer/findInfo",data);
  }
  resendotp(data:any) :Observable<any>{
    return this.http.post(this.baseUrl+"/mini/customer/resendOtp",data);
  }
  login(data:any) :Observable<any>{
    return this.http.post(this.baseUrl+"/mini/customer/login",data);
  }
  forgtpassword(data:any) :Observable<any>{
    return this.http.post(this.baseUrl+"/mini/customer/forgotpassword",data);
  }
  resetpassword(data:any) :Observable<any>{
    return this.http.post(this.baseUrl+"/mini/customer/resetpassword",data);
  }  
  changepassword(data:any) :Observable<any>{
    return this.http.post(this.baseUrl+"/mini/customer/changepassword",data);
  }
  insert(data:any) :Observable<any>{
    return this.http.post(this.baseUrl+"/mini/customer/insert", data);
  }
  update(data:any) :Observable<any>{
    return this.http.put(this.baseUrl+"/mini/customer/update",data);
  }
  delete(data:any) :Observable<any>{
    return this.http.delete(this.baseUrl+"/mini/customer/delete",data);
  }
  IDfetchdata(data:any) :Observable<any>{
    return this.http.post(this.baseUrl+"/mini/customer/IDfetchdata",data);
  }
  DeleteSpecificID(data:any) :Observable<any>{
    return this.http.post(this.baseUrl+"/mini/customer/DeleteSpecificID",data);
  }
}
