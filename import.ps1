params { @config string = 'config.json' }

@connectionString = 'mongodb://localhost/admin-dev';
#@connectionString = 'ds062178.mongolab.com:62178'

mongo @ -u ciaf_dev -p Password123 --eval "db.acts.remove({});"

mongoimport --host ds062178.mongolab.com:62178 -d schedule-api -u ciaf_dev -p Password123 -c acts --file chilled_acts.csv --headerline --type csv

mongo ds062178.mongolab.com:62178/schedule-api -u ciaf_dev -p Password123 --eval "db.acts.remove({id:''});"

mongo ds062178.mongolab.com:62178/schedule-api -u ciaf_dev -p Password123 import.js





mongoimport --host mongodb://localhost/admin-dev -d schedule-api -c acts --file chilled_acts.csv --headerline --type csv


mongoimport -d schedule-api -c locations --file chilled_locations.csv --headerline --type csv