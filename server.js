 
const { PubSub } = require('@google-cloud/pubsub');
const credentials = require('./sub-key.json');
const pubsub = new PubSub({ credentials });
const nodemailer = require('nodemailer');  // Import your email settings module

async function handleMessage(message) {
  try {
    // Extract necessary data from the message
    const feedbackMessage = JSON.parse(message.data.toString());
    console.log(feedbackMessage);

    // Create a Nodemailer transport
    const transport = nodemailer.createTransport({
      service: 'gmail',
   
      auth: {
        user:  process.env.smtp_username,
        pass:  process.env.smtp_password,
      },
  
    });

    // Construct the email message
    const sendmessage = `
      <br/><br/>
      Sender: ${feedbackMessage.mail_to}<br/>
      Subject: ${feedbackMessage.messageTitle}<br/>
      Message: ${feedbackMessage.messageBody}<br/>
    `;

    const mailmessage = {
      from: `Web Message <${process.env.smtp_username}>`,
      to: feedbackMessage.mail_to,
      subject: feedbackMessage.messageTitle,
      html: sendmessage,
    };

    // Send the email
    await transport.sendMail(mailmessage);

    console.log("Email sent successfully");
    message.ack();
    
  } catch (error) {
    console.error("Error handling message:", error);
  }
}

async function setupPubSub() {
  try {
   const topicName = process.env.PUBSUBTOPIC;
  const subscriptionName = process.env.PUBSUBTOPICSUBSCRIPTION;

  const topic = pubsub.topic(topicName);
   
  const subscription = await topic.subscription(subscriptionName);
  console.log(`Subscription ${subscription.name} connected.`);
    

   
    // Listen for new messages
    subscription.on('message', handleMessage);

    // Handle errors
    subscription.on('error', error => {
      console.error('Received error:', error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Error setting up Pub/Sub:", error);
  }
}

// Initialize the Pub/Sub setup
setupPubSub();