# Terraform — S3 + CloudFront (OAC) + Route53

```bash
terraform init
terraform apply -var "domain_name=example.com" -var "subdomain=www"

# After CF deploys, upload Angular build
aws s3 sync ../angular/dist/artist-site/browser s3://www.example.com/ --delete

# Invalidate on updates
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```
