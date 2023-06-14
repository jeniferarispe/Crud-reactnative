import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    View, Text, Modal, Pressable, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, Platform, AlertButton, Button, FlatList
} from 'react-native';
import MeuEstilo from '../../../meuestilo'
import { Pessoa } from '../../model/Pessoa';
import { Input } from "../../component/Input";
import meuestilo from "../../../meuestilo";
import { PessoaService } from '../../servico/PessoaService';

const ManterPessoa = () => {
    const [formPessoa, setFormPessoa] = useState<Partial<Pessoa>>({})
    const [formErrors, setErrors] = useState({})
    const [isRefreshing, setIsRefreshing] = useState(true)
    const [pessoas, setPessoas] = useState<Pessoa[]>([])


    const adicionarRegistro = async () => {
        setErrors({})
        // validation
        const errors = {}
        if (!formPessoa.nome || !formPessoa.nome.trim()) {
            errors['nome'] = 'Nome é obrigatório'
        }

        if (!formPessoa.email || !formPessoa.email.trim()) {
            errors['email'] = 'Email é obrigatório'
        }

        // if (!formPessoa.idade || !formPessoa.idade.trim()) {
        //     errors['idade'] = 'Idade é obrigatório'
        // }

        // if (!formPessoa.telefone || !formPessoa.telefone.trim()) {
        //     errors['telefone'] = 'Telefone é obrigatório'
        // }


        if (Object.keys(errors).length) {
            setErrors(errors)
            return
        }

        if (formPessoa.id) {
            
            const pessoa = new Pessoa(formPessoa)
            console.log(pessoa)
            const result = await PessoaService.update(pessoa)
           // setFormPessoa(Pessoa)
            alert('Registro atualizado!');
        } else {
            const obj = new Pessoa(formPessoa)
            const pessoa = await PessoaService.create(obj)
            setFormPessoa(pessoa)
            alert('Registro Adicionado!');
            limparFormulario();
        }

    }


    const limparFormulario = () => {
        setFormPessoa({});
    }

    return (
        <KeyboardAvoidingView
        style={MeuEstilo.containerlistar}
        behavior="padding"
    >
        <View style={MeuEstilo.inputContainer}>
            <Input
                label="Nome"
                placeholder="nome..."
                defaultValue={formPessoa.nome}
                onChangeText={val => setFormPessoa({ ...formPessoa, nome: val })}
                error={formErrors['nome']}
            />

            <Input
                label="Email"
                placeholder="email..."
                defaultValue={formPessoa.email}
                onChangeText={val => setFormPessoa({ ...formPessoa, email: val })}
                error={formErrors['email']}
            />
            

            <Input
                label="Idade"
                placeholder="idade..."
                defaultValue={formPessoa.idade?.toString()}
                onChangeText={val => setFormPessoa({ ...formPessoa, idade: val })}
                error={formErrors['idade']}
            />

            <Input
                label="Telefone"
                placeholder="telefone..."
                defaultValue={formPessoa.telefone?.toString()}
                onChangeText={val => setFormPessoa({ ...formPessoa, telefone: val })}
                error={formErrors['telefone']}
            />


        </View>

            <View style={MeuEstilo.buttonContainer}>
                <TouchableOpacity
                    onPress={adicionarRegistro}
                    style={MeuEstilo.button}
                >
                    <Text style={MeuEstilo.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={limparFormulario}
                    style={MeuEstilo.button}
                >
                    <Text style={MeuEstilo.buttonText}>Limpar Campos</Text>
                </TouchableOpacity>

            </View>
          

    
        </KeyboardAvoidingView>
    );
};
export default ManterPessoa

