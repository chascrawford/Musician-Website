variable "domain_name" {
  type = string
}
variable "subdomain" {
  type    = string
  default = "www"
}
variable "aws_region" {
  type    = string
  default = "us-east-1"
}
variable "price_class" {
  type    = string
  default = "PriceClass_100"
}
