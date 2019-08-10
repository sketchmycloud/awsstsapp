import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StsService } from '../sts.service';

@Component({
  selector: 'app-sts',
  templateUrl: './sts.component.html',
  styleUrls: ['./sts.component.css']
})
export class StsComponent implements OnInit {

  @ViewChild('f') STSForm: NgForm; 

  isCrossAccount: boolean;
  token: any;
  error: any;
  isError: boolean = false;
  isProcessed: boolean = false;
  accountTypes = [];
  isLoading = false;
  _accounttype: string;
  
  constructor(private stsService: StsService) {

  }

  SetValue(type) {
      if(type === "0") {
        this.isCrossAccount = false;
        this.STSForm.setValue({
          duration: "",
          accounttype: "0",
          secret: ""
        });

      }
      else {
        this.isCrossAccount = true;
        this.STSForm.setValue({
          duration: "",
          accounttype: "1",
          secret: "",
          roleARN: "",
          roleSessionName: "",
          externalId: ""
        });

      }
  }
  
  ngOnInit() {
    this.accountTypes.push({_id: "0", name: "This account"});
    this.accountTypes.push({_id: "1", name: "Cross account"});
    this.isCrossAccount = false;
    
    setTimeout(() => {
      this.SetValue("0");
   }, );

    
  }

  onSTSGenerate() {

    this.isLoading = true;

    let duration = this.STSForm.value.duration;
    let secret = this.STSForm.value.secret;
    let rolearn = this.STSForm.value.roleARN;
    let rolesessionname = this.STSForm.value.roleSessionName;
    let externalid = this.STSForm.value.externalId;
    
    let requestBody = {
      "rolearn": rolearn,
      "roleSessionName": rolesessionname,
      "externalId": externalid,
      "durationInSeconds": duration,
      "secret": secret,
      "isCrossAccount": this.STSForm.value.accounttype === "1" ? true : false
    }

    this.isProcessed = false;
    this.isError = false;

    this.stsService
    .GenerateSTSCredentials(requestBody)
    .subscribe(
      (response: Response) => {
        this.isProcessed = true;
        this.isLoading = false
        this.token = response;
      },
      (error) => {
        this.isError = true;
        this.isLoading = false;
        this.error = error.error.error;
      }
    )

  }

  onResetForm() {
    let _accountType = this.STSForm.value.accounttype;
    this.STSForm.reset();
    this.SetValue(_accountType);
    this.isProcessed = false;
  }

  onChangeAccountType(value: string) {
    switch (value) {
      case "0":
        this.isCrossAccount = false;
        break;
      case "1":
        this.isCrossAccount = true;
        break;
      default:
        this.isCrossAccount = false;
        break;
    }
  }

}