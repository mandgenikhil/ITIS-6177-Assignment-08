#This python function is used to return keyword with Nikhil Mandge author name
#Output URL :- https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-45ba06c0-f385-4da7-aa9c-3625f98e16c9/assignment09/say?keyword=Test

def main(args):
    keyword = args.get("keyword")
    res = "Nikhil Mandge says " + keyword
    return {"body": res}