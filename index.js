// Include the Alexa SDK v2
const Alexa = require("ask-sdk-core");
const actions = require('./functions');
const Purpose = {
  HelpMe: [
    "Helping under-privileged students with books.",
    "Helping run-away teens with shelter"
    ],
  SoupKitchen: [
    "Provide food to homeless people"
    ],
  Craigs: [
    "Give shelter to homeless people"
    ]
}

// The "LaunchRequest" intent handler - called when the skill is launched
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    console.log ("Launch Request Handler was called");
    let speechText = "Hello, I am Craigs. I can help you with information on Non-Profits!";
    let repromptText = "I did not receive any input. You can say , tell me  more information on a non-profit";

    // Speak out the speechText via Alexa
    return handlerInput.responseBuilder
    .speak(speechText)
    .reprompt(repromptText)
    .getResponse();
  }
};
//Handler for NonProfits
const NONPROFITSPURPOSE= {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "NONPROFITSPURPOSE"
    );
  },
  handle(handlerInput) {
    console.log("non profit Intent handler called");

    // Get the NGO name
   
    let nonprofits = handlerInput.requestEnvelope.request.intent.slots.nonprofits.value;
    let getNGO = actions.getNGO(Purpose, nonprofits);

    if (!getNGO) {
      return UnhandledHandler.handle(handlerInput);
    }

    nonprofits = getNGO[0];
    let purpose = getNGO[1];

    let cardTitle = nonprofits ;
    let cardContent = purpose;
    let speechText = nonprofits + " has this  " + purpose;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(cardTitle, cardContent)
      .getResponse();
  }
};

// Unhandled Requests
const UnhandledHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error Handler : ${error.message}`);

    return handlerInput.responseBuilder
      .speak(
        "Sorry, I am unable to understand what you said. You can ask me to say  information on  non Profits"
      )
      .getResponse();
  }
};


// Register the handlers and make them ready for use in Lambda
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    NONPROFITSPURPOSE
    )
  .addErrorHandlers(UnhandledHandler)
  .lambda();
