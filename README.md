# cctvuploader
This project is written in NODE.JS and is designed to upload Image or Video files to Google Drive. It requires the FS, MIME & Googleapis Node packages installing, which you can get from NPM. It also features a Google token refresh facility, which allows the code to check for and handle expired tokens. <BR/><BR/>
Some basic instructions are below, but any common queries will be put into the wiki at some point.<BR/><BR/>
1) You will need to set-up a Google project to obtain the Shared Secret etc, which you need to put into the code. <BR/>
2) You will need to create a JSON file (token.json) to hold the token, which will then be used as the token is refreshed.<BR/>
3) You need to change the Source Folder and Google Drive Folder IDs to yours. <BR/><BR/>
I am a NODE amateur so I realise the code might not be the best, so any suggestions welcome!
