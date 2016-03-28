mongo admin-dev --eval "db.acts.remove({});"

mongoimport -c acts --file chilled_acts.csv --headerline -d admin-dev --type csv

mongo admin-dev --eval "db.acts.remove({id:''});"

mongo import.js