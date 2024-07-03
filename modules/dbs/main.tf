locals {
  apps = ["employees", "supliers", "signup", "orders", "hours"]
}

resource "kubernetes_persistent_volume" "mongo_pv" {
  for_each = { for key in local.apps : key => key }

  metadata {
    name = "${each.key}-mongo-pv"
  }

  spec {
    persistent_volume_source {
      local {
        path = "/Users/tomer/mnt/data/${each.key}"
      }
    }

    capacity = {
      storage = "4Gi"
    }

    storage_class_name = "manual"

    access_modes = ["ReadWriteOnce"]

    persistent_volume_reclaim_policy = "Retain"
    node_affinity {
      required {
        node_selector_term {
          match_expressions {
            key      = "kubernetes.io/hostname"
            operator = "In"
            values   = ["docker-desktop"]
          }
        }
      }
    }
  }
}

resource "kubernetes_persistent_volume_claim" "mongo_pvc" {
  for_each = { for key in local.apps : key => key }

  metadata {
    name = "${each.key}-mongo-pvc"
  }

  depends_on = [
    kubernetes_persistent_volume.mongo_pv
  ]
  spec {
    access_modes       = ["ReadWriteOnce"]
    storage_class_name = "manual"
    resources {
      requests = {
        storage = "4Gi"
      }
    }
  }
}

resource "kubernetes_deployment" "mongo" {
  for_each = { for key in local.apps : key => key }

  metadata {
    name = "${each.key}-mongo"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "${each.key}-mongo"
      }
    }

    strategy {
      type = "Recreate"
    }

    template {
      metadata {
        labels = {
          app = "${each.key}-mongo"
        }
      }

      spec {
        container {
          image = "mongo:latest"
          name  = "${each.key}-mongo"

          port {
            container_port = 27017
            name           = "${each.key}-mongo"
          }

          volume_mount {
            name       = "${each.key}-mongo-persistent-storage"
            mount_path = "/data/db"
          }
        }

        volume {
          name = "${each.key}-mongo-persistent-storage"

          persistent_volume_claim {
            claim_name = "${each.key}-mongo-pvc"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "mongo_service" {
  for_each = { for key in local.apps : key => key }

  metadata {
    name = "${each.key}-mongo"
  }

  spec {
    selector = {
      app = "${each.key}-mongo"
    }

    port {
      port        = 27017
      target_port = 27017
    }
  }
}
