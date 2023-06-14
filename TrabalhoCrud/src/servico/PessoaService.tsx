import { Database } from "../database/Database"
import { Pessoa } from "../model/Pessoa"

export class PessoaService {
    static readonly TABLE = `pessoa`
    static async create(obj: Pessoa) {
        const result = await Database.runQuery(`
        INSERT INTO ${this.TABLE} (
           nome,
            email,
            idade,
            telefone) 
            
            VALUES (?,?,?,?)`, [
                obj.nome,             
                obj.email,             
                obj.idade,             
                obj.telefone            
        ])
        obj.id = result.insertId
        return obj
    }

    static async update(obj:Pessoa) {
        const query = `UPDATE ${this.TABLE} 
        set nome =? ,   
       email =? ,  
       idade =? ,  
        telefone =?  
        WHERE id = ?;`
        const result = await Database.runQuery(query, [
            obj.nome,            
            obj.email,            
            obj.idade,            
            obj.telefone,            
            obj.id
        ])
        return result.rowsAffected > 0
    }

    static async delete(obj: Pessoa) {

        const query = `DELETE FROM ${this.TABLE} WHERE id = ?;`
        const result = await Database.runQuery(query, [
            obj.id
        ])
        return result.rowsAffected > 0
    }

    static async deleteById(id: number) {
        await this.tryRemoveImage(id)

        const query = `DELETE FROM ${this.TABLE} WHERE id = ?;`
        const result = await Database.runQuery(query, [id])

        return result.rowsAffected > 0
    }

    static async tryRemoveImage(id: number) {
       
    }

    static async findById(id: number) {
        const query = `SELECT * FROM ${this.TABLE} WHERE id = ?;`
        const result = await Database.runQuery(query, [id])

        if (result.rows.length != 1) {
            throw new Error('Pessoa não existe')
        }

        const raw = result.rows.item(0)
        const obj = new Pessoa(raw)

        return obj
    }

    static async findAll() {
        const query = `SELECT * FROM ${this.TABLE};`
        const result = await Database.runQuery(query)
        return result.rows._array.map(row => new Pessoa(row))
    }
 

}