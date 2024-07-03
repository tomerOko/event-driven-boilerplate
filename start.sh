#!/bin/bash

# Apply Terraform changes
terraform apply -auto-approve

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/orders-mongo 27000:27017"
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/employees-mongo 27001:27017"
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/signup-mongo 27002:27017"
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/supliers-mongo 27003:27017"
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward deployment/hours-mongo 27004:27017"
end tell'

osascript -e 'tell app "Terminal"
    do script "kubectl port-forward svc/rabbitmq 15672:15672"
end tell'

# Run tilt up
tilt up


