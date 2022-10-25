curl -X POST -H "Access-Control-Allow-Methods: POST" \
    -H "Access-Control-Allow-Origin: *" \
    -H "Content-Type: application/json" \
    http://localhost:5000/data/complete \
    -d '{"ids": [1]}'