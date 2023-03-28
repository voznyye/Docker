import os

from api import app

os.environ.pop("FLASK_RUN_FROM_CLI")
app.run(host='0.0.0.0', port=80, debug=True)
