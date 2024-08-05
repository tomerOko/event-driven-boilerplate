k8s_yaml("k8s/signup-d.yaml")
docker_build("signup", "services/signup", live_update=[sync("services/signup/src", "/app/src")])
# make sure debugging port is equal to the launch file of the application (9001 in this case)
# make sure to update the port is wright when using post-man (3001 in this case) 
k8s_resource('signup-d', port_forwards=['3001:3000','9001:9229']) 

k8s_yaml("k8s/payment-d.yaml")
docker_build("payment", "services/payment", live_update=[sync("services/payment/src", "/app/src")])
k8s_resource('payment-d', port_forwards=['3002:3000','9002:9229'])

k8s_yaml("k8s/teach-d.yaml")
docker_build("teach", "services/teach", live_update=[sync("services/teach/src", "/app/src")])
k8s_resource('teach-d', port_forwards=['3003:3000','9003:9229'])

k8s_yaml("k8s/meet-d.yaml")
docker_build("meet", "services/meet", live_update=[sync("services/meet/src", "/app/src")])
k8s_resource('meet-d', port_forwards=['3004:3000','9004:9229'])

k8s_yaml("k8s/emails-d.yaml")
docker_build("emails", "services/emails", live_update=[sync("services/emails/src", "/app/src")])
k8s_resource('emails-d', port_forwards=['3005:3000','9005:9229'])

k8s_yaml("k8s/auth-d.yaml")
docker_build("auth", "services/auth", live_update=[sync("services/auth/src", "/app/src")])
k8s_resource('auth-d', port_forwards=['3006:3000','9006:9229'])

k8s_yaml("k8s/search-d.yaml")
docker_build("search", "services/search", live_update=[sync("services/search/src", "/app/src")])
k8s_resource('search-d', port_forwards=['3007:3000','9007:9229'])



