output "setlist_api_endpoint" {
  description = "The endpoint of the Setlist API"
  value       = aws_apigatewayv2_api.setlist_api.api_endpoint
}
