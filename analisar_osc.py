"""
analise_oscs.py

Este script fará uma análise de dados sobre Organizações da Sociedade 
Civil (OSCs) a partir de um arquivo CSV contendo informações relevantes. 
O grafico mostra a tendência de criação de OSCs ao longo dos anos. 
"""

import pandas as pd
import matplotlib.pyplot as plt


pd.set_option('display.max_rows', None)  # Para exibir todas as linhas
pd.set_option('display.max_columns', None)  # Para exibir todas as colunas

# Carregando os dados
df = pd.read_csv('data/osc_santos.csv')

# Gráfico 3: Tendência de OSCs ao Longo dos Anos
plt.figure(figsize=(12, 8))
ano_counts = df['ano_inicio'].value_counts().sort_index()

print("Dados para o gráfico de tendência de OSCs ao longo dos anos:")
print(ano_counts)

# Criar o gráfico de linha com marcadores
plt.plot(ano_counts.index, ano_counts.values, marker='o', linestyle='-', color='b', markersize=5)

# Adicionar título e rótulos
plt.title('Número de OSCs por Ano de Início', fontsize=16)
plt.xlabel('Ano de Início', fontsize=14)
plt.ylabel('Contagem de OSCs', fontsize=14)

# Adicionar grid
plt.grid(color='gray', linestyle='--', linewidth=0.5, alpha=0.5)  # Altere o alpha para deixar o grid mais claro


# Adicionar anotações em pontos específicos
for x, y in zip(ano_counts.index, ano_counts.values):
    plt.annotate(str(y), xy=(x, y), textcoords="offset points", xytext=(0,5), ha='center', fontsize=8)

# Exibir o gráfico com ajuste na fonte dos rótulos do eixo x
plt.xticks(ano_counts.index, rotation=45, fontsize=6)  # Ajuste o tamanho da fonte aqui
plt.tight_layout()  # Ajusta automaticamente o layout
plt.show()
