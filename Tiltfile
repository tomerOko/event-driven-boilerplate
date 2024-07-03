k8s_yaml("k8s/orders-d.yaml")
docker_build("orders", "services/orders", live_update=[sync("services/orders/src", "/app/src")])
k8s_resource('orders-d', port_forwards=['3001:3000','9001:9229'])

k8s_yaml("k8s/employees-d.yaml")
docker_build("employees", "services/employees", live_update=[sync("services/employees/src", "/app/src")])
k8s_resource('employees-d', port_forwards=['3002:3000','9002:9229'])

k8s_yaml("k8s/signup-d.yaml")
docker_build("signup", "services/signup", live_update=[sync("services/signup/src", "/app/src")])
k8s_resource('signup-d', port_forwards=['3003:3000','9003:9229'])


k8s_yaml("k8s/supliers-d.yaml")
docker_build("supliers", "services/supliers", live_update=[sync("services/supliers/src", "/app/src")])
k8s_resource('supliers-d', port_forwards=['3004:3000','9004:9229'])

k8s_yaml("k8s/hours-d.yaml")
docker_build("hours", "services/hours", live_update=[sync("services/hours/src", "/app/src")])
k8s_resource('hours-d', port_forwards=['3005:3000','9005:9229'])

