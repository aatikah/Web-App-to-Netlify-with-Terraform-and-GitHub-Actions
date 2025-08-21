resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

resource "netlify_site" "app_site" {
  name = "resume-${random_string.suffix.result}"  # Customize the base name
}

output "site_url" {
  value = "${netlify_site.app_site.name}.netlify.app"
}

output "site_id" {
  value = netlify_site.app_site.id
}