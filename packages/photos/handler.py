import os
import sys
import json
from io import BytesIO

import client


dimensions = 500, 500


def optimize(event, context):
    print(json.dumps(event))
    try:
        for record in event["Records"]:
            key = record["s3"]["object"]["key"]
            source = "https://s3.ca-central-1.amazonaws.com/{}/{}".format(
                os.environ["DSC_STAGING_BUCKET_NAME"], key)

            client.auto_rotate(source, key)
            client.resize(source=source, target="thumbnails/" + key)
    except Exception as e:
        print("Catching error: " + str(e))

    return {
        "statusCode": 200,
        "body": json.dumps({"success": True})
    }
