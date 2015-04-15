# allClear

#### To rebuild allClear as sources are saved...
`npm install -g webpack``

`cd <path-to-allClear-code>`

`webpack -w`

#### To run the app locally...
For firebase auth to work, you need to run this from localhost/github instead of a file:// url (aka node/ngnix)
Install nginx: `brew install nginx`

Point nginx to the app code: `vim /usr/local/etc/nginx/nginx.conf`, change `root html` to `root <path-to-allClear-code>`

Run nginx: `nginx`

browser to `localhost:8080/public/index.htm`

#### Please submit pull requests for features!
