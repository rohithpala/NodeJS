### Procedure To Create JS Package for WebPages:

<pre>
<b> Open Command Prompt and go to the required directory </b>
1) <code>npm init</code> - to initialize npm in that particular directory

2) Leave all the fields to their default or give your inputs

4) Use <code>npm install express</code> to install express.
<ul>
	<li>"express" makes things easy - listening to different ports, pushing content to website, delivering content to website... are easily done by "express".</li>
	<li>3000 port is always free on our machines except when we use it</li>
</ul>

<b> In server_name.js file:</b>
5) importing express module - <code>const express = require("express");</code>

6) creating the server - <code>const app = express();</code>

7) Now we set the server/app to listen to a particular port - <code>app.listen(port_number);</code>

8) Now we can start the server by typing <code>node server_name.js</code> in cmd (Disadvantage: Everytime a change is made we have to  restart the server to apply the changes). To overcome this, we can install the "nodemon" package, that reloads the page everytime a change is made - <code>npm install nodemon</code> or <code>npm install -g nodemon</code> to install globally. To start server now, use <code>nodemon server_name.js</code>

9) Opening "localhost:port_number" in browser opens the webpage

10) To overcome the above error we have to use the get function ↓
		<code>
		app.get("/", function(req, res) {
			res.send(html in double-quotes); (or)
			res.sendFile(html_file_path in double-quotes);
		})
		</code>
Give the absolute path - <code>res.sendFile(__dirname + "relative-path")</code> __dirname is the current directory we are in. (or) use <code>res.sendFile("relative-path", { root: __dirname })</code>

<b> Installing body-parser </b>
11) <code>npm install body-parser</code> installs the body-parser package

<b> Import into server </b>
12) <code>const bodyParser = require("body-parser");</code>

13) <code>app.use(bodyParser.urlencoded({extended: true}));</code>, this command allows us to use the form data that is sent from the frontend
</pre>
