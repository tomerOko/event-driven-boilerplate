

terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.0.0"
    }
  }
}

provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "docker-desktop"
}

provider "helm" {
  kubernetes {
    config_path    = "~/.kube/config"
    config_context = "docker-desktop"
  }
}

resource "helm_release" "nginix-ingress-controller" {
  name       = "ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
}

resource "kubernetes_ingress_v1" "ingress_rules" {
  metadata {
    name = "ingress-rules"
  }

  spec {
    ingress_class_name = "nginx"

    dynamic "rule" {
      for_each = [
        # {
        #   host = "myapp.local"
        #   paths = [
        #     { app_name = "posts", target_port = 3000 },
        #   ]
        # },
        {
          host = "localhost"
          paths = [
            { app_name = "employees", target_port = 3000 },
            { app_name = "supliers", target_port = 3000 },
            { app_name = "signup", target_port = 3000 },
            { app_name = "orders", target_port = 3000 },
            { app_name = "hours", target_port = 3000 }
          ]
        }
      ]

      content {
        host = rule.value.host

        http {
          dynamic "path" {
            for_each = rule.value.paths

            content {
              path      = "/${path.value.app_name}"
              path_type = "Prefix"

              backend {
                service {
                  name = "${path.value.app_name}-s"
                  port {
                    number = path.value.target_port
                  }
                }
              }
            }
          }
        }
      }
    }

    //mongodb rule
    # rule {
    #   host = "localhost"

    #   http {

    #     path {
    #       path      = "/"
    #       path_type = "Prefix"



    #       backend {

    #         service {
    #           name = "mongodb"
    #           port {
    #             number = 27017
    #           }
    #         }
    #       }
    #     }
    #   }
    # }

  }
}

# (Module) deployments of services under development
module "deployments_of_our_services" {
  source = "./modules/deployments-of-our-services"
}

# (Module) databases
module "dbs" {
  source = "./modules/dbs"
}

resource "helm_release" "rabbitmq" {
  name = "rabbitmq"

  repository = "https://charts.bitnami.com/bitnami"
  chart      = "rabbitmq"

  set {
    name  = "auth.username"
    value = "user"
  }

  set {
    name  = "auth.password"
    value = "password"
  }
  set {
    name  = "replicaCount"
    value = "3"
  }

  set {
    name  = "auth.erlangCookie"
    value = "some_secret_cookie"
  }

  set {
    name  = "metrics.enabled"
    value = "true"
  }
}


