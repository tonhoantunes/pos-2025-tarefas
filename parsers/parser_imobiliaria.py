from xml.dom.minidom import parse

dom = parse("parsers/imobiliaria.xml")

imobiliaria = dom.documentElement

imoveis = imobiliaria.getElementsByTagName('imovel')

id_imovel = 0

for imovel in imoveis:
    id_imovel += 1
    elemento_descricao = imovel.getElementsByTagName('descricao')[0]
    imovel_descricao = elemento_descricao.firstChild.nodeValue
    print(f"Imóvel {id_imovel}: ", imovel_descricao)

opcao_id = int(input("Digite o ID do imóvel que deseja ver os detalhes: "))
imovel = imoveis[opcao_id - 1]
print("---\n")

elemento_descricao = imovel.getElementsByTagName('descricao')[0]
descricao = elemento_descricao.firstChild.nodeValue
elemento_proprietario = imovel.getElementsByTagName('proprietario')[0]
proprietario = elemento_proprietario.firstChild.nodeValue
elemento_nome = imovel.getElementsByTagName('nome')[0]
nome = elemento_nome.firstChild.nodeValue
elemento_email = imovel.getElementsByTagName('email')
if elemento_email and elemento_email[0].firstChild:
    email = elemento_email[0].firstChild.nodeValue
    email_str = f"E-mail: {email}"
else:
    email_str = "E-mail: Não informado"
elementos_telefone = imovel.getElementsByTagName('telefone')
telefones = [tel.firstChild.nodeValue for tel in elementos_telefone if tel.firstChild]
telefones_str = ", ".join(telefones) if telefones else "Não informado"
elemento_endereco = imovel.getElementsByTagName('endereco')[0]
endereco = elemento_endereco.firstChild.nodeValue
elemento_rua = imovel.getElementsByTagName('rua')[0]
rua = elemento_rua.firstChild.nodeValue
elemento_numero = imovel.getElementsByTagName('numero')[0]
numero = elemento_numero.firstChild.nodeValue
elemento_bairro = imovel.getElementsByTagName('bairro')[0]
bairro = elemento_bairro.firstChild.nodeValue
elemento_cidade = imovel.getElementsByTagName('cidade')[0]
cidade = elemento_cidade.firstChild.nodeValue
elemento_caracteristicas = imovel.getElementsByTagName('caracteristicas')[0]
caracteristicas = elemento_caracteristicas.firstChild.nodeValue
elemento_tamanho = imovel.getElementsByTagName('tamanho')[0]
tamanho = elemento_tamanho.firstChild.nodeValue
elemento_quartos = imovel.getElementsByTagName('numQuartos')[0]
quartos = elemento_quartos.firstChild.nodeValue
elemento_banheiros = imovel.getElementsByTagName('numBanheiros')[0]
banheiros = elemento_banheiros.firstChild.nodeValue
elemento_valor = imovel.getElementsByTagName('valor')[0]
valor = elemento_valor.firstChild.nodeValue


print(f"Descrição: {descricao}")
print("\n")
print(f"Proprietário: {nome}")
print(email_str)
print(f"Telefones: {telefones_str}")
print(f"Endereço: {rua}, {numero}, {bairro}, {cidade}")
print("\n")
print(f"Características:")
print(f"Tamanho: {tamanho} m²")
print(f"Quartos: {quartos}")
print(f"Banheiros: {banheiros}")
print(f"Valor: R${valor}")
print("---\n")
print("Obrigado por usar o sistema de consulta de imóveis!")