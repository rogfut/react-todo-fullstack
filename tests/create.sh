curl -X POST http://localhost:5000/data/create \
  -H "Access-Control-Allow-Methods: POST" \
  -H "Access-Control-Allow-Origin: *" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=test&details=test&priority=normal&tags=test,cat,dog"