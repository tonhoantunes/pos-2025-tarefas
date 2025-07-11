import requests
from xml.dom.minidom import parseString 

# URL do serviço SOAP
url = "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso"

def chamar_servico_soap(function, iso_code):
    headers = {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": f"http://www.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/{function}"
    }

    body = f"""<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <{function} xmlns="http://www.oorsprong.org/websamples.countryinfo">
          <sCountryISOCode>{iso_code}</sCountryISOCode>
        </{function}>
      </soap:Body>
    </soap:Envelope>"""

    resposta = requests.post(url, data=body, headers=headers)
    return resposta.text

def parse_e_print(xml_string, tag_name):
    dom = parseString(xml_string)
    resultado = dom.getElementsByTagName(tag_name)[0].firstChild.nodeValue
    print(f"\nResultado: {resultado}")

def menu():
    print("ESCOLHA UMA OPÇÃO:")
    print("1 = Nome do País")
    print("2 = Capital do País")
    print("3 = Moeda do País")
    opcao = input("Digite o número da opção: ")
    iso = input("Digite o código ISO do país (ex: BR, US, FR): ").upper()

    if opcao == "1":
        xml = chamar_servico_soap("CountryName", iso)
        parse_e_print(xml, "m:CountryNameResult")
    elif opcao == "2":
        xml = chamar_servico_soap("CapitalCity", iso)
        parse_e_print(xml, "m:CapitalCityResult")
    elif opcao == "3":
        xml = chamar_servico_soap("CountryCurrency", iso)
        dom = parseString(xml)
        nome_da_moeda = dom.getElementsByTagName("m:sName")[0].firstChild.nodeValue
        code = dom.getElementsByTagName("m:sISOCode")[0].firstChild.nodeValue
        print(f"\nMoeda: {nome_da_moeda} ({code})")
    else:
        print("Opção inválida.")

menu()

