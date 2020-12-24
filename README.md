# MyQ Alexa skill

This is just a simple Alexa skill you can use to add Alexa support to open and close your garage door by using the phrase `alexa ask my garage to open`

This can only be used for personal use, and can only work if you have one MyQ garage door opener. 

# Installation
### 1. Create an Alexa skill
* Go [here](https://developer.amazon.com/alexa-skills-kit) and click Start a Skill. You will need to login with your Alexa account as this skill will only be available to your account.
* Once signed in click the create a skill button
* Enter the name of the sill eg. My Garage
* Choose a `custom` model and then scroll to the bottom and select `Alexa-Hosted`. (The free tier will be way more than needed for this skill)

### 2. Add Interaction Model
* On the build page go to the `JSON Editor` section 
* Take the alexa.json file and added it to this editor, either by dragging the file to the file drop section or copying the contents.
* Change the invocation name if wanted in the `invocation` section
  * It is set to my garage but if you would like to do something else feel free to change it to anything like gateway or big door. You will be using the app like `alexa ask gateway to open`

### 3. Build the model
* Hit the Build Model button at the top.

### 4. Add the Code
* Go to `code` tab at the top
* Change code in `index.js` to the code in the index.js in the repository
  * At the top of the code you will need to change the login information to your personal login information for MyQ. You will see the `username` and `password` at line 5.
* Change the `package.json` code to the one found in the repository.

### 5. Deploy
* Hit the `Deploy` button and let it build.

### 6. Test
* Go to the `test` section at the top
* Click the dropdown and select `Development`
* Type in the box `ask my garage to open`
* If it worked properly you should now be able to do the same command on your alexa devices that are connected to the account you logged in with.

# Commands
You can use the commands after saying `Alexa ask my garage` (or whatever invoke word you use)
* Open
* Close
* Status

# Troubleshooting
Sometimes the garage door is defined not as the first door in the list of devices sent back from myQ. If you are having trouble try changing line 28.
```
return result.devices[1].serial_number;
```
to 
```
return result.devices[0].serial_number;
```