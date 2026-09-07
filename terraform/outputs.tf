output "cloudfront_domain" { value = aws_cloudfront_distribution.cdn.domain_name }
output "site_bucket"      { value = aws_s3_bucket.site.bucket }
output "site_url"         { value = "https://${aws_route53_record.alias.fqdn}" }
