export class    Pessoa {
    public id: number;
    public nome: string;
    public email: string;
    public idade: number;
    public telefone: number;

    constructor(obj?: Partial<Pessoa>) {
        if (obj) {
            this.id = obj.id
            this.nome = obj.nome
            this.email = obj.email
            this.idade = obj.idade
            this.telefone = obj.telefone

            
        }
    }

    toString() {
        const fields = Object.values(this).join(', ')
        return `Pessoa [${fields}]`
    }

    toObjeto() {
        const pessoa = {
            id: this.id,
           nome: this.nome,
           email: this.email,
           idade: this.idade,
           telefone: this.telefone
        }

        return pessoa
    }
};