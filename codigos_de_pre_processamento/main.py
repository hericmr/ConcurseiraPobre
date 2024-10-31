#esse programa serve para deletar da base de dados nacional os dados de outras cidades além de santos


import pandas as pd

# Carregar o arquivo CSV
df = pd.read_csv('base_osc_2023.csv')

# Filtrar o dataframe para manter apenas as linhas onde o município seja "Santos" ou "SANTOS" (ignorando case)
df_filtrado = df[df['edmu_nm_municipio'].str.lower() == 'santos'.lower()]

# Exibir o resultado filtrado
print(df_filtrado)

# Se quiser salvar o dataframe filtrado em um novo arquivo CSV
df_filtrado.to_csv('osc_de_santos.csv', index=False)
