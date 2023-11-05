import os

from back.api import app

os.environ.pop("FLASK_RUN_FROM_CLI")
app.run(host='0.0.0.0', port=50, debug=True)
