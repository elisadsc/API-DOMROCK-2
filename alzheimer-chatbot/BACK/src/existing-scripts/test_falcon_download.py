from transformers import AutoTokenizer, AutoModelForCausalLM

print("⏳ Baixando tokenizer...")
tokenizer = AutoTokenizer.from_pretrained("tiiuae/falcon-rw-1b")

print("⏳ Baixando modelo...")
model = AutoModelForCausalLM.from_pretrained("tiiuae/falcon-rw-1b")

print("✅ Download completo!")
