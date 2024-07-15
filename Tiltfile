k8s_yaml("k8s/signup-d.yaml")
docker_build("signup", "services/signup", live_update=[sync("services/signup/src", "/app/src")])
# make sure debugging port is equal to the launch file of the application (9001 in this case)
# make sure to update the port is wright when using post-man (3001 in this case) 
k8s_resource('signup-d', port_forwards=['3001:3000','9001:9229']) 

k8s_yaml("k8s/add-payment-d.yaml")
docker_build("add-payment", "services/add-payment", live_update=[sync("services/add-payment/src", "/app/src")])
k8s_resource('add-payment-d', port_forwards=['3002:3000','9002:9229'])

k8s_yaml("k8s/be-teacher-d.yaml")
docker_build("be-teacher", "services/be-teacher", live_update=[sync("services/be-teacher/src", "/app/src")])
k8s_resource('be-teacher-d', port_forwards=['3003:3000','9003:9229'])

k8s_yaml("k8s/meet-d.yaml")
docker_build("meet", "services/meet", live_update=[sync("services/meet/src", "/app/src")])
k8s_resource('meet-d', port_forwards=['3004:3000','9003:9229'])




