import zeep

# define a URL do WSDL
wsdl_url = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL"

# inicializa o cliente zeep
client = zeep.Client(wsdl=wsdl_url)

num = int(input("Digite um número inteiro: "))


response = client.service.NumberToWords(num)
print(f"O número {num} em palavras é: {response}")
