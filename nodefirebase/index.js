const admin = require('firebase-admin')



    var serviceAccount = require("./chatapp-49d28-firebase-adminsdk-2lf24-565ba93c33.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

});

const message = {
    Notification:{

        title:"new Message",
        body:"new add"
    },
    token:''
}

admin.messaging().send()