import requests
from bs4 import BeautifulSoup
import json

def extract_half_life(url):
    response = requests.get(url)
    if response.status_code != 200:
        print(f"failed to retrieve the webpage {response.status_code}")
        return

    # Parse the webpage content
    soup = BeautifulSoup(response.text, 'html.parser')

    # finding "Half life"
    half_life = None
    for row in soup.find_all('tr'):
        th = row.find('th', align='left')
        if th and "Half life" in th.text:
            td = row.find('td')
            if td:
                half_life = td.get_text(strip=True).replace('\xa0', ' ')
            break
    half_life = half_life.split()[0]
    half_life = float(half_life)
    return half_life

def extract_every_row(url):
    response = requests.get(url)
    if response.status_code != 200:
        print(f"failed to retrieve the webpage {response.status_code}")
        return
    
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the starting row with the specific marker
    for row in soup.find_all('tr'):
        th = row.find('th', align='left')
        if th and "Half life" in th.text:
            td = row.find('td')
            if td:
                half_life = td.get_text(strip=True).replace('\xa0', ' ')
            break
    start_marker = soup.find('hr', {'size': '2'})
    if not start_marker:
        print("Starting marker not found.")
        return

    # Find the subsequent rows
    all_rows = start_marker.find_all_next('tr')
    
    # Extract data from every row between the markers
    extracted_data = []
    for index, row in enumerate(all_rows, start=1):
        if index % 1 == 0:
            # Extract text from each <td> in the row
            row_data = [td.get_text(strip=True).replace('\xa0', ' ') for td in row.find_all('td')]
            if row_data == []:
                return extracted_data
            extracted_data.append(row_data)

    return extracted_data

# Example usage
urlEu = 'http://nucleardata.nuclear.lu.se/toi/nuclide.asp?iZA=630152'  # Eu
urlCo = 'http://nucleardata.nuclear.lu.se/toi/nuclide.asp?iZA=270060'  # Co
urlBa = 'http://nucleardata.nuclear.lu.se/toi/nuclide.asp?iZA=560133' #Ba
urlCs = 'http://nucleardata.nuclear.lu.se/toi/nuclide.asp?iZA=550137' #Cs
def extract (url):
    data = extract_every_row(url)
    energy = []
    if data:
        for row in data:
            for num in row:
                try:
                    num = float(num)
                except:
                    row.remove(num)    
        for row in data:
            for num in row:
                try:
                    num = float(num)
                except:
                    row.remove(num)
    
        for row in data:
            if (len(row) == 1):
                row.append(0)
            if (len(row) == 0):
                data.remove(row)
            aux = []
            for num in row:
                aux.append(float(num))
            energy.append(aux)
        for x in energy:
            if len(x) == 0:
                energy.remove(x)
    return energy
Eu = extract(urlEu)
Co = extract(urlCo)
Ba = extract(urlBa)
Cs = extract(urlCs)
half_lifeEu = extract_half_life(urlEu)
half_lifeCo = extract_half_life(urlCo)
half_lifeCs = extract_half_life(urlCs)
half_lifeBa = extract_half_life(urlBa)

bigjson = {
    "SEG 8-226": [809,half_lifeEu, Eu],
    "SEG 5-414": [389300,half_lifeEu, Eu],
    "SEG 8-327": [662,half_lifeCo, Co],
    "SEG 6-772": [160350,half_lifeCo, Co],
    "SEG 5-407": [280900,half_lifeCo, Co],
    "SEG 8-382": [1882,half_lifeBa, Ba],
    "SEG 8-56": [1394,half_lifeCs, Cs]
}

file_name = 'data.json'

with open(file_name, 'w') as file:
    json.dump(bigjson, file)
