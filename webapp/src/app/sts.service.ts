import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const _apiURL = "https://udlwuyhuah.execute-api.eu-west-1.amazonaws.com/prod/stscred";

@Injectable({
  providedIn: 'root'
})
export class StsService {

  constructor(private httpClient: HttpClient) { }

  GenerateSTSCredentials(requestBody: any) {

    return this.httpClient
    .post(_apiURL, requestBody);
    
  }
}