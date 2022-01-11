
export class AdminUser {
    private userName!: string;
    private userEmail:string | undefined;
    private userPassword!: string;
    private userProfile:string | undefined;
    private role:string | undefined;
    private resetToken:Number | undefined;
    private clinicID:string | undefined;
    private allowNews:string | undefined;
    constructor(userName:string,
        userEmail:string,
        userPassword:string,
        userProfile:string,
        role:string,
        resetToken:Number,
        clinicID:string,
        allowNews:string,){
    this.userName=userName;
    this.userEmail=userEmail;
    this.userPassword=userPassword;
    this.userProfile=userProfile;
    this.role=role;
    this.resetToken=resetToken;
    this.clinicID=clinicID;
    this.allowNews=allowNews;
    }
  }