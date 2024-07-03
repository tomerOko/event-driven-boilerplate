k8s_yaml("k8s/signup-d.yaml")
docker_build("signup", "services/signup", live_update=[sync("services/signup/src", "/app/src")])
# make sure debugging port is equal to the launch file of the application (9001 in this case)
# make sure to update the port is wright when using post-man (3001 in this case) 
k8s_resource('signup-d', port_forwards=['3001:3000','9001:9229']) 

k8s_yaml("k8s/add-payment-d.yaml")
docker_build("add-payment", "services/add-payment", live_update=[sync("services/add-payment/src", "/app/src")])
k8s_resource('add-payment-d', port_forwards=['3002:3000','9002:9229'])


