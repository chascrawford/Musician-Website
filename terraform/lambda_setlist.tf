resource "aws_iam_role" "lambda_setlist" {
  name = "lambda_setlist_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "lambda_setlist_policy" {
  name = "lambda_setlist_policy"
  role = aws_iam_role.lambda_setlist.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["dynamodb:Scan"]
        Resource = aws_dynamodb_table.setlist.arn
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_lambda_function" "get_setlist" {
  function_name = "get-setlist-fn"
  filename      = "../lambda/get_setlist.zip"
  handler       = "get_setlist.handler"
  runtime       = "nodejs18.x"
  role          = aws_iam_role.lambda_setlist.arn
  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.setlist.name
    }
  }
}

resource "aws_apigatewayv2_api" "setlist_api" {
  name          = "setlist-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "setlist_lambda_integration" {
  api_id                 = aws_apigatewayv2_api.setlist_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.get_setlist.invoke_arn
  integration_method     = "POST"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "setlist_route" {
  api_id    = aws_apigatewayv2_api.setlist_api.id
  route_key = "GET /setlist"
  target    = "integrations/${aws_apigatewayv2_integration.setlist_lambda_integration.id}"
}

resource "aws_lambda_permission" "apigw_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_setlist.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.setlist_api.execution_arn}/*/*"
}

resource "aws_apigatewayv2_stage" "setlist_stage" {
  api_id      = aws_apigatewayv2_api.setlist_api.id
  name        = "$default"
  auto_deploy = true
}
