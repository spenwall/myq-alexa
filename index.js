const Alexa = require("ask-sdk-core");
const MyQ = require("myq-api");
const utils = require("util");

const account = new MyQ("dude.wallace@gmail.com", "uG5QKmOP9zuR")

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const speechText = "Welcome to the Alexa Skills Kit, you can say hello!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("Hello World", speechText)
      .getResponse();
  }
};

const OpenIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "OpenIntent"
    );
  },
  async handle(handlerInput) {
    await account.login();

    var doorId = await account.getDevices([3, 15, 17])
      .then((result) => {
        return result.devices[1].id;
      });

    var speechText = await account.setDoorState(doorId, 1)
      .then(() => {
        return 'The door is opening';
      })
      .catch(() => 'The door is not opening');

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Opening garage", speechText)
      .getResponse();
  }
};

const CloseIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "CloseIntent"
    );
  },
  async handle(handlerInput) {
    await account.login();

    var doorId = await account.getDevices([3, 15, 17])
      .then((result) => {
        return result.devices[1].id;
      });

    var speechText = await account.setDoorState(doorId, 0)
      .then(() => {
        return 'Closing garage door';
      })
      .catch(() => 'Something went wrong please try again');

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Closing garage", speechText)
      .getResponse();
  }
};

const StatusIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "StatusIntent"
    );
  },
  async handle(handlerInput) {
    await account.login();

    var doorId = await account.getDevices([3, 15, 17])
      .then((result) => {
        return result.devices[1].id;
      });

    var speechText = await account.getDoorState(doorId)
      .then((result) => {
        return 'The door is ' + util.doorStatus(result.doorState);
      })
      .catch(() => 'Something went wrong please try again');

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Door Status", speechText)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speechText =
      "You can ask my garage to open, close or ask for the status";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(
        "You can ask my garage to open, close or status",
        speechText
      )
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.CancelIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speechText = "Goodbye!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Hello World", speechText)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry, I can't understand the command. Please say again.")
      .reprompt("Sorry, I can't understand the command. Please say again.")
      .getResponse();
  }
};

let skill;

exports.handler = async function(event, context) {
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        OpenIntentHandler,
        CloseIntentHandler,
        StatusIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};
