local setup:
1. install on your machine if not already installed: docker for mac, terraform and tilt 
2. make sure docker for mac is running a kubernetes cluster (google "run kubernetes with docker for mac" if your new to this)
3. open repo in code editor and open terminal
4. run "terraform init" (only on first run, but if happand again it is not a problem)
5. go do the db module, update the path of the persistance volumes then create the needed folder (terraform cant create the folders by itself)
6. install helm (probably by running "brew install helm" if you are on mac)
7. add bitnami (kind of the docker hub of helm) as an helm repository by running "helm repo add bitnami https://charts.bitnami.com/bitnami" (for some reason terraform don't handle it automatically)
6. run "bash start.sh" to laod dev environment (debugger and hot reloading is automatic on all services, first load is slower duo to docker downloading images)
7. connect to any of the mongodb instances with any mondodb client (like studio 3t) the connection string will be mongodb://localhost:<port> the port found in the "start.sh" file





# mongo connections for studio 3t
(just copy all of them => studio 3t "connect" pannel => press import => "from clipboard")
// calls service
mongodb://localhost:27002/?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=calls+service&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true

// companies service
mongodb://localhost:27001/?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=companies+service&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true

// users service
mongodb://localhost:27000/?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=users+service&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true


# standards:
1. document ids:
  - if the service is the resource creator (like users collection at signup) it should save new users without ID and the collection will add a string ID, 
  - if the resource is shared by event, we should also publish the ID of the document so that it will be saved (with the same ID) all over the system
  - each resource validation should include an ID string property