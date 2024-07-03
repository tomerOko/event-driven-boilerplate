#!/bin/bash

# Apply Terraform changes
terraform apply -auto-approve

# port forward the mongo databases to enable local access (with studio 3t for example)
osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/signup-mon 27001:27017" 
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/add-payment-mon 27002:27017"
end tell'

# port forward the rabbitmq management console (http://localhost:15672)
osascript -e 'tell app "Terminal"
    do script "kubectl port-forward svc/rabbitmq 15672:15672"
end tell'

# Run tilt up
tilt up


