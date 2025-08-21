terraform {
  backend "remote" {
    organization = "AbdulhakeemS"  # Replace with your HCP org name
    workspaces {
      name = "cloud-security-resume"  # Replace with your workspace name
    }
  }
}