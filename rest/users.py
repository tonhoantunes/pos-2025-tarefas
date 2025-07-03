import requests

BASE_URL = "https://jsonplaceholder.typicode.com/users"

class UserAPI:
    def __init__(self, base_url):
        self.base_url = base_url

    def list(self):
        response = requests.get(self.base_url)
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()

    def create(self, data):
        response = requests.post(self.base_url, json=data)
        if response.status_code == 201:
            return response.json()
        else:
            response.raise_for_status()
    
    def read(self, user_id):
        response = requests.get(f"{self.base_url}/{user_id}")
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
    
    def update(self, user_id, data):
        response = requests.put(f"{self.base_url}/{user_id}", json=data)
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()
    
    def delete(self, user_id):
        response = requests.delete(f"{self.base_url}/{user_id}")