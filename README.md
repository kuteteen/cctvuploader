# cctvuploader
<P>
This project is written in Node.js and is designed to upload Image or Video files to Google Drive. It requires the FS, MIME & Googleapis Node packages installing, which you can get from NPM using the below links. 
</P>
<p>
https://www.npmjs.com/package/googleapis<BR/>
https://www.npmjs.com/package/mime<BR/>
https://www.npmjs.com/package/readline<BR/>
</P>
<p>
It features a Google token initialisation and refresh facility based on the Googleapis sample code, which allows you to initialize the token on first use, and then the code validates and handles expired tokens.
</P>
<p>
Some basic instructions are below, but any common queries will be put into the wiki at some point.
</P>
<p>
1) You will need to set-up a Google project at https://console.developers.google.com/iam-admin/projects to obtain the Client ID, Shared Secret etc, which you need to put into the code. Eventually I'll get round to moving the config data into a config file!<BR/>
2) On first use, run initoken.js to create the token file<BR/>
3) You need to change the Source Folder and Google Drive Folder IDs to yours and then you should be good to go.
</P>
<p>
I am a Node amateur so I realise the code might not be the best, so any suggestions welcome!
</P>
