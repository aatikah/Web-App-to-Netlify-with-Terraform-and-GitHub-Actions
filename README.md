# How to Deploy a Web App to Netlify with Terraform and GitHub Actions


This guide explains how to deploy your web application to Netlify whenever you push code to your main branch, with the ability to tear down resources when needed.

---
![Slack Preview](https://github.com/aatikah/Web-App-to-Netlify-with-Terraform-and-GitHub-Actions/blob/main/netlify.png)

## 📖 Detailed Walkthrough
For a comprehensive step-by-step guide, including screenshots and detailed explanations, check out the full tutorial on Medium:
[**How to Deploy a Web App to Netlify with Terraform and GitHub Actions: A Step-by-Step Guide**](https://medium.com/p/340cadd976d1)

---
## Overview
This project demonstrates how to set up a complete deployment pipeline that:

- Uses Terraform for infrastructure provisioning
- Stores Terraform state in HashiCorp Cloud Platform (HCP)
- Automates deployments with GitHub Actions
- Hosts your web application on Netlify

---

  ## Prerequisites

Before deploying, ensure you have:

 - A GitHub account
 - A Netlify account
 - A HashiCorp Cloud Platform account
 - Basic knowledge of Git, Terraform, and YAML
 - A web application ready for deployment
   
   ---

## Architecture

```script

├── .github/
│   └── workflows/
│       ├── deploy.yml          # Automated deployment workflow
│       └── destroy.yml         # Manual cleanup workflow
├── warp/                       # Your web application files
├── backend.tf                  # Terraform remote state config
├── main.tf                     # Netlify site resource definition
├── provider.tf                 # Terraform provider configuration
├── variables.tf                # Variable declarations
└── README.md

```

## Step 1: Setting Up HashiCorp Cloud Platform

First, we'll configure HCP to manage our Terraform state remotely.

### Create Organization and Workspace

 - Navigate to HashiCorp Cloud Platform
 - Sign in and create a new organization
 - Create a new workspace within your organization
 - Note your organization name and workspace name for later use


 ### Generate API Token

  - Go to your account settings
  - Navigate to the "Tokens" section
  - Create a new user API token
  - **Important**: Copy this token and save it securely - you'll need it for GitHub Actions
   ---
   
## Step 2: Configuring Netlify

Next, we'll set up Netlify and generate the necessary authentication token.

### Create Personal Access Token

 - Log into your Netlify dashboard
 - Go to User Settings → Applications
 - Click "New access token" under Personal access tokens
 - Give it a descriptive name (e.g., "Terraform Deployment")
 - Important: Copy the token immediately and store it safely
 
---
## Step 3: Setting Up Your GitHub Repository
Now we'll create and configure our GitHub repository with the necessary secrets.

### Create Repository

  - Create a new repository on GitHub
  - Navigate to the repository settings
  - Go to "Secrets and variables" → "Actions"

    ### Add Repository Secrets

    Add these two secrets:

### Secret 1: TF_API_TOKEN

  - Name: TF_API_TOKEN
  - Value: The HashiCorp user API token from Step 1

### Secret 2: NETLIFY_AUTH_TOKEN

  - Name: NETLIFY_AUTH_TOKEN
  - Value: The Netlify Personal Access Token from Step 2

---
## Step 4:Terraform Configuration Files

### 4.1 backend.tf
This file configures Terraform to store its state remotely in HCP Terraform (Terraform Cloud), using the specified organization and workspace for secure and collaborative state management.

### 4.2 provider.tf
The provider.tf file declares two required providers: Netlify and Random, specifying their sources and versions. The provider "netlify" block authenticates with Netlify using a token stored in var.netlify_token, enabling Terraform to manage Netlify resources.

---
### 4.3 variables.tf
This block defines a Terraform variable named netlify_token, which holds your Netlify Personal Access Token. It's typed as a string, marked as sensitive so its value won't be shown in logs or outputs, and includes a description for clarity.

---
### 4.4 main.tf
 The main.tf creates a random 6-character lowercase string (random_string.suffix) to make the Netlify site name unique. The netlify_site resource then provisions a new Netlify site with that name. Finally, two outputs are defined: site_url, which gives the site's public .netlify.app URL, and site_id, which exposes the site's unique Netlify ID.
  
   ---

## Step 5: GitHub Actions Workflows

Now we'll create our CI/CD pipelines for deployment and cleanup.

### Deployment Workflow

Create **.github/workflows/deploy.yml:** and paste the required yaml code

This GitHub Actions workflow provisions a Netlify site with Terraform and then deploys your app to it. The provision job runs Terraform using the API token from secrets, applies the configuration, and captures the generated site ID as an output. The deploy job depends on provision, uses the site ID and Netlify auth token from secrets, then publishes the build directory (./warp/warp) to Netlify in production.

### Destroy Workflow
To destroy the infrastructure:
Create **.github/workflows/destroy.yml:** and paste the required yaml code

This GitHub Actions workflow defines a manual job to destroy the Netlify deployment created with Terraform. It's triggered only when you manually run it (workflow_dispatch). The job checks out your repo, sets up Terraform, re-initializes the backend (with retries in case of transient errors), and then runs terraform destroy -auto-approve to remove all the Netlify resources previously provisioned.

---
## Step 6: Configure HashiCorp Workspace Variables

Back in your HashiCorp Cloud Platform workspace:

  - Navigate to your workspace
  - Click on "Variables"
  - Add a new environment variable:
    - Key: netlify_token
    - Value: Your Netlify Personal Access Token
    - Category: Environment variable
    - Sensitive: ✅ (check this box)

---

## Step 7: Deploy Your Application

Now it's time to deploy! Follow these steps:

### Initialize and Push to GitHub

``` code
git init
git add .
git commit -m "Initial commit: Add Terraform and GitHub Actions configuration"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main

```
### Monitor the Deployment

  - Go to your GitHub repository
  - Click on the "Actions" tab
  - Watch your deployment workflow execute
  - Once complete, check your Netlify dashboard to see your deployed site


### Viewing Your Live Site

After successful deployment:
  - Check the Actions tab for the site URL in the workflow output
  - Visit your Netlify dashboard to manage your site
  - Your site will be accessible at https://your-app-name-random.netlify.app
---

## Step 8: Destroying Resources
When you need to clean up:
  - Go to your repository's Actions tab
  - Find "Destroy Netlify Deployment" workflow
  - Click "Run workflow" to manually trigger destruction
  - Confirm resource deletion in your Netlify dashboard

 ---
## Best Practices and Tips

### Security Considerations:
  - Never commit sensitive tokens to your repository
  - Use GitHub secrets for all authentication tokens
  - Regularly rotate your access tokens


## Detailed Tutorial
For a comprehensive step-by-step guide, including screenshots and detailed explanations, check out the full tutorial on Medium:
[**How to Build an Automated AWS Incident Response System with GuardDuty, EventBridge, Lambda, and Slack**](https://medium.com/p/340cadd976d1)

## 📬 Connect With Me
- 💼 [LinkedIn](https://www.linkedin.com/in/abdulhakeem-sulaiman/)
- ☕ [Support me on BuyMeACoffee](https://buymeacoffee.com/aatikah)
- 🧪 [Explore More Projects on GitHub](https://github.com/aatikah)
