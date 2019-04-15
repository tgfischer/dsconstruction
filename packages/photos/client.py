import os
import sys
import boto3
import requests
from io import BytesIO
from PIL import Image, ExifTags


dimensions = 500, 500


def get_image(source):
    return Image.open(BytesIO(requests.get(source).content))


def resize(source, target):
    im = get_image(source)
    im.thumbnail(dimensions)
    auto_rotate(image=im, target=target)


def auto_rotate(source=None, target=None, image=None):
    if (image == None and source == None or target == None):
        raise "Invalid arguments"
    im = image or get_image(source)

    try:
        for orientation in ExifTags.TAGS.keys():
            if ExifTags.TAGS[orientation] == "Orientation":
                break

        exif = dict(im._getexif().items())
        if exif[orientation] == 3:
            im = im.rotate(180, expand=True)
        elif exif[orientation] == 6:
            im = im.rotate(270, expand=True)
        elif exif[orientation] == 8:
            im = im.rotate(90, expand=True)
    except Exception as e:
        print("Error occured: " + str(e))
        pass

    save(im, target)


def save(image, target):
    buffer = BytesIO()
    jpeg = image.convert("RGB")
    jpeg.save(buffer, "JPEG")
    buffer.seek(0)
    s3 = boto3.client("s3")
    s3.put_object(ACL="public-read",
                  Bucket=os.environ["DSC_PUBLIC_BUCKET_NAME"],
                  Key=target + ".jpeg",
                  Body=buffer)
    print("Successfully saved image at " + target + ".jpeg")
