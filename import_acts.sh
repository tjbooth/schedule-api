mongo ds062178.mongolab.com:62178/schedule-api -u ciaf_dev -p Password123 --eval "db.acts.remove({});"

mongoimport --host ds062178.mongolab.com:62178 -d schedule-api -u ciaf_dev -p Password123 -c acts --file chilled_acts.csv --headerline --type csv

mongo ds062178.mongolab.com:62178/schedule-api -u ciaf_dev -p Password123 --eval "db.acts.remove({id:''});"

mongo ds062178.mongolab.com:62178/schedule-api -u ciaf_dev -p Password123 import.js