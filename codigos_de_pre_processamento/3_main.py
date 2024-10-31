import pandas as pd
#ainda no pre processamento dos dados, agora vou verificar se há dados faltantes

df = pd.read_csv('osc_de_santos_filtrada.csv')

# Verificar as primeiras linhas do DataFrame
print(df.head())

# Verificar a estrutura dos dados
print(df.info())

# Descrever estatísticas básicas
print(df.describe())

# Verificar quantos dados estão faltando em cada coluna
print(df.isnull().sum())

# Preencher dados faltantes de colunas de string com "Não Informado"
df = df.apply(lambda col: col.fillna('NÃO INFORMADO') if col.dtype == 'object' else col)

# Preencher dados faltantes de colunas numéricas com a média
df = df.apply(lambda col: col.fillna(col.mean()) if col.dtype != 'object' else col)

# Verificar os dados após o preenchimento
print(df.isnull().sum())

# Salvar o DataFrame modificado em um novo arquivo CSV
df.to_csv('oscs_de_santos_tratados.csv', index=False)

print("Arquivo salvo como 'dados_oscs_semi_tratados.csv'")