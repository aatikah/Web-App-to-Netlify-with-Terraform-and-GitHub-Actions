terraform {
  required_providers {
    netlify = {
      source  = "AegirHealth/netlify"
      version = "~> 0.6.0"  # Use the latest version from https://registry.terraform.io/providers/AegirHealth/netlify
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6.3"
    }
  }
}

provider "netlify" {
  token = var.netlify_token
}