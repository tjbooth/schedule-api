var nconf = require('nconf');
var azure = require('azure');

var AzureNotifier = function() {

    var self = this;

    self.send = function(tag, onSucess, onError) {
       
        try {
            var notificationHubService = azure.createNotificationHubService('NotificationHubName', 'NotificationHubFullSharedAccessSignature');
           
            notificationHubService.apns.send('MyTag',        
                {
                    alert: "Hello MyTag",
                    payload: {
                        inAppMessage: "Hello MyTag!"
                    }
                }
                ,
                function (error)
                {
                    if (!error) {
                        onSucess("Notification successful");
                    }
                    else
                    {
                        onError(error);
                    }

                }
            );
            onSucess('Notification Sent');
        }
        catch(error)
        {
            onError(error)
        }
    };

};

module.exports = AzureNotifier;