# NEsse script vou remover as colunas que não são necessárias para a análise
#Esse foi um script de pre processamento dos dados

import pandas as pd

# Carregando o dataset
df = pd.read_csv('osc_de_santos.csv')

# Removendo as colunas que não são necessárias
df = df.drop('id_osc', axis=1)
df = df.drop('edmu_cd_municipio', axis=1)
df = df.drop('eduf_sg_uf', axis=1)
df = df.drop('cd_natureza_juridica_osc' , axis=1)
df = df.drop('edmu_nm_municipio', axis=1)
df = df.drop('sbcl_cnae_corrigido', axis=1)
df = df.drop('eduf_cd_uf', axis=1)
df = df.drop('grp_cnae20_corrigido', axis=1)
df = df.drop('clas_cnae20_corrigido', axis=1)
df = df.drop('div_cnae20_corrigido', axis=1)
df.info()

# Salvando o dataset
df.to_csv('osc_de_santos_filtrada.csv', index=False)