from xml.dom.minidom import parse

dom = parse("parsers/cardapio.xml")

cardapio = dom.documentElement

pratos = cardapio.getElementsByTagName('prato')

id_prato = 0

for prato in pratos:
    id_prato += 1
    elemento_nome = prato.getElementsByTagName('nome_prato')[0]
    nome_prato = elemento_nome.firstChild.nodeValue
    print(f"Prato {id_prato}: ", nome_prato)

opcao_id = int(input("Digite o ID do prato que deseja ver os detalhes: "))
prato = pratos[opcao_id - 1]
print("---\n")

elemento_nome = prato.getElementsByTagName('nome_prato')[0]
nome_prato = elemento_nome.firstChild.nodeValue
elemento_descricao = prato.getElementsByTagName('descricao')[0]
descricao = elemento_descricao.firstChild.nodeValue
elemento_ingredientes = prato.getElementsByTagName('ingredientes')[0]
ingredientes = [ingrediente.firstChild.nodeValue for ingrediente in elemento_ingredientes.getElementsByTagName('ingrediente')]
elemento_preco = prato.getElementsByTagName('preco')[0]
preco = elemento_preco.firstChild.nodeValue
elemento_calorias = prato.getElementsByTagName('calorias')[0]
calorias = elemento_calorias.firstChild.nodeValue
elemento_tempo_preparo = prato.getElementsByTagName('tempo_preparo')[0]
tempo_preparo = elemento_tempo_preparo.firstChild.nodeValue

print(f"Prato: {nome_prato}")
print(f"Descrição: {descricao}")
print("Ingredientes:", ", ".join(ingredientes))
print(f"Calorias: {calorias}")
print(f"Tempo de preparo: {tempo_preparo} minutos")
print(f"Preço: {preco}")