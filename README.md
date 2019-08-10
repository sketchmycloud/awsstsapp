### AWS - Generate STS credentials aginst an IAM role and cross account too

##### Step 1
git clone this app from https://github.com/sketchmycloud/awsstsapp.git 

##### Step 2
Once cloned the app, open the folder in Visual Code or any other editior of your choice.

##### Step 3

Go to /serverless/serverless.yml file and you should see below code

```serverless.yml
custom:
  stackstage: prod
  region: eu-west-1
  lambdaRole: #your role against you want to get the credentials for
  unLockKey: #anysecret key e.g. 135247
  lambdaMemorysize: 512
```

Choose your region, role (should be able to execute lambda role, so make sure a role has basic lambda execution role) and unLockKey. unLockKey could be any random digits and works as password to generate STS tokens locally. This is also to make sure, no once can access the app locally, if they don't have access to the unLockKey unless they have access to the code locally.

##### Step 4
At this moment, you are ready to deploy your serverless code. Make sure, you have configured; aws credentials locally  against your AWS account, where you are looking to host your code.

Go to https://serverless.com/framework/docs/providers/aws/guide/credentials/ for more detals to set-up aws credentials.

##### Step 5
If everything goes fine, you should have an API endpoint and other details. Please preserve this API endpoint.

##### Step 6
Go to /webapp/src/app/sts.service.ts file. You should have a variable called _apiURL
```
const _apiURL = "";
```
Replace this URL with the API endpoint, you have got in step 5

##### Step 7

Go to your app directory /webapp/ and run npm install. This installs all the necessary Angular and Node.JS dependencies for the front end.

```
npm install
```
##### Step 8
When installation has been finished, run npm start

```
npm start
```

This makes the web interface available at port 4200 (you can change this port).

##### Step 9
Once app has compiled, please go to http://localhost:4200 to view the front end app.

##### Step 10
On the page, you can generate STS credentials against the AWS account, where Lambda is running or cross account; provided you have setup cross-account already. Checkout https://aws.amazon.com/blogs/security/how-to-enable-cross-account-access-to-the-aws-management-console/. You can generate STS token for 12 hours, however AWS does not allow role chaining and hence cross account STS tokens are limited to 1 hour only. Checkout https://github.com/coinbase/assume-role/issues/24 

###### Thoughts
Developers, SysOps, Administratots can use this app locally and generate STS tokens, whenever they need without going through whole CLI thing. 

Since frontend is in Angular, you can build the project and host the frontend app via S3 and use it online. I would not suggest public access of your frontend app. You might want to limit the access to you by applying SECURITY GROUPS and necessary policies. 

###### Contacting me 
Please contact me at rakesh@sketchmycloud.com for any issues or challenges and I am happy to help. 

Developers might want to create different features on the top of this app to be used internally or externally.



