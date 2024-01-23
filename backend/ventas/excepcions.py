# en tu archivo excepciones.py
class ValorInvalidoError(Exception):
    def __init__(self, campo, valor):
        self.campo = campo
        self.valor = valor
        super().__init__()

    def __str__(self):
        return f"Error en el campo '{self.campo}': El valor '{self.valor}' no es válido."
