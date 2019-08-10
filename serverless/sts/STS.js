const AWS = require('aws-sdk');

module.exports.index = (event, context, callback) => {

    GenerateSTSCredentials(event, context, callback);
  
}

function GenerateSTSCredentials(event, context, callback) {

    const requestBody = JSON.parse(event.body);

    if(typeof requestBody.secret === "undefined" ||
        typeof process.env.unLockKey === "undefined" ||
        requestBody.secret !== process.env.unLockKey) {

            callback(null, {
                statusCode: 400,
                body: JSON.stringify({
                                          token: {},
                                          error: 'Secret not provided, defined or doesn\'t match.'
                                      }),
                headers: {
                  'Access-Control-Allow-Origin': '*'
                },
              });
    }
    else {

            if(typeof requestBody.isCrossAccount !== "undefined" &&
            requestBody.isCrossAccount
            ) {

            let rolearn = requestBody.rolearn;
            let roleSessionName = requestBody.roleSessionName;;
            let externalId = requestBody.externalId;
            let durationInSeconds = requestBody.isCrossAccount ? 3600 : requestBody.durationInSeconds;

            AWS.config.credentials.get(function() {

            let tempToken = {
                "accessKeyId": AWS.config.credentials.accessKeyId,
                "secretAccessKey": AWS.config.credentials.secretAccessKey,
                "sessionToken": AWS.config.credentials.sessionToken,
            };   

            let sts = new AWS.STS();
                
                let params = {
                    RoleArn: rolearn,
                    RoleSessionName: roleSessionName,
                    ExternalId: externalId,
                    DurationSeconds: durationInSeconds
                }

                sts.assumeRole(params, function (err, data) {
                    if (err) {
                        callback(null, {
                                statusCode: 400,
                                body: JSON.stringify(
                                                        {
                                                            error: err.message,
                                                            isCrossAccount: true,
                                                            token: {}
                                                        }
                                                    ),
                                headers: {
                                    'Access-Control-Allow-Origin': '*'
                                },
                        });
                    }
                    else {
                            callback(null, {
                                statusCode: 201,
                                body: JSON.stringify(
                                                        {
                                                            token: data.Credentials,
                                                            isCrossAccount: true,
                                                            error: ''
                                                        }
                                                    ),
                                headers: {
                                    'Access-Control-Allow-Origin': '*'
                                },
                            });
                    }
                });
            });
        }
        else {

            AWS.config.credentials.get(function() {

                let tempToken = {
                    "accessKeyId": AWS.config.credentials.accessKeyId,
                    "secretAccessKey": AWS.config.credentials.secretAccessKey,
                    "sessionToken": AWS.config.credentials.sessionToken,
                };  

                callback(null, {
                statusCode: 201,
                body: JSON.stringify({
                                        token: tempToken,
                                        isCrossAccount: false,
                                        error: ''
                                    }),
                headers: {
                'Access-Control-Allow-Origin': '*'
                },
            });

            });
        }
    }
}