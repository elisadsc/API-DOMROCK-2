import pandas as pd

df = pd.read_csv("src/main/resources/alzheimer_abstracts.csv")
with open("src/main/resources/data.sql", "w") as f:
    f.write("INSERT INTO abstract (id, content) VALUES\n")
    for i, row in df.iterrows():
        content = row["abstract"].replace("'", "''")
        f.write(f"({row['pubmed_id']}, '{content}')")
        f.write("," if i < len(df) - 1 else ";")
        f.write("\n")