import pandas as pd
import matplotlib.pyplot as plt

# Carregar os dados
df = pd.read_csv('oscs_de_santos_semi_tratados.csv')

# Remover espaços em branco nos nomes das colunas
df.columns = df.columns.str.strip()

# Imprimir os nomes das colunas
print("Nomes das colunas:", df.columns.tolist())

# 1. Preencher dados faltantes
# Preencher colunas de strings
df['nome_fantasia_osc'].fillna('Não Informado', inplace=True)

# Preencher dados faltantes de colunas numéricas
df['ano_inicio'].fillna(df['ano_inicio'].mean(), inplace=True)

# 2. Converter tipos de dados
df['ano_inicio'] = df['ano_inicio'].astype(int)

# 3. Remover duplicatas
df.drop_duplicates(inplace=True)

# 4. Normalização de texto
df['bairro'] = df['bairro'].str.lower().str.strip()
df['area_atuacao'] = df['area_atuacao'].str.lower().str.strip()
df['subarea_atuacao'] = df['subarea_atuacao'].str.lower().str.strip()

# 5. Análise de valores únicos
print("Valores únicos em 'bairro':", df['bairro'].unique())
print("Valores únicos em 'area_atuacao':", df['area_atuacao'].unique())
print("Valores únicos em 'subarea_atuacao':", df['subarea_atuacao'].unique())

# 6. Identificação de outliers (opcional)
plt.boxplot(df['ano_inicio'])
plt.title('Boxplot do Ano de Início')
plt.show()

# 7. Salvar os dados tratados em um novo CSV
df.to_csv('dados_oscs_tratados.csv', index=False)
print("Dados tratados salvos em 'dados_oscs_tratados.csv'")
