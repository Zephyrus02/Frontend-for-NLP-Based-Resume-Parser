import requests

api_key = '8aePIXUoCqqpqPz5Wo2Qng'
headers = {'Authorization': 'Bearer ' + api_key}
api_endpoint = 'https://nubela.co/proxycurl/api/v2/linkedin/company/job'
params = {
    'job_type': 'anything',
    'experience_level': 'entry_level',
    'when': 'past-week',
    'flexibility': 'remote',
    'keyword': 'fullstack developer'
}
response = requests.get(api_endpoint,
                        params=params,
                        headers=headers)
print(response.json())


